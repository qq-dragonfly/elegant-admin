import useSettingsStore from './settings';
import useRouteStore from './route';
import type { Menu } from '#/global';

import { resolveRoutePath } from '@/utils';
import menu from '@/menu';

function getDeepestPath(menu: Menu.recordRaw, rootPath = '') {
	let returnPath = '';
	if (menu.path !== undefined) {
		if (menu.children) {
			if (
				menu.children.some(item => {
					return item.meta.sidebar !== false;
				})
			) {
				for (let i = 0; i < menu.children.length; i++) {
					if (menu.children[i].meta.sidebar === undefined) {
						returnPath = getDeepestPath(menu.children[i], resolveRoutePath(rootPath, menu.path));
						break;
					}
				}
			} else {
				returnPath = getDeepestPath(menu.children[0], resolveRoutePath(rootPath, menu.path));
			}
		} else {
			returnPath = resolveRoutePath(rootPath, menu.path);
		}
	}
	return returnPath;
}
function getDefaultOpenedPaths(menus: Menu.recordRaw[], rootPath = '') {
	const defaultOpenedPaths: string[] = [];
	menus.forEach(item => {
		if (item.path && item.meta.defaultOpened && item.children) {
			defaultOpenedPaths.push(resolveRoutePath(rootPath, item.path));
			const childrenDefaultOpenedPaths = getDefaultOpenedPaths(item.children, resolveRoutePath(rootPath, item.path));
			if (childrenDefaultOpenedPaths.length > 0) {
				defaultOpenedPaths.push(...childrenDefaultOpenedPaths);
			}
		}
	});
	return defaultOpenedPaths;
}

const useMenuStore = defineStore(
	// 唯一ID
	'menu',
	{
		state: () => ({
			menus: [
				{
					meta: {},
					children: []
				}
			] as Menu.recordMainRaw[],
			actived: 0
		}),
		getters: {
			// 完整导航数据
			allMenus() {
				const settingsStore = useSettingsStore();
				let menus: Menu.recordMainRaw[] = [
					{
						meta: {},
						children: []
					}
				];
				const routeStore = useRouteStore();
				if (settingsStore.menu.menuMode === 'single') {
					menus[0].children = [];
					routeStore.routes.forEach(item => {
						menus[0].children?.push(...(item.children as Menu.recordRaw[]));
					});
				} else {
					menus = routeStore.routes as Menu.recordMainRaw[];
				}
				return menus;
			},
			// 次导航数据
			sidebarMenus(): Menu.recordMainRaw['children'] {
				return this.allMenus.length > 0 ? this.allMenus[this.actived].children : [];
			},
			// 次导航里第一个导航的路径
			sidebarMenusFirstDeepestPath(): string {
				return this.allMenus.length > 0 ? getDeepestPath(this.sidebarMenus[0]) : '/';
			},
			defaultOpenedPaths() {
				let defaultOpenedPaths: string[] = [];
				defaultOpenedPaths = getDefaultOpenedPaths(this.sidebarMenus);
				return defaultOpenedPaths;
			}
		},
		actions: {
			// 切换主导航
			setActived(data: number | string) {
				if (typeof data === 'number') {
					// 如果是 number 类型，则认为是主导航的索引
					this.actived = data;
				} else {
					// 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
					const findIndex = this.allMenus.findIndex(item =>
						item.children.some(r => data.indexOf(`${r.path}/`) === 0 || data === r.path)
					);
					if (findIndex >= 0) {
						this.actived = findIndex;
					}
				}
			}
		}
	}
);

export default useMenuStore;
