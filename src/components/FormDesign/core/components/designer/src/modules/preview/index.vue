<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-13 09:15:41
 * @LastEditTime: 2024-06-18 18:44:38
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { inject, nextTick, ref } from 'vue'
import { getUUID, pluginManager } from '../../../../../../utils'
import EBuilder from '../../../../builder'
import type { PageSchema } from '../../../../../types/elegant-designer'

const MonacoEditor = pluginManager.getComponent('monacoEditor')
const Modal = pluginManager.getComponent('modal')
const monacoEditorRef = ref<any>(null)

const visible = ref(false)
const dataVisible = ref(false)
const formValues = ref({})

const pageSchema = inject('pageSchema') as PageSchema
const kb = ref<any>(null)
const EBuilderKey = ref('')

function handleCloseData() {
  dataVisible.value = false
}

function handleClose() {
  visible.value = false
}

function handleOpen() {
  visible.value = true
  // 通过修改key重新渲染组件
  EBuilderKey.value = getUUID()
}

async function handleOk() {
  try {
    const values = await kb.value.validate()
    console.log('表单结果为：', values)
    formValues.value = JSON.stringify(values, null, 2)
    nextTick(() => {
      monacoEditorRef.value?.setValue(formValues.value)
    })
    dataVisible.value = true
  }
  catch (err) {
    if (typeof err === 'string') {
      // eslint-disable-next-line no-alert
      alert(`${err}\r\n请添加表单组件后再尝试！`)
    }
    console.error(err)
  }
}

defineExpose({
  handleOpen,
})
</script>

<template>
  <Modal v-model="visible" title="预览" class="w-900px" width="900px" ok-text="输出结果" @close="handleClose" @ok="handleOk">
    <div class="min-w-750px rounded px-16px">
      <EBuilder :key="EBuilderKey" ref="kb" :page-schema="pageSchema" />

      <!-- 输出结果 start -->
      <Modal v-model="dataVisible" title="表单数据" class="w-860px" width="860px" @close="handleCloseData" @ok="handleCloseData">
        <div class="h-full rounded">
          <MonacoEditor ref="monacoEditorRef" auto-toggle-theme class="editor h-full" :model-value="formValues" />
        </div>
      </Modal>
      <!-- 输出结果 end -->
    </div>
  </Modal>
</template>
