import type { Route } from '#/global';

const Layout = () => import('@/layouts/index.vue');

const routes: Route.recordRaw = {
	path: '/component_extend_example',
	component: Layout,
	redirect: '/component_extend_example/pageheader',
	name: 'componentExtendExample',
	meta: {
		title: '扩展组件',
		icon: 'sidebar-component'
	},
	children: [
		{
			path: 'svg',
			name: 'componentExtendExampleSvg',
			component: () => import('@/views/component_extend_example/svg.demo.vue'),
			meta: {
				title: 'SVG Icon'
			}
		},
		{
			path: 'pageheader',
			name: 'componentExtendExamplePageheader',
			component: () => import('@/views/component_extend_example/pageheader.demo.vue'),
			meta: {
				title: '页头'
			}
		},
		{
			path: 'upload',
			name: 'componentExtendExampleUpload',
			component: () => import('@/views/component_extend_example/upload.demo.vue'),
			meta: {
				title: '上传'
			}
		},
		{
			path: 'trend',
			name: 'componentExtendExampleTrend',
			component: () => import('@/views/component_extend_example/trend.demo.vue'),
			meta: {
				title: '趋势标记'
			}
		}
	]
};

export default routes;
