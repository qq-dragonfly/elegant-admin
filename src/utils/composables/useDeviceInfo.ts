import UAParser from 'ua-parser-js';
/** 获取设备信息 */
export function useDeviceInfo() {
	const parser = new UAParser();
	const result = parser.getResult();
	return result;
}
