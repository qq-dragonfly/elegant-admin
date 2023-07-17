<template>
	<div class="selector w-[350px]">
		<el-input v-model="inputValue" @input="handleInput">
			<template #append>
				<el-popover
					:width="350"
					trigger="click"
					popper-class="pure-popper"
					:popper-options="{
						placement: 'auto'
					}"
					:visible="visible"
				>
					<template #reference>
						<div class="w-[40px] h-[32px] cursor-pointer flex justify-center items-center" @click="visible = !visible">
							<el-icon class="icon" v-if="inputValue">
								<svg-icon :name="inputValue" />
							</el-icon>
							<el-icon class="icon" v-else>
								<svg-icon name="ep:arrow-down" />
							</el-icon>
						</div>
					</template>

					<el-input class="p-2" v-model="filterValue" placeholder="搜索图标" clearable />
					<el-divider border-style="dashed" />

					<el-tabs v-model="currentActiveType" @tab-click="handleClick">
						<el-tab-pane v-for="(pane, index) in tabsList" :key="index" :label="pane.label" :name="pane.name">
							<el-divider class="tab-divider" border-style="dashed" />
							<el-scrollbar height="220px">
								<ul class="flex flex-wrap px-2 ml-2">
									<li
										v-for="(item, key) in pageList"
										:key="key"
										:title="item"
										class="icon-item p-2 w-[1/10] cursor-pointer mr-2 mt-1 flex justify-center items-center border border-solid"
										:style="iconItemStyle(item)"
										@click="onChangeIcon(item)"
									>
										<el-icon class="icon">
											<svg-icon :name="currentActiveType + item" />
										</el-icon>
									</li>
								</ul>
							</el-scrollbar>
						</el-tab-pane>
					</el-tabs>
					<el-divider border-style="dashed" />

					<el-pagination
						small
						:total="copyIconList[currentActiveType].length"
						:page-size="pageSize"
						:current-page="currentPage"
						background
						layout="prev, pager, next"
						class="flex items-center justify-center h-10"
						@current-change="onCurrentChange"
					/>
				</el-popover>
			</template>
		</el-input>
	</div>
</template>
<script setup lang="ts" name="IconSelect">
import { cloneDeep } from 'lodash-es';
import { getIconList } from './select';
import { ref, computed, CSSProperties, toRef, watch } from 'vue';

type ParameterCSSProperties = (item?: string) => CSSProperties | undefined;

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	}
});
const emit = defineEmits(['update:modelValue']);
const visible = ref(false);
const iconList = ref<any>(getIconList());
const icon = ref('add-location');
const currentActiveType = ref('ep:');
// 深拷贝图标数据，前端做搜索
const copyIconList: any = cloneDeep(iconList.value);
const pageSize = ref(96);
const currentPage = ref(1);
const inputValue = ref('');

// 搜索条件
const filterValue = ref('');

const tabsList = [
	{
		label: 'Element Plus',
		name: 'ep:'
	},
	{
		label: '本地图标',
		name: 'local-'
	}
];
watch(
	() => {
		return filterValue.value;
	},
	() => {
		currentPage.value = 1;
	}
);
watch(
	() => props.modelValue,
	newVal => {
		inputValue.value = newVal;
	},
	{ deep: true }
);
onMounted(() => {
	inputValue.value = props.modelValue;
});
const handleInput = (e: any) => {
	emit('update:modelValue', e);
};
const pageList = computed(() => {
	if (currentPage.value === 1) {
		return copyIconList[currentActiveType.value]
			.filter((v: any) => v.includes(filterValue.value))
			.slice(currentPage.value - 1, pageSize.value);
	} else {
		return copyIconList[currentActiveType.value]
			.filter((v: any) => v.includes(filterValue.value))
			.slice(pageSize.value * (currentPage.value - 1), pageSize.value * (currentPage.value - 1) + pageSize.value);
	}
});

const iconItemStyle = computed((): ParameterCSSProperties => {
	return item => {
		if (inputValue.value === currentActiveType.value + item) {
			return {
				borderColor: 'var(--el-color-primary)',
				color: 'var(--el-color-primary)'
			};
		}
	};
});

const handleClick = ({ props }: any) => {
	currentPage.value = 1;
	currentActiveType.value = props.name;
	emit('update:modelValue', currentActiveType.value + iconList.value[currentActiveType.value][0]);
	icon.value = iconList.value[currentActiveType.value][0];
};

function onChangeIcon(item: any) {
	icon.value = item;
	emit('update:modelValue', currentActiveType.value + item);
	visible.value = false;
}

function onCurrentChange(page: any) {
	currentPage.value = page;
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
	margin: 1px auto !important;
}
.tab-divider.el-divider--horizontal {
	margin: 0 !important;
}
.icon-item {
	&:hover {
		color: var(--el-color-primary);
		border-color: var(--el-color-primary);
		transition: all 0.4s;
		transform: scaleX(1.05);
	}
}
:deep(.el-tabs__nav-next) {
	font-size: 15px;
	line-height: 32px;
	box-shadow: -5px 0 5px -6px #cccccc;
}
:deep(.el-tabs__nav-prev) {
	font-size: 15px;
	line-height: 32px;
	box-shadow: 5px 0 5px -6px #cccccc;
}
:deep(.el-input-group__append) {
	padding: 0;
}
:deep(.el-tabs__item) {
	height: 30px;
	font-size: 12px;
	font-weight: normal;
	line-height: 30px;
}
:deep(.el-tabs__header),
:deep(.el-tabs__nav-wrap) {
	position: static;
	margin: 0;
}
</style>
