import router from '@/router';
/**
 * @description 重新加载当前路由
 * */
export default function useMainPage() {
	function reload() {
		router.push({
			name: 'reload'
		});
	}

	return {
		reload
	};
}
