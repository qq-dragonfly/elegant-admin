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
				<el-form-item label="医护头像" prop="image" class="col-span-2">
					<image-upload
						v-model:url="infoProps.rowData.image"
						:isRemove="infoProps.isView"
						name="image"
						:width="150"
						:height="150"
						@on-success="handleImageCoverVal"
					/>
				</el-form-item>
				<el-form-item label="医护名称" prop="name">
					<el-input v-model="infoProps.rowData.name" clearable placeholder="请输入医护名称"></el-input>
				</el-form-item>
				<el-form-item label="医护类型" prop="userType">
					<el-select
						value-key="id"
						v-model="infoProps.rowData.userType"
						placeholder="请选择医护类型"
						@change="handleChangeDep"
						clearable
					>
						<el-option v-for="item in userTypeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="医护职称" prop="titleId">
					<el-select value-key="id" v-model="infoProps.rowData.titleId" placeholder="请选择医护职称" clearable>
						<el-option v-for="item in userTypeChildList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属院区" prop="hospitalAreaItem">
					<pro-table-select
						v-model="infoProps.rowData.hospitalAreaItem"
						:disabled="infoProps.isView"
						:params="hospitalParams"
						:request-api="getHospitalListApi"
						collapseTags
						collapseTagsTooltip
						:propsObj="propsObj"
						@update:model-value="handleChangeOrg(infoProps.rowData.hospitalAreaItem)"
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
				<el-form-item label="所属科室" prop="departmentItem">
					<pro-table-select
						v-model="infoProps.rowData.departmentItem"
						:disabled="infoProps.isView"
						:params="depParams"
						:request-api="getDepartmentListApi"
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
						<el-table-column prop="name" label="科室名称"></el-table-column>
					</pro-table-select>
				</el-form-item>

				<el-form-item label="身份证号" prop="cardId">
					<el-input v-model="infoProps.rowData.cardId" clearable placeholder="请输入身份证号"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="infoProps.rowData.phone" clearable placeholder="请输入医护手机号"></el-input>
				</el-form-item>
				<el-form-item label="工号" prop="jobNo">
					<el-input v-model="infoProps.rowData.jobNo" clearable placeholder="请输入医护工号"></el-input>
				</el-form-item>
				<el-form-item label="资格证书编码" prop="qualificationNo">
					<el-input v-model="infoProps.rowData.qualificationNo" clearable placeholder="请输入资格证书编码"></el-input>
				</el-form-item>
				<el-form-item label="执业证书编码" prop="practiceNo">
					<el-input v-model="infoProps.rowData.practiceNo" clearable placeholder="请输入执业证书编码"></el-input>
				</el-form-item>
				<el-form-item label="序号值" prop="sort">
					<el-input-number :min="0" :max="10000" controls-position="right" v-model="infoProps.rowData.sort"></el-input-number>
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
				<el-form-item label="医护擅长" class="col-span-2" prop="goodAtInfo">
					<el-input show-word-limit v-model="infoProps.rowData.goodAtInfo" type="textarea" aria-colspan="4" maxlength="2000" />
				</el-form-item>
				<el-form-item label="医护介绍" class="col-span-2" prop="introduce">
					<el-input show-word-limit rows="4" v-model="infoProps.rowData.introduce" type="textarea" maxlength="2000" />
				</el-form-item>
			</div>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" v-show="!infoProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</ProDialog>
</template>

