import type { Route } from '#/global';
const Layout = () => import('@/layouts/index.vue');

const routes: Route.recordRaw = {
	path: '/system_setting',
	component: Layout,
	redirect: '/system_setting/user',
	name: 'systemSetting',
	meta: {
		title: '系统设置',
		icon: 'ele_sidebar_setting'
	},
	children: [
		{
			path: 'user',
			name: 'sysSettingUser',
			component: () => import('@/views/sys_setting_module/user/index.vue'),
			meta: {
				title: '账号管理',
				icon: 'ele_sidebar_sys_user',
				cache: true
			}
		},
		{
			path: 'role',
			name: 'sysSettingRole',
			component: () => import('@/views/sys_setting_module/role/index.vue'),
			meta: {
				title: '角色管理',
				icon: 'ele_sidebar_sys_role'
			}
		},
		{
			path: 'menu',
			name: 'sysSettingMenu',
			component: () => import('@/views/sys_setting_module/menu/index.vue'),
			meta: {
				title: '菜单管理',
				icon: 'ele_sidebar_sys_menu'
			}
		},
		{
			path: 'resource',
			name: 'sysSettingResource',
			component: () => import('@/views/sys_setting_module/resource/index.vue'),
			meta: {
				title: '资源管理',
				icon: 'ele_sidebar_sys_resource'
			}
		}
	]
};

export default routes;
