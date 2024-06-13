<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-12 20:03:09
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { inject } from 'vue'
import { pluginManager } from '../../../../../../utils'
import type { ComponentSchema, Designer } from '../../../../../types/elegant-designer'
import EIcon from '../../../../icon'
const designer = inject('designer') as Designer
/**
 * 选中点击节点元素
 * @param schema
 */
function handleSelect(schema: ComponentSchema) {
  designer.setCheckedNode(schema)
}
</script>

<template>
  <div class="elegant-breadcrumb h-40px truncate pl-4 line-height-40px">
    <span v-for="(item, index) in designer.state.matched" :key="index">
      <span v-if="index > (designer.state.matched.length - 4)">
        <span v-if="designer.state.matched.length > 3 && index === (designer.state.matched.length - 3)">...</span>
        <EIcon v-if="index !== 0" class="m-1" name="icon-zhankai" />
        <span
          class="node-item cursor-pointer" @click="handleSelect(item)" @mouseenter.stop="designer.setHoverNode(item)"
          @mouseleave.stop="designer.setHoverNode(null)"
        >
          {{ pluginManager.getComponentConfingByType(item?.type
            ?? '')?.defaultSchema.label }}
        </span>
      </span>

    </span>
  </div>
</template>
