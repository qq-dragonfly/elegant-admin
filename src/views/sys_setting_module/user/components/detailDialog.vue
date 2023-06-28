<template>
	<ProDialog
		:title="`${infoProps.title}用户`"
		minWidth="600px"
		width="75%"
		v-model="dialogVisible"
		:destroy-on-close="true"
		size="450px"
	>
		<el-form
			ref="ruleFormRef"
			label-width="140px"
			label-suffix=" :"
			:rules="rules"
			:model="infoProps.rowData"
			:hide-required-asterisk="infoProps.isView"
		>
			<div class="flex flex-wrap justify-center grid grid-cols-2">
				<el-form-item label="登录账号(手机号)" prop="phone">
					<el-input v-model="infoProps.rowData.phone" clearable placeholder="请输入登录账号"></el-input>
				</el-form-item>
				<el-form-item label="用户姓名" prop="name">
					<el-input v-model="infoProps.rowData.name" clearable placeholder="请输入用户姓名" />
				</el-form-item>
				<el-form-item label="状态" prop="openStatus">
					<el-switch
						v-model="infoProps.rowData.openStatus"
						active-value="OPEN"
						inactive-value="CLOSE"
						inline-prompt
						:active-icon="Check"
						:inactive-icon="Close"
					/>
				</el-form-item>
				<el-form-item label="关联角色" prop="roleIdList">
					<pro-table-select
						v-model="infoProps.rowData.roleIdList"
						:disabled="infoProps.isView"
						:params="params"
						:request-api="getSysRoleListApi"
						collapseTags
						collapseTagsTooltip
						multiple
						:propsObj="propsObj"
					>
						<template #header="{ form, submit }">
							<el-form :inline="true" :model="form">
								<el-form-item>
									<el-input v-model="form.name" clearable></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submit">查询</el-button>
								</el-form-item>
							</el-form>
						</template>
						<el-table-column prop="name" label="名称"></el-table-column>
						<el-table-column prop="alias" label="别名"></el-table-column>
					</pro-table-select>
				</el-form-item>
				<el-form-item label="关联医护" prop="role" v-if="false">
					<pro-table-select
						v-model="infoProps.rowData.role"
						:disabled="infoProps.isView"
						:params="params"
						:request-api="getSysRoleListApi"
						collapseTags
						collapseTagsTooltip
						multiple
						:propsObj="propsObj"
					>
						<template #header="{ form, submit }">
							<el-form :inline="true" :model="form">
								<el-form-item>
									<el-input v-model="form.name" clearable></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submit">查询</el-button>
								</el-form-item>
							</el-form>
						</template>
						<el-table-column prop="name" label="名称"></el-table-column>
						<el-table-column prop="alias" label="别名"></el-table-column>
					</pro-table-select>
				</el-form-item>
			</div>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" v-show="!infoProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</ProDialog>
</template>

<script setup lang="ts" name="SysUserDialog">
import { getSysUserDetailApi } from '@/api/modules/user';
import { ref, reactive } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
import ProDialog from '@/components/ProDialog/index.vue';
import { getSysRoleListApi } from '@/api/modules/role';
import { cloneDeep } from 'lodash-es';
const params = ref({
	openStatus: 'OPEN'
});
const propsObj = ref({
	label: 'name',
	value: 'id'
});
const validateRole = (rule: any, value: any, callback: any) => {
	if (!value || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]') {
		callback(new Error('请选择角色'));
	} else {
		callback();
	}
};
const rules = reactive({
	roleIdList: [
		{
			required: true,
			validator: validateRole,
			trigger: 'change' // blur 或 change 这里就不指定触发方式了，保存提交时再校验
		}
	]
});

interface dialogProps {
	title: string;
	isView: boolean;
	rowData?: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

// drawer框状态
const dialogVisible = ref(false);
const infoProps = ref<dialogProps>({
	isView: false,
	title: '',
	rowData: {
		roleIdList: [],
		openStatus: true
	}
});

// 接收父组件传过来的参数
const acceptParams = (params: dialogProps): void => {
	let titleObj: any = {
		show: '查看',
		add: '新增',
		edit: '编辑'
	};
	infoProps.value = Object.assign(infoProps.value, params);
	infoProps.value.rowData.roleIdList = [];
	infoProps.value.title = titleObj[params.title];

	dialogVisible.value = true;
	if (params.rowData.id) {
		getSysUserDetail(params);
	} else {
		infoProps.value.rowData.openStatus = true;
	}
};
//
const getSysUserDetail = (row: any) => {
	let para = {
		id: row.rowData.id
	};
	getSysUserDetailApi(para).then(res => {
		if (res) {
			infoProps.value.rowData = res.data;
			infoProps.value.rowData.roleIdList = res.data.roleList || [];
		}
	});
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return;
		}
		try {
			const formData = cloneDeep(infoProps.value.rowData);
			let roleIdArr: any = [];
			formData.roleIdList.map((item: any) => {
				roleIdArr.push(item.id);
			});
			formData.roleIdList = roleIdArr;
			await infoProps.value.api!(formData);
			ElMessage.success({ message: `${infoProps.value.title}用户成功！` });
			await infoProps.value.getTableList!();
			dialogVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};
defineExpose({
	acceptParams
});
</script>
