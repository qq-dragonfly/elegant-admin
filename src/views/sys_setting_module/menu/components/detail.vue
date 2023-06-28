<template>
	<div class="p-2 mb-4 h-10">
		<div class="text-xl">{{ `${mode === 'add' ? '新增' : '编辑'}-${menuForm.meta && menuForm.meta.title}` }}</div>
		<el-divider border-style="dashed" class="mt-3"></el-divider>
	</div>
	<div class="overflow-auto flex-1 px-4 py-2">
		<div v-if="!isDetail">
			<el-empty description="请选择左侧菜单后操作" :image-size="100"></el-empty>
		</div>
		<template v-else>
			<div>
				<el-form
					class="grid grid-cols-2 gap-x-20 gap-y-2"
					:model="menuForm"
					:rules="menuRules"
					ref="menuDetailFormRef"
					label-width="100px"
					label-position="left"
				>
					<el-form-item label="显示名称:" prop="meta.title">
						<el-input maxlength="50" v-model="menuForm.meta.title" clearable placeholder="菜单显示名字"></el-input>
					</el-form-item>
					<el-form-item prop="name">
						<template #label>
							<div class="flex items-center">
								别名:
								<el-tooltip
									content="<div class='w-40'>系统唯一且与内置组件名一致，否则导致缓存失效。如类型为Iframe的菜单，别名将代替源地址显示在地址栏</span>"
									raw-content
								>
									<el-icon>
										<svg-icon name="ep:question-filled" />
									</el-icon>
								</el-tooltip>
							</div>
						</template>
						<el-input maxlength="50" v-model="menuForm.name" clearable placeholder="菜单别名"></el-input>
					</el-form-item>
					<el-form-item label="上级菜单:" prop="pid">
						<el-cascader
							class="w-full"
							v-model="menuForm.pid"
							:options="menuOptions"
							:props="menuProps"
							:show-all-levels="false"
							placeholder="顶级菜单"
							clearable
							disabled
						></el-cascader>
					</el-form-item>
					<el-form-item label="是否tag固定:" prop="meta.affix">
						<el-checkbox v-model="menuForm.meta.affix">tag固定</el-checkbox>
					</el-form-item>
					<el-form-item label="菜单图标:" prop="meta.icon">
						<!--						<icon-select v-model="menuForm.meta.icon"></icon-select>-->
						<IconSelect v-model="menuForm.meta.icon" />
					</el-form-item>
					<el-form-item label="是否缓存:" prop="meta.cache">
						<el-checkbox v-model="menuForm.meta.cache">是否缓存</el-checkbox>
					</el-form-item>
					<el-form-item label="路由地址:" prop="path">
						<el-input v-model="menuForm.path" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="重定向:" prop="redirect">
						<el-input v-model="menuForm.redirect" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item prop="activeMenu">
						<template #label>
							<div class="flex items-center">
								菜单高亮:
								<el-tooltip content="<div class='w-40'>子节点或详情页需要高亮的上级菜单路由地址</span>" raw-content>
									<el-icon>
										<svg-icon name="ep:question-filled" />
									</el-icon>
								</el-tooltip>
							</div>
						</template>
						<el-input v-model="menuForm.meta.activeMenu" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="排序:" prop="sort">
						<el-input-number
							v-model="menuForm.sort"
							controls-position="right"
							:max="10000"
							:min="1"
							style="width: 100%"
						></el-input-number>
					</el-form-item>
					<el-form-item prop="component" class="col-span-2">
						<template #label>
							<div class="flex items-center">
								视图:
								<el-tooltip content="<div class='w-40'>如父节点、链接或Iframe等没有视图的菜单不需要填写</span>" raw-content>
									<el-icon>
										<svg-icon name="ep:question-filled" />
									</el-icon>
								</el-tooltip>
							</div>
						</template>
						<el-input v-model="menuForm.component" clearable placeholder="">
							<template #prepend>views/</template>
						</el-input>
					</el-form-item>

					<el-form-item label="类型:" prop="meta.type" class="col-span-2">
						<el-radio-group v-model="menuForm.meta.type">
							<el-radio-button label="menu">菜单</el-radio-button>
							<el-radio-button label="iframe">Iframe</el-radio-button>
							<el-radio-button label="link">外链</el-radio-button>
							<el-radio-button label="button">按钮</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item prop="meta.sidebar" class="col-span-2">
						<template #label>
							<div class="flex items-center">
								是否显示:
								<el-tooltip content="<div class='w-40'>菜单不显示在导航中，但用户依然可以访问，例如详情页</span>" raw-content>
									<el-icon>
										<svg-icon name="ep:question-filled" />
									</el-icon>
								</el-tooltip>
							</div>
						</template>
						<el-checkbox v-model="menuForm.meta.sidebar">显示菜单</el-checkbox>
						<el-checkbox v-model="menuForm.meta.breadcrumb">显示面包屑</el-checkbox>
					</el-form-item>
					<el-form-item label="接口权限:" prop="apiPermissionsIdList" class="col-span-2">
						<pro-table-select
							v-model="menuForm.apiPermissionsIdList"
							:params="tableSelectParams"
							:request-api="getSysResourceListApi"
							:propsObj="tableSelectPropsObj"
							multiple
						>
							<template #header="{ form, submit }">
								<el-form :inline="true" :model="form">
									<el-form-item>
										<el-input v-model="form.label" clearable></el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="submit">查询</el-button>
									</el-form-item>
								</el-form>
							</template>
							<el-table-column prop="label" label="资源名称"></el-table-column>
							<el-table-column prop="method" label="API方法类型"></el-table-column>
						</pro-table-select>
					</el-form-item>
				</el-form>
			</div>
		</template>
	</div>
	<div class="menu-footer flex flex-col justify-center items-center h-14">
		<Auth :value="['add:menu:btn']">
			<el-button type="primary" @click="handleSave" :loading="isLoading">保 存</el-button>
		</Auth>
	</div>
