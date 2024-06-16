<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-13 09:15:41
 * @LastEditTime: 2024-06-16 18:34:47
 * @LastEditors: zhangyao
-->
<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 16:47:05
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import draggable from 'vuedraggable'
import { computed, inject } from 'vue'
import { pluginManager, revoke } from '../../../../../../utils'
import type { ComponentSchema, Designer, PageSchema } from '../../../../../types/elegant-designer'
import ENodeItem from './nodeItem.vue'

defineOptions({
  name: 'EditNodeItem',
})
const props = defineProps<{
  schemas: ComponentSchema[]
}>()
const emit = defineEmits(['update:schemas'])
const designer = inject('designer') as Designer
const pageSchema = inject('pageSchema') as PageSchema
const modelSchemas = computed({
  get() {
    // 判断props.schemas是否存在值
    return props.schemas
  },
  set(e) {
    emit('update:schemas', e)
  },
})

/**
 * 选中点击节点元素
 * @param index
 */
function handleSelect(index: number) {
  designer.setCheckedNode(modelSchemas.value![index])
  designer.setDisableHover(true)
}

function handleEnd() {
  designer.setDisableHover()
  revoke.push(pageSchema.schemas, '拖拽组件')
}

function handleAdd() {
  revoke.push(pageSchema.schemas, '插入组件')
}

function isDraggable(schemas: ComponentSchema) {
  // 判断当前节点类型是否允许拖拽
  if (schemas.type === 'form' || pluginManager.getComponentConfingByType(schemas.type).editConstraints?.immovable) {
    // 禁止拖拽
    return 'unmover-item'
  }

  return 'draggable-item'
}
</script>

<template>
  <draggable
    v-model="modelSchemas" item-key="id" :component-data="{
      type: 'transition-group',
    }" class="elegant-draggable-range p-16px" v-bind="{
      animation: 200,
      group: 'edit-draggable',
      handle: '.draggable-item',
      ghostClass: 'moveing',
    }" @start="handleSelect($event.oldIndex)" @end="handleEnd()" @add="handleSelect($event.newIndex); handleAdd()"
  >
    <template #item="{ element, index }">
      <div :key="index" class="widget-box" :class="isDraggable(element)">
        <ENodeItem :schema="element" />
      </div>
    </template>
  </draggable>
</template>
