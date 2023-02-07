import { ResPage } from '@/api/interface';
import { PORT2 } from '@/api/config/servicePort';

import http from '@/api';

/********** 宣教模块 ***********/
// * 获取宣教分类列表
export const getMissionsCateApi = (params: any) => {
	return http.post<ResPage<any>>(PORT2 + `/propagandaCategory/page`, params);
};

// * 新增宣教分类
export const addCateApi = (params: any) => {
	return http.post(PORT2 + `/propagandaCategory/save`, params);
};

// * 编辑宣教分类
export const editCateApi = (params: any) => {
	return http.put(PORT2 + `/propagandaCategory/update`, params);
};
// * 宣教分类详情
export const getCateDetailApi = (params: any) => {
	return http.get(PORT2 + `/propagandaCategory/${params.id}`, params);
};
// * 删除宣教分类
export const delMissionsCateApi = (params: { id: string }) => {
	return http.delete(PORT2 + `/propagandaCategory/delete`, params);
};