</template>

<script lang="ts" setup name="MenuDetail">
import { ElMessage } from 'element-plus';
import { addSysMenuApi, editSysMenuApi } from '@/api/modules/menu';
import { getSysResourceListApi } from '@/api/modules/resource';
import { ref } from 'vue';
const emits = defineEmits(['success']);
const props = defineProps({
	menu: {
		type: Object,
		default: () => {}
	}
});
const mode = ref<any>('add');
const isLoading = ref<any>(false);
const isDetail = ref<any>(false);
const menuProps = ref<any>({
	value: 'id',
	label: 'title',
	checkStrictly: true
});
const menuRules = ref<any>({
	'meta.title': [{ required: true, message: '请输入显示名称', trigger: 'change' }],
	name: [{ required: true, message: '请输入别名', trigger: 'change' }],
	sort: [{ required: true, message: '请输入排序', trigger: 'change' }]
});
const menuOptions = ref<any>([]);
const menuForm = ref<any>({});
watch(
	() => props.menu,
	newVal => {
		menuOptions.value = treeToMap(newVal);
	},
	{ deep: true }
);
onMounted(() => {
	init();
});
const init = () => {
	menuForm.value = {
		id: '',
		pid: '',
		name: '',
		path: '',
		component: '',
		redirect: '',
		sort: 1,
		meta: {
			title: '',
			icon: '',
			activeMenu: '',
			type: '',
			sidebar: false,
			breadcrumb: false,
			affix: false
		},
		apiPermissionsIdList: []
	};
};
//简单化菜单
const treeToMap = (tree: Record<string, any>) => {
	const map: any = [];
	tree &&
		tree.forEach((item: any) => {
			let obj = {
				id: item.id,
				pid: item.pid,
				title: (item.meta && item.meta.title) || '',
				children: item.children && item.children.length > 0 ? treeToMap(item.children) : null
			};
			map.push(obj);
		});
	return map;
};
//保存
const menuDetailFormRef = ref();
const handleSave = async () => {
	menuDetailFormRef.value.validate(async (valid: any) => {
		if (valid) {
			isLoading.value = true;
			try {
				let formData = JSON.parse(JSON.stringify(menuForm.value));
				let authIds: any = [];
				formData.apiPermissionsIdList &&
					formData.apiPermissionsIdList.map((item: any) => {
						authIds.push(item.id);
					});
				formData.apiPermissionsIdList = authIds;
				formData.id = formData.id.indexOf('menuId-') === -1 ? formData.id : '';
				if (mode.value === 'add') {
					let res: any = await addSysMenuApi(formData);
					isLoading.value = false;
					if (res.code === 200) {
						emits('success', formData);
						ElMessage.success({
							message: '操作成功!',
							showClose: true,
							duration: 1000
						});
					}
				} else {
					let res: any = await editSysMenuApi(formData);
					isLoading.value = false;
					if (res.code === 200) {
						emits('success', formData);
						ElMessage.success({
							message: '操作成功!',
							showClose: true,
							duration: 1000
						});
					}
				}
			} catch (err) {
				console.log('err', err);
				isLoading.value = false;
			}
		} else {
			return false;
		}
	});
};
//表单注入数据
const acceptParams = async (data: any, pid: any, type = 'add') => {
	mode.value = type;
	isDetail.value = true;
	if (type === 'add') {
		Object.assign(menuForm.value, data);
		menuForm.value.pid = pid;
		return;
	}
	menuForm.value = {
		id: data.id,
		pid: data.pid,
		name: data.name,
		path: data.path,
		component: data.component,
		redirect: data.redirect,
		sort: data.sort || 1,
		meta: {
			title: (data.meta && data.meta.title) || '',
			icon: (data.meta && data.meta.icon) || '',
			activeMenu: (data.meta && data.meta.activeMenu) || '',
			type: (data.meta && data.meta.type) || '',
			sidebar: data.meta && data.meta.sidebar,
			breadcrumb: data.meta && data.meta.breadcrumb,
			cache: data.meta && data.meta.cache,
			affix: data.meta && data.meta.affix
		},
		apiPermissionsIdList: data.apiPermissions || []
	};
};
//值变化
const tableSelectParams = ref<any>({
	openStatus: 'OPEN'
});
const tableSelectPropsObj = ref({
	label: 'label',
	value: 'id'
});
defineExpose({
	acceptParams
});
</script>

<style scoped lang="scss">
h2 {
	padding: 0 0 30px;
	font-size: 17px;
	color: #3c4a54;
}
.el-form-item--default :deep(.el-form-item__content) {
	align-items: self-start;
}
.menu-footer {
	border-top: 1px solid #e6e6e6;
}
[data-theme='dark'] h2 {
	color: #ffffff;
}
[data-theme='dark'] .apilist {
	border-color: #434343;
}
</style>
