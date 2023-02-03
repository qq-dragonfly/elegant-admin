<template>
	<div class="layout" @scroll="onScroll">
		<div id="app-main">
			<GlobalHeader />
			<div class="wrapper">
				<div class="sidebar-container" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.menu.subMenuCollapse }">
					<GlobalMainSidebar />
					<GlobalSubSidebar />
				</div>
				<div
					class="sidebar-mask"
					:class="{ show: settingsStore.mode === 'mobile' && !settingsStore.menu.subMenuCollapse }"
					@click="settingsStore.toggleSidebarCollapse()"
				/>
				<div class="main-container">
					<GlobalTopBar
						v-if="
							!(
								settingsStore.menu.menuMode === 'head' &&
								!settingsStore.menu.enableSubMenuCollapseButton &&
								!settingsStore.breadcrumb.enable
							)
						"
						:scroll-top="scrollTop"
					/>
					<div class="main" :class="{ 'main-mg': settingsStore.tab.visible }">
						<router-view v-slot="{ Component, route }">
							<transition name="main" mode="out-in" :appear="true">
								<keep-alive :include="keepAliveStore.list">
									<component :is="Component" :key="route.fullPath" />
								</keep-alive>
							</transition>
						</router-view>
					</div>
					<Copyright />
				</div>
			</div>
		</div>
		<GlobalSearch />
		<GlobalAppSetting />
		<GlobalBuyIt />
	</div>
</template>
<script lang="ts" setup name="Layout">
import GlobalHeader from './components/GlobalHeader/index.vue';
import GlobalMainSidebar from './components/GlobalMainSidebar/index.vue';
import GlobalSubSidebar from './components/GlobalSubSidebar/index.vue';
import GlobalTopBar from './components/GlobalTopBar/index.vue';
import GlobalSearch from './components/GlobalSearch/index.vue';
import GlobalAppSetting from './components/GlobalAppSetting/index.vue';
import GlobalBuyIt from './components/GlobalBuyIt/index.vue';
import useSettingsStore from '@/store/modules/settings';
import useKeepAliveStore from '@/store/modules/keepAlive';
import useMenuStore from '@/store/modules/menu';

const routeInfo = useRoute();

const settingsStore = useSettingsStore();
const keepAliveStore = useKeepAliveStore();
const menuStore = useMenuStore();
watch(
	() => settingsStore.menu.subMenuCollapse,
	val => {
		if (settingsStore.mode === 'mobile') {
			if (!val) {
				document.body.classList.add('hidden_body');
			} else {
				document.body.classList.remove('hidden_body');
			}
		}
	}
);

watch(
	() => routeInfo.path,
	() => {
		if (settingsStore.mode === 'mobile') {
			settingsStore.$patch(state => {
				state.menu.subMenuCollapse = true;
			});
		}
	}
);

const scrollTop = ref<number>(0);
onMounted(() => {
	window.addEventListener('scroll', onScroll);
});
onUnmounted(() => {
	window.removeEventListener('scroll', onScroll);
});

function onScroll(e: Event) {
	scrollTop.value = (e.target as HTMLElement).scrollTop;
}
</script>

<style lang="scss" scoped>
[data-mode='mobile'] {
	.sidebar-container {
		transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));
		&.show {
			transform: translateX(0);
		}
	}
	.main-container {
		margin-left: 0 !important;
	}
	&[data-menu-mode='single'] {
		.sidebar-container {
			transform: translateX(calc(var(--g-sub-sidebar-width) * -1));
			&.show {
				transform: translateX(0);
			}
		}
	}
}
.layout {
	height: 100%;
	overflow: -moz-scrollbars-none;
	overflow-y: auto;
	-ms-overflow-style: none;
}
.layout::-webkit-scrollbar {
	width: 0 !important;
}
#app-main {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	transition: all 0.2s;
}
.wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	box-shadow: -1px 0 0 0 var(--g-box-shadow-color);
	transition: padding-top 0.3s;
	.sidebar-container {
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1010;
		display: flex;
		width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
		transition: transform 0.3s, top 0.3s;
	}
	.sidebar-mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 100%;
		visibility: hidden;
		background-color: rgb(0 0 0 / 50%);
		opacity: 0;
		transition: all 0.2s;
		transform: translateZ(0);
		backdrop-filter: blur(2px);
		&.show {
			visibility: visible;
			opacity: 1;
		}
	}
	.main-sidebar-container:not(.main-sidebar-leave-active) + .sub-sidebar-container {
		left: var(--g-main-sidebar-width);
	}
	.main-container {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
		background-color: var(--g-main-bg);
		transition: margin-left 0.3s, background-color 0.3s;
		.top-bar-container {
			top: 0;
			z-index: 998;
		}
		.main {
			position: relative;
			flex: auto;
			height: 100%;
			overflow: hidden;
			transition: 0.3s;
		}
		.top-bar-container + .main {
			margin: var(--g-topbar-height) 0 0;
		}
		.top-bar-container + .main-mg {
			margin: calc(var(--g-topbar-height) + var(--g-tabbar-height)) 0 0;
		}
	}
}
header:not(.header-leave-active) + .wrapper {
	padding-top: var(--g-header-height);
	.sidebar-container {
		top: var(--g-header-height);
		:deep(.sidebar-logo) {
			display: none;
		}
		:deep(.el-menu) {
			padding-top: 0;
		}
	}
	.main-container {
		.top-bar-container {
			top: var(--g-header-height);
			:deep(.tools) {
				display: none;
			}
		}
	}
}

// 主内容区动画
.main-enter-active {
	transition: 0.2s;
}
.main-leave-active {
	transition: 0.15s;
}
.main-enter-from {
	margin-left: -20px;
	opacity: 0;
}
.main-leave-to {
	margin-left: 20px;
	opacity: 0;
}
</style>
