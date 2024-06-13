<!--
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-12 09:19:44
 * @LastEditors: zhangyao
-->
<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue'
import type { ActivitybarModel } from '../../../../../../utils'
import { pluginManager } from '../../../../../../utils'
import EIcon from '../../../../icon'

defineOptions({
  name: 'EActionBar',
})
const activitybars = computed(() => {
  return pluginManager.viewsContainers.activitybars.value.filter(item => item.visible)
})

const actionBarCheckedIndex = ref<number | null>(0)

const sidebarComponent = shallowRef<any>(null)
sidebarComponent.value = activitybars.value[0].component

function handleClick(item: ActivitybarModel, index: number) {
  if (actionBarCheckedIndex.value === index) {
    actionBarCheckedIndex.value = null
    return false
  }
  sidebarComponent.value = item.component
  actionBarCheckedIndex.value = index
}
</script>

<template>
  <div class="relative flex">
    <div class="elegant-action-bar">
      <ul class="elegant-actions-container">
        <li
          v-for="(item, index) in activitybars" :key="index" class="elegant-action-item" :title="item.title"
          :class="{ checked: actionBarCheckedIndex === index }" @click="handleClick(item, index)"
        >
          <EIcon prefix="" class="iconfont relative" :name="item.icon" />
          <div class="mt-5px text-14px">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>
    <div class="elegant-left-sidebar" :class="{ hide: actionBarCheckedIndex === null }">
      <div class="elegant-sidebar-container">
        <component :is="sidebarComponent" />
      </div>
    </div>
  </div>
</template>
