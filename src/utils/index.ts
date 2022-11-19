import path from 'path-browserify';
import { isArray } from 'lodash-es';

export function isExternalLink(path: string) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

export function resolveRoutePath(basePath: string, routePath: string) {
	if (isExternalLink(routePath)) {
		return routePath;
	}
	if (isExternalLink(basePath)) {
		return basePath;
	}
	return basePath ? path.resolve(basePath, routePath) : routePath;
}
/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(callValue)) {
		return callValue.length ? callValue.join(' / ') : '--';
	}
	return callValue ?? '--';
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param searchProps
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(callValue: any, enumData: any, searchProps?: { [key: string]: any }, type?: string): string {
	const value = searchProps?.value ?? 'value';
	const label = searchProps?.label ?? 'label';
	let filterData: any = {};
	if (Array.isArray(enumData)) {
		filterData = enumData.find((item: any) => item[value] === callValue);
	}
	if (type === 'tag') {
		return filterData?.tagType ? filterData.tagType : '';
	}
	return filterData ? filterData[label] : '--';
}
/**
 * @description 获取当前时间
 * @return string
 */
export function getTimeState() {
	// 获取当前时间
	let timeNow = new Date();
	// 获取当前小时
	let hours = timeNow.getHours();
	// 判断当前时间段
	if (hours >= 6 && hours <= 10) {
		return `早上好 ⛅`;
	}
	if (hours >= 10 && hours <= 14) {
		return `中午好 🌞`;
	}
	if (hours >= 14 && hours <= 18) {
		return `下午好 🌞`;
	}
	if (hours >= 18 && hours <= 24) {
		return `晚上好 🌛`;
	}
	if (hours >= 0 && hours <= 6) {
		return `凌晨好 🌛`;
	}
}
