import type { RouteRecordRaw } from 'vue-router';
import type { Route } from '#/global';
import SysSettingModule from './modules/sys_setting_module';
import OrgModule from './modules/org_module';
import useSettingsStore from '@/store/modules/settings';

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/:all(.*)*',
		name: 'notFound',
		component: () => import('@/views/[...all].vue'),
		meta: {
			title: '找不到页面'
		}
	}
];

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/pages_layouts/index.vue'),
		meta: {
			title: '拓展路由',
			breadcrumb: false
		},
		children: [
			{
				path: 'test_pages_layout',
				name: 'TestPagesLayout',
				component: () => import('@/views/test_pages_layout/index.vue'),
				meta: {
					title: '拓展路由',
					icon: 'local-home',
					breadcrumb: false
				}
			}
		]
	},
	{
		path: '/',
		component: () => import('@/layouts/index.vue'),
		meta: {
			title: () => useSettingsStore().home.title,
			breadcrumb: false
		},
		children: [
			{
				path: 'dashboard',
				name: 'dashboard',
				component: () => import('@/views/welcome/index.vue'),
				meta: {
					title: () => useSettingsStore().home.title,
					icon: 'local-home',
					breadcrumb: false
				}
			},
			{
				path: 'reload',
				name: 'reload',
				component: () => import('@/views/reload.vue'),
				meta: {
					title: '重新加载',
					breadcrumb: false
				}
			},
			{
				path: 'setting',
				name: 'personalSetting',
				component: () => import('@/views/personal/setting.vue'),
				meta: {
					title: '个人设置',
					cache: 'personalEditPassword'
				}
			},
			{
				path: 'edit/password',
				name: 'personalEditPassword',
				component: () => import('@/views/personal/edit.password.vue'),
				meta: {
					title: '修改密码'
				}
			}
		]
	}
];
// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
	{
		name: 'Setting',
		meta: {
			title: '设置',
			icon: 'local-sidebar_setting'
		},
		children: [SysSettingModule]
	},
	{
		name: 'Org',
		meta: {
			title: '机构',
			icon: 'local-sidebar_institutional'
		},
		children: [OrgModule]
	}
];

export { constantRoutes, systemRoutes, asyncRoutes };
