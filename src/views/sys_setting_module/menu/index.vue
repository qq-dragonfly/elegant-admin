<template>
	<div class="menu-box m-2 p-1 rounded">
		<el-container class="h-full">
			<el-aside width="240px" v-loading="menuLoading" class="menu-l h-full pt-2 rounded mr-1">
				<el-container class="h-full">
					<el-header class="h-12">
						<el-input placeholder="输入关键字进行过滤" v-model="menuFilterText" clearable></el-input>
						<el-divider border-style="dashed" class="mt-2"></el-divider>
					</el-header>
					<el-main class="p-0 h-full">
						<el-tree
							ref="menuRef"
							class="menu"
							:default-expand-all="true"
							node-key="id"
							:data="menuList"
							:props="menuProps"
							draggable
							highlight-current
							:expand-on-click-node="false"
							check-strictly
							show-checkbox
							:filter-node-method="menuFilterNode"
							@node-click="menuClick"
						>
							<template #default="{ node, data }">
								<span class="custom-tree-node el-tree-node__label">
									<span class="label">
										{{ node.label }}
									</span>
									<span class="do">
										<el-button link :icon="Plus" @click.prevent="addMenu(node, data)"></el-button>
									</span>
								</span>
							</template>
						</el-tree>
					</el-main>
					<el-footer class="flex justify-center items-center h-14">
						<el-button type="primary" :icon="Refresh" @click="handleRefreshMenu()"></el-button>
						<el-button type="primary" :icon="Plus" @click="addMenu()"></el-button>
						<Auth :value="['del:menu:btn']" class="ml-3">
							<el-button type="danger" :icon="Delete" @click="delMenu"></el-button>
						</Auth>
					</el-footer>
				</el-container>
			</el-aside>
			<el-container class="menu-r">
				<el-main class="flex flex-col p-0" ref="mainRef">
					<MenuDetail ref="menuDetailRef" :menu="menuList" @success="getMenu"></MenuDetail>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup name="SysSettingMenu">
import { getSysMenuAllListApi, delSysMenuMultipleApi } from '@/api/modules/menu';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Plus, Refresh } from '@element-plus/icons-vue';
import { convertTree } from '@/utils';
const MenuDetail = defineAsyncComponent(() => import('./components/detail.vue'));
const menuFilterText = ref('');
const newMenuIndex = ref(1);
const menuList = ref<any>([]);
const menuProps = ref<any>({
	label: (data: any) => {
		return (data.meta && data.meta.title) || '';
	}
});
const menuLoading = ref(false);
const menuRef = ref();
const menuDetailRef = ref();
watch(
	() => menuFilterText.value,
	(newVal: any) => {
		menuRef.value.filter(newVal);
	}
);
onMounted(() => {
	getMenu();
});
//加载树数据
const getMenu = async () => {
	menuLoading.value = true;
	let res = await getSysMenuAllListApi({});
	menuLoading.value = false;
	menuList.value = convertTree(res.data);
};
const handleRefreshMenu = () => {
	getMenu();
};
//树点击
const mainRef = ref();
const menuClick = (data: any, node: any) => {
	let pid = node.level === 1 ? undefined : node.parent.data.id;
	menuDetailRef.value.acceptParams(data, pid, data.mode || 'edit');
	mainRef.value.$el.scrollTop = 0;
};
//树过滤
const menuFilterNode = (value: any, data: any) => {
	if (!value) {
		return true;
	}
	let targetText = (data.meta && data.meta.title) || '';
	return targetText.indexOf(value) !== -1;
};
//增加

const addMenu = async (node?: any, data?: any) => {
	newMenuIndex.value++;
	let newMenuData: any = {
		pid: data ? data.id : '',
		name: '',
		path: '',
		component: '',
		redirect: '',
		sort: 1,
		meta: {
			title: '未命名' + newMenuIndex.value,
			type: 'menu',
			icon: '',
			activeMenu: '',
			sidebar: true,
			breadcrumb: true,
			cache: false,
			affix: false
		},
		apiPermissionsIdList: [],
		mode: 'add'
	};
	menuLoading.value = true;
	let menuId = 'menuId-' + newMenuIndex.value;
	menuLoading.value = false;
	newMenuData.id = menuId;

	menuRef.value.append(newMenuData, node);
	menuRef.value.setCurrentKey(newMenuData.id);
	let pid = node ? node.data.id : '0';
	menuDetailRef.value.acceptParams(newMenuData, pid, 'add');
};
//删除菜单
const delMenu = async () => {
	let CheckedNodes = menuRef.value.getCheckedNodes();
	if (CheckedNodes.length === 0) {
		ElMessage.warning('请选择需要删除的项');
		return false;
	}
	let confirm = await ElMessageBox.confirm('确认删除已选择的菜单吗？', '提示', {
		type: 'warning',
		confirmButtonText: '删除',
		confirmButtonClass: 'el-button--danger'
	}).catch(() => {});
	if (confirm !== 'confirm') {
		return false;
	}
	menuLoading.value = true;
	const menuIds: any = CheckedNodes.map((item: any) => (item.id.indexOf('menuId-') === -1 ? item.id : null));
	let reqData = {
		idList: menuIds.filter((v: any) => v)
	};
	if (reqData.idList.length > 0) {
		delSysMenuMultipleApi(reqData.idList)
			.then(() => {
				menuLoading.value = false;
				getMenu();
			})
			.catch(() => {
				menuLoading.value = false;
				return;
			});
	} else {
		menuLoading.value = false;
		CheckedNodes.forEach((item: any) => {
			menuRef.value.remove(item);
		});
	}
	ElMessage.success('操作成功');
};
</script>

<style scoped lang="scss">
.menu-box {
	height: calc(100vh - 268px);
	background: var(--g-table-header-bj-color);
	.el-tree.menu :deep(.el-tree-node__content) {
		height: 34px;
	}
	.menu-l {
		border: 1px solid #e6e6e6;
	}
	.menu-r {
		border: 1px solid #e6e6e6;
	}
	.el-footer {
		border-top: 1px solid #e6e6e6;
	}
}
.custom-tree-node {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	padding-right: 24px;
	font-size: 14px;
}
.custom-tree-node .label {
	display: flex;
	align-items: center;
	height: 100%;
}
.custom-tree-node .label .el-tag {
	margin-left: 5px;
}
.custom-tree-node .do {
	display: none;
}
.custom-tree-node .do i {
	padding: 5px;
	margin-left: 5px;
	color: #999999;
}
.custom-tree-node .do i:hover {
	color: #333333;
}
.custom-tree-node:hover .do {
	display: inline-block;
}
</style>
