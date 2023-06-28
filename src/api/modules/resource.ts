import { PORT1 } from '@/api/config/servicePort';

import http from '@/api';

/********** 接口资源管理模块 ***********/
// * 获取接口资源列表
export const getSysResourceListApi = (params: any) => {
	return http.post<any>(PORT1 + `/apiPermissions/page`, params);
};
// * 新增接口资源
export const addSysResourceApi = (params: any) => {
	return http.post<any>(PORT1 + `/apiPermissions/save`, params);
};

// * 编辑接口资源
export const editSysResourceApi = (params: any) => {
	return http.put<any>(PORT1 + `/apiPermissions/update`, params);
};
// * 接口资源详情
export const getSysResourceDetailApi = (params: any) => {
	return http.get<any>(PORT1 + `/apiPermissions/${params.id}`, params);
};
// * 删除接口资源
export const delSysResourceApi = (params: { id: string }) => {
	return http.delete<any>(PORT1 + `/apiPermissions/delete`, params);
};
