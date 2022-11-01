import useRouteStore from './route';
import useMenuStore from './menu';
import api from '@/api';

const useUserStore = defineStore(
	// 唯一ID
	'user',
	{
		state: () => ({
			username: localStorage.username || '',
			token: localStorage.token || '',
			failure_time: localStorage.failure_time || '',
			permissions: [] as string[]
		}),
		getters: {
			isLogin: state => {
				let retn = false;
				if (state.token) {
					if (new Date().getTime() < parseInt(state.failure_time) * 1000) {
						retn = true;
					}
				}
				return retn;
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
							localStorage.setItem('username', res.data.userInfo.userName);
							localStorage.setItem('token', res.data.token);
							localStorage.setItem('failure_time', res.data.userInfo.time);
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
					localStorage.removeItem('username');
					localStorage.removeItem('token');
					localStorage.removeItem('failure_time');
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
