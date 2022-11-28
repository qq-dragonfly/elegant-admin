import { useEventListener } from '@vueuse/core';
import { useTabStore } from '@/store/modules/tab';

/** 全局事件 */
export function useGlobalEvents() {
	const tab = useTabStore();
	/** 页面离开时缓存多页签数据 */
	useEventListener(window, 'beforeunload', () => {
		tab.cacheTabRoutes();
	});
}
