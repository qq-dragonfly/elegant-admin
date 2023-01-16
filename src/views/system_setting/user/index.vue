<route lang="yaml">
meta:
enabled: false
</route>
<template>
	<div class="table-box px-2">
		<ProTable
			ref="proTable"
			title="用户列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus" @click="openDialog('add')">新增用户</el-button>
				<el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
				<el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
				<el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">
					批量删除用户
				</el-button>
			</template>
			<!-- Expand -->
			<template #expand="scope">
				{{ scope.row }}
			</template>
			<!-- usernameHeader -->
			<template #nameHeader="scope">
				<el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
					{{ scope.row.label }}
				</el-button>
			</template>
			<!-- createTime -->
			<template #createTime="scope">
				<el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
					{{ scope.row.createTime }}
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDialog('show', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDialog('edit', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<DetailDialog ref="detailDialogRef" />
		<ImportExcel ref="importExcelDialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ElMessage } from 'element-plus';
import { User } from '@/api/interface/sys_user';
import { ColumnProps } from '@/components/ProTable/interface';
import { useHandleData } from '@/hooks/useHandleData';
import { useDownload } from '@/hooks/useDownload';
import ProTable from '@/components/ProTable/index.vue';
import DetailDialog from './components/detailDialog.vue';
import ImportExcel from '@/components/ImportExcel/index.vue';
// import UserDrawer from '@/views/proTable/components/UserDrawer.vue';
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from '@element-plus/icons-vue';
import publicDict from '@/views/system_setting/dict';
import {
	getSysUserListApi,
	delSysUserApi,
	editUser,
	addUser,
	exportUserInfoApi,
	BatchAddUser,
	resetUserPassWordApi
} from '@/api/modules/user';

const router = useRouter();

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	sysDeptId: '0'
});

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
	if (newParams.timeArr) {
		newParams.startTime = newParams.timeArr[0];
		newParams.endTime = newParams.timeArr[1];
		delete newParams.timeArr;
	}
	console.log('newParams', newParams);
	return getSysUserListApi(newParams);
};

// 自定义渲染表头（使用tsx语法）
const headerRender = (row: ColumnProps) => {
	return (
		<el-button
			type='primary'
			onClick={() => {
				ElMessage.success('我是通过 tsx 语法渲染的表头');
			}}
		>
			{row.label}
		</el-button>
	);
};

// 表格配置项
const columns: ColumnProps[] = [
	{ type: 'selection', fixed: 'left', width: 80 },
	// { type: 'index', label: '#', width: 80 },
	// { type: 'expand', label: 'Expand', width: 100 },
	{
		prop: 'name',
		label: '姓名',
		minWidth: 120,
		search: { el: 'input' },
		render: scope => {
			return (
				<el-button type='primary' link onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}>
					{scope.row.name}
				</el-button>
			);
		}
	},
	// {
	// 	prop: 'gender',
	// 	label: '性别',
	// 	enum: getUserGender,
	// 	search: { el: 'select' },
	// 	fieldNames: { label: 'genderLabel', value: 'genderValue' }
	// },
	// 多级 prop
	// { prop: 'user.detail.age', label: '年龄', search: { el: 'input' } },
	{ prop: 'phone', label: '登录账号', width: 120 },
	{ prop: 'roleAlisa', label: '角色', width: 120 },
	{
		prop: 'openStatus',
		label: '用户状态',
		enum: publicDict.sysStatus,
		fieldNames: { label: 'label', value: 'value' },
		width: 100,
		search: { el: 'tree-select', props: { filterable: true } }, //filterable 开启模糊搜索
		render: (scope: { row: User.ResUserList }) => {
			return (
				<el-tag type={scope.row.openStatus === 'OPEN' ? 'success' : 'danger'}>
					{scope.row.openStatus === 'OPEN' ? '启用' : '禁用'}
				</el-tag>
			);
		}
	},
	{
		prop: 'createTime',
		label: '创建时间',
		headerRender,
		width: 200,
		search: {
			el: 'date-picker',
			span: 2,
			key: 'timeArr',
			props: { type: 'datetimerange' },
			defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00']
		}
	},
	{ prop: 'operation', label: '操作', fixed: 'right', width: 330 }
];

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	await useHandleData(delSysUserApi, { ids: [params.id] }, `删除【${params.name}】用户`);
	proTable.value.getTableList();
};

// 批量删除用户信息
const batchDelete = async (ids: string[]) => {
	await useHandleData(delSysUserApi, { ids }, '删除所选用户信息');
	proTable.value.clearSelection();
	proTable.value.getTableList();
};

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetUserPassWordApi, { id: params.id }, `重置【${params.name}】用户密码`);
	proTable.value.getTableList();
};
// 导出用户列表
const downloadFile = async () => {
	console.log('proTable.value.searchParam', proTable.value.searchParam);
	await useDownload(getTableList, '用户列表', proTable.value.searchParam);
};

// 批量添加用户
const importExcelDialogRef = ref();
const batchAdd = () => {
	let params = {
		title: '用户',
		tempApi: exportUserInfoApi,
		importApi: BatchAddUser,
		getTableList: proTable.value.getTableList
	};
	importExcelDialogRef.value.acceptParams(params);
};

// 打开 dialog(新增、查看、编辑)
const detailDialogRef = ref();
const openDialog = (type: string, rowData: Partial<User.ResUserList> = {}) => {
	let params = {
		title: type,
		rowData: { ...rowData },
		isView: type === 'show',
		api: type === 'add' ? addUser : type === 'edit' ? editUser : '',
		getTableList: proTable.value.getTableList
	};
	detailDialogRef.value.acceptParams(params);
};
</script>
