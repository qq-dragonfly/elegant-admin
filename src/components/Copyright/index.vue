<script lang="ts" setup name="Copyright">
import useSettingsStore from '@/store/modules/settings'

const route = useRoute()
const settingsStore = useSettingsStore()
</script>

<template>
  <footer v-if="route.meta.copyright ?? settingsStore.copyright.enable" class="copyright">
    <span>Copyright</span>
    <span class="icon">©</span>
    <span v-if="settingsStore.copyright.dates">{{ settingsStore.copyright.dates }}</span>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 20px;
  color: var(--el-text-color-secondary);
  font-size: 14px;

  span,
  a {
    padding: 0 5px;
  }

  a {
    text-decoration: none;
    color: var(--el-text-color-secondary);
    transition: var(--el-transition-color);

    &:hover {
      color: var(--el-text-color-primary);
    }
  }

  .icon {
    padding: 0;
    font-size: 18px;
  }
}
</style>
