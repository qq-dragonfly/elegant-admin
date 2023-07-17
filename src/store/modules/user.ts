/*
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                               神兽保佑            永无BUG
 *
 * @Description:用户相关
 * @version:
 * @Date: 2023-01-04
 * @LastEditors: 97972619@qq.com
 * @LastEditTime: 2023-01-04
 * @Author: 97972619@qq.com
 */
import { getAuthMenuListApi, getUserInfoApi, loginApi } from '@/api/modules/login';
import useRouteStore from './route';
import useMenuStore from './menu';
import { setLocal, getLocal, removeLocal } from '@/utils/storage';
import api from '@/api';

const useUserStore = defineStore(
	// 唯一ID
	'user',
	{
		state: () => ({
			username: getLocal('username') || '',
			token: getLocal('token') || '',
			failure_time: getLocal('failure_time') || '',
			permissions: [] as string[],
			controlResponseList: []
		}),
		getters: {
			isLogin: state => {
				let flag = false;
				if (state.token) {
					// if (new Date().getTime() < parseInt(state.failure_time)) {
					// 	flag = true;
					// }
					flag = true;
				}
				return flag;
			}
		},
		actions: {
			// setToken
			setToken(token: string) {
				this.token = token;
			},
			login(data: { username: string; password: string; captcha: string; id: string }) {
				return new Promise<void>((resolve, reject) => {
					loginApi(data)
						.then(async (res: any) => {
							if (res.code === 200) {
								setLocal('token', res.data.authInfo);
								setLocal('failure_time', new Date(res.data.expires).getTime());
								this.failure_time = new Date(res.data.expires).getTime();
								this.token = res.data.authInfo;
								resolve(res);
							}
						})
						.catch((error: any) => {
							reject(error);
						});
				});
			},
			getUserInfo() {
				return new Promise((resolve, reject) => {
					getUserInfoApi()
						.then(async (res: any) => {
							if (!res) {
								// 由于mockjs 不支持自定义状态码只能这样hack
								reject('error');
							}
							// 储存登录信息
							setLocal('username', res.data.name);
							this.username = res.data.name;
							resolve(res);
						})
						.catch(error => {
							reject(error);
						});
				});
			},
			logout() {
				return new Promise<void>(resolve => {
					const routeStore = useRouteStore();
					const menuStore = useMenuStore();
					removeLocal('username');
					removeLocal('token');
					removeLocal('failure_time');
					this.username = '';
					this.token = '';
					this.failure_time = '';
					routeStore.removeRoutes();
					menuStore.setActived(0);
					resolve();
				});
			},
			// 获取我的权限
			getPermissions() {
				return new Promise<string[]>(resolve => {
					getAuthMenuListApi().then(res => {
						this.permissions = res.data.permissions;
						this.controlResponseList = res.data.controlResponseList;
						resolve(res.data);
					});
				});
			},
			editPassword(data: { password: string; newpassword: string }) {
				return new Promise<void>(resolve => {
					api
						.post(
							'member/edit/password',
							{
								username: this.username,
								password: data.password,
								newpassword: data.newpassword
							},
							{
								baseURL: '/mock/'
							}
						)
						.then(() => {
							resolve();
						});
				});
			}
		}
	}
);

export default useUserStore;
