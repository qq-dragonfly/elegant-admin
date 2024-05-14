<script setup lang="ts">
const iconVal = ref<string>('')
</script>

<template>
  <div class="flex" flex-1 flex-col>
    <PageHeader title="ProIconSelect" content="图标选择组件" />
    <PageMain>
      <ProIconSelect v-model="iconVal" />
    </PageMain>
  </div>
</template>
