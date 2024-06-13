<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 19:23:58
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import type { Ref, Slots } from 'vue'
import { computed, defineComponent, h, inject, ref, watch } from 'vue'
import { pluginManager } from '../../../../utils'
import type { ComponentSchema } from '../../../types/elegant-designer'
import EIcon from '../../icon'
import ETreeNodes from './treeNodes.vue'

defineOptions({
  name: 'ETreeNodeItem',
})

const props = defineProps<{
  schema: ComponentSchema
}>()
const localSchema = ref<any>(props.schema)
watch(
  () => props.schema,
  (newSchema) => {
    localSchema.value = newSchema
  },
  {
    deep: true,
  },
)
const slots = inject('slots', {}) as Slots

const expandedKeys = inject('expandedKeys') as Ref<string[]>
const treeProps = inject('treeProps') as any
const selectedKeys = inject('selectedKeys') as Ref<string[]>

const handleSelect = inject('handleSelect') as any

const expanded = computed(() => {
  return expandedKeys.value.includes(props.schema.id ?? '')
})

const TreeNodeText = defineComponent({
  setup() {
    return () => h('span', {
      class: {
        text: true,
        hover: treeProps.hoverKey === props.schema.id,
        checked: selectedKeys.value.includes(props.schema.id!),
      },
      onClick: () => handleSelect(props.schema.id!, props.schema),
    },
    slots['tree-node']?.(props)
    ?? h('span', { class: 'elegant-text-padding' },
      {
        default: () => [
          props.schema.label ?? pluginManager.getComponentConfingByType(props.schema.type)?.defaultSchema.label,
          h('span', { class: 'elegant-node-type-text' }, props.schema.type),
        ],
      },
    ),
    )
  },
})

function handleExpanded() {
  const id = props.schema.id
  if (!id) {
    return false
  }

  if (expandedKeys.value.includes(id)) {
    expandedKeys.value = expandedKeys.value.filter(item => item !== id)
  }
  else {
    expandedKeys.value.push(id)
  }
}

function init() {
  const id = props.schema.id
  if (!id || !props.schema.children?.length) {
    return false
  }
  expandedKeys.value.push(id)
}
init()
</script>

<template>
  <li
    class="elegant-tree-node"
    :class="{ 'expanded': props.schema.children?.length, 'level-1': props.schema.type === 'page' }"
  >
    <a>
      <span
        v-if="props.schema.children?.length && props.schema.type !== 'page'" class="icon-expanded"
        :class="{ expanded }" @click="handleExpanded"
      >
        <EIcon name="icon-youjiantou" />
      </span>
      <TreeNodeText />
    </a>
    <ETreeNodes
      v-if="props.schema.children?.length" v-model:schemas="localSchema.children" class="elegant-tree-sublist"
      :class="{ expanded }" :parent-schema="props.schema"
    />
  </li>
</template>
