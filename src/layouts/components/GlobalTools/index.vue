<template>
	<div class="tools">
		<div class="buttons">
			<span v-if="settingsStore.navSearch.enable" class="item" @click="eventBus.emit('global-search-toggle')">
				<el-icon>
					<svg-icon name="ep:search" />
				</el-icon>
			</span>
			<span v-if="settingsStore.mode === 'pc' && settingsStore.toolbar.enableFullscreen" class="item" @click="toggle">
				<el-icon>
					<svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
				</el-icon>
			</span>
			<span v-if="settingsStore.toolbar.enablePageReload" class="item" @click="mainPage.reload()">
				<el-icon>
					<svg-icon name="ep:refresh-right" />
				</el-icon>
			</span>
			<span
				v-if="settingsStore.toolbar.enableColorScheme"
				class="item"
				@click="settingsStore.setColorScheme(settingsStore.app.colorScheme === 'dark' ? 'light' : 'dark')"
			>
				<el-icon>
					<svg-icon v-show="settingsStore.app.colorScheme === 'light'" name="ep:sunny" />
					<svg-icon v-show="settingsStore.app.colorScheme === 'dark'" name="ep:moon" />
				</el-icon>
			</span>
		</div>
		<el-dropdown class="user-container" size="default" @command="userCommand">
			<div class="user-wrapper">
				<div class="user-avatar">
					<img src="../../../assets/images/avatar.gif" alt="" />
				</div>
				<div class="user-name">
					{{ userStore.username }}
				</div>
				<el-icon>
					<svg-icon name="ep:caret-bottom" />
				</el-icon>
			</div>
			<template #dropdown>
				<el-dropdown-menu class="user-dropdown">
					<el-dropdown-item v-if="settingsStore.dashboard.enable" command="dashboard"> 控制台 </el-dropdown-item>
					<el-dropdown-item command="setting"> 个人设置 </el-dropdown-item>
					<el-dropdown-item divided command="logout"> 退出登录 </el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>
<script lang="ts" setup name="Tools">
import { useFullscreen } from '@vueuse/core';
import eventBus from '@/utils/eventBus';
import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';

const router = useRouter();

const settingsStore = useSettingsStore();
const userStore = useUserStore();

const mainPage = useMainPage();
const { isFullscreen, toggle } = useFullscreen();

function userCommand(command: 'dashboard' | 'setting' | 'logout') {
	switch (command) {
		case 'dashboard':
			router.push({
				name: 'dashboard'
			});
			break;
		case 'setting':
			router.push({
				name: 'personalSetting'
			});
			break;
		case 'logout':
			userStore.logout().then(() => {
				router.push({
					name: 'login'
				});
			});
			break;
	}
}
</script>

<style lang="scss" scoped>
.tools {
	display: flex;
	align-items: center;
	padding: 0 20px;
	white-space: nowrap;
	.buttons {
		margin-right: 20px;
		.item {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 34px;
			height: 24px;
			vertical-align: middle;
			cursor: pointer;
			.el-icon {
				color: var(--el-text-color-primary);
				transition: var(--el-transition-color);
			}
		}
	}
}
:deep(.user-container) {
	cursor: pointer;
	.user-wrapper {
		display: flex;
		align-items: center;
		.user-avatar {
			display: flex;
			width: 30px;
			height: 30px;
			margin-right: 5px;
			overflow: hidden;
			border-radius: 6px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.user-name {
			font-size: 13px;
		}
	}
}
</style>
