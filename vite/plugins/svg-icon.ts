import path from 'node:path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// 用于生成 svg 雪碧图.
//特征
// 预加载 在项目运行时就生成所有图标,只需操作一次 dom
// 高性能 内置缓存,仅当文件被修改时才会重新生成
export default function createSvgIcon(isBuild: any) {
	return createSvgIconsPlugin({
		iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
		symbolId: 'icon-[dir]-[name]',
		svgoOptions: isBuild
	});
}
