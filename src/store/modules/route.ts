import { cloneDeep } from 'lodash-es';
import useSettingsStore from './settings';
import useUserStore from './user';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';
import { resolveRoutePath, convertTree } from '@/utils';
import { systemRoutes } from '@/router/routes';
import type { Route } from '#/global';
// 判断是否有权限
function hasPermission(permissions: string[], route: Route.recordMainRaw | Route.recordRaw) {
	let isAuth = false;
	if (route.meta?.auth) {
		isAuth = permissions.some(auth => {
			return typeof route.meta.auth === 'string'
				? route.meta.auth === auth
				: typeof route.meta.auth === 'object'
				? route.meta.auth.includes(auth)
				: false;
		});
	} else {
		isAuth = true;
	}
	return isAuth;
}
// 根据权限过滤路由
function filterAsyncRoutes<T extends Route.recordMainRaw[] | Route.recordRaw[]>(routes: T, permissions: string[]): T {
	const res: any = [];
	routes.forEach((route: any) => {
		if (hasPermission(permissions, route)) {
			const tmpRoute = cloneDeep(route);
			if (tmpRoute.children && tmpRoute.children?.length) {
				tmpRoute.children = filterAsyncRoutes(tmpRoute.children, permissions);
				tmpRoute.children?.length && res.push(tmpRoute);
			} else {
				res.push(tmpRoute);
			}
		}
	});
	return res;
}
// 格式化后端路由数据
function formatBackRoutes(routes: any, views = import.meta.glob('../../views/**/*.vue')): any {
	return routes.map((route: any) => {
		switch (route.component) {
			case 'Layout':
				route.component = () => import('@/layouts/index.vue');
				break;
			default:
				if (route.component) {
					route.component = views[`../../views/${route.component}`];
				}
		}
		if (route.children && route.children?.length) {
			route.children = formatBackRoutes(route.children, views);
		}
		return route;
	});
}

// 将多层嵌套路由处理成两层，保留顶层和最子层路由，中间层级将被拍平
function flatAsyncRoutes<T extends RouteRecordRaw>(route: T): T {
	if (route.children && route.children?.length) {
		route.children = flatAsyncRoutesRecursive(
			route.children,
			[
				{
					path: route.path,
					title: route.meta?.title,
					hide: !route.meta?.breadcrumb && route.meta?.breadcrumb === false
				}
			],
			route.path,
			route.meta?.auth
		);
	}
	return route;
}
function flatAsyncRoutesRecursive(
	routes: RouteRecordRaw[],
	breadcrumb: Route.breadcrumb[] = [],
	baseUrl = '',
	baseAuth: RouteMeta['auth']
): RouteRecordRaw[] {
	const res: RouteRecordRaw[] = [];
	routes.forEach(route => {
		if (route.children && route.children?.length) {
			const childrenBaseUrl = resolveRoutePath(baseUrl, route.path);
			const childrenBaseAuth = baseAuth ?? route.meta?.auth;
			const tmpBreadcrumb = cloneDeep(breadcrumb);
			tmpBreadcrumb.push({
				path: childrenBaseUrl,
				title: route.meta?.title,
				hide: !route.meta?.breadcrumb && route.meta?.breadcrumb === false
			});
			const tmpRoute = cloneDeep(route);
			tmpRoute.path = childrenBaseUrl;
			if (!tmpRoute.meta) {
				tmpRoute.meta = {};
			}
			tmpRoute.meta.auth = childrenBaseAuth;
			tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb;
			delete tmpRoute.children;
			res.push(tmpRoute);
			const childrenRoutes = flatAsyncRoutesRecursive(route.children, tmpBreadcrumb, childrenBaseUrl, childrenBaseAuth);
			childrenRoutes.forEach(item => {
				// 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
				if (res.some(v => v.path === item.path)) {
					res.forEach((v, i) => {
						if (v.path === item.path) {
							res[i] = item;
						}
					});
				} else {
					res.push(item);
				}
			});
		} else {
			const tmpRoute = cloneDeep(route);
			tmpRoute.path = resolveRoutePath(baseUrl, tmpRoute.path);
			// 处理面包屑导航
			const tmpBreadcrumb = cloneDeep(breadcrumb);
			tmpBreadcrumb.push({
				path: tmpRoute.path,
				title: tmpRoute.meta?.title,
				hide: !tmpRoute.meta?.breadcrumb && tmpRoute.meta?.breadcrumb === false
			});
			if (!tmpRoute.meta) {
				tmpRoute.meta = {};
			}
			tmpRoute.meta.auth = baseAuth ?? tmpRoute.meta?.auth;
			tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb;
			res.push(tmpRoute);
		}
	});
	return res;
}

const useRouteStore = defineStore(
	// 唯一ID
	'route',
	{
		state: () => ({
			isGenerate: false,
			routes: [] as Route.recordMainRaw[],
			currentRemoveRoutes: [] as Function[]
		}),
		getters: {
			// 扁平化路由（将三级及以上路由数据拍平成二级）
			flatRoutes: state => {
				const routes: Route.recordRaw[] = [];
				if (state.routes) {
					state.routes.forEach((item: any) => {
						routes.push(...cloneDeep(item.children));
					});
					routes.forEach((item: any) => flatAsyncRoutes(item));
				}
				return routes;
			},
			flatSystemRoutes: () => {
				const routes = [...systemRoutes];
				routes.forEach((item: any) => flatAsyncRoutes(item));
				return routes;
			}
		},
		actions: {
			// 根据权限动态生成路由（前端生成）
			generateRoutesAtFront(asyncRoutes: Route.recordMainRaw[]) {
				// eslint-disable-next-line no-async-promise-executor
				return new Promise<void>(async resolve => {
					const settingsStore = useSettingsStore();
					const userStore = useUserStore();
					let accessedRoutes;
					// 如果权限功能开启，则需要对路由数据进行筛选过滤
					if (settingsStore.app.enablePermission) {
						const permissions = await userStore.getPermissions();
						accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions);
					} else {
						accessedRoutes = cloneDeep(asyncRoutes);
					}
					// 设置 routes 数据
					this.isGenerate = true;
					this.routes = accessedRoutes.filter((item: any) => item.children?.length !== 0);
					resolve();
				});
			},
			// 根据权限动态生成路由（后端获取）
			generateRoutesAtBack() {
				return new Promise<void>(async resolve => {
					const settingsStore = useSettingsStore();
					const userStore = useUserStore();
					const permissionsData: any = await userStore.getPermissions();
					const menuList = convertTree(permissionsData.menuList);
					const asyncRoutes = formatBackRoutes(menuList);
					let accessedRoutes;
					// 如果权限功能开启，则需要对路由数据进行筛选过滤
					if (settingsStore.app.enablePermission) {
						// accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionsData.permissions);
						accessedRoutes = cloneDeep(asyncRoutes);
					} else {
						accessedRoutes = cloneDeep(asyncRoutes);
					}
					// 设置 routes 数据
					this.isGenerate = true;
					this.routes = accessedRoutes.filter((item: any) => item.children?.length !== 0);
					resolve();
				});
			},
			// 记录 accessRoutes 路由，用于登出时删除路由
			setCurrentRemoveRoutes(routes: Function[]) {
				this.currentRemoveRoutes = routes;
			},
			// 清空动态路由
			removeRoutes() {
				this.isGenerate = false;
				this.routes = [];
				this.currentRemoveRoutes.forEach((removeRoute: any) => {
					removeRoute();
				});
				this.currentRemoveRoutes = [];
			}
		}
	}
);

export default useRouteStore;
