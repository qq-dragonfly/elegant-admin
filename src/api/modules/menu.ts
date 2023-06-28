import { PORT1 } from '@/api/config/servicePort';

import http from '@/api';

/********** 菜单管理模块 ***********/
// * 获取菜单列表
export const getSysMenuListApi = (params: any) => {
	return http.get<any>(PORT1 + `/menu/page`, params);
};
// * 获取所有菜单列表
export const getSysMenuAllListApi = (params: any) => {
	return http.get<any>(PORT1 + `/menu/all`, params);
};
// * 新增菜单
export const addSysMenuApi = (params: any) => {
	return http.post<any>(PORT1 + `/menu/save`, params);
};

// * 编辑菜单
export const editSysMenuApi = (params: any) => {
	return http.put<any>(PORT1 + `/menu/update`, params);
};
// * 菜单详情
export const getSysMenuDetailApi = (params: any) => {
	return http.get<any>(PORT1 + `/menu/${params.id}`, params);
};
// * 删除菜单
export const delSysMenuMultipleApi = (params: { idList: string[] }) => {
	return http.delete<any>(PORT1 + `/menu/deleteIdList`, params);
};
