<template>
	<div class="table-box">
		<ProTable
			ref="proTableRef"
			title="医护列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
			:resetCallBack="resetCallBack"
		>
			<template #hospitalAreaItem>
				<pro-table-select
					v-model="hospitalAreaItem"
					:params="orgParams"
					:request-api="getHospitalListApi"
					collapseTags
					collapseTagsTooltip
					:propsObj="propsObj"
					@change-emit="handleChangeHospitalVal"
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
			</template>
			<template #departmentItem>
				<pro-table-select
					v-model="departmentItem"
					:params="depParams"
					:request-api="getDepartmentListApi"
					collapseTags
					collapseTagsTooltip
					:propsObj="propsObj"
					@change-emit="handleChangeDepVal"
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
			</template>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<Auth :value="['del:doc:btn']">
					<el-button type="primary" :icon="CirclePlus" @click="openDialog('add')">新增医护</el-button>
				</Auth>
			</template>
			<!-- Expand -->
			<template #expand="scope">
				{{ scope.row }}
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<Auth :value="['show:doc:btn']">
					<el-button type="primary" link :icon="View" @click="openDialog('show', scope.row)">查看</el-button>
				</Auth>
				<Auth :value="['edit:doc:btn']">
					<el-button type="primary" link :icon="EditPen" @click="openDialog('edit', scope.row)">编辑</el-button>
				</Auth>
				<Auth :value="['del:doc:btn']">
					<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
				</Auth>
			</template>
		</ProTable>
		<DetailDialog ref="detailDialogRef" />
	</div>
</template>

<script setup lang="tsx" name="OrgDoctor">
import { ColumnProps } from '@/components/ProTable/interface';
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue';
import publicDict from '@/views/org_module/dict';
import { getDocListApi, addDocApi, editDocApi, delDocApi, getHospitalListApi, getDepartmentListApi } from '@/api/modules/org';
import { ref } from 'vue';
import { getDictTypeApi } from '@/api/modules/common';
// 组件引入
const DetailDialog = defineAsyncComponent(() => import('./components/detailDialog.vue'));
const ProTable = defineAsyncComponent(() => import('@/components/ProTable/index.vue'));

// 获取 proTableRef 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTableRef = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive<any>({});
// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
	return {
		datalist: (data && data.records) || [],
		total: (data && data.total) || 0
	};
};
// resetCallBack 是对于自定义查询做一些操作（重置回调）
const resetCallBack = () => {
	initParam.hospitalAreaId = '';
	initParam.departmentId = '';
	hospitalAreaItem.value = {};
	departmentItem.value = {};
	depParams.value.hospitalAreaId = '';
};
// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getSysUserListApi"
const getTableList = (params: any) => {
	let newParams = { ...params };
	// console.log('newParams', newParams);
	return getDocListApi(newParams);
};

// 表格配置项
const columns: ColumnProps[] = [
	{ type: 'index', label: '#', width: 60 },
	{ prop: 'name', label: '医护名称', minWidth: 120, search: { el: 'input' } },
	{
		prop: 'userTypeName',
		label: '医护职称',
		// 直接放字典数据
		// enum: genderType,
		// 字典请求不带参数
		// enum: getDictCodeApi,
		// 字典请求携带参数
		enum: () => getDictTypeApi({ type: 'DOCTOR_TITLE' }),
		minWidth: 140,
		search: {
			el: 'cascader',
			key: 'titleId',
			props: { filterable: true, checkStrictly: true, emitPath: false }
		}, //filterable 开启模糊搜索
		fieldNames: { label: 'name', value: 'id', children: 'next' },
		render: (scope: { row: any }) => {
			return scope.row.standardDept;
		}
	},
	{
		prop: 'openStatus',
		label: '状态',
		enum: publicDict.sysStatus,
		fieldNames: { label: 'label', value: 'value' },
		width: 100,
		search: { el: 'tree-select', props: { filterable: true } }, //filterable 开启模糊搜索
		render: (scope: { row: any }) => {
			return (
				<el-tag type={scope.row.openStatus === 'OPEN' ? 'success' : 'danger'}>
					{scope.row.openStatus === 'OPEN' ? '启用' : '禁用'}
				</el-tag>
			);
		}
	},
	{ prop: 'sort', label: '排序值', minWidth: 100 },
	{
		prop: 'hospitalAreaName',
		label: '所属院区',
		minWidth: 120,
		isShow: true,
		search: { el: 'slot', searchSlotBool: true, key: 'hospitalAreaItem', props: { filterable: true } } //filterable 开启模糊搜索
	},
	{
		prop: 'departmentName',
		label: '所属科室',
		minWidth: 120,
		isShow: true,
		search: { el: 'slot', searchSlotBool: true, key: 'departmentItem', props: { filterable: true } } //filterable 开启模糊搜索
	},
	{ prop: 'operation', label: '操作', fixed: 'right', width: 250 }
];

// 删除
const deleteAccount = async (params: any) => {
	await useHandleData(delDocApi, { id: params.id }, `删除【${params.name}】`);
	proTableRef.value.getTableList();
};
const orgParams = ref<any>({
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
function handleChangeHospitalVal(val: any) {
	initParam.hospitalAreaId = val.id;
	depParams.value.hospitalAreaId = val.id;
	departmentItem.value = {};
	initParam.departmentId = '';
}
function handleChangeDepVal(val: any) {
	initParam.departmentId = val.id;
}
const hospitalAreaItem = ref<any>({});
const departmentItem = ref<any>({});
// 打开 dialog(新增、查看、编辑)
const detailDialogRef = ref();
const openDialog = (type: string, rowData: Partial<any> = {}) => {
	let params = {
		title: type,
		rowData: { ...rowData },
		isView: type === 'show',
		api: type === 'add' ? addDocApi : type === 'edit' ? editDocApi : addDocApi,
		getTableList: proTableRef.value.getTableList
	};
	detailDialogRef.value.acceptParams(params);
};
</script>
