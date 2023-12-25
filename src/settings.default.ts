/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 *
 * @Description:该文件为系统默认配置，请勿修改！！！
 * @version:
 * @Date: 2023-02-07
 * @LastEditors:  97972619@qq.com
 * @LastEditTime:
 * @Author: 97972619@qq.com
 */
import type { RecursiveRequired, Settings } from '#/global';
import { EnumThemeTabMode } from '@/enums/common';

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
	app: {
		colorScheme: 'light', //颜色方案暗黑模式
		elementSize: 'default', //组件默认尺寸
		iconifyOfflineUse: false, //是否将 iconify 图标集中的 Element Plus 图标下载到本地，以便在离线环境下使用
		enablePermission: true, //是否开启权限功能
		enableProgress: true, //是否开启载入进度条
		enableDynamicTitle: false, //enableDynamicTitle
		routeBaseOn: 'backend', //'frontend'：前端 'backend' 后端
		themeColor: '#352DE4' //主题颜色
	},
	//控制台配置
	home: {
		enable: true,
		title: '控制台'
	},
	// 布局设置
	layout: {
		enableMobileAdaptation: false
	},
	// 多页签设置
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
		]
	},
	// 导航栏设置
	menu: {
		menuMode: 'head',
		switchMainMenuAndPageJump: true,
		subMenuUniqueOpened: true,
		subMenuCollapse: false,
		enableSubMenuCollapseButton: false,
		enableHotkeys: false
	},
	// 是否固定顶栏
	topbar: {
		fixed: true
	},
	toolbar: {
		enableFullscreen: false, //是否开启全屏
		enablePageReload: false, //是否开启页面刷新
		enableColorScheme: false, //是否开启颜色主题
		enableAppSetting: false //是否开启应用配置，强烈建议在生产环境中关闭
	},
	//面包屑导航设置
	breadcrumb: {
		enable: true
	},
	// 导航搜索设置
	navSearch: {
		enable: true,
		enableHotkeys: true
	},
	// 底部版权设置
	copyright: {
		enable: true,
		dates: '2023-2023',
		company: 'Elegant-admin'
	}
};

export default globalSettingsDefault;
