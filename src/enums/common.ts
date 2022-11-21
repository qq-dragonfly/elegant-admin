/** 缓存的key */
export enum EnumStorageKey {
	/** 主题颜色 */
	'theme-color' = '__THEME_COLOR__',
	/** 用户token */
	'token' = '__TOKEN__',
	/** 用户刷新token */
	'refresh-token' = '__REFRESH_TOKEN__',
	/** 用户信息 */
	'user-info' = '__USER_INFO__',
	/** 主题配置 */
	'theme-settings' = '__THEME_SETTINGS__',
	/** 多页签路由信息 */
	'multi-tab-routes' = '__MULTI_TAB_ROUTES__'
}
/** 多页签风格 */
export enum EnumThemeTabMode {
	'chrome' = '谷歌风格',
	'button' = '按钮风格'
}
