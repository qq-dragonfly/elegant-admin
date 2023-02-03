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
			name: 'systemSettingUser',
			component: () => import('@/views/system_setting/user/index.vue'),
			meta: {
				title: '账号管理',
				icon: 'ele_sidebar_sysuser',
				cache: true
			}
		},
		{
			path: 'role',
			name: 'systemSettingRole',
			component: () => import('@/views/system_setting/role/index.vue'),
			meta: {
				title: '角色管理',
				icon: 'ele_sidebar_role'
			}
		},
		{
			path: 'menu',
			name: 'systemSettingMenu',
			component: () => import('@/views/system_setting/menu/index.vue'),
			meta: {
				title: '菜单管理',
				icon: 'ele_sidebar_menu'
			}
		},
		{
			path: 'resource',
			name: 'systemSettingResource',
			component: () => import('@/views/system_setting/resource/index.vue'),
			meta: {
				title: '资源管理',
				icon: 'ele_sidebar_resource'
			}
		}
	]
};

export default routes;
