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
			permissions: [] as string[]
		}),
		getters: {
			isLogin: state => {
				let flag = false;
				if (state.token) {
					if (new Date().getTime() < parseInt(state.failure_time) * 1000) {
						flag = true;
					}
				}
				return flag;
			}
		},
		actions: {
			// setToken
			setToken(token: string) {
				this.token = token;
			},
			login(data: { username: string; password: string }) {
				return new Promise<void>((resolve, reject) => {
					api
						.post('/api/token', data)
						.then((res: any) => {
							setLocal('username', res.data.userInfo.userName);
							setLocal('token', res.data.userInfo.token);
							setLocal('failure_time', res.data.userInfo.failure_time);

							this.username = res.data.userInfo.userName;
							this.token = res.data.token;
							this.failure_time = res.data.userInfo.time;
							resolve();
						})
						.catch((error: any) => {
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
					// 通过 mock 获取权限
					api
						.get('/api/system/mymenu', {
							username: this.username
						})
						.then((res: any) => {
							this.permissions = res.data.permissions;
							resolve(res.data.permissions);
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
