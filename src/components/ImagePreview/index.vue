<template>
	<el-image :src="src" fit="cover" :style="`width:${realWidth};height:${realHeight};`" :preview-src-list="[src]">
		<template #error>
			<div class="image-slot">
				<el-icon>
					<svg-icon name="ele_image_load_fail" />
				</el-icon>
			</div>
		</template>
	</el-image>
</template>
<script lang="ts" setup name="ImagePreview">
const props = defineProps({
	src: {
		type: String,
		required: true
	},
	width: {
		type: [Number, String],
		default: ''
	},
	height: {
		type: [Number, String],
		default: ''
	}
});

const realWidth = computed(() => {
	return typeof props.width === 'string' ? props.width : `${props.width}px`;
});

const realHeight = computed(() => {
	return typeof props.height === 'string' ? props.height : `${props.height}px`;
});
</script>

<style lang="scss" scoped>
.el-image {
	background-color: var(--el-fill-color);
	border-radius: 5px;
	box-shadow: var(--el-box-shadow-light);
	transition: background-color 0.3s, var(--el-transition-box-shadow);
	:deep(.el-image__inner) {
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			transform: scale(1.2);
		}
	}
	:deep(.image-slot) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-size: 30px;
		color: #909399;
	}
}
</style>
