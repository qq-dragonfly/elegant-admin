<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="用户列表"
			:columns="columns"
			:toolButtonPrint="true"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openDialog('add')">新增分类</el-button>
			</template>
			<!-- Expand -->
			<template #expand="scope">
				{{ scope.row }}
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDialog('show', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDialog('edit', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<DetailDialog ref="detailDialogRef" />
	</div>
</template>

<script setup lang="tsx" name="missionsCate">
import { ColumnProps } from '@/components/ProTable/interface';
import { useHandleData } from '@/hooks/useHandleData';
import ProTable from '@/components/ProTable/index.vue';
import DetailDialog from './components/detailDialog.vue';
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue';
import publicDict from '@/views/missions_module/dict';
import { getMissionsCateApi, addCateApi, editCateApi, delMissionsCateApi } from '@/api/modules/missions';
const router = useRouter();

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
	return {
		datalist: data.records,
		total: data.total
	};
};
// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getSysUserListApi"
const getTableList = (params: any) => {
	let newParams = { ...params };
	// console.log('newParams', newParams);
	return getMissionsCateApi(newParams);
};
// 表格配置项
const columns: ColumnProps[] = [
	{ prop: 'categoryName', label: '板块名称', minWidth: 120, search: { el: 'input', key: 'name' } },

	{
		prop: 'status',
		label: '分类状态',
		enum: publicDict.sysStatus,
		fieldNames: { label: 'label', value: 'value' },
		width: 100,
		search: { el: 'tree-select', props: { filterable: true } }, //filterable 开启模糊搜索
		render: (scope: { row: any }) => {
			return <el-tag type={scope.row.status ? 'success' : 'danger'}>{scope.row.status ? '启用' : '禁用'}</el-tag>;
		}
	},
	{
		prop: 'contentType',
		label: '分类类型',
		enum: publicDict.contentTypes,
		fieldNames: { label: 'label', value: 'value' },
		width: 100,
		search: { el: 'tree-select', props: { filterable: true } } //filterable 开启模糊搜索
	},
	{ prop: 'sort', label: '排序值', minWidth: 100 },
	{ prop: 'operation', label: '操作', fixed: 'right', width: 330 }
];

// 删除
const deleteAccount = async (params: any) => {
	await useHandleData(delMissionsCateApi, { id: params.id }, `删除【${params.categoryName}】分类`);
	proTable.value.getTableList();
};

// 打开 dialog(新增、查看、编辑)
const detailDialogRef = ref();
const openDialog = (type: string, rowData: Partial<any> = {}) => {
	let params = {
		title: type,
		rowData: { ...rowData },
		isView: type === 'show',
		api: type === 'add' ? addCateApi : type === 'edit' ? editCateApi : addCateApi,
		getTableList: proTable.value.getTableList
	};
	detailDialogRef.value.acceptParams(params);
};
</script>
