import { EnumStorageKey } from '@/enums/common';
import { getLocal, setLocal } from '@/utils/storage';
/**
 * 根据vue路由获取tab路由
 * @param route
 */
export function getTabRouteByVueRoute(route: any) {
	const fullPath = hasFullPath(route) ? route.fullPath : route.path;

	const tabRoute: any = {
		name: route.name,
		fullPath,
		meta: route.meta,
		scrollPosition: {
			left: 0,
			top: 0
		}
	};
	return tabRoute;
}

/**
 * 获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param fullPath - 该页签的路径
 */
export function getIndexInTabRoutes(tabs: any, fullPath: string) {
	return tabs.findIndex((tab: any) => tab.fullPath === fullPath);
}

/**
 * 判断该页签是否在多页签数据中
 * @param tabs - 多页签数据
 * @param fullPath - 该页签的路径
 */
export function isInTabRoutes(tabs: any, fullPath: string) {
	return getIndexInTabRoutes(tabs, fullPath) > -1;
}

/**
 * 根据路由名称获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param routeName - 路由名称
 */
export function getIndexInTabRoutesByRouteName(tabs: any, routeName: string) {
	return tabs.findIndex((tab: any) => tab.name === routeName);
}

/**
 * 判断路由是否有fullPath属性
 * @param route 路由
 */
function hasFullPath(route: any) {
	return Boolean((route as any).fullPath);
}

/** 缓存多页签数据 */
export function setTabRoutes(data: any) {
	setLocal(EnumStorageKey['multi-tab-routes'], data);
}

/** 获取缓存的多页签数据 */
export function getTabRoutes() {
	const routes: any = [];
	const data = getLocal<any[]>(EnumStorageKey['multi-tab-routes']);
	if (data) {
		const defaultTabRoutes = data.map((item: any) => ({
			...item,
			scrollPosition: {
				left: 0,
				top: 0
			}
		}));
		routes.push(...defaultTabRoutes);
	}
	return routes;
}

/** 清空多页签数据 */
export function clearTabRoutes() {
	setTabRoutes([]);
}
