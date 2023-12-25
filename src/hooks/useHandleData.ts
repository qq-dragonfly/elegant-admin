import { ElMessage, ElMessageBox } from 'element-plus';
import type { HandleData } from './interface';

/**
 * @description 操作单条数据信息(二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法(必传)
 * @param {Object} params 携带的操作数据参数 {id,params}(必传)
 * @param {String} message 提示信息(必传)
 * @param {String} confirmType icon类型(不必传,默认为 warning)
 * @return Promise
 */

export const useHandleData = <P = any, R = any>(
	api: (params: P) => Promise<R>,
	params: Parameters<typeof api>[0],
	message: string,
	type: HandleData.type = 'confirm',
	confirmType: HandleData.MessageType = 'warning',
	title?: any,
	confirmButtonText?: any,
	cancelButtonText?: any
) => {
	return new Promise((resolve, reject) => {
		ElMessageBox[type](`${message}?`, `${title || '温馨提示'}`, {
			confirmButtonText: `${confirmButtonText || '确认'}`,
			cancelButtonText: `${cancelButtonText || '取消'}`,
			type: confirmType,
			draggable: true,
			inputPattern: /^.+$/,
			inputErrorMessage: '请输入!'
		})
			.then(async ({ value }) => {
				let para: any = params;
				para.auditRemark = value;
				const res = await api(params);
				if (!res) {
					return reject(new Error('err'));
				}
				ElMessage({
					type: 'success',
					message: `操作成功!`
				});
				resolve(true);
			})
			.catch(err => {
				console.log('err', err);
			});
	});
};
