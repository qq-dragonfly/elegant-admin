<template>
	<transition name="main-sidebar">
		<div
			v-if="
				settingsStore.menu.menuMode === 'side' || (settingsStore.mode === 'mobile' && settingsStore.menu.menuMode !== 'single')
			"
			class="main-sidebar-container"
		>
			<GlobalLogo :show-title="false" class="sidebar-logo" />
			<!-- 侧边栏模式（含主导航） -->
			<div class="nav">
				<template v-for="(item, index) in menuStore.allMenus">
					<div
						v-if="item.children && item.children.length !== 0"
						:key="index"
						class="item"
						:class="{
							active: index === menuStore.actived
						}"
						:title="item.meta.title"
						@click="switchTo(index)"
					>
						<el-icon>
							<svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
						</el-icon>
						<span class="item-title">{{ item.meta.title }}</span>
					</div>
				</template>
			</div>
		</div>
	</transition>
</template>
<script lang="ts" setup name="MainSidebar">
import GlobalLogo from '../GlobalLogo/index.vue';
import useSettingsStore from '@/store/modules/settings';
import useMenuStore from '@/store/modules/menu';

const settingsStore = useSettingsStore();
const menuStore = useMenuStore();

const { switchTo } = useMenu();
</script>
<style lang="scss" scoped>
.main-sidebar-container {
	position: relative;
	z-index: 1;
	width: var(--g-main-sidebar-width);
	overflow-x: hidden;
	overflow-y: auto;
	overscroll-behavior: contain;
	color: var(--g-main-sidebar-menu-color);
	background-color: var(--g-main-sidebar-bg);
	transition: background-color 0.3s, var(--el-transition-color);

	// firefox隐藏滚动条
	scrollbar-width: none;

	// chrome隐藏滚动条
	&::-webkit-scrollbar {
		display: none;
	}
	.sidebar-logo {
		background-color: var(--g-main-sidebar-bg);
		transition: 0.3s;
	}
	.nav {
		width: inherit;
		padding-top: var(--g-sidebar-logo-height);
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 60px;
			padding: 0 5px;
			color: var(--g-main-sidebar-menu-color);
			text-align: center;
			cursor: pointer;
			background-color: var(--g-main-sidebar-bg);
			transition: background-color 0.3s, var(--el-transition-color);
			&:hover {
				color: var(--g-main-sidebar-menu-hover-color);
				background-color: var(--g-main-sidebar-menu-hover-bg);
			}
			&.active {
				position: relative;
				color: var(--g-main-sidebar-menu-active-color);
				background-color: var(--g-main-sidebar-menu-active-bg);
				&::before {
					position: absolute;
					top: 50%;
					right: 0;
					width: 0;
					height: 0;
					content: '';
					border-top: 6px solid transparent;
					border-right: 6px solid var(--g-sub-sidebar-bg);
					border-bottom: 6px solid transparent;
					transition: all 0.3s;
					transform: translateY(-50%);
				}
			}
			.el-icon {
				margin: 0 auto;
				font-size: 24px;
			}
			.item-title {
				padding-top: 5px;
				font-size: 13px;
				font-weight: 500;
				text-align: center;
				@include text-overflow(1, false);
			}
		}
	}
}

// 主侧边栏动画
.main-sidebar-enter-active,
.main-sidebar-leave-active {
	transition: transform 0.3s;
}
.main-sidebar-enter-from,
.main-sidebar-leave-to {
	transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
</style>
