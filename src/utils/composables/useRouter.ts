import type { RouteLocationRaw } from 'vue-router';
import router from '@/router';
/**
 * 路由跳转
 * @param inSetup - 是否在vue页面/组件的setup里面调用
 */
export function useRouterPush(inSetup = true) {
	/**
	 * 路由跳转
	 * @param to - 需要跳转的路由
	 * @param newTab - 是否在新的浏览器Tab标签打开
	 */
	function routerPush(to: RouteLocationRaw, newTab = false) {
		if (newTab) {
			const routerData = router.resolve(to);
			window.open(routerData.href, '_blank');
		} else {
			router.push(to);
		}
	}
	return {
		routerPush
	};
}
