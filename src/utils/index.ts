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
 * @description 格式化表格单元格默认值(el-table-column)
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} callValue 当前单元格值
 * @return string
 * */
export function defaultFormat(row: number, col: number, callValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(callValue)) {
		return callValue.length ? callValue.join(' / ') : '--';
	}
	return callValue ?? '--';
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
export function filterEnum(
	callValue: any,
	enumData: { [key: string]: any } | undefined,
	searchProps?: { [key: string]: any },
	type?: string
): string {
	const value = searchProps?.value ?? 'value';
	const label = searchProps?.label ?? 'label';
	let filterData: any = {};
	if (Array.isArray(enumData)) {
		filterData = enumData.find((item: any) => item[value] === callValue);
	}
	if (type == 'tag') {
		return filterData?.tagType ? filterData.tagType : '';
	}
	return filterData ? filterData[label] : '--';
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
	if (!prop.includes('.')) {
		return row[prop];
	}
	prop.split('.').forEach(item => {
		row = row[item] ?? '--';
	});
	return row;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
	const propArr = prop.split('.');
	if (propArr.length == 1) {
		return prop;
	}
	return propArr[propArr.length - 1];
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
/**
 * @description 随机生成字符串的方法
 * @return string
 * @param len
 * */
export function randomString(len: number) {
	len = len || 32;
	let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	let maxPos = $chars.length;
	let pwd = '';
	for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}
