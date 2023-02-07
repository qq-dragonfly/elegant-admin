<template>
	<ProDialog :title="`${drawerProps.title}用户`" width="50%" v-model="dialogVisible" :destroy-on-close="true" size="450px">
		<el-form
			ref="ruleFormRef"
			label-width="140px"
			label-suffix=" :"
			:rules="rules"
			:model="drawerProps.rowData"
			:disabled="drawerProps.isView"
			:hide-required-asterisk="drawerProps.isView"
		>
			<div class="flex flex-wrap justify-center grid grid-cols-1">
				<el-form-item label="版块名称" prop="categoryName">
					<el-input v-model="drawerProps.rowData.categoryName"></el-input>
				</el-form-item>
				<el-form-item label="版块类型" prop="contentType">
					<el-select v-model="drawerProps.rowData.contentType" placeholder="请选择版块类型">
						<el-option v-for="item in publicDict.contentTypes" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="序号值" prop="sort">
					<el-input v-model="drawerProps.rowData.sort"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-switch v-model="drawerProps.rowData.status" inline-prompt :active-icon="Check" :inactive-icon="Close" />
				</el-form-item>
			</div>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</ProDialog>
</template>

<script setup lang="ts" name="SysUserDialog">
import { getCateDetailApi } from '@/api/modules/missions';
import { ref, reactive } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
import ProDialog from '@/components/ProDialog/index.vue';
import publicDict from '@/views/missions_module/dict';
const rules = reactive({
	categoryName: [{ required: true, message: '请输入版块分类名称!' }],
	contentType: [{ required: true, message: '请选择版块类型!' }],
	sort: [{ required: true, message: '请输入序号值!' }]
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
const drawerProps = ref<dialogProps>({
	isView: false,
	title: ''
});

// 接收父组件传过来的参数
const acceptParams = (params: dialogProps): void => {
	let titleObj: any = {
		show: '查看',
		add: '新增',
		edit: '编辑'
	};
	drawerProps.value = Object.assign(drawerProps.value, params);
	drawerProps.value.title = titleObj[params.title];
	dialogVisible.value = true;
	if (params.rowData.id) {
		getSysUserDetail(params);
	}
};
//
const getSysUserDetail = (row: any) => {
	let para = {
		id: row.rowData.id
	};
	getCateDetailApi(para).then(res => {
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
			await drawerProps.value.api!(drawerProps.value.rowData);
			ElMessage.success({ message: `${drawerProps.value.title}成功！` });
			await drawerProps.value.getTableList!();
			dialogVisible.value = false;
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
