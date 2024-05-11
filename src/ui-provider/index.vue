<script setup lang="ts">
import zhCN from 'element-plus/es/locale/lang/zh-cn.mjs'
import { useTheme } from './useElementTheme'
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()
const { changePrimary } = useTheme()
watch(
  () => settingsStore.settings.app.themeColor,
  () => {
    changePrimary(settingsStore.settings.app.themeColor)
  },
  {
    deep: true,
  },
)
</script>

<template>
  <ElConfigProvider :locale="zhCN" :button="{ autoInsertSpace: true }">
    <slot />
  </ElConfigProvider>
</template>
