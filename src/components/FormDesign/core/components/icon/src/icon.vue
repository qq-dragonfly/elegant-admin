<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 17:05:05
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
defineOptions({
  name: 'EIcon',
})
const props = withDefaults(defineProps<{
  name: string
  prefix?: string
}>(), {
  prefix: 'elegant-',
})
</script>

<template>
  <span class="iconfont" :class="props.prefix + props.name" />
</template>
