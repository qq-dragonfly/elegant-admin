/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 * @Description: 入口文件
 * @version:
 * @Date: 2023-02-07
 * @LastEditors: 97972619@qq.com
 * @LastEditTime:
 * @Author: 97972619@qq.com
 */
import 'default-passive-events'; //Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners，导致触发了告警
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import pinia from './store';
import router from './router';
import useSettingsStore from './store/modules/settings';

// 自定义指令
import directives from '@/directives/index';
// 加载 svg 图标
import 'virtual:svg-icons-register';
// 全局样式
import '@/assets/styles/globals.scss';
//(tailwindcss），原子化css项目初体验~~哈哈nice
import '@/assets/styles/tailwind.css';

// 加载 iconify 图标（element plus）
import { downloadAndInstall } from '@/iconify-ep';
// errorHandler
import errorHandler from '@/utils/errorHandler';

if (useSettingsStore().app.iconifyOfflineUse) {
	downloadAndInstall();
}
const app = createApp(App);
app.config.errorHandler = errorHandler;

app.use(directives);
app.use(ElementPlus);
app.use(pinia);
app.use(router);
router.isReady().then(() => app.mount('#app'));
