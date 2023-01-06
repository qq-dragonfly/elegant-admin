// * 登录模块
import { Result } from '@/api/interface/index';

export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
		id: string;
		captcha: string;
	}
	export interface ReqImageCaptchaForm {
		id: string;
	}
	export interface ResLogin<T = any> extends Result {
		data: T;
	}
	export interface ResUserInfo {
		id: string;
		image?: string;
		name: string;
		phone: string;
		role: [];
		sysDept?: object;
		thirdChannel?: string;
		createTime?: string;
		thirdChannelList?: [];
	}
	export interface ResAuthButtons {
		[key: string]: {
			[key: string]: boolean;
		};
	}
}
