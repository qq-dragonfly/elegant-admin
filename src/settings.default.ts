// 该文件为系统默认配置，请勿修改！！！

import type { RecursiveRequired, Settings } from '#/global';
import { EnumThemeTabMode } from '@/enums/common';

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
	app: {
		colorScheme: 'light',
		elementSize: 'default',
		iconifyOfflineUse: false,
		enablePermission: false,
		enableProgress: true,
		enableDynamicTitle: false,
		routeBaseOn: 'frontend', //'frontend'：前端 'backend' 后端 'filesystem' 文件系统
		themeColor: '#007AFF'
	},
	dashboard: {
		enable: true,
		title: '控制台'
	},
	layout: {
		enableMobileAdaptation: false
	},
	tab: {
		visible: true,
		mode: 'button',
		modeList: [
			{
				value: 'chrome',
				label: EnumThemeTabMode.chrome
			},
			{
				value: 'button',
				label: EnumThemeTabMode.button
			}
		],
		isCache: false
	},
	menu: {
		baseOn: 'frontend',
		menuMode: 'head',
		switchMainMenuAndPageJump: true,
		subMenuUniqueOpened: true,
		subMenuCollapse: false,
		enableSubMenuCollapseButton: false,
		enableHotkeys: false
	},
	topbar: {
		fixed: true
	},
	toolbar: {
		enableFullscreen: false,
		enablePageReload: false,
		enableColorScheme: false,
		enableAppSetting: false
	},
	breadcrumb: {
		enable: true
	},
	navSearch: {
		enable: true,
		enableHotkeys: true
	},
	copyright: {
		enable: true,
		dates: '2022-2022',
		company: 'Elegant-admin'
	}
};

export default globalSettingsDefault;
