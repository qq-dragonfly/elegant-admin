<template>
	<div>
		<el-drawer v-model="isShow" title="应用配置" direction="rtl" :size="360">
			<el-alert
				title="应用配置可实时预览效果，但只是临时生效，要想真正作用于项目，可以点击下方的“复制配置”按钮，并将配置粘贴到 src/settings.ts 文件中。同时建议在生产环境隐藏应用配置功能。"
				type="error"
				:closable="false"
			/>
			<el-divider>主题模式</el-divider>
			<div class="color-scheme">
				<div
					class="switch"
					:class="settings.app.colorScheme"
					@click="settings.app.colorScheme = settings.app.colorScheme === 'dark' ? 'light' : 'dark'"
				>
					<el-icon class="icon">
						<svg-icon :name="settings.app.colorScheme === 'light' ? 'ep:sunny' : 'ep:moon'" />
					</el-icon>
				</div>
			</div>
			<el-divider>主题颜色</el-divider>
			<div class="text-center">
				<el-color-picker v-model="settings.app.themeColor" :predefine="colorList" @change="changePrimary" />
			</div>
			<el-divider v-if="settingsStore.mode === 'pc'"> 导航栏模式</el-divider>
			<div v-if="settingsStore.mode === 'pc'" class="menu-mode">
				<el-tooltip content="侧边栏模式（含主导航）" placement="top" :show-after="500">
					<div
						class="mode mode-side"
						:class="{ active: settings.menu.menuMode === 'side' }"
						@click="settings.menu.menuMode = 'side'"
					>
						<div class="mode-container" />
						<el-icon>
							<svg-icon name="ep:check" />
						</el-icon>
					</div>
				</el-tooltip>
				<el-tooltip content="顶部模式" placement="top" :show-after="500">
					<div
						class="mode mode-head"
						:class="{ active: settings.menu.menuMode === 'head' }"
						@click="settings.menu.menuMode = 'head'"
					>
						<div class="mode-container" />
						<el-icon>
							<svg-icon name="ep:check" />
						</el-icon>
					</div>
				</el-tooltip>
				<el-tooltip content="侧边栏模式（不含主导航）" placement="top" :show-after="500">
					<div
						class="mode mode-single"
						:class="{ active: settings.menu.menuMode === 'single' }"
						@click="settings.menu.menuMode = 'single'"
					>
						<div class="mode-container" />
						<el-icon>
							<svg-icon name="ep:check" />
						</el-icon>
					</div>
				</el-tooltip>
			</div>
			<el-divider>导航栏</el-divider>
			<div class="setting-item">
				<div class="label">
					主导航切换跳转
					<el-tooltip content="开启该功能后，切换主导航时，页面自动跳转至该主导航下，次导航里第一个导航" placement="top">
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.menu.switchMainMenuAndPageJump" :disabled="['single'].includes(settings.menu.menuMode)" />
			</div>
			<div class="setting-item">
				<div class="label">
					次导航保持展开一个
					<el-tooltip content="开启该功能后，次导航只保持单个菜单的展开" placement="top">
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.menu.subMenuUniqueOpened" />
			</div>
			<div class="setting-item">
				<div class="label">次导航是否折叠</div>
				<el-switch v-model="settings.menu.subMenuCollapse" />
			</div>
			<div v-if="settingsStore.mode === 'pc'" class="setting-item">
				<div class="label">显示次导航折叠按钮</div>
				<el-switch v-model="settings.menu.enableSubMenuCollapseButton" />
			</div>
			<el-divider>顶栏</el-divider>
			<div class="setting-item">
				<div class="label">是否固定</div>
				<el-switch v-model="settings.topbar.fixed" />
			</div>
			<el-divider>工具栏</el-divider>
			<div v-if="settingsStore.mode === 'pc'" class="setting-item">
				<div class="label">
					全屏
					<el-tooltip
						content="该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果"
						placement="top"
					>
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.toolbar.enableFullscreen" />
			</div>
			<div class="setting-item">
				<div class="label">
					页面刷新
					<el-tooltip content="开启时会阻止原生 F5 键刷新功能，并采用框架提供的刷新模式进行页面刷新" placement="top">
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.toolbar.enablePageReload" />
			</div>
			<div class="setting-item">
				<div class="label">
					颜色主题
					<el-tooltip content="开启后可在明亮/暗黑模式中切换" placement="top">
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.toolbar.enableColorScheme" />
			</div>
			<el-divider v-if="settingsStore.mode === 'pc'"> 面包屑导航</el-divider>
			<div v-if="settingsStore.mode === 'pc'" class="setting-item">
				<div class="label">是否启用</div>
				<el-switch v-model="settings.breadcrumb.enable" />
			</div>
			<el-divider v-if="settingsStore.mode === 'pc'">多页签</el-divider>
			<div v-if="settingsStore.mode === 'pc'" class="setting-item">
				<div class="label">是否启用</div>
				<el-switch v-model="settings.tab.visible" />
			</div>
			<div v-if="settingsStore.mode === 'pc'" class="setting-item">
				<div class="label">多页签是否缓存</div>
				<el-switch v-model="settings.tab.isCache" />
			</div>
			<div v-if="settingsStore.mode === 'pc'" class="setting-item">
				<div class="label">多页签风格</div>
				<el-select v-model="settings.tab.mode" class="w-1/2" placeholder="请选择">
					<el-option v-for="item in settings.tab.modeList" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
			<el-divider>导航搜索</el-divider>
			<div class="setting-item">
				<div class="label">
					是否启用
					<el-tooltip content="对导航进行快捷搜索" placement="top">
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.navSearch.enable" />
			</div>
			<el-divider>底部版权</el-divider>
			<div class="setting-item">
				<div class="label">是否启用</div>
				<el-switch v-model="settings.copyright.enable" />
			</div>
			<div class="setting-item">
				<div class="label">日期</div>
				<el-input v-model="settings.copyright.dates" size="small" :disabled="!settings.copyright.enable" />
			</div>
			<div class="setting-item">
				<div class="label">公司</div>
				<el-input v-model="settings.copyright.company" size="small" :disabled="!settings.copyright.enable" />
			</div>
			<el-divider>控制台</el-divider>
			<div class="setting-item">
				<div class="label">
					是否开启
					<el-tooltip content="该功能开启时，登录成功默认进入控制台页面，反之则默认进入导航栏里第一个导航页面" placement="top">
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.dashboard.enable" />
			</div>
			<div class="setting-item">
				<div class="label">控制台名称</div>
				<el-input v-model="settings.dashboard.title" size="small" />
			</div>
			<el-divider>其它</el-divider>
			<div class="setting-item">
				<div class="label">
					组件尺寸
					<el-tooltip content="全局设置 Element Plus 组件的默认尺寸大小" placement="top">
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-radio-group v-model="settings.app.elementSize" size="small">
					<el-radio-button label="large"> 较大</el-radio-button>
					<el-radio-button label="default"> 默认</el-radio-button>
					<el-radio-button label="small"> 稍小</el-radio-button>
				</el-radio-group>
			</div>
			<div class="setting-item">
				<div class="label">是否启用权限</div>
				<el-switch v-model="settings.app.enablePermission" />
			</div>
			<div class="setting-item">
				<div class="label">
					载入进度条
					<el-tooltip content="该功能开启时，跳转路由会看到页面顶部有进度条" placement="top">
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.app.enableProgress" />
			</div>
			<div class="setting-item">
				<div class="label">
					动态标题
					<el-tooltip
						content="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置"
						placement="top"
					>
						<el-icon>
							<svg-icon name="ep:question-filled" />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="settings.app.enableDynamicTitle" />
			</div>
			<template v-if="isSupported" #footer>
				<el-button type="primary" @click="handleCopy">
					<template #icon>
						<el-icon>
							<svg-icon name="ep:document-copy" />
						</el-icon>
					</template>
					复制配置
				</el-button>
			</template>
		</el-drawer>
	</div>
