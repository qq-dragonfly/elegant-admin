<template>
	<div class="table-box">
		<ProTable
			ref="proTableRef"
			title="院区列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<Auth :value="['add:org:btn']">
					<el-button type="primary" :icon="CirclePlus" @click="openDialog('add')">新增院区</el-button>
				</Auth>
			</template>
			<!-- Expand -->
			<template #expand="scope">
				{{ scope.row }}
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<Auth :value="['show:org:btn']">
					<el-button type="primary" link :icon="View" @click="openDialog('show', scope.row)">查看</el-button>
				</Auth>
				<Auth :value="['edit:org:btn']">
					<el-button type="primary" link :icon="EditPen" @click="openDialog('edit', scope.row)">编辑</el-button>
				</Auth>
				<Auth :value="['del:org:btn']">
					<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
				</Auth>
			</template>
		</ProTable>
		<DetailDialog ref="detailDialogRef" />
	</div>
</template>

<script setup lang="tsx" name="OrgHospital">
import { ColumnProps } from '@/components/ProTable/interface';
import { CirclePlus, EditPen, View, Delete } from '@element-plus/icons-vue';
import publicDict from '@/views/org_module/dict';
import { getHospitalListApi, addHospitalApi, editHospitalApi, delHospitalApi } from '@/api/modules/org';
// 组件引入
const DetailDialog = defineAsyncComponent(() => import('./components/detailDialog.vue'));
const ProTable = defineAsyncComponent(() => import('@/components/ProTable/index.vue'));

// 获取 proTableRef 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTableRef = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
	return {
		datalist: (data && data.records) || [],
		total: (data && data.total) || 0
	};
};
// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getSysUserListApi"
const getTableList = (params: any) => {
	let newParams = { ...params };
	// console.log('newParams', newParams);
	return getHospitalListApi(newParams);
};

// 表格配置项
const columns: ColumnProps[] = [
	{ type: 'index', label: '#', width: 60 },
	{ prop: 'name', label: '院区名称', minWidth: 120, search: { el: 'input' } },
	{
		prop: 'openStatus',
		label: '院区状态',
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
	{ prop: 'operation', label: '操作', fixed: 'right', width: 250 }
];

// 删除
const deleteAccount = async (params: any) => {
	await useHandleData(delHospitalApi, { id: params.id }, `删除【${params.name}】`);
	proTableRef.value.getTableList();
};
// 打开 dialog(新增、查看、编辑)
const detailDialogRef = ref();
const openDialog = (type: string, rowData: Partial<any> = {}) => {
	let params = {
		title: type,
		rowData: { ...rowData },
		isView: type === 'show',
		api: type === 'add' ? addHospitalApi : type === 'edit' ? editHospitalApi : addHospitalApi,
		getTableList: proTableRef.value.getTableList
	};
	detailDialogRef.value.acceptParams(params);
};
</script>
