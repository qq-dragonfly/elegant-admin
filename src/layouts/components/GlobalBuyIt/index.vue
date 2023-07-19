<template>
	<div class="buy-it" :class="{ actived: isActived }" v-if="settingsStore.toolbar.enableAppSetting">
		<div class="item">
			<span class="item" @click="eventBus.emit('global-theme-toggle')">
				<el-icon>
					<svg-icon name="ep:setting" />
				</el-icon>
			</span>
		</div>
	</div>
</template>
<script lang="ts" setup name="BuyIt">
import useSettingsStore from '@/store/modules/settings';
import eventBus from '@/utils/eventBus';

const settingsStore = useSettingsStore();

let VITE_APP_MODE = ref<any>(import.meta.env.VITE_APP_MODE);
const isActived = ref<boolean>(true);
setTimeout(() => {
	isActived.value = false;
}, 4000);

onMounted(() => {
	settingsStore.$patch((state: any) => {
		if (VITE_APP_MODE.value === 'dev' || VITE_APP_MODE.value === 'test') {
			state.toolbar.enableAppSetting = true;
		}
	});
});
</script>
<style lang="scss" scoped>
.buy-it {
	position: fixed;
	top: 50%;
	right: -38px;
	z-index: 10;
	display: flex;
	flex-direction: column;
	width: 50px;
	transition: right 0.3s;
	transform: translateY(-50%);
	&.actived,
	&:hover {
		right: 0;
	}
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 50px;
		color: #ffffff;
		text-align: center;
		cursor: pointer;
		border-bottom: 1px solid #ffffff;
		opacity: 0.7;
		transition: 0.3s;
		&:hover {
			opacity: 1;
		}
		&:first-child {
			border-top-left-radius: 5px;
		}
		&:last-child {
			border-bottom: 0;
			border-bottom-left-radius: 5px;
		}
		&:nth-child(1) {
			background-color: var(--el-color-primary);
		}
		&:nth-child(2) {
			background-color: #409eff;
		}
		&:nth-child(3) {
			background-color: #0fcc1a;
		}
		&:nth-child(4) {
			background-color: #343b42;
		}
		.el-icon {
			display: block;
			margin: 0 auto;
			font-size: 20px;
		}
		.title {
			display: inline-block;
			font-size: 12px;
		}
	}
}
</style>
