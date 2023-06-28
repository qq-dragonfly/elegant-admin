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
				<el-form-item label="API名称" prop="label">
					<el-input v-model="infoProps.rowData.label" clearable placeholder="请输入API名称"></el-input>
				</el-form-item>
				<el-form-item label="API地址" prop="api">
					<el-input clearable placeholder="请输入API地址" v-model="infoProps.rowData.api"></el-input>
				</el-form-item>
				<el-form-item label="API方法类型" prop="method">
					<el-select v-model="infoProps.rowData.method" placeholder="请选择" clearable>
						<el-option label="GET" value="get" />
						<el-option label="POST" value="post" />
						<el-option label="PUT" value="put" />
						<el-option label="DELETE" value="delete" />
						<el-option label="*" value="*" />
					</el-select>
				</el-form-item>
				<el-form-item label="排序" prop="sort">
					<el-input-number controls-position="right" :min="0" :max="10000" v-model="infoProps.rowData.sort"></el-input-number>
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
import { getSysResourceDetailApi } from '@/api/modules/resource';
import { ref, reactive } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
const formRules = reactive({
	label: [{ required: true, message: '请输入API资源名称!' }],
	method: [{ required: true, message: '请选择API请求方法!' }],
	api: [{ required: true, message: '请输入API地址!' }],
	sort: [{ required: true, message: '请输入排序值!' }]
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
	rowData: {}
});
// 文章类型
const contentType = ref('');
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
		getSysResourceDetail(params.rowData.id);
	} else {
		infoProps.value.rowData.openStatus = 'OPEN';
	}
};
async function getSysResourceDetail(id: string) {
	getSysResourceDetailApi({ id: id }).then((res: any) => {
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
