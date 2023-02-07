import type { Route } from '#/global';

const Layout = () => import('@/layouts/index.vue');

const routes: Route.recordRaw = {
	path: '/directive',
	component: Layout,
	redirect: '/directive/copy',
	name: 'directive',
	meta: {
		title: '自定义指令',
		icon: 'ele_sidebar_setting'
	},
	children: [
		{
			path: 'copy',
			name: 'directiveCopy',
			component: () => import('@/views/directives/copyDirect/index.vue'),
			meta: {
				title: '复制指令'
			}
		},
		{
			path: 'debounce',
			name: 'directiveDebounce',
			component: () => import('@/views/directives/debounceDirect/index.vue'),
			meta: {
				title: '防抖指令'
			}
		},
		{
			path: 'throttle',
			name: 'directiveThrottle',
			component: () => import('@/views/directives/throttleDirect/index.vue'),
			meta: {
				title: '节流指令'
			}
		},
		{
			path: 'watermark',
			name: 'directiveWatermark',
			component: () => import('@/views/directives/watermarkDirect/index.vue'),
			meta: {
				title: '水印指令'
			}
		},
		{
			path: 'drag',
			name: 'directiveDrag',
			component: () => import('@/views/directives/dragDirect/index.vue'),
			meta: {
				title: '拖拽指令'
			}
		}
	]
};

export default routes;
