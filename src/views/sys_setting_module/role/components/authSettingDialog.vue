<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="500px" :title="`${drawerProps.title}`" @closed="handleClose">
		<div>
			<el-tabs tab-position="top">
				<el-tab-pane label="菜单权限">
					<div class="treeMain">
						<div class="tree-isCheckBox">
							<el-checkbox v-model="menuData.isChecked" :indeterminate="menuData.isIndeterminate" @change="checkedAll">
								全选/反选
							</el-checkbox>
						</div>
						<el-divider border-style="dashed" />
						<el-tree
							ref="menuRef"
							@check="handleCheck"
							node-key="id"
							:data="menuData.menuTreeList"
							:props="menuData.props"
							default-expand-all
							:check-strictly="true"
							:default-checked-keys="menuData.menuChecked"
							highlight-current
							:expand-on-click-node="false"
							show-checkbox
						></el-tree>
					</div>
				</el-tab-pane>
				<el-tab-pane label="数据权限">
					<el-form label-width="100px" label-position="left">
						<el-form-item label="规则类型">
							<el-select v-model="permissionData.roleDateType" placeholder="请选择">
								<el-option label="仅自己可见" value="USERSELF"></el-option>
								<el-option label="所在部门可见" value="SELF_DEPT"></el-option>
								<el-option label="全部可见" value="ALL_DEPT"></el-option>
								<el-option label="选择的部门可见" value="SELECT_DEPT"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="选择部门" v-show="permissionData.roleDateType == 'SELECT_DEPT'">
							<div class="treeMain" style="width: 100%">
								<el-tree
									ref="deptTreeRef"
									node-key="id"
									:data="permissionData.departmentList"
									:props="permissionData.props"
									:default-checked-keys="permissionData.depChecked"
									show-checkbox
								></el-tree>
							</div>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</div>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="AuthSettingDrawer">
import { getSysMenuAllListApi } from '@/api/modules/menu';
import { saveSysRoleAuthApi, getSysRoleAuthApi } from '@/api/modules/role';
import { getDepartmentListApi } from '@/api/modules/org';
import { convertTree } from '@/utils';
import { ElMessage } from 'element-plus';
import { anyObj } from '#/global';
import type Node from 'element-plus/es/components/tree/src/model/node';
interface DrawerProps {
	title: string;
	rowData?: any;
	getTableList?: () => Promise<any>;
}

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	title: '角色权限设置'
});
const menuData = reactive<any>({
	menuList: [],
	menuTreeList: [],
	menuChecked: [],
	isChecked: false,
	isIndeterminate: false,
	props: {
		label: (data: any) => {
			return data.meta.title;
		},
		class: treeNodeClass
	}
});
const permissionData = ref<any>({
	roleDateType: 'SELF_DEPT',
	departmentList: [],
	depChecked: [],
	props: {
		label: (data: any) => {
			return data.name;
		}
	}
});
const getSysMenuList = async () => {
	const resData = await getSysMenuAllListApi({});
	menuData.menuList = resData.data;
	menuData.menuTreeList = convertTree(resData.data);
};
const getSysRoleAuth = async (id: string) => {
	const resData = await getSysRoleAuthApi({ id });
	menuData.menuChecked = resData.data.menuIdList || [];
	await nextTick(() => {
		let menuCheck = menuData.menuChecked || [];
		menuData.isChecked = menuCheck.length >= menuData.menuList.length;
		menuData.isIndeterminate = menuCheck.length > 0 && menuCheck.length < menuData.menuList.length;
		permissionData.value.roleDateType = resData.data.roleData.dataType;
		permissionData.value.depChecked = resData.data.roleData.departmentIdList;
	});
};
const getDepartmentList = () => {
	getDepartmentListApi({}).then((res: any) => {
		permissionData.value.departmentList = res.data.records;
	});
};
// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps): Promise<void> => {
	drawerProps.value = Object.assign(drawerProps.value, params);
	drawerVisible.value = true;
	await getSysMenuList();
	await getDepartmentList();
	if (params.rowData.id) {
		await getSysRoleAuth(params.rowData.id);
	}
};

