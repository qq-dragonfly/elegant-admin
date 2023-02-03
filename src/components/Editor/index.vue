<template>
	<div class="editor">
		<TinymceEditor v-model="myValue" :init="completeSetting" :disabled="disabled" />
	</div>
</template>
<script lang="ts" setup name="Editor">
import tinymce from 'tinymce/tinymce';
import TinymceEditor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default/icons';
import 'tinymce/models/dom';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/table';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/searchreplace';

import useSettingsStore from '@/store/modules/settings';
import useCurrentInstance from '@/utils/composables/useCurrentInstance';

const proxy = useCurrentInstance();
const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	setting: {
		type: Object,
		default: () => {}
	},
	disabled: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:modelValue']);

const settingsStore = useSettingsStore();

const defaultSetting = ref({
	language_url: 'tinymce/langs/zh-Hans.js',
	language: 'zh-Hans',
	skin_url: settingsStore.app.colorScheme === 'light' ? 'tinymce/skins/ui/oxide' : 'tinymce/skins/ui/oxide-dark',
	content_css:
		settingsStore.app.colorScheme === 'light'
			? 'tinymce/skins/content/default/content.min.css'
			: 'tinymce/skins/content/dark/content.min.css',
	min_height: 250,
	max_height: 600,
	selector: 'textarea',
	plugins: 'autolink autoresize fullscreen image insertdatetime link lists media preview table wordcount code searchreplace',
	toolbar:
		'undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor removeformat | link image media table insertdatetime searchreplace | preview code fullscreen',
	branding: false,
	menubar: false,
	toolbar_mode: 'sliding',
	insertdatetime_formats: ['%Y年%m月%d日', '%H点%M分%S秒', '%Y-%m-%d', '%H:%M:%S'],
	// https://www.tiny.cloud/docs/tinymce/6/file-image-upload/#images_upload_handler
	images_upload_handler: (blobInfo: any, progress: any) => {
		return new Promise(async (resolve, reject) => {
			const { url } = await uploadImageFile(blobInfo);
			resolve(url);
		});
	},
	file_picker_types: 'media',
	file_picker_callback: (callback: any, value: any, meta: any) => {
		if (meta.filetype === 'media') {
			//,,m4v,avi,wmv,rmvb,mov,mpg,mpeg,webm
			let filetype = '.mp4,.mkv, .avi,.wmv, .rmvb,.mov,.mpg,.mpeg,.webm'; //限制文件的上传类型
			let inputElem = document.createElement('input') as any;
			inputElem.setAttribute('type', 'file');
			inputElem.setAttribute('accept', filetype);
			inputElem.click();
			inputElem.onchange = async function () {
				const file = inputElem.files[0]; // 为 HTMLInputElement 构造函数中的 this，指向 input 实例对象
				const isValid = await validateVideo(file);
				if (isValid) {
					const { url } = await uploadVideoFile(file, 'video');
					callback(url);
				} else {
					callback();
				}
			};
		}
	},
	video_template_callback: (data: any) => {
		return `<video width="100%" height="auto" controls="controls" src=${data.source} />`;
	}
});

const myValue = ref(props.modelValue);

const completeSetting = computed(() => {
	return Object.assign(defaultSetting.value, props.setting);
});

watch(
	() => myValue.value,
	newValue => {
		emit('update:modelValue', newValue);
	}
);

watch(
	() => props.modelValue,
	newValue => {
		myValue.value = newValue;
	}
);

onMounted(() => {
	tinymce.init({});
});

/**
 * @description 校验上传视频
 * @param {File} file - 要上传的文件
 * @returns {boolean}
 */
const validateVideo = async (file: any) => {
	const isLt500M = file.size / 1024 / 1024 < 500;
	if (!isLt500M) {
		proxy.$message.error('上传视频大小限制 500M 以内！');
		return false;
	}
	const duration: any = await getVideoDuration(file);
	if (duration > 3600) {
		proxy.$message.error('上传视频时长不能超过 1小时！');
		return false;
	}
	return true;
};
/**
 * @description 调用后端接口上传视频
 * @param {File} file - 要上传的文件
 * @param type
 * @returns {boolean}
 */
const uploadVideoFile = async (file: any, type: string = 'video') => {
	console.log(file);
	return { url: 'https://womanhospital.oss-cn-beijing.aliyuncs.com/health/voice/20221116/1668587036075120.MOV' };
};
/**
 * @description 调用后端接口上传图征
 * @param {blobInfo} blobInfo - 要上传的图片
 * @returns {boolean}
 */
const uploadImageFile = async (blobInfo: any) => {
	console.log('blobInfo', blobInfo);
	const img = `data:image/jpeg;base64,${blobInfo.base64()}`;
	return { url: img };
};

/**
 * @description 获取视频时长
 * @param {File} file - 要上传的文件
 * @returns {Promise<number>}
 */
const getVideoDuration = (file: any) => {
	return new Promise(resolve => {
		const videoElement = document.createElement('video');
		videoElement.src = URL.createObjectURL(file);

		videoElement.addEventListener('loadedmetadata', () => {
			resolve(videoElement.duration);
		});
	});
};
</script>

<style lang="scss" scoped>
:deep(.tox-tinymce) {
	border-radius: 4px;
}
</style>
