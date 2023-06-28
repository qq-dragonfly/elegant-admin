/*
@设备尺寸
browser.js
*/
import { reactive } from 'vue';
// 1. 引入
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export default function useBrowser() {
	const breakpoints = useBreakpoints(breakpointsTailwind);

	// 2. 实时响应屏幕尺寸
	// 小屏幕时 sm为true，反之
	// 其它 md lg 同理
	const sm = breakpoints.smaller('sm');
	const md = breakpoints.between('sm', 'md');
	const lg = breakpoints.between('md', 'lg');
	const xl = breakpoints.between('lg', 'xl');
	const xxl = breakpoints.between('xl', '2xl');
	const xxxl = breakpoints['2xl'];

	// 3. 响应式 bsInfo 对象
	// 设备大小  | 动态数据
	// 不需要使用窗口resize监听，实时获取屏幕尺寸
	// 导出bsInfo
	return reactive<any>({
		size: {
			sm: sm,
			md: md,
			lg: lg,
			xl: xl,
			xxl: xxl,
			xxxl: xxxl
		}
	});
}
