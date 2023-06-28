<!--
 * @Descripttion: xgplayer二次封装
-->

<template>
	<div class="zy-video" ref="eleVideo"></div>
</template>

<script lang="ts" setup name="VideoPlayer">
import Player from 'xgplayer';
import HlsPlayer from 'xgplayer-hls';
const props = defineProps({
	src: { type: String, required: true, default: '' },
	autoplay: { type: Boolean, default: false },
	controls: { type: Boolean, default: true },
	loop: { type: Boolean, default: false },
	isLive: { type: Boolean, default: false },
	options: {
		type: Object,
		default: () => {}
	}
});
const player = ref<any>();
watch(
	() => props.src,
	(newVal: any) => {
		if (player.value.hasStart) {
			player.value.src = newVal;
		} else {
			player.value.start(newVal);
		}
	}
);
onMounted(() => {
	if (props.isLive) {
		initHls();
	} else {
		init();
	}
});
const eleVideo = ref<HTMLElement>();
function init() {
	player.value = new Player({
		el: eleVideo.value,
		url: props.src,
		autoplay: props.autoplay,
		loop: props.loop,
		controls: props.controls,
		fluid: true,
		lang: 'zh-cn',
		...props.options
	});
}
function initHls() {
	player.value = new HlsPlayer({
		el: eleVideo,
		url: props.src,
		autoplay: props.autoplay,
		loop: props.loop,
		controls: props.controls,
		fluid: true,
		isLive: true,
		ignores: ['time', 'progress'],
		lang: 'zh-cn',
		...props.options
	});
}
function destroyXgPlayer() {
	player.value?.destroy();
}
onUnmounted(() => {
	destroyXgPlayer();
});
</script>

<style scoped>
.zy-video:deep(.danmu) > * {
	font-size: 20px;
	font-weight: bold;
	color: #ffffff;
	text-shadow: 1px 1px 0 #000000, -1px -1px 0 #000000, -1px 1px 0 #000000, 1px -1px 0 #000000;
}
.zy-video:deep(.xgplayer-controls) {
	background-image: linear-gradient(180deg, transparent, rgb(0 0 0 / 30%));
}
.zy-video:deep(.xgplayer-progress-tip) {
	padding: 0 10px;
	line-height: 25px;
	color: #ffffff;
	background: rgb(0 0 0 / 50%);
	border: 0;
	border-radius: 25px;
}
.zy-video:deep(.xgplayer-enter-spinner) {
	width: 50px;
	height: 50px;
}
</style>
