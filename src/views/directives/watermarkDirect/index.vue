<route lang="yaml">
meta:
enabled: false
</route>

<script setup lang="ts" name="watermarkDirect"></script>

<template>
  <page-main>
    <div v-waterMarker="{ text: 'Watermark Direct', textColor: 'rgba(180, 180, 180, 0.6)' }" class="card content-box">
      <span class="text">水印指令 🍇🍇🍇🍓🍓🍓</span>
    </div>
  </page-main>
</template>

<style scoped lang="scss">
.content-box {
  position: relative;
  height: 500px;
}
</style>
