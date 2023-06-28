<template>
	<ProDialog :title="`${infoProps.title}`" width="480px" v-model="dialogVisible" :destroy-on-close="true" size="450px">
		<el-form
			ref="ruleFormRef"
			label-width="140px"
			label-suffix=" :"
			:rules="formRules"
			:model="infoProps.rowData"
			:disabled="infoProps.isView"
			:hide-required-asterisk="infoProps.isView"
		>
			<div class="flex flex-wrap justify-center grid">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="infoProps.rowData.name" clearable placeholder="请输入角色名称"></el-input>
				</el-form-item>
				<el-form-item label="角色别名" prop="alias">
					<el-input v-model="infoProps.rowData.alias" clearable placeholder="请输入角色别名"></el-input>
				</el-form-item>
				<el-form-item label="序号值" prop="sort">
					<el-input-number controls-position="right" v-model="infoProps.rowData.sort"></el-input-number>
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
			</div>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" v-show="!infoProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</ProDialog>
</template>

<script setup lang="ts" name="SysRoleDetail">
import { getSysRoleDetailApi } from '@/api/modules/role';
import { ref, reactive } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
const formRules = reactive({
	name: [{ required: true, message: '请输入角色名称!' }],
	alias: [{ required: true, message: '请输入角色别名!' }],
	sort: [{ required: true, message: '请输入序号值!' }]
});

interface dialogProps {
	title: string;
	isView: boolean;
	rowData: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

// drawer框状态
const dialogVisible = ref(false);
const infoProps = ref<dialogProps>({
	isView: false,
	title: '新增',
	rowData: {
		openStatus: 'OPEN'
	}
});
// 接收父组件传过来的参数
const acceptParams = (params: dialogProps): void => {
	let titleObj: any = {
		show: '查看',
		add: '新增',
		edit: '编辑'
	};
	dialogVisible.value = true;
	infoProps.value = Object.assign(infoProps.value, params);
	infoProps.value.title = titleObj[params.title];
	if (params.rowData.id) {
		getSysRoleDetail(params.rowData.id);
	} else {
		infoProps.value.rowData.openStatus = 'OPEN';
	}
};
async function getSysRoleDetail(roleId: string) {
	getSysRoleDetailApi({ id: roleId }).then((res: any) => {
		infoProps.value.rowData = res.data;
	});
}
// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return;
		}
		try {
			await infoProps.value.api!(infoProps.value.rowData);
			ElMessage.success({ message: `${infoProps.value.title}成功！` });
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
