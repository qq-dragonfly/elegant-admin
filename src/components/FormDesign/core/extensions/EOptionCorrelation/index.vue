<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 14:52:55
 * @LastEditTime: 2024-06-13 08:46:41
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { pluginManager } from '../../../utils'

const Button = pluginManager.getComponent('button')
function handleAdd() {
  console.log('handleAdd')
}
</script>

<template>
  <div class="setting-links">
    <Button @click="handleAdd">
      选项关联显示设置
    </Button>
  </div>
</template>
