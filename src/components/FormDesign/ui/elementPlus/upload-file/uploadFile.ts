import { type PropType, computed, defineComponent, h, nextTick, ref, watch } from 'vue'
import { ElButton, ElMessage, ElUpload, type UploadProps, type UploadRawFile, type UploadUserFile } from 'element-plus'

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<UploadUserFile[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const fileList = ref<UploadUserFile[]>([])
    watch(fileList, (e) => {
      emit('update:modelValue', e)
    })
    // 处理传递进来的值
    watch(
      () => props.modelValue,
      (e) => {
        if ((e != null) && e.length > 0 && (fileList.value != null)) {
          // props modelValue 等于 data 不进行处理
          if (fileList.value === e) {
            return
          }
          fileList.value.length = 0
          fileList.value.push(...e)
        }
      },
      { deep: true, immediate: true },
    )

    // function handleChange : UploadProps['onChange']  (e: UploadUserFile[]) => {
    //   nextTick(() => { fileList.value = e })
    // }
    const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles): void => {
      nextTick(() => {
        fileList.value = uploadFiles
      })
    }
    // 处理数据结果
    // const handleChange = (info: UploadChangeParam): void => {
    //   if (info.file.status === 'uploading') {
    //     return
    //   }
    //
    //   if (info.file.status === 'done') {
    //     // Get this url from response in real world.
    //     const url = info.file.response?.data?.url
    //     if (!info.file.url && !url) {
    //       info.file.status = 'error'
    //       ElMessage.error('上传失败')
    //       return
    //     }
    //     // 赋值url
    //     info.file.url = url
    //   }
    //
    //   if (info.file.status === 'error') {
    //     ElMessage.error('upload error')
    //   }
    // }

    // 上传前处理
    const beforeUpload: UploadProps['beforeUpload'] = (file: UploadRawFile): void => {
      console.log('file', file)
      // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      // if (!isJpgOrPng) {
      //   message.error('您只能上传JPG/PNG文件!');
      // }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   message.error('图片大小超过 2MB!');
      // }
      // return isJpgOrPng && isLt2M;
    }
    const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
      console.log(uploadFiles)
      console.log(response)
      console.log(uploadFile)
    }
    const handleError: UploadProps['onError'] = (error, uploadFile, uploadFiles) => {
      ElMessage.error('上传失败')
      console.error(error)
      console.error(uploadFile)
      console.error(uploadFiles)
    }
    const getUploadProps = computed<any>(() => ({
      ...attrs,
      'file-list': fileList.value,
      'onBeforeUpload': beforeUpload,
      'onChange': handleChange,
      'onSuccess': handleSuccess,
      'onError': handleError,
    }))

    return () => {
      return h('div', null, {
        default: () => [
          h(ElUpload, getUploadProps.value, {
            default: () => [
              h(
                ElButton,
                {},
                {
                  default: () => [
                    h('span', {
                      class: 'iconfont elegant-icon-shangchuan-file',
                      style: { 'margin-right': '2px' },
                    }),
                    h('span', null, { default: () => '上传文件' }),
                  ],
                },
              ),
            ],
          }),
        ],
      })
    }
  },
})
