<template>
	<div class="upload-container">
		<el-upload
			v-loading="loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
			element-loading-text="上传中..."
			:show-file-list="false"
			:headers="headers"
			:action="action"
			:data="data"
			:name="name"
			:before-upload="beforeUpload"
			:on-progress="onProgress"
			:on-success="onSuccess"
			:http-request="videoRequest"
			drag
			class="image-upload"
		>
			<el-image
				v-if="modelValue === ''"
				:src="modelValue === '' ? placeholder : modelValue"
				:style="`width:${width}px;height:${height}px;`"
				fit="fill"
			>
				<template #error>
					<div class="image-slot" :style="`width:${width}px;height:${height}px;`">
						<el-icon>
							<svg-icon name="ep:plus" />
						</el-icon>
					</div>
				</template>
			</el-image>
			<div v-else class="image">
				<div :style="`width:${width}px;height:${height}px;`">
					<video :src="modelValue" alt="" :width="width" :height="height"></video>
				</div>
				<div class="mask">
					<div class="actions">
						<span title="预览" @click.stop="preview">
							<el-icon>
								<svg-icon name="ep:video-pause" />
							</el-icon>
						</span>
						<span title="移除" @click.stop="remove" v-if="!isRemove">
							<el-icon>
								<svg-icon name="ep:delete" />
							</el-icon>
						</span>
					</div>
				</div>
			</div>
			<div
				v-show="modelValue === '' && uploadData.progress.percent"
				class="progress"
				:style="`width:${width}px;height:${height}px;`"
			>
				<el-image :src="uploadData.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
				<el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="uploadData.progress.percent" />
			</div>
		</el-upload>
		<div v-if="!notip" class="el-upload__tip">
			<div style="display: inline-block">
				<el-alert
					:title="`上传视频支持 ${ext.join(' / ')} 格式，且视频大小不超过 ${size}MB`"
					type="info"
					show-icon
					:closable="false"
				/>
			</div>
		</div>
		<el-dialog
			title="查看视频"
			:append-to-body="true"
			v-model="uploadData.videoViewerVisible"
			width="750px"
			@close="previewClose"
		>
			<div>
				<video-player :src="modelValue" :options="videoOptions"></video-player>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts" setup name="VideoUpload">
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
import { uploadApi } from '@/api/modules/upload';
const props = defineProps({
	action: {
		type: String
	},
	headers: {
		type: Object,
		default: () => {}
	},
	data: {
		type: Object,
		default: () => {}
	},
	name: {
		type: String,
		default: 'file'
	},
	modelValue: {
		type: String,
		default: ''
	},
	size: {
		type: Number,
		default: 500
	},
	width: {
		type: Number,
		default: 150
	},
	height: {
		type: Number,
		default: 150
	},
	placeholder: {
		type: String,
		default: ''
	},
	notip: {
		type: Boolean,
		default: false
	},
	isRemove: {
		type: Boolean,
		default: false
	},
	ext: {
		type: Array,
		default: () => ['mp4', 'ogg', 'flv', 'avi', 'wmv', 'rmvb']
	}
});

const emit = defineEmits(['update:modelValue', 'onSuccess']);

const uploadData = ref({
	videoViewerVisible: false,
	progress: {
		preview: '',
		percent: 0
	}
});
const videoOptions = ref({
	pip: true
});
// 预览
function preview() {
	uploadData.value.videoViewerVisible = true;
}
// 关闭预览
function previewClose() {
	uploadData.value.videoViewerVisible = false;
}
// 移除
function remove() {
	emit('update:modelValue', '');
}
const beforeUpload: UploadProps['beforeUpload'] = file => {
	const fileName = file.name.split('.');
	const fileExt = fileName[fileName.length - 1];
	const isTypeOk = props.ext.includes(fileExt);
	const isSizeOk = file.size / 1024 / 1024 < props.size;
	if (!isTypeOk) {
		ElMessage.error(`上传视频只支持 ${props.ext.join(' / ')} 格式！`);
		return false;
	}
	if (!isSizeOk) {
		ElMessage.error(`上传视频大小不能超过 ${props.size}MB！`);
		return false;
	}
	if (isTypeOk && isSizeOk) {
		uploadData.value.progress.preview = URL.createObjectURL(file);
	}
	return isTypeOk && isSizeOk;
};
const onProgress: UploadProps['onProgress'] = file => {
	uploadData.value.progress.percent = ~~file.percent;
};
const onSuccess = (videoUrl: any) => {
	uploadData.value.progress.preview = '';
	uploadData.value.progress.percent = 0;
	if (videoUrl) {
		emit('onSuccess', videoUrl);
		emit('update:modelValue', videoUrl);
	}
};
const loading = ref(false);
const videoRequest = async (options: any) => {
	try {
		let formData = new FormData();
		formData.append('multipartFile', options.file);
		formData.append('type', 'VIDEO');
		loading.value = true;
		await uploadApi(formData).then((res: any) => {
			if (res.code === 200) {
				ElMessage.success('视频上传成功！');
				options.onSuccess(res.data);
				loading.value = false;
			} else {
				options.onError('上传失败');
				loading.value = false;
			}
		});
	} catch (e) {
		options.onError('上传失败', e);
	}
};
</script>

<style lang="scss" scoped>
.upload-container {
	line-height: initial;
}
.el-image {
	display: block;
}
.image {
	position: relative;
	overflow: hidden;
	border-radius: 6px;
	.mask {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: var(--el-overlay-color-lighter);
		opacity: 0;
		transition: opacity 0.3s;
		.actions {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			width: 100px;
			height: 100px;

			@include position-center(xy);
			span {
				width: 50%;
				color: var(--el-color-white);
				text-align: center;
				cursor: pointer;
				transition: color 0.1s, transform 0.1s;
				&:hover {
					transform: scale(1.5);
				}
				.el-icon {
					font-size: 24px;
				}
			}
		}
	}
	&:hover .mask {
		opacity: 1;
	}
}
.image-upload {
	display: inline-block;
	vertical-align: top;
}
:deep(.el-upload) {
	font-size: 0;
	.el-upload-dragger {
		display: inline-block;
		padding: 0;
		&.is-dragover {
			border-width: 1px;
		}
		.image-slot {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			color: var(--el-text-color-placeholder);
			background-color: transparent;
			i {
				font-size: 30px;
			}
		}
		.progress {
			position: absolute;
			top: 0;
			&::after {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				content: '';
				background-color: var(--el-overlay-color-lighter);
			}
			.el-progress {
				z-index: 1;

				@include position-center(xy);
				.el-progress__text {
					color: var(--el-text-color-placeholder);
				}
			}
		}
	}
}
</style>
