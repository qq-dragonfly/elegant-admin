<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-13 19:56:40
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import draggable from 'vuedraggable'
import { inject } from 'vue'
import { useVModel } from '@vueuse/core'
import { getUUID, pluginManager } from '../../../../utils'
import EIcon from '../../../components/icon'

interface Option {
  label: string
  value: string
  links: string[]
  children?: Option[]
}

defineOptions({
  name: 'EOptionItem',
})

const props = defineProps<{
  modelValue: Option[]
}>()
const emit = defineEmits(['update:modelValue'])
const Input = pluginManager.getComponent('input')
const tree = inject('tree', false)
const innerValue = useVModel(props, 'modelValue', emit)

/**
 *  添加选项子选项
 */
function handleAddChildren(option: Option) {
  const childrenOption: Option = {
    label: '',
    value: `option_${getUUID(8)}`,
    links: [],
  }

  if (option.children) {
    option.children.push(childrenOption)
  }
  else {
    option.children = [childrenOption]
  }
}

/**
 * 删除选项
 * @param index
 */
function handleRemove(index: number) {
  innerValue.value = innerValue.value.filter((_item, i) => i !== index)
}
</script>

<template>
  <draggable
    v-model="innerValue" item-key="id" :component-data="{
      type: 'transition-group',
    }" group="option-list" handle=".handle" :animation="200"
  >
    <template #item="{ element: option, index }">
      <div>
        <div
          :class="tree ? 'grid-cols-[16px_auto_auto_16px_16px]' : 'grid-cols-[16px_auto_auto_16px]'"
          class="option-item grid mb-2 items-center gap-2"
        >
          <EIcon class="handle mr-2 cursor-move text-lg" name="icon-tuozhuai" />
          <Input v-model="option.label" v-model:value="option.label" placeholder="label" />
          <!-- <Input v-model="option.value" v-model:value="option.value" placeholder="value" /> -->
          <EIcon v-if="tree" class="text-lg" name="icon-tianjia1" @click="handleAddChildren(option)" />
          <EIcon class="cursor-pointer text-lg hover:text-red" name="icon-shanchu1" @click="handleRemove(index)" />
        </div>
        <div v-if="option.children" class="pl-4">
          <EOptionItem v-model="option.children" />
        </div>
      </div>
    </template>
  </draggable>
</template>
