import { onBeforeMount } from 'vue';
import useSettingsStore from '@/store/modules/settings';
import { getLightColor, getDarkColor } from '@/utils/theme';
import { ElMessage } from 'element-plus';

/**
 * @description 切换主题
 * */
export const useTheme = () => {
	const settingsStore = useSettingsStore();
	// 修改主题颜色
	const changePrimary = (val: string | null) => {
		if (!val) {
			val = settingsStore.app.themeColor;
			ElMessage({
				type: 'success',
				message: `主题颜色已重置为 ${settingsStore.app.themeColor}`
			});
		}
		settingsStore.setThemeColor(val);
		// 颜色加深
		document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(settingsStore.app.themeColor, 0.1)}`);
		document.documentElement.style.setProperty('--el-color-primary', settingsStore.app.themeColor);
		// 颜色变浅
		for (let i = 1; i <= 9; i++) {
			document.documentElement.style.setProperty(
				`--el-color-primary-light-${i}`,
				`${getLightColor(settingsStore.app.themeColor, i / 10)}`
			);
		}
	};

	onBeforeMount(() => {
		changePrimary(settingsStore.app.themeColor);
	});

	return {
		changePrimary
	};
};
