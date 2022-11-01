<template>
	<div class="buy-it" :class="{ actived: isActived }">
		<div class="item">
			<span v-if="settingsStore.toolbar.enableAppSetting" class="item" @click="eventBus.emit('global-theme-toggle')">
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
const isActived = ref(true);
setTimeout(() => {
	isActived.value = false;
}, 4000);

onMounted(() => {});
</script>
<style lang="scss" scoped>
.buy-it {
	position: fixed;
	z-index: 10;
	right: -38px;
	top: 50%;
	transform: translateY(-50%);
	width: 50px;
	display: flex;
	flex-direction: column;
	transition: right 0.3s;

	&.actived,
	&:hover {
		right: 0;
	}

	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 50px;
		text-align: center;
		color: #fff;
		border-bottom: 1px solid #fff;
		transition: 0.3s;
		opacity: 0.7;
		cursor: pointer;

		&:hover {
			opacity: 1;
		}

		&:first-child {
			border-top-left-radius: 5px;
		}

		&:last-child {
			border-bottom-left-radius: 5px;
			border-bottom: 0;
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
