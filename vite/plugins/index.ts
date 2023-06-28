import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import createRestart from './restart';
import createHtml from './html';
import createAutoImport from './auto-import';
import createComponents from './components';
import createSetupExtend from './setup-extend';
import createSvgIcon from './svg-icon';
import createCompression from './compression';
import createBanner from './banner';
import pluginEslint from './pluginEslint';
import createVisualizer from './visualizer';

export default function createVitePlugins(viteEnv: any, isBuild = false) {
	const vitePlugins: (PluginOption | PluginOption[] | any)[] = [
		vue({
			reactivityTransform: true
		}),
		vueJsx()
	];
	!isBuild && vitePlugins.push(createRestart());
	vitePlugins.push(createHtml(viteEnv, isBuild));
	vitePlugins.push(createAutoImport());
	vitePlugins.push(createComponents());
	vitePlugins.push(createSetupExtend());
	vitePlugins.push(createSvgIcon(isBuild));
	isBuild && vitePlugins.push(...createCompression(viteEnv));
	vitePlugins.push(createBanner());
	vitePlugins.push(pluginEslint());
	vitePlugins.push(createVisualizer());
	return vitePlugins;
}
