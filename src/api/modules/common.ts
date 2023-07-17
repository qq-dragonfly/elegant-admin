import { PORT1 } from '@/api/config/servicePort';

import http from '@/api';

/********** 公共模块 ***********/
// * 根据上级获取地址码表
export const getRegionNextApi = (params: any) => {
	return http.get<any>(PORT1 + `/region/next`, params);
};
// * 指定type的字典信息
export const getDictTypeApi = (params: any) => {
	return http.get<any>(PORT1 + `/dict/table`, params);
};
// * 指定code,type 查询字典
export const getDictTypeCodeApi = (params: any) => {
	return http.get<any>(PORT1 + `/dict/code`, params);
};
// * 指定id 查询字典详情
export const getDictIdApi = (params: any) => {
	return http.get<any>(PORT1 + `/dict/detail`, params);
};
// * 获取首页- 当日随访信息
export const getCollectDayFollowInfoApi = (params: any) => {
	return http.post<any>(PORT1 + `/index/collectDay`, params);
};
// * 获取首页- 当月随访信息
export const getCollectMonthFollowInfoApi = (params: any) => {
	return http.post<any>(PORT1 + `/index/collectMonth`, params);
};
// * 首页- 近半年随访信息
export const getCollectYearFollowInfoApi = (params: any) => {
	return http.post<any>(PORT1 + `/index/collectYear`, params);
};
// * 首页- 异常事件信息
export const getEmergencyCollectInfoApi = (params: any) => {
	return http.post<any>(PORT1 + `/index/emergencyCollect`, params);
};
// * 首页- 近半年异常事件信息
export const getEmergencyCollectYearInfoApi = (params: any) => {
	return http.post<any>(PORT1 + `/index/emergencyCollectYear`, params);
};
