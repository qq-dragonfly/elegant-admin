<template>
	<div class="relative h-full overflow-hidden">
		<div ref="bsWrapper" class="overflow-hidden flex-1 h-full">
			<better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: false, preventDefault: false }">
				<div ref="tabRef" class="h-full" :class="[isChromeMode ? 'flex items-end' : 'flex items-center']">
					<component
						:is="activeComponent"
						v-for="(item, index) in tab.tabs"
						:key="item.fullPath"
						:is-active="tab.activeTab === item.fullPath"
						:primary-color="settingsStore.app.themeColor"
						:closable="item.name !== tab.homeTab.name"
						:dark-mode="settingsStore.app.colorScheme === 'dark'"
						:class="{ '!mr-0': isChromeMode && index === tab.tabs.length - 1, 'mr-1.5': !isChromeMode }"
						@click.prevent="tab.handleClickTab(item.fullPath)"
						@close="tab.removeTab(item.fullPath)"
						@contextmenu.prevent="handleContextMenu($event, item.fullPath)"
					>
						{{ item.meta.title }}
					</component>
				</div>
			</better-scroll>
		</div>
		<context-menu ref="contextMenuRef" :current-path="dropdown.currentPath" :x="dropdown.x" :y="dropdown.y" />
	</div>
</template>

<script setup lang="ts" name="TabDetail">
import { useDeviceInfo } from '@/utils/composables/useDeviceInfo';
import { useElementBounding } from '@vueuse/core';
import { computed, nextTick, reactive, ref, watch } from 'vue';
import BetterScroll from '@/components/BetterScroll/BetterScroll.vue';
import { ButtonTab, ChromeTab } from '../TabType';
import useSettingsStore from '@/store/modules/settings';
import { useTabStore } from '@/store/modules/tab';
import { ContextMenu } from './components';
import { Expose } from '@/global';

const deviceInfo = useDeviceInfo();

const bsWrapper = ref<HTMLElement>();
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper);
const bsScroll = ref<Expose.BetterScroll>();
const canClick = Boolean(deviceInfo.device.type);

const settingsStore = useSettingsStore();
const tab = useTabStore();

const isChromeMode = computed(() => settingsStore.tab.mode === 'chrome');
const activeComponent = computed(() => (isChromeMode.value ? ChromeTab : ButtonTab));
// 获取当前激活的tab的clientX
const tabRef = ref<HTMLElement>();
const contextMenuRef = ref();

async function getActiveTabClientX() {
	await nextTick();
	if (tabRef.value && tabRef.value.children.length && tabRef.value.children[tab.activeTabIndex]) {
		const activeTabElement = tabRef.value.children[tab.activeTabIndex];
		const { x, width } = activeTabElement.getBoundingClientRect();
		const clientX = x + width / 2;
		setTimeout(() => {
			handleScroll(clientX);
		}, 100);
	}
}

function handleScroll(clientX: number) {
	const currentX = clientX - bsWrapperLeft.value;
	const deltaX = currentX - bsWrapperWidth.value / 2;
	if (bsScroll.value) {
		const { maxScrollX, x: leftX } = bsScroll.value.instance;
		const rightX = maxScrollX - leftX;
		const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);
		bsScroll.value?.instance.scrollBy(update, 0, 500);
	}
}

const dropdown = reactive({
	x: 0,
	y: 0,
	currentPath: ''
});

function showDropdown() {
	nextTick(() => {
		contextMenuRef.value.showDropdownClick();
	});
}

function hideDropdown() {
	nextTick(() => {
		contextMenuRef.value.hideDropdownClick();
	});
}

function setDropdown(x: number, y: number, currentPath: string) {
	Object.assign(dropdown, {
		x,
		y,
		currentPath
	});
}

/** 点击右键菜单 */
async function handleContextMenu(e: MouseEvent, fullPath: string) {
	let { clientX, clientY } = e;
	const DURATION = 150;
	hideDropdown();
	setTimeout(() => {
		setDropdown(clientX - 220, clientY, fullPath);
		showDropdown();
	}, DURATION);
}

watch(
	() => tab.activeTabIndex,
	() => {
		getActiveTabClientX();
	},
	{
		immediate: true
	}
);
</script>

<style lang="scss" scoped></style>
