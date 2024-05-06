import { hex2rgba } from '@unocss/preset-mini/utils'

export const lightTheme = {
  'color-scheme': 'light',
  // 内置 UI
  '--ui-primary': hex2rgba('#2d68f4')!.join(' '),
  '--ui-text': hex2rgba('#fcfcfc')!.join(' '),
  // 主体
  '--g-bg': '#f2f2f2',
  '--g-container-bg': '#fff',
  '--g-border-color': '#f2f2f2',
  // 头部
  '--g-header-bg': 'linear-gradient( 171deg, #1890FF 0%, #2d68f4 100%)',
  '--g-header-color': '#ffffff',
  '--g-header-menu-color': '#ffffff',
  '--g-header-menu-hover-bg': '#2D68F4',
  '--g-header-menu-hover-color': '#ffffff',
  '--g-header-menu-active-bg': '#2D68F4',
  '--g-header-menu-active-color': '#ffffff',
  // 主导航
  '--g-main-sidebar-bg': '#282c34',
  '--g-main-sidebar-menu-color': '#ffffff',
  '--g-main-sidebar-menu-hover-bg': '#2d68f4',
  '--g-main-sidebar-menu-hover-color': '#ffffff',
  '--g-main-sidebar-menu-active-bg': '#2d68f4',
  '--g-main-sidebar-menu-active-color': '#ffffff',
  // 次导航
  '--g-sub-sidebar-bg': '#fff',
  '--g-sub-sidebar-logo-bg': '#ffffff',
  '--g-sub-sidebar-logo-color': '#333333',
  '--g-sub-sidebar-menu-color': '#0f0f0f',
  '--g-sub-sidebar-menu-hover-bg': '#e5f1ff',
  '--g-sub-sidebar-menu-hover-color': '#0f0f0f',
  '--g-sub-sidebar-menu-active-bg': '#e5f1ff',
  '--g-sub-sidebar-menu-active-color': '#2d68f4',
  // 标签栏
  '--g-tabbar-dividers-bg': '#a3a3a3',
  '--g-tabbar-tab-bg': '#f5f7fa',
  '--g-tabbar-tab-color': '#a3a3a3',
  '--g-tabbar-tab-hover-bg': '#e5f1ff',
  '--g-tabbar-tab-hover-color': '#999999',
  '--g-tabbar-tab-active-bg': '#e5f1ff',
  '--g-tabbar-tab-active-color': '#2d68f4',
  '--g-tabbar-tab-active-border-color': '#2d68f4',
}

export const darkTheme = {
  'color-scheme': 'dark',
  // 内置 UI
  '--ui-primary': hex2rgba('#e5e5e5')!.join(' '),
  '--ui-text': hex2rgba('#0f0f0f')!.join(' '),
  // 主体
  '--g-bg': '#0a0a0a',
  '--g-container-bg': '#141414',
  '--g-border-color': '#15191e',
  // 头部
  '--g-header-bg': '#141414',
  '--g-header-color': '#e5e5e5',
  '--g-header-menu-color': '#a8a29e',
  '--g-header-menu-hover-bg': '#141414',
  '--g-header-menu-hover-color': '#e5e5e5',
  '--g-header-menu-active-bg': '#e5e5e5',
  '--g-header-menu-active-color': '#0a0a0a',
  // 主导航
  '--g-main-sidebar-bg': '#0a0a0a',
  '--g-main-sidebar-menu-color': '#a8a29e',
  '--g-main-sidebar-menu-hover-bg': '#141414',
  '--g-main-sidebar-menu-hover-color': '#e5e5e5',
  '--g-main-sidebar-menu-active-bg': '#e5e5e5',
  '--g-main-sidebar-menu-active-color': '#0a0a0a',
  // 次导航
  '--g-sub-sidebar-bg': '#141414',
  '--g-sub-sidebar-logo-bg': '#0f0f0f',
  '--g-sub-sidebar-logo-color': '#e5e5e5',
  '--g-sub-sidebar-menu-color': '#a8a29e',
  '--g-sub-sidebar-menu-hover-bg': '#0a0a0a',
  '--g-sub-sidebar-menu-hover-color': '#e5e5e5',
  '--g-sub-sidebar-menu-active-bg': '#e5e5e5',
  '--g-sub-sidebar-menu-active-color': '#0a0a0a',
  // 标签栏
  '--g-tabbar-dividers-bg': '#a8a29e',
  '--g-tabbar-tab-color': '#ffffff',
  '--g-tabbar-tab-hover-bg': '#1b1b1b',
  '--g-tabbar-tab-hover-color': '#e5e5e5',
  '--g-tabbar-tab-active-color': '#0a0a0a',
  '--g-tabbar-tab-bg': '#333333',
  '--g-tabbar-tab-active-bg': '#e5e5e5',
}
