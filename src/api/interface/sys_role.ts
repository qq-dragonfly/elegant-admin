// * 角色管理模块
import { ReqPage } from '@/api/interface/index';

export namespace Role {
	export interface ReqGetRoleParams extends ReqPage {
		name: string;
		gender: string;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		openStatus: string;
	}
	export interface ResRoleList {
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
		children?: ResRoleList[];
	}
	export interface ResDepartment {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
}