const menuRef = ref();
// 取消子级父节点不变
const handleCheck = (data: any, { checkedKeys }: any) => {
	if (checkedKeys.includes(data.id)) {
		// 选中
		let node = menuRef.value.getNode(data.id); // getNode(node-key)
		selectChildren(data, true); // 选中子节点
		parentNodesChange(node); // 选中父节点
	} else {
		selectChildren(data, false); // 取消子节点
	}
	checkIsIndeterminate();
};
// 全选取消check显示
const checkIsIndeterminate = () => {
	nextTick(() => {
		let CheckedNodes = menuRef.value.getCheckedNodes();
		let menuIds = CheckedNodes.map((item: any) => item.id);
		menuData.isChecked = menuIds.length === menuData.menuList.length;
		menuData.isIndeterminate = menuIds.length > 0 && menuIds.length < menuData.menuList.length;
	});
};
function selectChildren(data: any, checked: any) {
	data &&
		data.children &&
		data.children.map((item: any) => {
			menuRef.value.setChecked(item.id, checked);
			if (data.children) {
				selectChildren(item, checked);
			}
		});
}
// 父级递归
function parentNodesChange(node: any) {
	// console.log(node);
	if (node.parent) {
		for (let key in node) {
			if (key == 'id') {
				// console.log(node[key]);
				menuRef.value.setChecked(node, true);
			}
		}
		if (node.parent && node.id !== 0) {
			parentNodesChange(node.parent);
		}
	}
}
const checkedAll = () => {
	if (menuData.isChecked) {
		//全选
		menuRef.value.setCheckedNodes(menuData.menuList);
	} else {
		//取消选中
		menuRef.value.setCheckedKeys([]);
	}
	checkIsIndeterminate();
};
function handleClose() {
	menuData.menuTreeList = [];
	menuData.menuChecked = [];
	menuData.menuList = [];
	menuData.isIndeterminate = false;
	menuData.isChecked = false;
}
// 提交数据
const deptTreeRef = ref();
const handleSubmit = async () => {
	// 注意点：传递参数（获取了父子节点）
	let menuIdList = menuRef.value.getCheckedNodes(false, true).map((item: any) => item.id);
	let departmentIdList = deptTreeRef.value.getCheckedNodes(false, true).map((item: any) => item.id);
	if (permissionData.value.roleDateType === 'SELECT_DEPT' && departmentIdList.length <= 0) {
		ElMessage.warning('请至少选择一个科室!');
		return;
	}
	let reqData: any = {
		roleId: drawerProps.value.rowData.id,
		menuIdList,
		roleData: {
			roleDateType: permissionData.value.roleDateType,
			departmentIdList: departmentIdList
		}
	};
	let res: any = await saveSysRoleAuthApi(reqData);
	if (res.code === 200) {
		ElMessage.success({
			message: '操作成功!',
			showClose: true,
			duration: 1000
		});
		drawerProps.value.getTableList!();
	}
	drawerVisible.value = false;
};
function treeNodeClass(data: anyObj, node: Node) {
	if (node.isLeaf) {
		return '';
	}
	let addClass = true;
	for (const key in node.childNodes) {
		if (!node.childNodes[key].isLeaf) {
			addClass = false;
		}
	}
	return addClass ? 'penultimate-node' : '';
}
defineExpose({
	acceptParams
});
</script>
<style lang="scss" scoped>
:deep(.penultimate-node) {
	.el-tree-node__children {
		padding-left: 60px;
		line-height: 12px;
		white-space: pre-wrap;
		.el-tree-node {
			display: inline-block;
		}
		.el-tree-node__content {
			padding-right: 10px;
			padding-left: 10px !important;
			.el-tree-node__expand-icon {
				display: none;
			}
		}
	}
}
</style>
