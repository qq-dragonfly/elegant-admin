<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 09:14:39
 * @LastEditTime: 2024-06-16 18:47:06
 * @LastEditors: zhangyao
-->
<script setup lang="ts">
import { ref, useAttrs } from 'vue'

const attrs = useAttrs() as any
</script>

<template>
  <h1 v-if="attrs?.componentSchema?.componentProps?.size === 'h1'" class="m-0 leading-8 line-height-32px">
    {{ attrs?.componentSchema?.label }}
  </h1>
  <h2 v-else-if="attrs?.componentSchema?.componentProps?.size === 'h2'" class="m-0 leading-8 line-height-32px">
    {{ attrs?.componentSchema?.label }}
  </h2>
  <h3 v-else-if="attrs?.componentSchema?.componentProps?.size === 'h3'" class="m-0 leading-8 line-height-32px">
    {{ attrs?.componentSchema?.label }}
  </h3>
  <h4 v-else-if="attrs?.componentSchema?.componentProps?.size === 'h4'" class="m-0 leading-8 line-height-32px">
    {{ attrs?.componentSchema?.label }}
  </h4>
  <h5 v-else-if="attrs?.componentSchema?.componentProps?.size === 'h5'" class="m-0 leading-8 line-height-32px">
    {{ attrs?.componentSchema?.label }}
  </h5>
  <h6 v-else-if="attrs?.componentSchema?.componentProps?.size === 'h6'" class="m-0 leading-8 line-height-32px">
    {{ attrs?.componentSchema?.label }}
  </h6>
  <h3 v-else class="leading-8 line-height-32px">
    {{ attrs?.componentSchema?.label }}
  </h3>
</template>

  <style scoped lang="scss">

  </style>
