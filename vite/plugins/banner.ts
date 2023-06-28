import banner from 'vite-plugin-banner';
//打包的文件添加注释
export default function createBanner() {
	return banner(`
	/**
 * 	由 智慧网络医院 提供技术支持
 */
	`);
}
