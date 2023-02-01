import { ResPage } from '@/api/interface';
import { User } from '@/api/interface/sys_user';
import { PORT1 } from '@/api/config/servicePort';

import http from '@/api';

/********** 用户管理模块 ***********/
// * 获取用户列表
export const getSysUserListApi = (params: User.ReqGetUserParams) => {
	return http.post<ResPage<User.ResUserList>>(PORT1 + `/sysUser/page`, params);
};

// * 新增用户
export const addUserApi = (params: any) => {
	return http.post(PORT1 + `/sysUser`, params);
};

// * 批量添加用户
export const BatchAddUser = (params: FormData) => {
	return http.post(PORT1 + `/user/import`, params);
};

// * 编辑用户
export const editUserApi = (params: any) => {
	return http.put(PORT1 + `/sysUser`, params);
};
// * 用户详情
export const getSysUserDetailApi = (params: any) => {
	return http.get(PORT1 + `/sysUser/detail/${params.id}`, params);
};
// * 删除用户
export const delSysUserApi = (params: { ids: string[] }) => {
	return http.delete(PORT1 + `/sysUser/remove`, params);
};

// * 重置用户密码
export const resetUserPassWordApi = (params: { id: string }) => {
	return http.put(PORT1 + `/sysUser/resetPwd/${params.id}`);
};

// * 导出用户数据
export const exportUserInfoApi = (params: User.ReqGetUserParams) => {
	return http.post<BlobPart>(PORT1 + `/user/export`, params, { responseType: 'blob' });
};

// * 获取用户部门列表
export const getUserDepartment = () => {
	return http.get<User.ResDepartment>(PORT1 + `/user/department`);
};
