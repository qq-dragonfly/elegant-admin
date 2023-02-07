<template>
	<div>
		<page-main title="" class="item-background rounded-md">
			<div class="text-2xl font-bold h-14 pl-2 flex justify-start items-center">
				{{ state.getTimeStateText }} 欢迎来到 {{ title }}
			</div>
			<el-card shadow="hover" class="item-background border-0">
				<div class="time">
					<h2>{{ state.time }}</h2>
					<p>{{ state.day }}</p>
				</div>
			</el-card>
		</page-main>
	</div>
</template>
<script lang="ts" setup>
import dayjs from '@/utils/dayjs';
import { getTimeState } from '@/utils';
const state = reactive({
	customizing: false,
	time: '',
	day: '',
	getTimeStateText: getTimeState()
});
const title = ref(import.meta.env.VITE_APP_TITLE);
const emits = defineEmits(['on-mounted']);
// 初始化数字滚动
const showTime = () => {
	nextTick(() => {
		state.time = dayjs(new Date()).format('HH:mm:ss');
		state.day = dayjs(new Date()).format('YYYY年MM月DD日');
	});
};
const timeFn = () => {
	emits('on-mounted');
	showTime();
	setInterval(() => {
		showTime();
	}, 1000);
};
// 页面加载时
onMounted(() => {
	timeFn();
});
</script>
<style lang="scss" scoped>
:deep(.el-card__header) {
	border-bottom: none;
}
.item-background {
	color: #ffffff;
	background: linear-gradient(to right, #8e54e9, #4776e6);
}
</style>
