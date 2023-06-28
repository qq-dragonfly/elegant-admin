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
		<el-row :gutter="15" class="home-card-one mb-[10px]">
			<el-col
				:xs="24"
				:sm="12"
				:md="12"
				:lg="6"
				:xl="6"
				v-for="(v, k) in state.homeOne"
				:key="k"
				:class="{ 'home-media home-media-lg': k > 1, 'home-media-sm': k === 1 }"
			>
				<div class="home-card-item flex">
					<div class="flex-margin flex relative w-[100-px] flex-1" :class="` home-one-animation${k}`">
						<div class="flex-auto">
							<span class="font-[30px]" :style="{ color: v.color }">{{ v.numText }}</span>
							<div class="mt-[10px]">{{ v.text }}</div>
						</div>
						<div class="home-card-item-btn absolute bottom-[5px] right-[10px]" v-if="v.type !== 'rate'">
							<el-button type="primary" link>查看</el-button>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15" class="home-card-one mb-[10px]">
			<el-col
				:xs="24"
				:sm="12"
				:md="12"
				:lg="6"
				:xl="6"
				v-for="(v, k) in state.homeTow"
				:key="k"
				:class="{ 'home-media home-media-lg': k > 1, 'home-media-sm': k === 1 }"
			>
				<div class="home-card-item flex">
					<div class="flex-margin flex relative w-[100-px] flex-1" :class="` home-one-animation${k}`">
						<div class="flex-auto">
							<span class="font-[30px]" :style="{ color: v.color }">{{ v.numText }}</span>
							<div class="mt-[10px]">{{ v.text }}</div>
						</div>
						<div class="home-card-item-btn absolute bottom-[5px] right-[10px]" v-if="v.type !== 'rate'">
							<el-button type="primary" link>查看</el-button>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15" class="home-card-two">
			<el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
				<div class="home-card-item mb-[10px]">
					<div style="height: 100%" ref="homeBarRef"></div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" class="home-media">
				<div class="home-card-item">
					<div class="flex justify-center" style="height: 100%" ref="homePieRef"></div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15" class="home-card-two">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="home-card-item">
					<div style="height: 100%" ref="homeLineRef"></div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="home">
