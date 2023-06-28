import fs from 'node:fs';
import ViteRestart from 'vite-plugin-restart';
// 通过监听文件修改，自动重启vite 服务。 最常用的场景就是监听 vite.config.js 和 .env.development 文件，
// 我们知道，修改vite 配置文件和环境配置文件，是需要重启vite 才会生效，通过这个插件，我们将从反复重启中解脱出来
export default function createRestart() {
	const pluginsFile: string[] = [];
	fs.readdirSync('vite/plugins').forEach(dirname => {
		if (fs.statSync(`vite/plugins/${dirname}`).isFile()) {
			pluginsFile.push(`vite/plugins/${dirname}`);
		}
	});
	return ViteRestart({
		restart: pluginsFile
	});
}
