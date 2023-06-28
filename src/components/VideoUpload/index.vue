<template>
	<div class="upload-container">
		<div v-for="(item, index) in modelValue" :key="index" class="video-item">
			<video v-if="index < max" :width="width" :src="item" :height="height"></video>
			<div class="mask">
				<div class="actions">
					<span title="预览" @click="preview(index)">
						<el-icon>
							<svg-icon name="ep:video-pause" />
						</el-icon>
					</span>
					<span title="移除" @click="remove(index)" v-if="!isRemove">
						<el-icon>
							<svg-icon name="ep:delete" />
						</el-icon>
					</span>
					<span v-show="modelValue.length > 1" title="左移" :class="{ disabled: index === 0 }" @click="move(index, 'left')">
						<el-icon>
							<svg-icon name="ep:back" />
						</el-icon>
					</span>
					<span
						v-show="modelValue.length > 1"
						title="右移"
						:class="{ disabled: index === modelValue.length - 1 }"
						@click="move(index, 'right')"
					>
						<el-icon>
							<svg-icon name="ep:right" />
						</el-icon>
					</span>
				</div>
			</div>
		</div>
		<el-upload
			v-loading="loading"
			element-loading-background="rgba(0, 0, 0, 0.5)"
			element-loading-text="上传中..."
			:show-file-list="false"
			v-show="modelValue.length < max"
			:headers="headers"
			:action="action"
			:data="data"
			:name="name"
			:before-upload="beforeUpload"
			:on-progress="onProgress"
			:on-success="onSuccess"
			:http-request="videoRequest"
			drag
			class="video-upload"
		>
			<div class="video-slot" :style="`width:${width}px;height:${height}px;`">
				<el-icon>
					<svg-icon name="ep:plus" />
				</el-icon>
			</div>
			<div v-show="uploadData.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
				<el-image :src="uploadData.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
				<el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="uploadData.progress.percent" />
			</div>
		</el-upload>
		<div v-if="!notip" class="el-upload__tip">
			<div style="display: inline-block">
				<el-alert
					:title="`上传视频支持 ${ext.join(' / ')} 格式，且视频大小不超过 ${size}MB，且视频数量不超过 ${max} 个`"
					type="info"
					show-icon
					:closable="false"
				/>
			</div>
		</div>
		<el-dialog
			title="查看视频"
			:append-to-body="true"
			v-if="uploadData.videoViewerVisible"
			v-model="uploadData.videoViewerVisible"
			width="750px"
			@close="previewClose"
		>
			<div v-if="itemVideoUrl">
				<video-player :src="itemVideoUrl" :options="videoOptions"></video-player>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts" setup name="VideoUpload">
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
import { uploadApi } from '@/api/modules/upload';
interface videosUploadProps {
	action?: string;
	headers?: object;
	data?: {};
	name?: string;
	modelValue?: any;
	max?: number;
	size?: number;
	width: number;
	height: number;
	placeholder?: string;
	notip?: boolean;
	ext?: string[];
	isRemove?: boolean;
}
const videoOptions = ref({
	pip: true
});
const itemVideoUrl = ref<any>('');
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<videosUploadProps>(), {
	name: 'file',
	max: 1,
	size: 500,
	width: 150,
	height: 150,
	notip: false,
	isRemove: false,
	ext: () => ['mp4', 'ogg', 'flv', 'avi', 'wmv', 'rmvb', 'mov', 'm4v']
});
const emit = defineEmits(['update:modelValue', 'onSuccess']);

const uploadData = ref({
	dialogImageIndex: 0,
	videoViewerVisible: false,
	progress: {
		preview: '',
		percent: 0
	}
});

// 预览
function preview(index: number) {
	itemVideoUrl.value = '';
	uploadData.value.dialogImageIndex = index;
	uploadData.value.videoViewerVisible = true;
	itemVideoUrl.value = props?.modelValue![index] || '';
}
// 关闭预览
function previewClose() {
	uploadData.value.videoViewerVisible = false;
}
// 移除
function remove(index: number) {
	const url: any = props.modelValue;
	url.splice(index, 1);
	emit('update:modelValue', url);
}
// 移动
function move(index: number, type: 'left' | 'right') {
	const url: any = props.modelValue;
	if (type === 'left' && index !== 0) {
		url[index] = url.splice(index - 1, 1, url[index])[0];
	}
	if (type === 'right' && index !== url.length - 1) {
		url[index] = url.splice(index + 1, 1, url[index])[0];
	}
	emit('update:modelValue', url);
}

const beforeUpload: UploadProps['beforeUpload'] = file => {
	const fileName = file.name.split('.');
	const fileExt = fileName[fileName.length - 1];
	const isTypeOk = props.ext.includes(fileExt as string);
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
const onSuccess: UploadProps['onSuccess'] = (url: any) => {
	uploadData.value.progress.preview = '';
	uploadData.value.progress.percent = 0;
	const urlList: any = props.modelValue;
	if (url) {
		urlList.push(url);
		emit('update:modelValue', urlList);
		emit('onSuccess', urlList);
	}
};
const loading = ref(false);
const videoRequest = async (options: any) => {
	try {
		// 上传文件
		loading.value = true;
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
.video-item {
	position: relative;
	display: inline-block;
	margin-right: 10px;
	overflow: hidden;
	border: 1px dashed var(--el-border-color);
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
				&.disabled {
					color: var(--el-text-color-disabled);
					cursor: not-allowed;
				}
				&:hover:not(.disabled) {
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
.video-upload {
	display: inline-block;
	vertical-align: top;
}
:deep(.el-upload) {
	.el-upload-dragger {
		display: inline-block;
		padding: 0;
		&.is-dragover {
			border-width: 1px;
		}
		.video-slot {
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
