<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-13 09:15:41
 * @LastEditTime: 2024-06-14 17:00:06
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { ref, useAttrs } from 'vue'
import { ElFormItem } from 'element-plus'

const attrs = useAttrs() as any
const form = ref<any>(null)
</script>

<template>
  <ElFormItem
    ref="form"
    v-bind="attrs"
    :prop="attrs.field"
  >
    <slot />
  </ElFormItem>
</template>
