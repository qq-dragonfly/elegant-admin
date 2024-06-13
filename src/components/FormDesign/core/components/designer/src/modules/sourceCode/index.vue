<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 17:02:54
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { inject, ref, toRaw, watch } from 'vue'
import { deepCompareAndModify, deepEqual, pluginManager } from '../../../../../../utils'
import type { Designer } from '../../../../../types/elegant-designer'

const MonacoEditor = pluginManager.getComponent('monacoEditor')
const monacoEditorRef = ref<any>(null)
const designer = inject('designer') as Designer
let oldVal: any = {}
watch(() => designer.state.checkedNode, (newVal: any) => {
  if (!deepEqual(oldVal, toRaw(newVal))) {
    monacoEditorRef.value?.setValue(JSON.stringify(newVal, null, 2))
  }
}, {
  deep: true,
})

const initModelValue = JSON.stringify(designer.state.checkedNode, null, 2)

function setSchemas(e: string) {
  try {
    if (!designer.state.checkedNode) {
      return false
    }
    oldVal = JSON.parse(e)
    deepCompareAndModify(designer.state.checkedNode, oldVal)
  }
  catch (error) {
    console.warn('[elegant-desinger：源码]异常：', error)
  }
}
</script>

<template>
  <div class="elegant-sound-code">
    <MonacoEditor
      ref="monacoEditorRef" auto-toggle-theme class="elegant-editor" :model-value="initModelValue"
      line-numbers="off" @update:model-value="setSchemas"
    />
  </div>
</template>
