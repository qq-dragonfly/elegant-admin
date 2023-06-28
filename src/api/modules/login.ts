import { Login } from '@/api/interface/login';
import { PORT1 } from '@/api/config/servicePort';
// @ts-ignore
import DynamicRouter from '@/assets/json/dynamicRouter.json';
// import qs from 'qs';
import http from '@/api';

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + `/login/sysUser`, params, { headers: { noLoading: true } }); // 正常 post json 请求  ==>  application/json
	//return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	//return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	//return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 获取图形验证码
export const getImageCaptchaApi = (params: Login.ReqImageCaptchaForm) => {
	return http.get<any>(PORT1 + `/login/captcha.jpg`, params, { headers: { noLoading: true }, responseType: 'blob' });
};

// * 获取用户信息
export const getUserInfoApi = () => {
	return http.get<Login.ResUserInfo>(PORT1 + `/sysUser/detail/current`, {}, { headers: { noLoading: true } });
};

// * 获取菜单列表

export const getAuthMenuListApi = () => {
	return http.post<any>(PORT1 + `/sysUser/currentUserRange`, {}, { headers: { noLoading: true } });
	// 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
	// return new Promise<any>(resolve => {
	// 	// 通过 mock 获取权限
	// 	resolve(DynamicRouter);
	// });
};
