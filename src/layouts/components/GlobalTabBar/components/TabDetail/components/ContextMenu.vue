<template>
	<el-dropdown
		popper-class="tab-dropdown"
		ref="tabDropdown"
		@command="handleDropdown"
		:teleported="true"
		trigger="contextmenu"
		:style="{ left: x + 'px' }"
	>
		<span></span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="(item, index) in options" :disabled="item.disabled" :key="index" :command="item.key">
					<el-icon> <svg-icon :name="item.icon" /> </el-icon>
					{{ item.label }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts" name="ContextMenu">
import { useTabStore } from '@/store/modules/tab';
import { computed } from 'vue';

interface Props {
	/** 当前路由路径 */
	currentPath?: string;
	/** 鼠标x坐标 */
	x: number;
	/** 鼠标y坐标 */
	y: number;
}

const props = withDefaults(defineProps<Props>(), {
	currentPath: ''
});
const tabDropdown = ref();
const tab = useTabStore();
const mainPage = useMainPage();

type DropdownKey = 'reload-current' | 'close-current' | 'close-other' | 'close-left' | 'close-right' | 'close-all';
type Option = {
	key: DropdownKey;
	label?: any;
	disabled?: any;
	icon?: any;
};

const options = computed<Option[]>(() => {
	return [
		{
			label: '重新加载',
			key: 'reload-current',
			disabled: props.currentPath !== tab.activeTab,
			icon: 'ele_refresh'
		},
		{
			label: '关闭',
			key: 'close-current',
			disabled: props.currentPath === tab.homeTab.fullPath,
			icon: 'ele_close_outlined'
		},
		{
			label: '关闭其他',
			key: 'close-other',
			icon: 'ele_column_width'
		},
		{
			label: '关闭左侧',
			key: 'close-left',
			icon: 'ele_horizontal_align_left'
		},
		{
			label: '关闭右侧',
			key: 'close-right',
			icon: 'ele_horizontal-align-right'
		},
		{
			label: '关闭所有',
			key: 'close-all',
			icon: 'ele_line'
		}
	];
});

const actionMap = new Map<DropdownKey, () => void>([
	[
		'reload-current',
		() => {
			mainPage.reload();
		}
	],
	[
		'close-current',
		() => {
			tab.removeTab(props.currentPath);
		}
	],
	[
		'close-other',
		() => {
			tab.clearTab([props.currentPath]);
		}
	],
	[
		'close-left',
		() => {
			tab.clearLeftTab(props.currentPath);
		}
	],
	[
		'close-right',
		() => {
			tab.clearRightTab(props.currentPath);
		}
	],
	[
		'close-all',
		() => {
			tab.clearAllTab();
		}
	]
]);
function handleDropdown(optionKey: string) {
	const key = optionKey as DropdownKey;
	const actionFunc = actionMap.get(key);
	if (actionFunc) {
		actionFunc();
	}
}
function showDropdownClick() {
	tabDropdown.value.handleOpen();
}
function hideDropdownClick() {
	tabDropdown.value.handleClose();
}
defineExpose({
	showDropdownClick,
	hideDropdownClick
});
</script>

<style lang="scss" scoped></style>
