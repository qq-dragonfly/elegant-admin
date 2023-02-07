// * 角色管理模块
import { ReqPage } from '@/api/interface/index';

export namespace Role {
	export interface ReqGetRoleParams extends ReqPage {
		name: string;
	}
	export interface ResRoleList {
		id: string;
		name: string;
		children?: ResRoleList[];
	}
}
