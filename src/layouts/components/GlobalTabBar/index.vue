<template>
	<dark-mode-container class="global-tab flex items-center w-full pl-4 pr-4 h-full">
		<tab-detail />
	</dark-mode-container>
</template>

<script setup lang="ts" name="GlobalTab">
import { useTabStore } from '@/store/modules/tab';
import useSettingsStore from '@/store/modules/settings';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { TabDetail, DarkModeContainer } from './components';

const route = useRoute();
const settingsStore = useSettingsStore();
const tab = useTabStore();

function init() {
	tab.iniTabStore(route);
}

watch(
	() => route.fullPath,
	() => {
		tab.addTab(route);
		tab.setActiveTab(route.fullPath);
	}
);

// 初始化
init();
</script>

<style scoped>
.global-tab {
	height: var(--g-tabbar-height);
}
</style>
