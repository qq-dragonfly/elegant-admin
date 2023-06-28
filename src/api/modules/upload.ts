import { PORT1, PORT2 } from '@/api/config/servicePort';

import http from '@/api';

/**
 * @name 文件上传模块
 */
// * 获取临时授权token
export const getOssToken = (params: any) => {
	return http.get<any>(PORT1 + `/oss/token`, params);
};
// * 图片视频上传
export const uploadApi = (params: any) => {
	return http.post<any>(PORT2 + `/upload/upload`, params);
};
