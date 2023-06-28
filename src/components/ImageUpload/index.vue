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
			:http-request="imageRequest"
			drag
			class="image-upload"
		>
			<el-image
				v-if="url === ''"
				:src="url === '' ? placeholder : url"
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
				<el-image :src="url" :style="`width:${width}px;height:${height}px;`" fit="fill" />
				<div class="mask">
					<div class="actions">
						<span title="预览" @click.stop="preview">
							<el-icon>
								<svg-icon name="ep:zoom-in" />
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
			<div v-show="url === '' && uploadData.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
				<el-image :src="uploadData.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
				<el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="uploadData.progress.percent" />
			</div>
		</el-upload>
		<div v-if="!notip" class="el-upload__tip">
			<div style="display: inline-block">
				<el-alert
					:title="`上传图片支持 ${ext.join(' / ')} 格式，且图片大小不超过 ${size}MB`"
					type="info"
					show-icon
					:closable="false"
				/>
			</div>
		</div>
		<el-image-viewer v-if="uploadData.imageViewerVisible" :url-list="[url]" @close="previewClose" />
	</div>
</template>
<script lang="ts" setup name="ImageUpload">
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
	url: {
		type: String,
		default: ''
	},
	size: {
		type: Number,
		default: 10
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
		default: true
	},
	ext: {
		type: Array,
		default: () => ['jpg', 'png', 'gif', 'bmp', 'jpeg']
	}
});

const emit = defineEmits(['update:url', 'onSuccess']);

const uploadData = ref({
	imageViewerVisible: false,
	progress: {
		preview: '',
		percent: 0
	}
});
// 预览
function preview() {
	uploadData.value.imageViewerVisible = true;
}
// 关闭预览
function previewClose() {
	uploadData.value.imageViewerVisible = false;
}
// 移除
function remove() {
	emit('update:url', '');
}
const beforeUpload: UploadProps['beforeUpload'] = file => {
	const fileName = file.name.split('.');
	const fileExt = fileName[fileName.length - 1];
	const isTypeOk = props.ext.includes(fileExt);
	const isSizeOk = file.size / 1024 / 1024 < props.size;
	if (!isTypeOk) {
		ElMessage.error(`上传图片只支持 ${props.ext.join(' / ')} 格式！`);
		return false;
	}
	if (!isSizeOk) {
		ElMessage.error(`上传图片大小不能超过 ${props.size}MB！`);
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
const onSuccess = (url: any) => {
	uploadData.value.progress.preview = '';
	uploadData.value.progress.percent = 0;
	if (url) {
		emit('onSuccess', url);
	}
};
const loading = ref(false);
const imageRequest = async (options: any) => {
	try {
		// 上传文件
		loading.value = true;
		let formData = new FormData();
		formData.append('multipartFile', options.file);
		formData.append('type', 'IMAGE');
		loading.value = true;
		await uploadApi(formData).then((res: any) => {
			if (res.code === 200) {
				ElMessage.success('图片上传成功！');
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