</template>
<script lang="ts" setup name="AppSetting">
import { useClipboard } from '@vueuse/core';
import eventBus from '@/utils/eventBus';
import { ElMessage } from 'element-plus';
import useSettingsStore from '@/store/modules/settings';
import useMenuStore from '@/store/modules/menu';
import globalSettingsDefault from '@/settings.default';
import { useTheme } from '@/hooks/useTheme';

const route = useRoute();

const settingsStore = useSettingsStore();
const menuStore = useMenuStore();
const { changePrimary } = useTheme();
const isShow = ref(false);

const settings = ref(globalSettingsDefault);
// 预定义主题颜色
const colorList = ['#007AFF', '#DAA96E', '#0C819F', '#409EFF', '#27ae60', '#ff5c93', '#e74c3c', '#fd726d', '#f39c12', '#9b59b6'];
watch(
	() => settings,
	() => {
		settingsStore.updateSettings(settings.value);
		menuStore.setActived(0);
		settings.value.menu.menuMode !== 'single' && menuStore.setActived(route.fullPath);
	},
	{
		deep: true
	}
);

onMounted(() => {
	eventBus.on('global-theme-toggle', () => {
		isShow.value = !isShow.value;
	});
});

const { copy, copied, isSupported } = useClipboard();

watch(copied, val => {
	if (val) {
		ElMessage.success('复制成功，请粘贴到 src/settings.ts 文件中！');
	}
});

