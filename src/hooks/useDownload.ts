import { ElNotification } from 'element-plus';

/**
 * @description 接收数据流生成blob，创建链接，下载文件
 * @param {Function} api 导出表格的api方法(必传)
 * @param {String} tempName 导出的文件名(必传)
 * @param {String} rows 导出的文件名(必传)
 * @param {Object} params 导出的参数(默认为空对象)
 * @param {Boolean} isNotify 是否有导出消息提示(默认为 true)
 * @param {String} fileType 导出的文件格式(默认为.xlsx)
 * @return void
 * */

export const useDownload = async (
	type: 'httpPath', //type为httpPath 为后端直接返回下载地址
	api: (param: any) => Promise<any>,
	tempName: string,
	params: any = {},
	parseData = function (res: any) {
		return {
			rows: res.data
		};
	},
	isNotify = true,
	fileType = '.xlsx'
) => {
	if (isNotify) {
		ElNotification({
			title: '温馨提示',
			message: '如果数据庞大会导致下载缓慢哦，请您耐心等待！',
			type: 'info',
			duration: 3000
		});
	}
	try {
		const res = await api(params);
		// 这个地方的 type，经测试不传也没事，因为会自动识别文件类型
		// const blob = new Blob([res], {
		// 	type: 'application/vnd.ms-excel;charset=UTF-8'
		// });
		let downUrl = parseData(res).rows;
		if (type === 'httpPath') {
			downUrl = downUrl.replace('http', 'https');
			fetch(downUrl, {
				mode: 'cors'
			})
				.then((response: any) => response.blob())
				.then((res: any) => {
					downloadBlob(res, tempName, fileType);
				});
			return;
		}
		downloadBlob(downUrl, tempName, fileType);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};
function downloadBlob(downUrl: any, tempName: any, fileType: any) {
	const blob = new Blob([downUrl]);
	// 兼容edge不支持createObjectURL方法
	const nav = window.navigator as any;
	if (nav.msSaveOrOpenBlob) {
		nav.msSaveOrOpenBlob(blob, tempName + fileType);
	}
	const blobUrl = window.URL.createObjectURL(blob);
	const exportFile = document.createElement('a');
	exportFile.style.display = 'none';
	exportFile.download = `${tempName}${fileType}`;
	exportFile.href = blobUrl;
	document.body.appendChild(exportFile);
	exportFile.click();
	// 去除下载对url的影响
	document.body.removeChild(exportFile);
	window.URL.revokeObjectURL(blobUrl);
}
