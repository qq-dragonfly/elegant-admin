import { ResPage } from '@/api/interface';
import { PORT1 } from '@/api/config/servicePort';

import http from '@/api';

/********** 组织模块 ***********/
// * 获取科室列表
export const getDepartmentListApi = (params: any) => {
	return http.post<ResPage<any>>(PORT1 + `/department/page`, params);
};
