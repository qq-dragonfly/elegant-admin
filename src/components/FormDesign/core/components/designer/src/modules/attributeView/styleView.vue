<script lang="ts" setup>
import { computed, inject, nextTick } from 'vue'
import { getAttributeValue, revoke, setAttributeValue } from '../../../../../../utils'
import ENode from '../../../../node/index'
import type { ComponentSchema, Designer, PageSchema } from '../../../../../types/elegant-designer'

const designer = inject('designer') as Designer
const pageSchema = inject('pageSchema') as PageSchema

const componentStyles: ComponentSchema[] = [
  {
    label: '宽度',
    type: 'EInputSize',
    field: 'componentProps.style.width',
  },
  {
    label: '高度',
    type: 'EInputSize',
    field: 'componentProps.style.height',
  },
  {
    label: '内边距',
    type: 'EInputSize',
    field: 'componentProps.style.padding',
  },
  {
    label: '上内边距',
    type: 'EInputSize',
    field: 'componentProps.style.paddingTop',
  },
  {
    label: '下内边距',
    type: 'EInputSize',
    field: 'componentProps.style.paddingBottom',
  },
  {
    label: '左内边距',
    type: 'EInputSize',
    field: 'componentProps.style.paddingLeft',
  },
  {
    label: '右内边距',
    type: 'EInputSize',
    field: 'componentProps.style.paddingRight',
  },

  {
    label: '外边距',
    type: 'EInputSize',
    field: 'componentProps.style.margin',
  },
  {
    label: '上外边距',
    type: 'EInputSize',
    field: 'componentProps.style.marginTop',
  },
  {
    label: '下外边距',
    type: 'EInputSize',
    field: 'componentProps.style.marginBottom',
  },
  {
    label: '左外边距',
    type: 'EInputSize',
    field: 'componentProps.style.marginLeft',
  },
  {
    label: '右外边距',
    type: 'EInputSize',
    field: 'componentProps.style.marginRight',
  },
  {
    label: '背景色',
    type: 'color-picker',
    field: 'componentProps.style.backgroundColor',
    componentProps: {
      type: 'color',
      style: {
        // width: '60px'
      },
    },
  },
  {
    label: '字体颜色',
    type: 'color-picker',
    field: 'componentProps.style.color',
    componentProps: {
      type: 'color',
      style: {
      },
    },
  },
]

const checkedNode = computed(() => {
  return designer.state.checkedNode
})

function isShow(item: ComponentSchema) {
  // show属性为boolean类型则直接返回
  if (typeof item.show === 'boolean') {
    return item.show
  }
  return item.show?.({ values: checkedNode.value! }) ?? true
}

/**
 * 设置属性值
 */
function handleSetValue(value: any, field: string, item: ComponentSchema, editData = checkedNode.value) {
  if (typeof item.onChange === 'function') {
    item.onChange({ value, values: editData!, componentStyles })
  }
  // 判断是否同步修改属性值
  if (item.changeSync) {
    setAttributeValue(value, field, editData!)
  }
  else {
    nextTick(() => {
      setAttributeValue(value, field, editData!)
    })
  }
  // 将修改过的组件属性推入撤销操作的栈中
  revoke.push(pageSchema.schemas, '编辑组件属性')
}
</script>

<template>
  <div :key="checkedNode?.id" class="elegant-style-view">
    <div v-for="item in componentStyles" :key="item.field">
      <div v-if="isShow(item)" class="elegant-attr-item" :class="item.layout">
        <div class="elegant-attr-label" :title="item.label">
          {{ item.label }}
        </div>
        <div class="elegant-attr-input">
          <ENode
            :component-schema="{ ...item, componentProps: { ...item.componentProps, ...(item.field === 'componentProps.defaultValue' ? checkedNode?.componentProps : {}), input: false, field: undefined, hidden: false }, show: true, noFormItem: true }"
            :model-value="getAttributeValue(item.field!, item.editData ?? checkedNode!)"
            @update:model-value="handleSetValue($event, item.field!, item, item.editData)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
