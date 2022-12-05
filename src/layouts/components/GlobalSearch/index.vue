<template>
	<div id="search" :class="{ searching: isShow }" @click="isShow && eventBus.emit('global-search-toggle')">
		<div class="container">
			<div class="search-box" @click.stop>
				<div v-if="settingsStore.mode === 'pc'" class="tips">
					<div class="tip">
						<span>Alt</span>+<span>S</span>
						唤醒搜索面板
					</div>
					<div class="tip">
						<span>
							<el-icon>
								<svg-icon name="ele_search_up" />
							</el-icon>
						</span>
						<span>
							<el-icon>
								<svg-icon name="ele_search_down" />
							</el-icon>
						</span>
						切换搜索结果
					</div>
					<div class="tip">
						<span>
							<el-icon>
								<svg-icon name="ele_search_enter" />
							</el-icon>
						</span>
						访问页面
					</div>
					<div class="tip">
						<span>ESC</span>
						退出
					</div>
				</div>

				<el-input
					ref="searchInputRef"
					v-model="searchInput"
					placeholder="搜索页面，支持标题、URL模糊查询"
					clearable
					@keydown.esc="eventBus.emit('global-search-toggle')"
					@keydown.up.prevent="keyUp"
					@keydown.down.prevent="keyDown"
					@keydown.enter.prevent="keyEnter"
				>
					<template #prefix>
						<el-icon>
							<svg-icon name="ep:search" />
						</el-icon>
					</template>
				</el-input>
			</div>
			<div ref="searchResultRef" class="result" :class="{ mobile: settingsStore.mode === 'mobile' }">
				<a
					v-for="(item, index) in resultList"
					:key="item.path"
					:ref="setSearchResultItemRef"
					class="item"
					:class="{ actived: index === actived }"
					@click="pageJump(item.path)"
					@mouseover="actived = index"
				>
					<el-icon class="icon">
						<svg-icon v-if="item.icon" :name="item.icon" />
					</el-icon>
					<div class="info">
						<div class="title">
							{{ item.title }}
						</div>
						<div class="breadcrumb">
							<span v-for="(bc, bcIndex) in item.breadcrumb" :key="bcIndex">
								{{ bc }}
								<el-icon>
									<svg-icon name="ep:arrow-right" />
								</el-icon>
							</span>
						</div>
						<!--            <div class="path">{{ item.path }}</div> -->
					</div>
				</a>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup name="Search">
import { cloneDeep } from 'lodash-es';
import hotkeys from 'hotkeys-js';
import { isExternalLink } from '@/utils';
import eventBus from '@/utils/eventBus';
import useSettingsStore from '@/store/modules/settings';
import useRouteStore from '@/store/modules/route';
import useMenuStore from '@/store/modules/menu';
import type { Menu, Route } from '@/global';

const router = useRouter();

const settingsStore = useSettingsStore();
const routeStore = useRouteStore();
const menuStore = useMenuStore();

interface listTypes {
	icon?: string;
	title: string;
	breadcrumb: string[];
	path: string;
}

const isShow = ref(false);
const searchInput = ref('');
const sourceList = ref<listTypes[]>([]);
const actived = ref(-1);

const searchInputRef = ref();
const searchResultRef = ref();
const searchResultItemRef = ref<any>([]);
const setSearchResultItemRef = (el: any) => searchResultItemRef.value.push(el);
onBeforeUpdate(() => {
	searchResultItemRef.value = [];
});

const resultList = computed(() => {
	let result = [];
	result = sourceList.value.filter(item => {
		let flag = false;
		if (item.title.includes(searchInput.value)) {
			flag = true;
		}
		if (item.path.includes(searchInput.value)) {
			flag = true;
		}
		if (item.breadcrumb.some(b => b.includes(searchInput.value))) {
			flag = true;
		}
		return flag;
	});
	return result;
});

