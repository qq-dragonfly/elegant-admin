/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 *
 * @Description:vite.config.js配置
 * @version:
 * @Date: 2023-02-07
 * @LastEditors:  97972619@qq.com
 * @LastEditTime:
 * @Author: 97972619@qq.com
 */
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
			port: 3000,
			host: '0.0.0.0',
			proxy: {
				'/admin': {
					target: 'https://www.fastmock.site/mock/ffbd1a652f84b5aee2f4ef14440a10df/',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/admin/, 'admin')
				}
				// '/nethos': {
				// 	target: 'https://xxxxxxxxxxx.cn',
				// 	changeOrigin: true,
				// 	rewrite: path => path.replace(/^\/nethos/, 'nethos')
				// }
			}
		},
		// 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
		build: {
			outDir: 'dist',
			sourcemap: false, //是否在打包时生成 sourcemap
			minify: 'esbuild', // 混淆器，terser 构建后文件体积更小，'terser' | 'esbuild'
			// terserOptions: {
			// 	compress: {
			// 		// warnings: false,
			// 		drop_console: true, //打包时删除console
			// 		drop_debugger: true, //打包时删除 debugger
			// 		pure_funcs: ['console.log']
			// 	}
			// },
			// 禁用 gzip 压缩大小报告，可略微减少打包时间
			reportCompressedSize: false,
			// 规定触发警告的 chunk 大小.默认500
			chunkSizeWarningLimit: 4000,
			rollupOptions: {
				// 静态资源分类打包
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
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
			// vite在启动之初就对以下资源进行预打包
			include: [
				'element-plus',
				'element-plus/es',
				'@element-plus/icons-vue',
				'tinymce',
				'tinymce/tinymce',
				'@tinymce/tinymce-vue',
				'tinymce/themes/silver/theme',
				'tinymce/icons/default/icons',
				'tinymce/models/dom',
				'tinymce/plugins/autolink',
				'tinymce/plugins/autoresize',
				'tinymce/plugins/fullscreen',
				'tinymce/plugins/image',
				'tinymce/plugins/insertdatetime',
				'tinymce/plugins/link',
				'tinymce/plugins/lists',
				'tinymce/plugins/media',
				'tinymce/plugins/preview',
				'tinymce/plugins/table',
				'tinymce/plugins/wordcount',
				'tinymce/plugins/code',
				'tinymce/plugins/searchreplace',
				'vue',
				'pinia',
				'mitt',
				'sass',
				'vue-router',
				'tailwindcss/plugin',
				'@better-scroll/core',
				'xgplayer',
				'xgplayer-hls',
				'ali-oss',
				'@vueuse/core',
				'axios'
			]
		},
		plugins: createVitePlugins(env, command === 'build'),
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'#': path.resolve(__dirname, 'src/types')
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
