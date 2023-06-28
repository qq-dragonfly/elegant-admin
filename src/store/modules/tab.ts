import { defineStore } from 'pinia';
import {
	clearTabRoutes,
	getIndexInTabRoutes,
	getIndexInTabRoutesByRouteName,
	getTabRouteByVueRoute,
	isInTabRoutes
} from '@/utils/tabHelpers';
import useSettingsStore from '@/store/modules/settings';

interface TabState {
	/** 多页签数据 */
	tabs: any;
	/** 多页签首页 */
	homeTab: any;
	/** 当前激活状态的页签(路由fullPath) */
	activeTab: string;
}

export const useTabStore = defineStore('tab-store', {
	state: (): TabState => ({
		tabs: [],
		homeTab: {
			name: 'dashboard',
			fullPath: '/dashboard',
			meta: {
				title: useSettingsStore().home.title,
				icon: 'local-home'
			},
			scrollPosition: {
				left: 0,
				top: 0
			}
		},
		activeTab: ''
	}),
	getters: {
		/** 当前激活状态的页签索引 */
		activeTabIndex(state) {
			const { tabs, activeTab } = state;
			return tabs.findIndex((tab: any) => tab.fullPath === activeTab);
		}
	},
	actions: {
		/** 重置Tab状态 */
		resetTabStore() {
			clearTabRoutes();
			this.$reset();
		},
		/**
		 * 设置当前路由对应的页签为激活状态
		 * @param fullPath - 路由fullPath
		 */
		setActiveTab(fullPath: string) {
			this.activeTab = fullPath;
		},
		/**
		 * 设置当前路由对应的页签title
		 * @param title - tab名称
		 */
		setActiveTabTitle(title: string) {
			const item: any = this.tabs.find((tab: any) => tab.fullPath === this.activeTab);
			if (item) {
				item.meta.title = title;
			}
		},
		/**
		 * 添加多页签
		 * @param route - 路由
		 */
		addTab(route: any) {
			const tab: any = getTabRouteByVueRoute(route);
			if (isInTabRoutes(this.tabs, tab.fullPath)) {
				return;
			}
			if (tab.name === 'reload') {
				return;
			}

			const index = getIndexInTabRoutesByRouteName(this.tabs, route.name as string);

			if (index === -1) {
				this.tabs.push(tab);
				return;
			}
			const { multiTab = false } = route.meta;
			if (!multiTab) {
				this.tabs.splice(index, 1, tab);
				return;
			}
			this.tabs.push(tab);
		},
		/**
		 * 删除多页签
		 * @param fullPath - 路由fullPath
		 */
		removeTab(fullPath: string) {
			const { routerPush } = useRouterPush(false);

			const isActive = this.activeTab === fullPath;
			const updateTabs = this.tabs.filter((tab: any) => tab.fullPath !== fullPath);
			this.tabs = updateTabs;
			if (isActive && updateTabs.length) {
				const activePath = updateTabs[updateTabs.length - 1].fullPath;
				this.setActiveTab(activePath);
				routerPush(activePath);
			}
		},
		/**
		 * 清空多页签(多页签首页保留)
		 * @param excludes - 保留的多页签path
		 */
		clearTab(excludes: string[] = []) {
			const { routerPush } = useRouterPush(false);

			const homePath = this.homeTab.fullPath;
			const remain = [homePath, ...excludes];
			const hasActive = remain.includes(this.activeTab);
			const updateTabs = this.tabs.filter((tab: any) => remain.includes(tab.fullPath));
			this.tabs = updateTabs;
			if (!hasActive && updateTabs.length) {
				const activePath = updateTabs[updateTabs.length - 1].fullPath;
				this.setActiveTab(activePath);
				routerPush(activePath);
			}
		},
		/**
		 * 清除左边多页签
		 * @param fullPath - 路由fullPath
		 */
		clearLeftTab(fullPath: string) {
			const index = getIndexInTabRoutes(this.tabs, fullPath);
			if (index > -1) {
				const excludes = this.tabs.slice(index).map((item: any) => item.fullPath);
				this.clearTab(excludes);
			}
		},
		/**
		 * 清除右边多页签
		 * @param fullPath - 路由fullPath
		 */
		clearRightTab(fullPath: string) {
			const index = getIndexInTabRoutes(this.tabs, fullPath);
			if (index > -1) {
				const excludes = this.tabs.slice(0, index + 1).map((item: any) => item.fullPath);
				this.clearTab(excludes);
			}
		},
		/** 清除所有多页签 */
		clearAllTab() {
			this.clearTab();
		},
		/**
		 * 点击单个tab
		 * @param fullPath - 路由fullPath
		 */
		handleClickTab(fullPath: string) {
			const { routerPush } = useRouterPush(false);
			const isActive = this.activeTab === fullPath;
			if (!isActive) {
				this.setActiveTab(fullPath);
				routerPush(fullPath);
			}
		},
		/**
		 * 记录tab滚动位置
		 * @param fullPath - 路由fullPath
		 * @param position - tab当前页的滚动位置
		 */
		recordTabScrollPosition(fullPath: string, position: { left: number; top: number }) {
			const index = getIndexInTabRoutes(this.tabs, fullPath);
			if (index > -1) {
				this.tabs[index].scrollPosition = position;
			}
		},
		/**
		 * 获取tab滚动位置
		 * @param fullPath - 路由fullPath
		 */
		getTabScrollPosition(fullPath: string) {
			const position = {
				left: 0,
				top: 0
			};
			const index = getIndexInTabRoutes(this.tabs, fullPath);
			if (index > -1) {
				Object.assign(position, this.tabs[index].scrollPosition);
			}
			return position;
		},
		/** 初始化Tab状态 */
		iniTabStore(currentRoute: any) {
			const tabs: any = [];
			const hasHome = getIndexInTabRoutesByRouteName(tabs, this.homeTab.name as string) > -1;
			if (!hasHome && this.homeTab.name === 'dashboard') {
				tabs.unshift(this.homeTab);
			}
			const isHome = currentRoute.fullPath === this.homeTab.fullPath;
			const index = getIndexInTabRoutesByRouteName(tabs, currentRoute.name as string);
			if (!isHome) {
				const currentTab = getTabRouteByVueRoute(currentRoute);
				if (!currentRoute.meta.multiTab) {
					if (index > -1) {
						tabs.splice(index, 1, currentTab);
					} else {
						tabs.push(currentTab);
					}
				} else {
					const hasCurrent = isInTabRoutes(tabs, currentRoute.fullPath);
					if (!hasCurrent) {
						tabs.push(currentTab);
					}
				}
			}
			this.tabs = tabs;
			this.setActiveTab(currentRoute.fullPath);
		}
	}
});
