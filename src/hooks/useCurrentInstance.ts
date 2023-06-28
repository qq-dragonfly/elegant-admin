import type { ComponentInternalInstance } from 'vue';
/**
 * @description Vue3获取当前组件实例的 getCurrentInstance
 * */
export default function useCurrentInstance() {
	const { appContext } = getCurrentInstance() as ComponentInternalInstance;
	return appContext.config.globalProperties;
}
