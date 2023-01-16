// * 用户管理模块
import { ReqPage } from '@/api/interface/index';

export namespace User {
	export interface ReqGetUserParams extends ReqPage {
		name: string;
		gender: string;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		openStatus: string;
	}
	export interface ResUserList {
		id: string;
		name: string;
		gender: string;
		age: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		openStatus: string;
		avatar: string;
		children?: ResUserList[];
	}
	export interface ResDepartment {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
}
