<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-13 16:17:45
 * @LastEditTime: 2024-06-14 16:25:58
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  convertTreeToArr,
  deepClone,
  pluginManager,
} from '../../../../utils'
import type { ComponentSchema, PageSchema } from '../../../types/elegant-designer'

const props = defineProps({
  checkedNode: {
    type: Object as PropType<ComponentSchema>,
    default: () => {},
  },
})
const Modal = pluginManager.getComponent('modal')
const Select = pluginManager.getComponent('select')
const Input = pluginManager.getComponent('input')
const pageSchema = inject('pageSchema') as PageSchema
onMounted(() => {
  initPageSchema()
})
const pageSchemaList = ref<any>([])
function initPageSchema() {
  let filteredList = convertTreeToArr(deepClone(pageSchema.schemas))
  console.log('props', props.checkedNode)
  console.log('list', filteredList)
  const inputTypes = [
    'input',
    'text',
    'textarea',
    'number',
    'select',
    'cascader',
    'checkbox',
    'radio',
    'date',
    'time',
    'slider',
    'switch',
    'color-picker',
    'upload-file',
    'upload-image',
  ]
  filteredList = filteredList
    .filter((item: any) => inputTypes.includes(item.type) && item.id !== props.checkedNode.id)
    .map((item: any) => ({ ...item, value: item.id }))

  pageSchemaList.value = filteredList
}
const visible = ref(false)

function handleOpen() {
  visible.value = true
}

function handleSave() {
  console.log('checkedNode', props.checkedNode)
  console.log('pageSchema.schemas', pageSchema.schemas)
  handleClose()
}

function handleClose() {
  visible.value = false
}

defineExpose({
  handleOpen,
})
</script>

<template>
  <Modal
    v-model="visible"
    class="w-1000px !h-700px"
    width="1000px"
    title="逻辑配置"
    @close="handleClose"
    @ok="handleSave"
  >
    <div class="elegant-modal-action-main rounded">
      <!-- 逻辑配置 start -->
      <div class="p-20px">
        <div v-if="true">
          <div v-for="(checkedNodeOptionItem, index) in checkedNode.componentProps.options" :key="index" class="mb-10px mr-10px flex items-center">
            <span>当选中</span>
            <div class="mx-10px w-200px">
              <Input v-model="checkedNodeOptionItem.label" v-model:value="checkedNodeOptionItem.label" readonly placeholder="value" />
            </div>
            <span>时，</span>
            <span>显示</span>
            <div class="mx-10px w-300px">
              <Select
                v-model:value="checkedNodeOptionItem.links" v-model="checkedNodeOptionItem.links"
                :options="pageSchemaList"
                multiple
              />
            </div>
          </div>
        </div>
        <div
          v-else-if="checkedNode.componentProps?.options?.length === 0"
          class="pt-42px text-center text-gray-400"
        >
          暂无配置
        </div>
      </div>
      <!-- 动作配置 end -->
    </div>
  </Modal>
</template>
