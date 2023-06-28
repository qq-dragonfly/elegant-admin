import { ResPage } from '@/api/interface';
import { PORT1 } from '@/api/config/servicePort';

import http from '@/api';

/********** 组织模块 ***********/
// * 获取院区列表
export const getHospitalListApi = (params: any) => {
	return http.post<ResPage<any>>(PORT1 + `/hospitalArea/page`, params);
};
// * 新增院区
export const addHospitalApi = (params: any) => {
	return http.post<any>(PORT1 + `/hospitalArea/save`, params);
};

// * 编辑院区
export const editHospitalApi = (params: any) => {
	return http.put<any>(PORT1 + `/hospitalArea/update`, params);
};
// * 院区详情
export const getHospitalDetailApi = (params: any) => {
	return http.get<any>(PORT1 + `/hospitalArea/${params.id}`, params);
};
// * 删除院区
export const delHospitalApi = (params: any) => {
	return http.delete<any>(PORT1 + `/hospitalArea/delete`, params);
};

// * 获取科室列表
export const getDepartmentListApi = (params: any) => {
	return http.post<ResPage<any>>(PORT1 + `/department/page`, params);
};
// * 新增科室
export const addDepartmentApi = (params: any) => {
	return http.post<any>(PORT1 + `/department/save`, params);
};

// * 编辑科室
export const editDepartmentApi = (params: any) => {
	return http.put<any>(PORT1 + `/department/update`, params);
};
// * 科室详情
export const getDepartmentDetailApi = (params: any) => {
	return http.get<any>(PORT1 + `/department/${params.id}`, params);
};
// * 删除科室
export const delDepartmentApi = (params: any) => {
	return http.delete<any>(PORT1 + `/department/delete`, params);
};

// * 获取医护列表
export const getDocListApi = (params: any) => {
	return http.post<ResPage<any>>(PORT1 + `/doctorsNurses/page`, params);
};
// * 新增医护
export const addDocApi = (params: any) => {
	return http.post<any>(PORT1 + `/doctorsNurses/save`, params);
};

// * 编辑医护
export const editDocApi = (params: any) => {
	return http.put<any>(PORT1 + `/doctorsNurses/update`, params);
};
// * 医护详情
export const getDocDetailApi = (params: any) => {
	return http.get<any>(PORT1 + `/doctorsNurses/${params.id}`, params);
};
// * 删除医护
export const delDocApi = (params: any) => {
	return http.delete<any>(PORT1 + `/doctorsNurses/delete`, params);
};
