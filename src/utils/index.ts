import path from 'path-browserify';
import { isArray } from 'lodash-es';
import { FieldNamesProps } from '@/components/ProTable/interface';
export function isExternalLink(path: string) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

export function resolveRoutePath(basePath: string, routePath?: string) {
	return basePath ? path.resolve(basePath, routePath ?? '') : routePath ?? '';
}
/**
 * @description 格式化表格单元格默认值 (el-table-column)
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {*} callValue 当前单元格值
 * @returns {String}
 * */
export function formatTableColumn(row: number, col: number, callValue: any) {
	// 如果当前值为数组，使用 / 拼接（根据需求自定义）
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
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames label && value && children 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @returns {String}
 * */
export function filterEnum(callValue: any, enumData?: any, fieldNames?: FieldNamesProps, type?: 'tag') {
	const value = fieldNames?.value ?? 'value';
	const label = fieldNames?.label ?? 'label';
	const children = fieldNames?.children ?? 'children';
	let filterData: { [key: string]: any } = {};
	// 判断 enumData 是否为数组
	if (Array.isArray(enumData)) {
		filterData = findItemNested(enumData, callValue, value, children);
	}
	// 判断是否输出的结果为 tag 类型
	if (type == 'tag') {
		return filterData?.tagType ? filterData.tagType : '';
	} else {
		return filterData ? filterData[label] : '--';
	}
}
/**
 * @description 递归查找 callValue 对应的 enum 值
 * */
export function findItemNested(enumData: any, callValue: any, value: string, children: string) {
	return enumData.reduce((accumulator: any, current: any) => {
		if (accumulator) {
			return accumulator;
		}
		if (current[value] === callValue) {
			return current;
		}
		if (current[children]) {
			return findItemNested(current[children], callValue, value, children);
		}
	}, null);
}
/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
	if (!prop.includes('.')) {
		return row[prop] ?? '--';
	}
	prop.split('.').forEach(item => (row = row[item] ?? '--'));
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

// 2023.03.01增加通用方法，将普通对象转换为tree结构
// data数据格式[
//     { name: 'tree1', id: 1, parentId: 0 },
//     { name: 'tree2', id: 2, parentId: 0 }]

// 1、id与parentId这两个字段必须有
// 2、树形tree需要注意Id与parentId循环依赖的问题
// 3、callback每次生成一新的节点的时回调的方法
export function convertTree(data: any, callback?: any, keyPid = 'pid') {
	if (!data) {
		return;
	}
	let treeIds: string | any[] = [];
	let rootData = [];
	data.forEach((x: any) => {
		if (!x.children) {
			x.children = [];
		}
		if (
			!x.hidden &&
			x.id !== undefined &&
			x.id !== x[keyPid] &&
			!data.some((s: any) => {
				return x[keyPid] === s.id;
			})
		) {
			x.isRoot = true;
			callback && callback(x, data, true, treeIds);
			rootData.push(x);
			getTree(x.id, x, data, callback, treeIds, keyPid);
		}
	});
	const exceptionNodes = data.filter((f: any) => {
		return treeIds.indexOf(f.id) === -1 && !f.hidden;
	});

	rootData.push(...exceptionNodes);
	return rootData;
}

// 2023.03.01增加通用方法，将普通对象转换为tree结构
export function getTree(id: any, node: any, data: any, callback: any, treeIds: any, keyPid: any) {
	if (treeIds.indexOf(id) === -1) {
		treeIds.push(id);
	}
	data.forEach((x: any) => {
		if (!x.hidden && x[keyPid] === id) {
			if (!node.children) {
				node.children = [];
			}
			callback && callback(x, node, false);
			node.children.push(x);
			getTree(x.id, x, data, callback, treeIds, keyPid);
		}
	});
}
