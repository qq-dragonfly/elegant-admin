import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import dayjs from 'dayjs';
import pkg from './package.json';
import createVitePlugins from './vite/plugins';

// https://vitejs.dev/config/
// 开发环境command值为serve，生产环境为build
export default ({ mode = 'development', command = 'serve' }) => {
	const env = loadEnv(mode, process.cwd());
	// 全局 scss 资源
	const scssResources: Array<any> = [];
	fs.readdirSync('src/assets/styles/resources').forEach(dirname => {
		if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
			scssResources.push(`@use "src/assets/styles/resources/${dirname}" as *;`);
		}
	});
	return defineConfig({
		base: './',
		// 开发服务器选项 https://cn.vitejs.dev/config/#server-options
		server: {
			port: 9000,
			host: '0.0.0.0',
			proxy: {
				'/nethos/': {
					// target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
					target: 'https://t-zbzk.zjwlyy.cn/nethos',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/nethos/, '')
				}
			}
		},
		// 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
		build: {
			outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
			sourcemap: env.VITE_BUILD_SOURCEMAP === 'true'
		},
		define: {
			__SYSTEM_INFO__: JSON.stringify({
				pkg: {
					version: pkg.version,
					dependencies: pkg.dependencies,
					devDependencies: pkg.devDependencies
				},
				lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
			})
		},
		optimizeDeps: {
			include: [
				'element-plus',
				'element-plus/es',
				'element-plus/es/components/message/style/css',
				'element-plus/es/components/notification/style/css',
				'element-plus/es/components/message-box/style/css',
				'element-plus/es/components/loading/style/css',
				'@better-scroll/core'
			]
		},
		plugins: createVitePlugins(env, command === 'build'),
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: scssResources.join('')
				}
			}
		}
	});
};
