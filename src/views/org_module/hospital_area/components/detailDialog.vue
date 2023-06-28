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
				<el-form-item label="院区名称" prop="name">
					<el-input v-model="infoProps.rowData.name" clearable placeholder="请输入院区名称"></el-input>
				</el-form-item>
				<el-form-item label="院区所在城市" prop="addressValue">
					<el-cascader
						ref="addressRef"
						:props="casProps"
						v-model="infoProps.rowData.addressValue"
						:options="projectAllList"
						clearable
						@change="handleCityChange"
					>
					</el-cascader>
				</el-form-item>
				<el-form-item label="院区地址" prop="address">
					<el-input v-model="infoProps.rowData.address" clearable placeholder="请输入院区地址"></el-input>
				</el-form-item>
				<el-form-item label="院区电话" prop="telephone">
					<el-input v-model="infoProps.rowData.telephone" clearable placeholder="请输入院区电话"></el-input>
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
				<el-form-item label="院区LOGO" prop="logo" class="col-span-2">
					<image-upload
						v-model:url="infoProps.rowData.logo"
						:isRemove="infoProps.isView"
						name="image"
						:width="150"
						:height="150"
						@on-success="handleImageCoverVal"
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

<script setup lang="ts" name="HospitalDetail">
import { getHospitalDetailApi } from '@/api/modules/org';
import { getRegionNextApi } from '@/api/modules/common';
import { ElMessage, FormInstance } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
const formRules = reactive({
	name: [{ required: true, message: '请输入宣教内容标题!' }],
	logo: [{ required: true, message: '请上传图片!' }],
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
		openStatus: 'OPEN'
	}
});
const projectAllList = ref<any>([
	{
		id: '',
		name: ''
	}
]);
onMounted(() => {
	getChildProject({ id: '100000' });
});
// const emits = defineEmits(['getData']);
//医院在址
const casProps = ref<any>({
	value: 'id',
	label: 'name',
	checkStrictly: false,
	lazy: true, // 此处必须为true
	lazyLoad: (node: any, resolve: any) => {
		const { level } = node;
		if (node.data.id) {
			getChildProject(node.data, resolve, level);
		}
	}
});
// 获取地址表
const getChildProject = (node: any, resolve?: any, level?: any) => {
	let params = { id: node.id };
	let childProjects: any = [];
	getRegionNextApi(params)
		.then(res => {
			childProjects = res.data.map((item: any) => ({
				id: item.id,
				name: item.name,
				leaf: level >= 2
			}));
			// 获取数据后调用resolve将子项数据渲染至视图
			if (node.id === '100000') {
				projectAllList.value = childProjects;
			} else {
				resolve(childProjects);
			}
		})
		.catch(error => {
			console.log('获取数据异常', error);
			// 此处调用resolve 防止接口数据异常时级联选择器一直处于加载状态
			resolve(childProjects);
		});
};
// 城市选择change事件
const addressRef = ref<any>('');
const handleCityChange = (value: any) => {
	infoProps.value.rowData.areaCodeInfo = [];
	infoProps.value.rowData.areaNameInfo = '';
	if (value && value.length > 0) {
		// 获取当前选中节点
		let checkNode = addressRef.value.getCheckedNodes();
		// 将当前选中节点数据和当前路径数组返回给父组件
		infoProps.value.rowData.areaCodeInfo = value.join(',');
		infoProps.value.rowData.areaNameInfo = checkNode[0] && checkNode[0].pathLabels.join(',');
		// emits('getData', checkNode[0].data, checkNode[0].pathLabels);
	} else {
		// emits('getData', {}, []);
	}
};

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
		getHospitalDetail(params);
	} else {
		infoProps.value.rowData.openStatus = 'OPEN';
	}
};
//
const getHospitalDetail = async (row: any) => {
	let para = {
		id: row.rowData.id
	};
	const resData: any = await getHospitalDetailApi(para);
	infoProps.value.rowData = resData.data;
	infoProps.value.rowData.addressValue = resData && resData.data.areaCodeInfo.split(',');
};

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
// 图片返回
const handleImageCoverVal = (res: any) => {
	if (res) {
		infoProps.value.rowData.logo = res;
	}
};

defineExpose({
	acceptParams
});
</script>
