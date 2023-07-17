// * 后端接口请求地址1
const BASEURL1: any = {
	dev: '/admin/api',
	test: 'https://www.fastmock.site/mock/ffbd1a652f84b5aee2f4ef14440a10df/admin/api',
	prod: ''
};
// * 后端接口请求地址2
const BASEURL2: any = {
	dev: '/nethos/minio',
	test: 'https://xxxxxxxxxx/nethos/minio',
	prod: ''
};
export const PORT1 = BASEURL1[import.meta.env.VITE_APP_MODE];
export const PORT2 = BASEURL2[import.meta.env.VITE_APP_MODE];