import * as echarts from 'echarts';
import useSettingsStore from '@/store/modules/settings';
import { useFullscreen } from '@vueuse/core';
import { getTimeState } from '@/utils';
import {
	getCollectDayFollowInfoApi,
	getCollectMonthFollowInfoApi,
	getCollectYearFollowInfoApi,
	getEmergencyCollectInfoApi,
	getEmergencyCollectYearInfoApi
} from '@/api/modules/common';
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
//获取最近随访完成情况
const dateTime = ref<any>([]);
const lossFollowUpData = ref<any>([]); //失访
const finishFollowUpData = ref<any>([]); //完成随访
const sendFollowUpData = ref<any>([]); //发送随访
const getCollectYearFollowInfo = () => {
	dateTime.value = [];
	getCollectYearFollowInfoApi({}).then((res: any) => {
		res.data.map((item: any) => {
			dateTime.value.push(item.collectDate);
			lossFollowUpData.value.push(item.unCompleteCount);
			finishFollowUpData.value.push(item.completeCount);
			sendFollowUpData.value.push(item.sendCount);
		});
	});
};
// 获取近半年异常事件信息
const emergencyDateTime = ref<any>([]);
const emergencyTotal = ref<any>([]); //异常总数统计
const getEmergencyCollectYearInfo = () => {
	dateTime.value = [];
	getEmergencyCollectYearInfoApi({}).then((res: any) => {
		res.data.map((item: any) => {
			emergencyDateTime.value.push(item.yearMonth);
			emergencyTotal.value.push(item.total);
		});
	});
};
// 折线图
const initLineChart = () => {
	if (!state.global.dispose.some((b: any) => b === state.global.homeChartOne)) {
		state.global.homeChartOne.dispose();
	}
	state.global.homeChartOne = markRaw(echarts.init(homeLineRef.value, state.charts.theme));
	const option = {
		backgroundColor: state.charts.bgColor,
		title: {
			text: '最近随访完成情况',
			x: 'center',
			textStyle: { fontSize: '15', color: state.charts.color }
		},
		grid: { top: 70, right: 20, bottom: 30, left: 30 },
		tooltip: { trigger: 'axis' },
		legend: { data: ['失访', '完成随访', '发放随访'], right: 0, top: 30 },
		xAxis: {
			data: dateTime.value
		},
		yAxis: [
			{
				type: 'value',
				name: '次数',
				splitLine: { show: true, lineStyle: { type: 'dashed', color: '#f5f5f5' } }
			}
		],
		series: [
			{
				name: '失访',
				type: 'line',
				symbolSize: 6,
				symbol: 'circle',
				smooth: true,
				data: lossFollowUpData.value,
				lineStyle: { color: '#fe9a8b' },
				itemStyle: { color: '#fe9a8b', borderColor: '#fe9a8b' },
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#fe9a8bb3' },
						{ offset: 1, color: '#fe9a8b03' }
					])
				}
			},
			{
				name: '完成随访',
				type: 'line',
				symbolSize: 6,
				symbol: 'circle',
				smooth: true,
				data: finishFollowUpData.value,
				lineStyle: { color: '#9E87FF' },
				itemStyle: { color: '#9E87FF', borderColor: '#9E87FF' },
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#9E87FFb3' },
						{ offset: 1, color: '#9E87FF03' }
					])
				},
				emphasis: {
					itemStyle: {
						color: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.5,
							colorStops: [
								{ offset: 0, color: '#9E87FF' },
								{ offset: 0.4, color: '#9E87FF' },
								{ offset: 0.5, color: '#fff' },
								{ offset: 0.7, color: '#fff' },
								{ offset: 0.8, color: '#fff' },
								{ offset: 1, color: '#fff' }
							]
						},
						borderColor: '#9E87FF',
						borderWidth: 2
					}
				}
			},
			{
				name: '发放随访',
				type: 'line',
				symbolSize: 6,
				symbol: 'circle',
				smooth: true,
				data: sendFollowUpData.value,
				lineStyle: { color: '#26deca' },
				itemStyle: { color: '#26deca', borderColor: '#26deca' },
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#26deca' },
						{ offset: 1, color: '#26deca' }
					])
				},
				emphasis: {
					itemStyle: {
						color: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.5,
							colorStops: [
								{ offset: 0, color: '#26deca' },
								{ offset: 0.4, color: '#26deca' },
								{ offset: 0.5, color: '#fff' },
								{ offset: 0.7, color: '#fff' },
								{ offset: 0.8, color: '#fff' },
								{ offset: 1, color: '#fff' }
							]
						},
						borderColor: '#26deca',
						borderWidth: 2
					}
				}
			}
		]
	};
	state.global.homeChartOne.setOption(option);
};
// 饼图
const initPieChart = () => {
	if (!state.global.dispose.some((b: any) => b === state.global.homeChartTow)) {
		state.global.homeChartTow.dispose();
	}
	state.global.homeChartTow = markRaw(echarts.init(homePieRef.value, state.charts.theme));
	const option = {
		backgroundColor: state.charts.bgColor,
		title: {
			text: '异常事件监控',
			x: 'center',
			textStyle: { fontSize: '15', color: state.charts.color }
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			icon: 'circle',
			right: 0,
			top: 30
		},
		series: [
			{
				type: 'pie',
				top: '20%',
				radius: '80%',
				center: ['40%', '50%'],
				color: ['#e6a23c', '#f56c6c', '#53a7ff'],
				data: state.homeThree
			}
		]
	};
	state.global.homeChartTow.setOption(option);
};
// 柱状图
const initBarChart = () => {
	if (!state.global.dispose.some((b: any) => b === state.global.homeChartThree)) {
		state.global.homeChartThree.dispose();
	}
	state.global.homeChartThree = markRaw(echarts.init(homeBarRef.value, state.charts.theme));
	const option = {
		backgroundColor: state.charts.bgColor,
		title: {
			text: '最近半年异常事件发生情况',
			x: 'center',
			textStyle: { fontSize: '15', color: state.charts.color }
		},
		grid: { top: 70, right: 20, bottom: 30, left: 30 },
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			right: 0,
			top: 30,
			data: ['异常事件']
		},
		xAxis: [
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true
				},
				axisLabel: {
					interval: 0
					// width: "70",
					// overflow: "truncate"
				},
				data: emergencyDateTime.value,
				triggerEvent: true
			}
		],
		yAxis: [
			{
				type: 'value',
				triggerEvent: true
			}
		],
		series: [
			{
				name: '异常事件',
				type: 'bar',
				barWidth: '15%',
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: '#f56c6c'
						},
						{
							offset: 1,
							color: '#f89898'
						}
					])
				},
				data: emergencyTotal.value
			}
		],
		addTooltip: true
	};
	state.global.homeChartThree.setOption(option);
};

