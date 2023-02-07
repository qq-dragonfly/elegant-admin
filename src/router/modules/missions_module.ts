import type { Route } from '#/global';
const Layout = () => import('@/layouts/index.vue');

const routes: Route.recordRaw = {
	path: '/missions',
	component: Layout,
	redirect: '/missions/cate',
	name: 'missionsManage',
	meta: {
		title: '宣教管理',
		icon: 'ele_sidebar_missions_manage'
	},
	children: [
		{
			path: 'cate',
			name: 'missionsCate',
			component: () => import('@/views/missions_module/missions_cate/index.vue'),
			meta: {
				title: '宣教分类',
				icon: 'ele_sidebar_missions_cate',
				cache: true
			}
		},
		{
			path: 'content',
			name: 'missionsContent',
			component: () => import('@/views/missions_module/missions_content/index.vue'),
			meta: {
				title: '宣教内容',
				icon: 'ele_sidebar_missions_content',
				cache: true
			}
		}
	]
};

export default routes;
