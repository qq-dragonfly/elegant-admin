<script setup lang="ts">
import useMenuStore from '@/store/modules/menu'

defineOptions({
  name: 'HeaderMenu',
})

const menuStore = useMenuStore()

const { switchTo } = useMenu()
</script>

<template>
  <div class="menu-container">
    <!-- 顶部模式 -->
    <div class="flex of-hidden transition-all">
      <el-menu
        :ellipsis="menuStore.allMenus.length > 5"
        class="el-menu-header"
        mode="horizontal"
        :popper-offset="8"
        :default-active="`${menuStore.actived}`"
        @select="(index) => switchTo(Number(index))"
      >
        <template v-for="(item, index) in menuStore.allMenus" :key="index">
          <el-menu-item :index="`${index}`">
            <div class="inline-flex flex-1 items-center justify-center gap-1">
              <SvgIcon v-if="item.meta?.icon" :name="item.meta?.icon" :size="20" async />
              <span class="w-full flex-1 truncate text-15px transition-height transition-opacity transition-width">
                {{ typeof item.meta?.title === 'function' ? item.meta?.title() : item.meta?.title }}
              </span>
            </div>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  flex: 1 1 0%;
  height: 100%;
  margin: 0 30px;
  overflow: hidden;
}

.el-menu-header {
  max-width: 600px;
  border-bottom: none;
}

:deep(.el-menu--horizontal) {
  .el-menu-item:not(.is-disabled):focus,
  .el-menu-item:not(.is-disabled):hover {
    background: transparent;
  }

  & > .el-menu-item.is-active {
    border-bottom: none;
  }

  & > .el-menu-item {
    padding: 0 15px;
    border-bottom: none;
  }

  &.el-menu:not(.el-menu--collapse) .el-sub-menu__title {
    border-bottom: none;
  }

  .el-sub-menu .el-icon {
    font-size: 24px;
  }
}
</style>
