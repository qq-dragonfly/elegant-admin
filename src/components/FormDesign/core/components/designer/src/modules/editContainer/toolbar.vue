<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { deepCompareAndModify, pluginManager, revoke, useShareStore } from '../../../../../../utils'
import type { Designer, PageSchema } from '../../../../../types/elegant-designer'
import EIcon from '../../../../icon'
import EPreviewJson from './previewJson.vue'

const Slider = pluginManager.getComponent('slider')
const Select = pluginManager.getComponent('select')

const { canvasScale, disabledZoom } = useShareStore()
const checkedKey = ref('pc')
const pageSchema = inject('pageSchema') as PageSchema
const designer = inject('designer') as Designer
const previewJson = ref<InstanceType<typeof EPreviewJson> | null>(null)

const deviceOptions = [
  {
    icon: 'icon-a-diannaotoubu',
    title: 'pc',
    key: 'pc',
  },
  {
    icon: 'icon-a-pingbantoubu',
    title: '平板',
    key: 'pad',
  },
  {
    icon: 'icon-a-shoujitoubu',
    title: '手机',
    key: 'mobile',
  },
]

const recordList = revoke.recordList
const undoList = revoke.undoList

const actionOptions = computed(() => {
  return [
    {
      icon: 'icon-daima1',
      title: '查看数据',
      on: () => handlePreview(),
    },
    {
      icon: 'icon-shanchu1',
      title: '清空',
      on: handleReset,
    },
    {
      icon: 'icon-chexiao2x',
      title: '撤销',
      on: handleUndo,
      disabled: !recordList.value.length,
    },
    {
      icon: 'icon-fanhui2x',
      title: '重做',
      on: handleRedo,
      disabled: !undoList.value.length,
    },

  ]
})

const canvasScaleComuted = computed({
  get() {
    return `${(canvasScale.value * 100).toFixed(0)}%`
  },
  set(value) {
    canvasScale.value = Number(value)
  },
})

const canvasScaleOptions = [
  {
    label: '60%',
    value: '0.6',
  },
  {
    label: '80%',
    value: '0.8',
  },
  {
    label: '100%',
    value: '1.0',
  },
  {
    label: '120%',
    value: '1.2',
  },
  {
    label: '140%',
    value: '1.4',
  },
]

/**
 * 撤销操作
 */
function handleUndo() {
  const componentSchema = revoke.undo()
  if (!componentSchema) {
    return
  }
  deepCompareAndModify(pageSchema.schemas, componentSchema)
  designer.setCheckedNode(pageSchema.schemas[0])
}

/**
 * 重做操作
 */
function handleRedo() {
  const componentSchema = revoke.redo()
  if (!componentSchema) {
    return
  }
  deepCompareAndModify(pageSchema.schemas, componentSchema)
  designer.setCheckedNode(pageSchema.schemas[0])
}

/**
 * 重置页面数据
 */
function handleReset() {
  designer.reset()
}

// 预览数据
function handlePreview() {
  previewJson.value!.handleOpen()
}

/**
 * 设置画布宽高
 * @param type
 */
function handleSetCanvas(type: string) {
  designer.handleToggleDeviceMode(type)
  checkedKey.value = type
  const canvasConfigs: any = {
    pc: {

    },
    pad: {
      width: '800px',
      mode: type,
    },
    mobile: {
      width: '420px',
      mode: type,
    },
  }

  pageSchema.canvas = canvasConfigs[type]
}
</script>

<template>
  <!-- 工具条 start  -->
  <div class="elegant-edit-toolbar flex items-center justify-between px-4">
    <div class="h-full flex flex-1 items-center">
      <div
        v-for="(item, index) in actionOptions" :key="index"
        :title="item.title" class="elegant-action-item h-80% flex cursor-pointer items-center px-10px" :class="{ disabled: item.disabled }"
        @click="item.on"
      >
        <EIcon :name="item.icon" />
      </div>
    </div>

    <div class="h-full flex flex-1 items-center justify-center">
      <div
        v-for="item in deviceOptions" :key="item.key"
        :title="item.title" class="elegant-device-item h-80% flex cursor-pointer items-center px-10px" :class="{ checked: item.key === checkedKey }"
        @click="handleSetCanvas(item.key)"
      >
        <EIcon :name="item.icon" />
      </div>
    </div>
    <div class="h-full flex flex-1 items-center justify-end">
      <!-- 缩放操作 start  -->
      <div v-if="!disabledZoom" class="ml-12px flex items-center">
        <div class="w-82px cursor-pointer pr-8px">
          <Select
            v-model:value="canvasScaleComuted" v-model="canvasScaleComuted"
            :options="canvasScaleOptions" size="small"
          />
        </div>
        <div class="w-90px cursor-pointer">
          <Slider
            v-model:value="canvasScale" v-model="canvasScale" :min="0.6" :max="1.4" :step="0.01"
            :tooltip="false"
          />
        </div>
      </div>
      <!-- 缩放操作 end  -->
    </div>
  </div>
  <EPreviewJson ref="previewJson" />
  <!-- 工具条 end  -->
</template>
