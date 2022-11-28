<template>
	<transition name="header">
		<header v-if="settingsStore.mode === 'pc' && settingsStore.menu.menuMode === 'head'">
			<div class="header-container">
				<div class="main">
					<GlobalLogo />
					<!-- 顶部模式 -->
					<div ref="navRef" class="nav" @wheel.prevent="handlerMouserScroll">
						<template v-for="(item, index) in menuStore.allMenus" :key="index">
							<div
								v-if="item.children && item.children.length !== 0"
								class="item-container"
								:class="{ active: index === menuStore.actived }"
							>
								<div class="item" @click="switchTo(index)">
									<el-icon>
										<svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
									</el-icon>
									<span v-if="item.meta.title">{{ item.meta.title }}</span>
									<span class="item-theme mt-1"></span>
								</div>
							</div>
						</template>
					</div>
				</div>
				<GlobalTools />
			</div>
		</header>
	</transition>
</template>
<script lang="ts" setup name="Header">
import GlobalLogo from '../GlobalLogo/index.vue';
import GlobalTools from '../GlobalTools/index.vue';
import useSettingsStore from '@/store/modules/settings';
import useMenuStore from '@/store/modules/menu';

const settingsStore = useSettingsStore();
const menuStore = useMenuStore();

const { switchTo } = useMenu();

const navRef = ref();

// 顶部模式鼠标滚动
function handlerMouserScroll(event: WheelEvent) {
	navRef.value.scrollBy({
		left: (event.deltaY || event.detail) > 0 ? 50 : -50
	});
}
</script>
<style lang="scss" scoped>
header {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	height: var(--g-header-height);
	padding: 0 20px;
	color: var(--g-header-color);
	background-color: var(--g-header-bg);
	transition: background-color 0.3s, var(--el-transition-color);
	.header-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: var(--g-header-width);
		height: 100%;
		margin: 0 auto;
		.main {
			display: flex;
			flex: 1;
			flex-wrap: wrap;
			align-items: center;
			height: 100%;
		}
	}

	@media screen and (max-width: var(--g-header-width)) {
		.header-container {
			width: 100%;
		}
	}
	:deep(.title) {
		position: relative;
		width: inherit;
		height: inherit;
		padding: inherit;
		background-color: inherit;
		.logo {
			width: 45px;
			height: 45px;
			border-radius: 5px;
		}
		span {
			font-size: 24px;
			color: var(--g-header-color);
			letter-spacing: 1px;
		}
	}
	.nav {
		display: flex;
		flex: 1;
		width: 0;
		height: 100%;
		padding: 0 20px;
		margin: 0 30px;
		overflow-x: auto;
		mask-image: linear-gradient(to right, transparent, #000000 20px, #000000 calc(100% - 20px), transparent);

		// firefox隐藏滚动条
		scrollbar-width: none;

		// chrome隐藏滚动条
		&::-webkit-scrollbar {
			display: none;
		}
		.item-container {
			position: relative;
			display: flex;
			align-items: center;
			width: initial;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 75px;
				height: 65px;
				padding: 0 5px;
				margin-right: 4px;
				font-size: 13px;
				color: var(--g-header-menu-color);
				cursor: pointer;
				background-color: var(--g-header-bg);
				border-radius: 8px;
				transition: background-color 0.3s, var(--el-transition-color);
				&:hover {
					color: var(--g-header-menu-hover-color);
					background-color: var(--g-header-menu-hover-bg);
				}
				.el-icon {
					margin-bottom: 4px;
					font-size: 18px;
					vertical-align: middle;
				}
				span {
					text-align: center;
					word-break: break-all;
					vertical-align: middle;

					@include text-overflow(1, false);
				}
			}
			.item-theme {
				width: 10px;
				height: 10px;
				background-color: transparent;
				border: 1px solid transparent;
				border-radius: 50%;
			}
			&.active .item {
				color: var(--g-header-menu-active-color);
				background-color: var(--g-header-menu-active-bg);
				.item-theme {
					width: 10px;
					height: 10px;
					border: 1px solid #ffffff;
					border-radius: 50%;
				}
			}
		}
	}
	:deep(.tools) {
		padding: 0;
		.buttons .item .el-icon {
			color: var(--g-header-color);
		}
		.user-container {
			font-size: 16px;
			color: var(--g-header-color);
		}
	}
}

// 头部动画
.header-enter-active,
.header-leave-active {
	transition: transform 0.3s;
}
.header-enter-from,
.header-leave-to {
	transform: translateY(calc(var(--g-header-height) * -1));
}
</style>
