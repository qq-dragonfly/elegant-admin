<template>
	<div
		class="top-bar-container"
		:class="{
			fixed: settingsStore.topbar.fixed,
			shadow: scrollTop
		}"
		data-fixed-calc-width
	>
		<div class="top-bar-tools flex justify-between items-center">
			<div class="left-box">
				<div
					v-if="enableSubMenuCollapseButton"
					class="sidebar-collapse"
					:class="{ 'is-collapse': settingsStore.menu.subMenuCollapse }"
					@click="settingsStore.toggleSidebarCollapse()"
				>
					<el-icon>
						<svg-icon name="toolbar-collapse" />
					</el-icon>
				</div>
				<el-breadcrumb v-if="settingsStore.breadcrumb.enable && settingsStore.mode === 'pc'">
					<transition-group name="breadcrumb">
						<el-breadcrumb-item
							v-for="(item, index) in breadcrumbList"
							:key="item.path"
							:to="index < breadcrumbList.length - 1 ? pathCompile(item.path) : ''"
						>
							{{ item.title }}
						</el-breadcrumb-item>
					</transition-group>
				</el-breadcrumb>
			</div>
			<GlobalTools />
		</div>
		<GlobalTabBar v-if="settingsStore.tab.visible" />
	</div>
</template>
<script lang="ts" setup name="TopBar">
import { compile } from 'path-to-regexp';
import GlobalTools from '../GlobalTools/index.vue';
import GlobalTabBar from '../GlobalTabBar/index.vue';

import useSettingsStore from '@/store/modules/settings';

const props = defineProps<{
	scrollTop: number;
}>();
const route = useRoute();

const settingsStore = useSettingsStore();

const enableSubMenuCollapseButton = computed(() => {
	return (
		settingsStore.mode === 'mobile' ||
		(['side', 'head', 'single'].includes(settingsStore.menu.menuMode) && settingsStore.menu.enableSubMenuCollapseButton)
	);
});

const breadcrumbList = computed(() => {
	const breadcrumbList = [];
	if (settingsStore.dashboard.enable) {
		breadcrumbList.push({
			path: '/dashboard',
			title: settingsStore.dashboard.title
		});
	}
	if (route.meta.breadcrumbNeste) {
		breadcrumbList.push(...route.meta.breadcrumbNeste.filter(item => !item.hide));
	}
	return breadcrumbList;
});

function pathCompile(path: string) {
	const toPath = compile(path);
	return toPath(route.params);
}
</script>

<style lang="scss" scoped>
.top-bar-container {
	position: absolute;
	top: 0;
	z-index: 999;
	background-color: var(--g-toolbar-bg);
	box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
	transition: width 0.3s, top 0.3s, transform 0.3s, background-color 0.3s, var(--el-transition-box-shadow);
	&.fixed {
		position: fixed;
	}
	.left-box {
		display: flex;
		align-items: center;
		padding-right: 50px;
		overflow: hidden;
		mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
		.sidebar-collapse {
			display: flex;
			align-items: center;
			height: 50px;
			padding: 0 20px;
			cursor: pointer;
			.el-icon {
				color: var(--el-text-color-primary);
				transition: var(--el-transition-color), var(--el-transition-md-fade);
			}
			&:hover .el-icon {
				color: var(--el-color-primary);
			}
			&.is-collapse .el-icon {
				transform: rotateZ(-180deg);
			}
			& + .el-breadcrumb {
				margin-left: 0;
			}
		}
		:deep(.el-breadcrumb) {
			margin-left: 20px;
			white-space: nowrap;
			.el-breadcrumb__item {
				display: inline-block;
				float: none;
				span {
					font-weight: normal;
				}
				&:last-child span {
					color: #97a8be;
				}
			}
		}
	}
}
.top-bar-tools {
	height: var(--g-topbar-height);
	border-bottom: 1px solid var(--el-border-color-lighter);
}

// 面包屑动画
.breadcrumb-enter-active {
	transition: all 0.25s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(30px) skewX(-50deg);
}
</style>
