/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 * @Description: //表格选择器配置
 * @version:
 * @Date: 2023-01-10
 * @LastEditors: 97972619@qq.com
 * @LastEditTime:
 * @Author: 97972619@qq.com
 */
export default {
	pageSize: 15, //表格每一页条数
	parseData: function (res: any) {
		return {
			data: res.data,
			rows: res.data.records, //分析行数据字段结构
			total: res.data.total, //分析总数字段结构
			msg: res.message, //分析描述字段结构
			code: res.code //分析状态字段结构
		};
	},
	request: {
		page: 'pageNum', //规定当前分页字段
		pageSize: 'pageSize', //规定一页条数字段
		keyword: 'keyword' //规定搜索字段
	},
	props: {
		label: 'label', //映射label显示字段
		value: 'value' //映射value值字段
	}
};