// 页面加载时
onMounted(async () => {
	await getCollectYearFollowInfo();
	await getEmergencyCollectYearInfo();
	await getCollectDayFollowInfo();
	await getEmergencyCollectInfo();
	await getCollectMonthFollowInfo();
	timeFn();
});

// 获取当日随访信息
const getCollectDayFollowInfo = () => {
	getCollectDayFollowInfoApi({}).then((res: any) => {
		let resData = [
			{
				numText: res.data.sendCount,
				text: '今日随访发放',
				color: '#409eff',
				type: 'sendCount'
			},
			{
				numText: res.data.completeCount,
				text: '今日随访完成',
				color: '#409eff',
				type: 'completeCount'
			},
			{
				numText: res.data.unCompleteCount,
				text: '今日未完成',
				color: '#f56c6c',
				type: 'unCompleteCount'
			},
			{
				numText: res.data.rate,
				text: '今日随访完成率',
				color: '',
				type: 'rate'
			}
		];
		state.homeOne = resData;
	});
};
// 获取当月随访信息
const getCollectMonthFollowInfo = () => {
	getCollectMonthFollowInfoApi({}).then((res: any) => {
		let resData = [
			{
				numText: res.data.sendCount,
				text: '本月随访发放',
				color: '#409eff',
				type: 'sendCount'
			},
			{
				numText: res.data.completeCount,
				text: '本月随访完成',
				color: '#409eff',
				type: 'completeCount'
			},
			{
				numText: res.data.unCompleteCount,
				text: '本月未完成随访',
				color: '#f56c6c',
				type: 'unCompleteCount'
			},
			{
				numText: res.data.rate,
				text: '本月随访完成率',
				color: '',
				type: 'rate'
			}
		];
		state.homeTow = resData;
	});
};
// 获取异常事件信息

const getEmergencyCollectInfo = () => {
	getEmergencyCollectInfoApi({}).then((res: any) => {
		let resData = [
			{ value: res.data.untreated, name: '未处理异常' },
			{ value: res.data.todayProcess, name: '今日已处理异常' },
			{ value: res.data.monthProcess, name: '本月已处理异常' }
		];
		state.homeThree = resData;
	});
};
// 监听 pinia 中是否开启深色主题
watch(
	() => settingsStore.app.colorScheme,
	isIsDark => {
		nextTick(() => {
			state.charts.theme = isIsDark === 'dark' ? 'dark' : 'light';
			state.charts.bgColor = isIsDark === 'dark' ? 'transparent' : '';
			state.charts.color = isIsDark === 'dark' ? '#ffffff' : '#999999';
			setTimeout(() => {
				initLineChart();
				initPieChart();
				initBarChart();
			}, 500);
		});
	},
	{
		deep: true,
		immediate: true
	}
);
watch(
	() => isFullscreen.value,
	() => {
		nextTick(() => {
			setTimeout(() => {
				initLineChart();
				initPieChart();
				initBarChart();
			}, 500);
		});
	},
	{
		deep: true,
		immediate: true
	}
);
watch(
	() => bsInfo.size,
	() => {
		setTimeout(() => {
			initLineChart();
			initPieChart();
			initBarChart();
		}, 500);
	},
	{
		deep: true,
		immediate: true
	}
);
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
