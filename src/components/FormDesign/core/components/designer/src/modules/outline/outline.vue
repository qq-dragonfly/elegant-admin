<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 16:59:57
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { computed, inject } from 'vue'
import { pluginManager } from '../../../../../../utils'
import ETree from '../../../../tree'
import type { Designer, PageSchema } from '../../../../../types/elegant-designer'

const designer = inject('designer') as Designer
const pageSchema = inject('pageSchema') as PageSchema

// 计算选中节点值
const selectedKeys = computed(() => {
  const id = designer.state.checkedNode?.id
  return id ? [id] : []
})

// 设置选中节点
function handleNodeClick(e: any) {
  designer.setCheckedNode(e.componentSchema)
}
</script>

<template>
  <div class="elegant-outline">
    <ETree
      :options="pageSchema.schemas" draggable :selected-keys="selectedKeys" :hover-key="designer.state.hoverNode?.id"
      @node-click="handleNodeClick"
    >
      <template #tree-node="{ schema }">
        <div
          class="elegant-text-padding" @mouseenter.stop="designer.setHoverNode(schema)"
          @mouseleave.stop="designer.setHoverNode(null)"
        >
          {{ schema.label
            ?? pluginManager.getComponentConfingByType(schema.type)?.defaultSchema.label }}
          <span class="elegant-node-type-text">
            {{ schema.type }}
          </span>
        </div>
      </template>
    </ETree>
  </div>
</template>
