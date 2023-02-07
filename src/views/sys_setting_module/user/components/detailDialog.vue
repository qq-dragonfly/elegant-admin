<template>
	<ProDialog :title="`${drawerProps.title}用户`" width="75%" v-model="drawerVisible" :destroy-on-close="true" size="450px">
		<el-form
			ref="ruleFormRef"
			label-width="140px"
			label-suffix=" :"
			:rules="rules"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<div class="flex flex-wrap">
				<el-form-item label="用户头像头像" prop="avatar">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="用户头像" prop="avatar">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="用户头像" prop="avatar">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="用户头像" prop="avatar">
					<el-input></el-input>
				</el-form-item>
				<el-form-item class="col-span-2" label="用户账号" prop="avatar">
					<el-input v-model="drawerProps.rowData.name" placeholder="请输入用户账号" />
				</el-form-item>
				<el-form-item label="用户角色" prop="role">
					<pro-table-select
						v-model="drawerProps.rowData.role"
						:disabled="drawerProps.isView"
						:params="params"
						:request-api="getSysRoleList"
						clearable
						multiple
						collapse-tags
						collapse-tags-tooltip
						:propsObj="propsObj"
						@change-emit="handleChangeVal"
					>
						<template #header="{ form, submit }">
							<el-form :inline="true" :model="form">
								<el-form-item>
									<el-date-picker
										v-model="form.date"
										value-format="YYYY-MM-DD"
										type="date"
										placeholder="注册时间"
										:teleported="false"
									></el-date-picker>
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
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</ProDialog>
</template>

<script setup lang="ts" name="SysUserDialog">
import { getSysUserDetailApi } from '@/api/modules/user';
import { ref, reactive } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import ProDialog from '@/components/ProDialog/index.vue';
import { getSysRoleList } from '@/api/modules/role';
const params = ref({
	name: 'name'
});
const propsObj = ref({
	label: 'name',
	value: 'id',
	keyword: 'keyword'
});
const rules = reactive({
	role: [{ required: true, message: '请填写居住地址' }]
});

interface dialogProps {
	title: string;
	isView: boolean;
	rowData?: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
	role?: [];
}

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<dialogProps>({
	isView: false,
	title: '',
	role: []
});

// 接收父组件传过来的参数
const acceptParams = (params: dialogProps): void => {
	let titleObj: any = {
		show: '查看',
		add: '新增',
		edit: '编辑'
	};
	drawerProps.value = JSON.parse(JSON.stringify(params));
	drawerProps.value.title = titleObj[params.title];
	drawerVisible.value = true;
	console.log('para', params.title);
	if (params.rowData.id) {
		getSysUserDetail(params);
	}
};
//
const getSysUserDetail = (row: any) => {
	let para = {
		id: row.rowData.id
	};
	getSysUserDetailApi(para).then(res => {
		if (res) {
			drawerProps.value.rowData = res.data;
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
			console.log('drawerProps.value.rowData', drawerProps.value.rowData);
			await drawerProps.value.api!(drawerProps.value.rowData);
			ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
			await drawerProps.value.getTableList;
			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};
//值变化
function handleChangeVal(val: any) {
	console.log('返回选中数据', val);
}
defineExpose({
	acceptParams
});
</script>