watch(
	() => isShow.value,
	val => {
		if (val) {
			document.body.classList.add('hidden_body');
			searchResultRef.value.scrollTop = 0;
			// 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
			hotkeys('up', keyUp);
			hotkeys('down', keyDown);
			hotkeys('enter', keyEnter);
			setTimeout(() => {
				searchInputRef.value.focus();
			}, 500);
		} else {
			document.body.classList.remove('hidden_body');
			hotkeys.unbind('up', keyUp);
			hotkeys.unbind('down', keyDown);
			hotkeys.unbind('enter', keyEnter);
			setTimeout(() => {
				searchInput.value = '';
				actived.value = -1;
			}, 500);
		}
	}
);
watch(
	() => resultList.value,
	() => {
		actived.value = -1;
		searchResultItemRef.value = [];
		handleScroll();
	}
);

onMounted(() => {
	eventBus.on('global-search-toggle', () => {
		isShow.value = !isShow.value;
	});
	hotkeys('alt+s', e => {
		if (settingsStore.navSearch.enable && settingsStore.navSearch.enableHotkeys) {
			e.preventDefault();
			isShow.value = true;
		}
	});
	hotkeys('esc', e => {
		if (settingsStore.navSearch.enable && settingsStore.navSearch.enableHotkeys) {
			e.preventDefault();
			isShow.value = false;
		}
	});
	if (settingsStore.app.routeBaseOn !== 'filesystem') {
		routeStore.routes.forEach(item => {
			item.children && getSourceList(item.children);
		});
	} else {
		menuStore.menus.forEach(item => {
			getSourceListByMenus(item.children);
		});
	}
});

function hasChildren(item: Route.recordRaw) {
	let flag = true;
	if (item.children && item.children.every(i => i.meta.sidebar === false)) {
		flag = false;
	}
	return flag;
}

function getSourceList(arr: Route.recordRaw[], basePath?: string, icon?: string, breadcrumb?: string[]) {
	arr.forEach(item => {
		if (item.meta.sidebar !== false) {
			const breadcrumbTemp = cloneDeep(breadcrumb) || [];
			if (item.children && hasChildren(item)) {
				breadcrumbTemp.push(typeof item.meta.title === 'function' ? item.meta.title() : item.meta.title);
				getSourceList(
					item.children,
					basePath ? [basePath, item.path].join('/') : item.path,
					item.meta.icon || icon,
					breadcrumbTemp
				);
			} else {
				breadcrumbTemp.push(typeof item.meta.title === 'function' ? item.meta.title() : item.meta.title);
				let path = '';
				if (isExternalLink(item.path)) {
					path = item.path;
				} else {
					path = basePath ? [basePath, item.path].join('/') : item.path;
				}
				sourceList.value.push({
					icon: item.meta.icon || icon,
					title: typeof item.meta.title === 'function' ? item.meta.title() : item.meta.title,
					breadcrumb: breadcrumbTemp,
					path
				});
			}
		}
	});
}

function getSourceListByMenus(arr: Menu.recordRaw[], icon?: string, breadcrumb?: string[]) {
	arr.forEach(item => {
		const breadcrumbTemp = cloneDeep(breadcrumb) || [];
		if (item.children && item.children.length > 0) {
			breadcrumbTemp.push(item.meta.title);
			getSourceListByMenus(item.children, item.meta.icon, breadcrumbTemp);
		} else {
			breadcrumbTemp.push(item.meta.title);
			sourceList.value.push({
				icon: item.meta.icon || icon,
				title: item.meta.title,
				path: item.path as string,
				breadcrumb: breadcrumbTemp
			});
		}
	});
}

function keyUp() {
	if (resultList.value.length) {
		actived.value -= 1;
		if (actived.value < 0) {
			actived.value = resultList.value.length - 1;
		}
		handleScroll();
	}
}

function keyDown() {
	if (resultList.value.length) {
		actived.value += 1;
		if (actived.value > resultList.value.length - 1) {
			actived.value = 0;
		}
		handleScroll();
	}
}

function keyEnter() {
	if (actived.value !== -1) {
		searchResultItemRef.value[actived.value].click();
	}
}

