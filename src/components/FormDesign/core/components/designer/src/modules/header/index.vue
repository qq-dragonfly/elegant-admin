<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-05 17:51:17
 * @LastEditTime: 2024-06-11 16:59:09
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { type Ref, inject } from 'vue'
import { pluginManager } from '../../../../../../utils'
import EIcon from '../../../../icon'
import type { DesignerProps } from '../../types'

const emits = defineEmits(['save', 'reset', 'preview'])
const Button = pluginManager.getComponent('button')
const designerProps = inject('designerProps') as Ref<DesignerProps>

/**
 * 预览
 */
function handlePreview() {
  emits('preview')
}

/**
 * 触发保存操作
 */
function handleSave() {
  emits('save')
}
</script>

<template>
  <div>
    <header class="elegant-header relative">
      <div class="elegant-header-item flex flex-1 items-center">
        <slot name="prefix">
          <span class="ml-3">elegant-design</span>
        </slot>
      </div>

      <div class="elegant-header-item flex flex-1 justify-center text-14px">
        <slot name="title">
          {{ designerProps.title }}
        </slot>
      </div>
      <div class="elegant-header-item flex flex-1 items-center justify-end">
        <slot name="right-prefix" />
        <slot name="right-action">
          <div>
            <Button size="small" @click="handlePreview">
              <EIcon name="icon-yulan" style="margin-right:6px" />
              预览
            </Button>
          </div>
          <div class="ml-2">
            <Button size="small" @click="handleSave">
              <EIcon name="icon-baocun" style="margin-right:6px" />
              保存
            </Button>
          </div>
        </slot>
        <slot name="right-suffix" />
      </div>
    </header>
  </div>
</template>
