<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 14:52:55
 * @LastEditTime: 2024-06-14 09:39:36
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { ComponentSchema, Designer } from '../../types/elegant-designer'
import { pluginManager } from '../../../utils'
import EOptionCorrelationModal from './src/EOptionCorrelationModal.vue'

const designer = inject('designer') as Designer

const Button = pluginManager.getComponent('button')

const checkedNode = computed(() => {
  return designer.state.checkedNode as ComponentSchema | undefined
})

const EOptionCorrelationModalRef = ref<any>(null)
/**
 * 打开逻辑配置窗口
 * @param type
 */
function handleOpen() {
  EOptionCorrelationModalRef.value?.handleOpen()
}
</script>

<template>
  <div class="setting-links">
    <Button @click="handleOpen()">
      去设置
    </Button>
    <EOptionCorrelationModal ref="EOptionCorrelationModalRef" :checked-node="checkedNode" />
  </div>
</template>