function handleScroll() {
	let scrollTo = 0;
	if (actived.value !== -1) {
		scrollTo = searchResultRef.value.scrollTop;
		const activedOffsetTop = searchResultItemRef.value[actived.value].offsetTop;
		const activedClientHeight = searchResultItemRef.value[actived.value].clientHeight;
		const searchScrollTop = searchResultRef.value.scrollTop;
		const searchClientHeight = searchResultRef.value.clientHeight;
		if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
			scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight;
		} else if (activedOffsetTop <= searchScrollTop) {
			scrollTo = activedOffsetTop;
		}
	}
	searchResultRef.value.scrollTo({
		top: scrollTo
	});
}

function pageJump(url: string) {
	if (isExternalLink(url)) {
		window.open(url, 'top');
	} else {
		router.push(url);
	}
}
</script>

<style lang="scss" scoped>
#search {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2000;
	width: 100%;
	height: 100%;
	visibility: hidden;
	background-color: var(--el-overlay-color-lighter);
	opacity: 0;
	transition: all 0.2s;
	transform: translateZ(0);
	backdrop-filter: blur(5px);
	&.searching {
		visibility: visible;
		opacity: 1;
		.container {
			background-color: #ffffff;
			filter: initial;
			transform: initial;
		}
	}
	.container {
		display: flex;
		flex-direction: column;
		max-width: 800px;
		height: 80%;
		margin: 40px auto;
		filter: blur(10px);
		border-radius: 10px;
		transition: all 0.2s;
		transform: scale(1.1);
		.search-box {
			margin: 20px 20px 10px;
			:deep(.el-input__inner) {
				height: 52px;
				line-height: 52px;
			}
			:deep(.el-input__icon) {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}
			.tips {
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				margin-top: 20px;
				margin-bottom: 20px;
				font-size: 14px;
				line-height: 24px;
				color: #333333;
				span {
					padding: 3px 8px 5px;
					margin: 0 5px;
					font-size: 12px;
					font-weight: bold;
					color: var(--el-text-color-primary);
					background-color: var(--el-fill-color);
					border-radius: 5px;
					box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #ffffff, 0 1px 2px 1px rgb(30 35 90 / 40%);
				}
			}
		}
		.result {
			position: relative;
			max-height: calc(100% - 175px);
			margin: 0 20px;
			overflow: auto;
			background-color: var(--el-bg-color);
			border-radius: 5px;
			box-shadow: 0 0 0 1px var(--el-border-color-darker);
			&.mobile {
				max-height: calc(100% - 200px);
			}
			.item {
				display: flex;
				align-items: center;
				text-decoration: none;
				cursor: pointer;
				transition: all 0.3s;
				&.actived {
					background-color: var(--el-bg-color-page);
					.icon {
						color: var(--el-color-primary);
						transform: scale(1.2);
					}
					.info {
						border-left-color: var(--el-border-color);
						.title {
							color: var(--el-color-primary);
						}
						.breadcrumb,
						.path {
							color: var(--el-color-primary);
						}
					}
				}
				.icon {
					flex: 0 0 66px;
					font-size: 20px;
					color: var(--el-color-info);
					text-align: center;
					transition: all 0.3s;
				}
				.info {
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-around;
					height: 70px;
					padding: 5px 10px 7px;
					border-left: 1px solid var(--el-border-color-lighter);
					transition: all 0.3s;

					@include text-overflow(1, true);
					.title {
						font-size: 18px;
						font-weight: bold;
						color: var(--el-text-color-regular);

						@include text-overflow(1, true);
					}
					.breadcrumb,
					.path {
						font-size: 12px;
						color: var(--el-text-color-secondary);
						transition: all 0.3s;

						@include text-overflow(1, true);
					}
					.breadcrumb {
						display: flex;
						align-items: center;
						span {
							display: flex;
							align-items: center;
							margin-right: 5px;
							&:last-child i {
								display: none;
							}
						}
					}
				}
			}
		}
	}
}
</style>
