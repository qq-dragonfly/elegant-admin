import { PORT1 } from '@/api/config/servicePort';

import http from '@/api';

/********** 角色管理模块 ***********/
// * 获取角色列表
export const getSysRoleListApi = (params: any) => {
	return http.post<any>(PORT1 + `/role/page`, params);
};
// * 新增角色
export const addSysRoleApi = (params: any) => {
	return http.post<any>(PORT1 + `/role/save`, params);
};

// * 编辑角色
export const editSysRoleApi = (params: any) => {
	return http.put<any>(PORT1 + `/role/update`, params);
};
// * 角色详情
export const getSysRoleDetailApi = (params: any) => {
	return http.get<any>(PORT1 + `/role/${params.id}`, params);
};
// * 删除角色
export const delSysRoleApi = (params: { id: string }) => {
	return http.delete<any>(PORT1 + `/role/delete`, params);
};
// * 角色权限配置
export const saveSysRoleAuthApi = (params: any) => {
	return http.post<any>(PORT1 + `/roleAuth/update`, params);
};
// * 获取角色权限配置
export const getSysRoleAuthApi = (params: { id: string }) => {
	return http.get<any>(PORT1 + `/roleAuth/${params.id}`, params);
};
