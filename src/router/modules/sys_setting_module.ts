import type { Route } from '#/global';
const Layout = () => import('@/layouts/index.vue');

const routes: Route.recordRaw = {
	path: '/system_setting',
	component: Layout,
	redirect: '/system_setting/user',
	name: 'systemSetting',
	meta: {
		title: '系统设置',
		icon: 'local-sidebar_setting'
	},
	children: [
		{
			path: 'user',
			name: 'SysSettingUser',
			component: () => import('@/views/sys_setting_module/user/index.vue'),
			meta: {
				title: '账号管理',
				icon: 'local-sidebar_sys_user',
				cache: false
			}
		},
		{
			path: 'role',
			name: 'SysSettingRole',
			component: () => import('@/views/sys_setting_module/role/index.vue'),
			meta: {
				title: '角色管理',
				icon: 'local-sidebar_sys_role'
			}
		},
		{
			path: 'menu',
			name: 'SysSettingMenu',
			component: () => import('@/views/sys_setting_module/menu/index.vue'),
			meta: {
				title: '菜单管理',
				icon: 'local-sidebar_sys_menu'
			}
		},
		{
			path: 'resource',
			name: 'SysSettingResource',
			component: () => import('@/views/sys_setting_module/resource/index.vue'),
			meta: {
				title: '资源管理',
				icon: 'local-sidebar_sys_resource'
			}
		}
	]
};

export default routes;
