<template>
	<!--  {{ userStore.controlResponseList.find(item => item.code === 'welcome').code === 'welcome' }}-->
	<div class="home-container p-[10px]">
		<div
			:class="settingsStore.app.colorScheme === 'dark' ? 'bg-[#363637]' : 'bg-[#ffffff]'"
			class="text-2xl h-20 px-[20px] flex justify-between items-center mb-[10px] rounded-[4px]"
		>
			<div class="flex">
				<div class="text-[20px]">{{ state.getTimeStateText }}</div>
				<div class="mx-[20px]">{{ userStore.username }}</div>
				<div class="text-[20px] font-normal">欢迎来到 {{ title }}</div>
			</div>
			<div class="flex ml-[20px] text-[16px]">
				<div class="mr-[10px]">{{ state.day }}</div>
				<div class="w-[70px]">{{ state.time }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="home">
import * as echarts from 'echarts';
import useSettingsStore from '@/store/modules/settings';
import { useFullscreen } from '@vueuse/core';
import { getTimeState } from '@/utils';
import useUserStore from '@/store/modules/user';
import dayjs from '@/utils/dayjs';
const settingsStore = useSettingsStore();
const { isFullscreen } = useFullscreen();
const bsInfo = useBrowser();
// 定义变量内容
const homeLineRef = ref();
const homePieRef = ref();
const homeBarRef = ref();
const userStore = useUserStore();
const title = ref(import.meta.env.VITE_APP_TITLE);
const state = reactive<any>({
	getTimeStateText: getTimeState(),
	time: '',
	day: '',
	global: {
		homeChartOne: null,
		homeChartTow: null,
		homeChartThree: null,
		dispose: [null, '', undefined]
	} as any,
	homeOne: [],
	homeTow: [],
	homeThree: [],
	charts: {
		theme: '',
		bgColor: '',
		color: '#999999'
	}
});
// 初始化数字滚动
const showTime = () => {
	nextTick(() => {
		state.time = dayjs(new Date()).format('HH:mm:ss');
		state.day = dayjs(new Date()).format('YYYY年MM月DD日');
	});
};
const timeFn = () => {
	showTime();
	setInterval(() => {
		showTime();
	}, 1000);
};
onMounted(() => {
	timeFn();
});
</script>

<style scoped lang="scss">
$home-nav-length: 8;
.home-container {
	overflow: hidden;
	.home-card-one,
	.home-card-two,
	.home-card-three {
		.home-card-item {
			width: 100%;
			height: 100px;
			padding: 20px;
			overflow: hidden;
			background-color: var(--g-sub-sidebar-bg);
			border: 1px solid var(--next-border-color-light);
			border-radius: 4px;
			transition: all ease 0.3s;
			&:hover {
				box-shadow: 0 2px 12px var(--next-color-dark-hover);
				transition: all ease 0.3s;
			}
			&-title {
				height: 30px;
				font-size: 15px;
				font-weight: bold;
			}
		}
	}
	.home-card-one {
		@for $i from 0 through 3 {
			.home-one-animation#{$i} {
				animation-name: error-num;
				animation-duration: 0.5s;
				animation-fill-mode: forwards;
				animation-delay: calc($i / 4) + s;
			}
		}
	}
	.home-card-two,
	.home-card-three {
		.home-card-item {
			width: 100%;
			height: 400px;
			overflow: hidden;
			.home-monitor {
				height: 100%;
				.flex-warp-item {
					display: flex;
					width: 25%;
					height: 111px;
					.flex-warp-item-box {
						display: flex;
						margin: auto;
						color: var(--el-text-color-primary);
						text-align: center;
						cursor: pointer;
						background: var(--next-bg-color);
						border-radius: 5px;
						transition: all 0.3s ease;
						&:hover {
							background: var(--el-color-primary-light-9);
							transition: all 0.3s ease;
						}
					}
					@for $i from 0 through $home-nav-length {
						.home-animation#{$i} {
							opacity: 0;
							animation-name: error-num;
							animation-duration: 0.5s;
							animation-fill-mode: forwards;
							animation-delay: calc($i / 10) + s;
						}
					}
				}
			}
		}
	}
}
</style>
