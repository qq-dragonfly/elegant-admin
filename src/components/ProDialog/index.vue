<!--
 * @Descripttion: 弹窗扩展组件
 * @version: 1.0
 * @Author: zhangyao
 * @Date: 2023年1月10日17:51:52
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<div class="pro-dialog" ref="ProDialogRef">
		<el-dialog
			ref="dialog"
			top="5vh"
			:width="width"
			destroy-on-close
			class="dialogClass"
			v-model="state.dialogVisible"
			:fullscreen="state.isFullscreen"
			v-bind="$attrs"
			:show-close="false"
		>
			<template #header>
				<slot name="title">
					<span class="el-dialog__title">{{ title }}</span>
				</slot>
				<div class="pro-dialog__headerbtn">
					<button v-if="showFullscreen" aria-label="fullscreen" type="button" @click="setFullscreen">
						<el-icon v-if="state.isFullscreen" class="el-dialog__close">
							<svg-icon name="ep:bottom-left" />
						</el-icon>
						<el-icon v-else class="el-dialog__close">
							<svg-icon name="local-fullscreen" />
						</el-icon>
					</button>
					<button v-if="showClose" aria-label="close" type="button" @click="closeDialog">
						<el-icon class="el-dialog__close">
							<svg-icon name="ep:close-bold" />
						</el-icon>
					</button>
				</div>
			</template>
			<div v-loading="loading">
				<slot></slot>
			</div>
			<template #footer>
				<slot name="footer"></slot>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="ProDialog">
import { ref, reactive } from 'vue';
const props = defineProps({
	modelValue: { type: Boolean, default: false },
	title: { type: String, default: '' },
	width: { type: String, default: '60%' },
	showClose: { type: Boolean, default: true },
	showFullscreen: { type: Boolean, default: true },
	isFullscreenProps: { type: Boolean, default: false },
	drag: { type: Boolean, default: true },
	loading: { type: Boolean, default: false }
});
const state = reactive({
	dialogVisible: false,
	isFullscreen: false
});
const ProDialogRef = ref();
watch(
	() => props.modelValue,
	() => {
		state.dialogVisible = props.modelValue;
		if (state.dialogVisible) {
			nextTick(() => {
				ProDialogRef.value.querySelector('.el-dialog').style.top = '0px';
				ProDialogRef.value.querySelector('.el-dialog').style.left = '0px';
			});
		}
	}
);
onMounted(() => {
	state.dialogVisible = props.modelValue;
	state.isFullscreen = props.isFullscreenProps;
});
//关闭
const closeDialog = () => {
	state.dialogVisible = false;
};
//最大化
const setFullscreen = () => {
	state.isFullscreen = !state.isFullscreen;
};
</script>

<style lang="scss" scoped>
.pro-dialog__headerbtn {
	position: absolute;
	top: var(--el-dialog-padding-primary);
	right: var(--el-dialog-padding-primary);
}
.pro-dialog__headerbtn button {
	padding: 0;
	margin-left: 15px;
	font-size: var(--el-message-close-size, 16px);
	color: var(--el-color-info);
	cursor: pointer;
	background: transparent;
	border: none;
	outline: none;
}
.pro-dialog__headerbtn button:hover .el-dialog__close {
	color: var(--el-color-primary);
}
.pro-dialog:deep(.el-dialog).is-fullscreen {
	top: 0 !important;
	left: 0 !important;
	display: flex;
	flex-direction: column;
}
.pro-dialog:deep(.el-overlay) .el-overlay-dialog {
	overflow: hidden;
}
.pro-dialog:deep(.dialogClass) .el-dialog__body {
	max-height: 74vh;
	overflow-y: auto;
}
.pro-dialog:deep(.el-dialog).is-fullscreen .el-dialog__footer {
	padding-bottom: 10px;
	border-top: 1px solid var(--el-border-color-base);
}
.pro-dialog {
	:deep(.el-select) {
		width: 100%;
	}
}
</style>
