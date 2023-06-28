import type { Route } from '#/global';
const Layout = () => import('@/layouts/index.vue');

const routes: Route.recordRaw = {
	path: '/org',
	component: Layout,
	redirect: '/org/hospital',
	name: 'OrgManage',
	meta: {
		title: '组织管理',
		icon: 'local-sidebar_org'
	},
	children: [
		{
			path: 'hospital',
			name: 'OrgHospital',
			component: () => import('@/views/org_module/hospital_area/index.vue'),
			meta: {
				title: '院区管理',
				icon: 'local-sidebar_hospital'
			}
		},
		{
			path: 'department',
			name: 'OrgDepartment',
			component: () => import('@/views/org_module/department/index.vue'),
			meta: {
				title: '科室管理',
				icon: 'local-sidebar_department'
			}
		},
		{
			path: 'doctor',
			name: 'OrgDoctor',
			component: () => import('@/views/org_module/doctor/index.vue'),
			meta: {
				title: '医护管理',
				icon: 'local-sidebar_doc'
			}
		}
	]
};

export default routes;
