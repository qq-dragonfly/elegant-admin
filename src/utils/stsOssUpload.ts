//Client.js
import OSS from 'ali-oss';
import { getOssToken } from '@/api/modules/upload';

export default function Client(data: any) {
	//后端提供数据
	return new OSS({
		bucket: 'gjwlyy-specialdisease', // 你的 OSS bucket 名称
		region: 'oss-cn-hangzhou', // bucket 所在地
		accessKeyId: data.accessKeyId,
		accessKeySecret: data.accessKeySecret,
		stsToken: data.stsToken,
		refreshSTSToken: async () => {
			const ossData: any = await getOssToken({});
			return {
				bucket: 'gjwlyy-specialdisease', // 你的 OSS bucket 名称
				region: 'oss-cn-hangzhou', // bucket 所在地
				accessKeyId: ossData.accessKeyId,
				accessKeySecret: ossData.accessKeySecret,
				stsToken: ossData.securityToken
			};
		},
		refreshSTSTokenInterval: 300000
	});
}
