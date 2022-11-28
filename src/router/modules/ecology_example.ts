import type { Route } from '@/global';

const Layout = () => import('@/layouts/index.vue');

const routes: Route.recordRaw[] = [
	{
		path: '/video/coming/soon',
		component: Layout,
		meta: {
			title: '视频教程',
			icon: 'sidebar-videos'
		},
		children: [
			{
				path: '',
				name: 'videosComingSoon',
				component: () => import('@/views/videos_example/coming.soon.vue'),
				meta: {
					title: '视频教程',
					sidebar: false,
					breadcrumb: false
				}
			}
		]
	}
];

export default routes;