<script setup lang="ts" name="DocDetail">
import { getDocDetailApi, getHospitalListApi, getDepartmentListApi } from '@/api/modules/org';
import { getDictTypeApi, getDictIdApi } from '@/api/modules/common';
import { ref, reactive } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
const validateHospital = (rule: any, value: any, callback: any) => {
	if (!value || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]') {
		callback(new Error('请选择院区!'));
	} else {
		callback();
	}
};
const validateDep = (rule: any, value: any, callback: any) => {
	if (!value || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]') {
		callback(new Error('请选择科室!'));
	} else {
		callback();
	}
};
const formRules = reactive({
	name: [{ required: true, message: '请输入医护姓名!' }],
	userType: [{ required: true, message: '请选择医护类型!' }],
	titleId: [{ required: true, message: '请选择医护职称!' }],
	cardId: [{ required: true, message: '请输入医护身份证!' }],
	phone: [{ required: true, message: '请输入医护手机号!' }],
	jobNo: [{ required: true, message: '请输入医护工号!' }],
	hospitalAreaItem: [
		{
			required: true,
			validator: validateHospital,
			trigger: 'change' // blur 或 change 这里就不指定触发方式了，保存提交时再校验
		}
	],
	departmentItem: [
		{
			required: true,
			validator: validateDep,
			trigger: 'change' // blur 或 change 这里就不指定触发方式了，保存提交时再校验
		}
	],
	sort: [{ required: true, message: '请输入序号值!' }]
});

interface dialogProps {
	title: string;
	isView: boolean;
	rowData: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}
// dialog框状态
const dialogVisible = ref(false);
const infoProps = ref<dialogProps>({
	isView: false,
	title: '新增',
	rowData: {
		openStatus: 'OPEN',
		hospitalAreaItem: {},
		departmentItem: {}
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
	infoProps.value.rowData.departmentItem = {};
	if (params.rowData.id) {
		getDocDetail(params);
		getDictId(params.rowData.userType);
	} else {
		infoProps.value.rowData.openStatus = 'OPEN';
	}
};
//
const getDocDetail = async (row: any) => {
	let para = {
		id: row.rowData.id
	};
	const resData: any = await getDocDetailApi(para);
	infoProps.value.rowData = resData.data;
	infoProps.value.rowData.hospitalAreaItem = {
		id: resData.data.hospitalAreaId,
		name: resData.data.hospitalAreaName
	};
	infoProps.value.rowData.departmentItem = {
		id: resData.data.departmentId,
		name: resData.data.departmentName
	};
};

onMounted(() => {
	getProfessionalTitle('0');
});

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
			formData.departmentId = infoProps.value.rowData.departmentItem.id;
			formData.userType = infoProps.value.rowData.userType;
			await infoProps.value.api!(formData);
			ElMessage.success({ message: `${infoProps.value.title}成功！` });
			await infoProps.value.getTableList!();
			dialogVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};
const hospitalParams = ref({
	openStatus: 'OPEN'
});
const depParams = ref<any>({
	openStatus: 'OPEN',
	hospitalAreaId: ''
});
const propsObj = ref({
	label: 'name',
	value: 'id'
});
const handleChangeOrg = (val: any) => {
	infoProps.value.rowData.departmentItem = {};
	depParams.value.hospitalAreaId = val.id;
};

// 获取医护类型职称
const userTypeList = ref<any>([]);
const userTypeChildList = ref<any>([]);
const getDictId = (id: string) => {
	getDictIdApi({ id }).then((res: any) => {
		userTypeChildList.value = res.data.next;
	});
};
const getProfessionalTitle = (id: string) => {
	let params = {
		pid: id,
		type: 'DOCTOR_TITLE'
	};
	let childProjects: any = [];
	getDictTypeApi(params)
		.then(res => {
			if (res.data.length < 1) {
				childProjects = undefined;
			} else {
				childProjects = res.data;
			}

			// 获取数据后调用resolve将子项数据渲染至视图
			nextTick(() => {
				if (id === '0') {
					userTypeList.value = childProjects;
				}
			});
		})
		.catch(error => {
			console.log('获取数据异常', error);
		});
};
const handleChangeDep = (val: any) => {
	infoProps.value.rowData.titleId = '';
	getDictId(val);
};
// 图片返回
const handleImageCoverVal = (res: any) => {
	if (res) {
		infoProps.value.rowData.image = res;
	}
};
defineExpose({
	acceptParams
});
</script>
