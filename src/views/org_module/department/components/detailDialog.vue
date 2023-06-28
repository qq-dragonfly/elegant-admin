<template>
	<ProDialog :title="`${infoProps.title}`" width="65%" v-model="dialogVisible" :destroy-on-close="true" size="450px">
		<el-form
			ref="ruleFormRef"
			label-width="140px"
			label-suffix=" :"
			:rules="formRules"
			:model="infoProps.rowData"
			:disabled="infoProps.isView"
			:hide-required-asterisk="infoProps.isView"
		>
			<div class="flex flex-wrap justify-center grid grid-cols-2">
				<el-form-item label="科室名称" prop="name">
					<el-input v-model="infoProps.rowData.name" clearable placeholder="请输入科室名称"></el-input>
				</el-form-item>
				<el-form-item label="所属院区" prop="hospitalAreaItem">
					<pro-table-select
						v-model="infoProps.rowData.hospitalAreaItem"
						:disabled="infoProps.isView"
						:params="params"
						:request-api="getHospitalListApi"
						collapseTags
						collapseTagsTooltip
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
						<el-table-column prop="name" label="院区名称"></el-table-column>
					</pro-table-select>
				</el-form-item>

				<el-form-item label="序号值" prop="sort">
					<el-input-number :min="0" :max="10000" controls-position="right" v-model="infoProps.rowData.sort"></el-input-number>
				</el-form-item>
				<el-form-item label="标准科室" prop="standardDeptId">
					<el-cascader
						ref="cascaderDepRef"
						:props="casProps"
						v-model="infoProps.rowData.standardDeptId"
						:options="depAllList"
						clearable
						@change="handleChangeDep"
					>
					</el-cascader>
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
				<el-form-item label="院区介绍" class="col-span-2" prop="introduce">
					<el-input v-model="infoProps.rowData.introduce" type="textarea" maxlength="2000" />
				</el-form-item>
			</div>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" v-show="!infoProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</ProDialog>
</template>

<script setup lang="ts" name="DepartmentDetail">
import { getDepartmentDetailApi, getHospitalListApi } from '@/api/modules/org';
import { getDictTypeApi } from '@/api/modules/common';
import { ref, reactive } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
const formRules = reactive({
	sort: [{ required: true, message: '请输入序号值!' }]
});

interface dialogProps {
	title: string;
	isView: boolean;
	rowData: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}
onMounted(() => {
	getChildProject();
});
// dialog框状态
const dialogVisible = ref(false);
const infoProps = ref<dialogProps>({
	isView: false,
	title: '新增',
	rowData: {
		openStatus: 'OPEN',
		hospitalAreaItem: {}
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
	infoProps.value.rowData.hospitalAreaItem = {};
	if (params.rowData.id) {
		getDepartmentDetail(params);
	} else {
		infoProps.value.rowData.openStatus = 'OPEN';
	}
};
//
const getDepartmentDetail = async (row: any) => {
	let para = {
		id: row.rowData.id
	};
	const resData: any = await getDepartmentDetailApi(para);
	infoProps.value.rowData = resData.data;
	infoProps.value.rowData.hospitalAreaItem = {
		id: resData.data.hospitalAreaId,
		name: resData.data.hospitalAreaName
	};
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) {
			return;
		}
		try {
			let formData = JSON.parse(JSON.stringify(infoProps.value.rowData));
			formData.hospitalAreaId = infoProps.value.rowData.hospitalAreaItem.id;
			await infoProps.value.api!(formData);
			ElMessage.success({ message: `${infoProps.value.title}成功！` });
			await infoProps.value.getTableList!();
			dialogVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};
const params = ref({
	openStatus: 'OPEN'
});
const propsObj = ref({
	label: 'name',
	value: 'id'
});
const casProps = ref<any>({
	value: 'id',
	label: 'name',
	children: 'next',
	checkStrictly: true,
	emitPath: false
});
const depAllList = ref<any>([
	{
		id: '',
		name: '',
		next: []
	}
]);
// 获取标准科室数据
const getChildProject = async () => {
	let params = {
		type: 'STANDARD_DEPT'
	};
	let res = await getDictTypeApi(params);
	depAllList.value = getTreeData(res.data);
};
// 递归判断列表，把最后的children设为undefined
const getTreeData = (data: any) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].next.length < 1) {
			// children若为空数组，则将children设为undefined
			data[i].next = undefined;
		} else {
			// children若不为空数组，则继续 递归调用 本方法
			getTreeData(data[i].next);
		}
	}
	return data;
};
const cascaderDepRef = ref();
const handleChangeDep = (value: any) => {
	if (value && value.length > 0) {
		// 获取当前选中节点
		let checkNode = cascaderDepRef.value.getCheckedNodes();
		// 将当前选中节点数据和当前路径数组返回给父组件
		infoProps.value.rowData.standardDeptId = checkNode[0].data.id;
		infoProps.value.rowData.standardDept = checkNode[0].data.name;
		// this.$emit('getData', checkNode[0].data, checkNode[0].pathLabels)
	} else {
		// this.$emit('getData', {}, [])
	}
};
defineExpose({
	acceptParams
});
</script>
