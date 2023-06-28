<template>
	<div class="card table-search mb-1" v-if="columns.length">
		<div class="flex justify-between items-center pb-4">
			<div class="flex items-center">
				<el-icon><Search /></el-icon>
				<span class="text-base italic ml-2">查询条件</span>
			</div>
			<div class="search-operation">
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button :icon="Delete" @click="handleReset">重置</el-button>
				<el-button
					v-if="showCollapse && columns.length > showCollapseNum"
					type="primary"
					link
					class="search-isOpen"
					@click="collapsed = !collapsed"
				>
					{{ collapsed ? '展开' : '合并' }}
					<el-icon class="el-icon--right">
						<component :is="collapsed ? ArrowDown : ArrowUp"></component>
					</el-icon>
				</el-button>
			</div>
		</div>
		<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
			<Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
				<GridItem v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
					<el-form-item v-if="!item.search?.searchSlotBool" :label="`${item.label} :`">
						<SearchFormItem :column="item" :searchParam="searchParam" />
					</el-form-item>
					<el-form-item v-else :label="`${item.label} :`">
						<slot :name="item.search?.key" />
					</el-form-item>
				</GridItem>
			</Grid>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="SearchForm">
import { computed, ref } from 'vue';
import { ColumnProps } from '@/components/ProTable/interface';
import { BreakPoint } from '@/components/Grid/interface';
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import SearchFormItem from './components/SearchFormItem.vue';
import Grid from '@/components/Grid/index.vue';
import GridItem from '@/components/Grid/components/GridItem.vue';

interface ProTableProps {
	columns?: ColumnProps[]; // 搜索配置列
	searchParam?: { [key: string]: any }; // 搜索参数
	searchCol: number | Record<BreakPoint, number>;
	handleSearch: (params: any) => void; // 搜索方法
	handleReset: (params: any) => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	searchParam: () => ({})
});

// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
	return {
		span: item.search?.span,
		offset: item.search?.offset ?? 0,
		xs: item.search?.xs,
		sm: item.search?.sm,
		md: item.search?.md,
		lg: item.search?.lg,
		xl: item.search?.xl
	};
};

// 是否默认折叠搜索项
const collapsed = ref(false);

// 获取响应式断点
const gridRef = ref();
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint);
const showCollapseNum = computed<number>(() => (gridRef.value?.breakPoint === 'xl' ? 4 : 3));

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
	let show = false;
	props.columns.reduce((prev, current) => {
		prev +=
			(current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
			(current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0);
		if (typeof props.searchCol !== 'number') {
			if (prev >= props.searchCol[breakPoint.value]) {
				show = true;
			}
		} else {
			if (prev > props.searchCol) {
				show = true;
			}
		}
		return prev;
	}, 0);
	return show;
});
</script>
