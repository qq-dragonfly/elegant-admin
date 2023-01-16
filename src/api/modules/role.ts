import { ResPage } from '@/api/interface';
import { Role } from '@/api/interface/sys_role';
import { PORT1 } from '@/api/config/servicePort';

import http from '@/api';

/********** 角色管理模块 ***********/
// * 获取角色列表
export const getSysRoleList = (params: Role.ReqGetRoleParams) => {
	return http.post<ResPage<Role.ResRoleList>>(PORT1 + `/role/page`, params);
};