function handleCopy() {
	copy(JSON.stringify(settings.value, null, 4));
}
</script>
<style lang="scss" scoped>
:deep(.el-drawer__header) {
	padding-bottom: 20px;
	margin-bottom: initial;
	border-bottom: 1px solid var(--el-border-color);
}
:deep(.el-drawer__footer) {
	padding: 20px;
	border-top: 1px solid var(--el-border-color);
	transition: var(--el-transition-border);
	.el-button {
		width: 100%;
	}
}
:deep(.el-divider) {
	margin: 36px 0 24px;
}
.color-scheme {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 10px;

	$width: 50px;
	.switch {
		width: $width;
		height: 30px;
		cursor: pointer;
		background-color: var(--el-fill-color-darker);
		border-radius: 15px;
		transition: background-color 0.3s;
		&.dark {
			.icon {
				margin-left: calc($width - 24px - 3px);
			}
		}
		.icon {
			padding: 5px;
			margin: 3px;
			font-size: 24px;
			background-color: var(--el-fill-color-lighter);
			border-radius: 50%;
			transition: margin-left 0.3s, background-color 0.3s;
		}
	}
}
.menu-mode {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	padding-bottom: 10px;
	.mode {
		position: relative;
		width: 80px;
		height: 55px;
		margin: 10px;
		overflow: hidden;
		cursor: pointer;
		background-color: var(--g-app-bg);
		border-radius: 5px;
		box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
		transition: 0.2s;
		&:hover {
			box-shadow: 0 0 5px 1px var(--el-border-color-darker);
		}
		&.active {
			box-shadow: 0 0 0 2px var(--el-color-primary);
		}
		&::before,
		&::after,
		.mode-container {
			position: absolute;
			pointer-events: none;
			border-radius: 3px;
		}
		.mode-container::before {
			position: absolute;
			width: 100%;
			height: 100%;
			content: '';
			background-color: var(--g-sub-sidebar-menu-active-bg);
			opacity: 0.2;
		}
		&-side {
			&::before {
				top: 5px;
				bottom: 5px;
				left: 5px;
				width: 10px;
				content: '';
				background-color: var(--g-sub-sidebar-menu-active-bg);
			}
			&::after {
				top: 5px;
				bottom: 5px;
				left: 20px;
				width: 15px;
				content: '';
				background-color: var(--g-sub-sidebar-menu-active-bg);
				opacity: 0.5;
			}
			.mode-container {
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 40px;
				border: 1px dashed var(--g-sub-sidebar-menu-active-bg);
			}
		}
		&-head {
			&::before {
				top: 5px;
				right: 5px;
				left: 5px;
				height: 10px;
				content: '';
				background-color: var(--g-sub-sidebar-menu-active-bg);
			}
			&::after {
				top: 20px;
				bottom: 5px;
				left: 5px;
				width: 15px;
				content: '';
				background-color: var(--g-sub-sidebar-menu-active-bg);
				opacity: 0.5;
			}
			.mode-container {
				top: 20px;
				right: 5px;
				bottom: 5px;
				left: 25px;
				border: 1px dashed var(--g-sub-sidebar-menu-active-bg);
			}
		}
		&-single {
			&::before {
				position: absolute;
				top: 5px;
				bottom: 5px;
				left: 5px;
				width: 15px;
				content: '';
				background-color: var(--g-sub-sidebar-menu-active-bg);
				opacity: 0.5;
			}
			.mode-container {
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 25px;
				border: 1px dashed var(--g-sub-sidebar-menu-active-bg);
			}
		}
		i {
			position: absolute;
			right: 10px;
			bottom: 10px;
			display: none;
		}
		&.active i {
			display: block;
			color: var(--el-color-primary);
		}
	}
}
.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 10px;
	margin: 5px 0;
	border-radius: 5px;
	transition: all 0.3s;
	.label {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: var(--el-text-color-regular);
		i {
			margin-left: 4px;
			font-size: 17px;
			color: var(--el-color-warning);
			cursor: help;
		}
	}
	.el-switch {
		height: auto;
	}
	.el-input {
		width: 150px;
	}
}
</style>
