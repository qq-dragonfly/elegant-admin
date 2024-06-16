<script lang="ts" setup>
import { type ComponentInternalInstance, computed, getCurrentInstance, nextTick, provide, reactive, ref, useSlots, watch } from 'vue'
import { deepClone, deepCompareAndModify, loadAsyncComponent, pluginManager, usePageManager } from '../../../../utils'
import ENode from '../../node'
import type { FormDataModel, PageSchema } from '../../../types/elegant-designer'

const props = defineProps<{
  pageSchema: PageSchema
  disabled?: boolean
}>()

const emit = defineEmits<{
  ready: any
}>()

const EAsyncLoader = loadAsyncComponent(() => import('../../asyncLoader/index.vue'))

const pageManager = usePageManager()
const slots = useSlots()
const forms = ref<any>({})
const ready = ref<boolean>(false)
const pageSchemaReactive = reactive<PageSchema>({
  schemas: [],
})

watch(() => props.pageSchema, (e) => {
  deepCompareAndModify(pageSchemaReactive, e)
}, {
  immediate: true,
  deep: true,
})

watch(() => pageSchemaReactive.script, (e) => {
  if (e && e !== '') {
    pageManager.setMethods(e, true)
  }
}, {
  immediate: true,
})

provide('slots', slots)
provide('pageManager', pageManager)
provide('forms', forms)
provide('pageSchema', pageSchemaReactive)
provide('disabled', computed(() => props.disabled))

/**
 * 跳过验证直接获取表单数据
 * @param formName 表单name
 */
function getData(formName = 'default'): Promise<FormDataModel | boolean> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // 判断表单是否已经初始化
    if (!ready.value) {
      // 监听表单初始化状态
      const unwatch = watch(ready, async () => {
        // 注销监听
        unwatch()
        resolve(await getData(formName))
      })
      return
    }

    const form = forms.value?.[formName]
    // 通过表单查询不到表单实例
    if (!form) {
      // console.error(`表单 [name=${formName}] 不存在`)
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`表单 [name=${formName}] 不存在`)
      return false
    }

    const formData = deepClone(await form.getData())
    resolve(formData)
  })
}

/**
 * 验证并获取数据
 * @param formName 表单name
 */
function validate(formName = 'default'): Promise<FormDataModel | boolean> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // 判断表单是否已经初始化
    if (!ready.value) {
      // 监听表单初始化状态
      const unwatch = watch(ready, async () => {
        // 注销监听
        unwatch()
        resolve(await validate(formName))
      })
      return
    }

    const form = forms.value?.[formName]
    // 通过表单查询不到表单实例
    if (!form) {
      // console.error(`表单 [name=${formName}] 不存在`)
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`表单 [name=${formName}] 不存在`)
      return false
    }
    try {
      await form.validate()
      const formData = await form.getData()
      resolve(formData)
    }
    catch (error) {
      reject(error)
    }
  })
}

/**
 * 设置表单数据
 * @param data
 */
function setData(data: FormDataModel, formName = 'default') {
  // 判断表单是否已经初始化
  if (!ready.value) {
    // 监听表单初始化状态
    const unwatch = watch(ready, () => {
      // 注销监听
      unwatch()
      setData(data, formName)
    })
    return
  }

  const form = forms.value?.[formName]
  // 通过表单查询不到表单实例
  if (!form) {
    console.error(`表单 [name=${formName}] 不存在`)
    return false
  }

  form.setData(data)
}

/**
 * 获取表单实例的异步函数
 * @param {string} formName - 表单名称，默认为 'default'
 * @returns {Promise<any | boolean>} - 返回一个 Promise 对象，可能是表单实例或布尔值
 */
function getFormInstance(formName = 'default'): Promise<any | boolean> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // 判断表单是否已经初始化
    if (!ready.value) {
      // 监听表单初始化状态
      const unwatch = watch(ready, async () => {
        // 注销监听
        unwatch()
        // 重新调用 getFormInstance，直到表单初始化完成
        resolve(await getFormInstance(formName))
      })
      return
    }

    // 获取指定名称的表单实例
    const form = forms.value?.[formName]
    // 通过表单查询不到表单实例
    if (!form) {
      // 输出错误信息并拒绝 Promise
      // console.error(`表单 [name=${formName}] 不存在`);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`表单 [name=${formName}] 不存在`)
      return false
    }

    // 成功获取表单实例，解析 Promise
    resolve(form)
  })
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance
/**
 * 组件（包含异步组件）加载完成后
 */
function handleReady() {
  // 等待DOM更新循环结束后
  nextTick(() => {
    ready.value = true

    emit('ready', pageManager)

    // 注入builder对象
    proxy && pageManager.addComponentInstance('builder', proxy)
  })
}
defineExpose({
  ready,
  getData,
  setData,
  validate,
  getFormInstance,
})
</script>

<template>
  <div v-if="!pluginManager.initialized.value" class="elegant-loading-box">
    <!-- <EAsyncLoader /> -->
  </div>
  <Suspense v-else @resolve="handleReady">
    <template #default>
      <div class="elegant-builder-main p-16px">
        <ENode v-for="item, index in pageSchemaReactive.schemas" :key="index" :component-schema="item" />
      </div>
    </template>
    <template #fallback>
      <div class="elegant-loading-box">
        <EAsyncLoader />
      </div>
    </template>
  </Suspense>
</template>
