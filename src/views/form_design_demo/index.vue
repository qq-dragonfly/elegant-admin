<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { EDesigner } from '@/components/FormDesign/core'
import type { PageSchema } from '@/components/FormDesign/core/types/elegant-designer'

const router = useRouter()
const designerRef = ref<InstanceType<typeof EDesigner>>()

/**
 * 点击保存按钮操作
 * @param e
 */
function handleSubmit(designData: PageSchema) {
  console.log('表单设计数据', designData)
}
</script>

<template>
  <div class="elegant-designer-box">
    <EDesigner ref="designerRef" title="调查问卷" @save="handleSubmit">
      <template #header-prefix>
        <div class="header-back ml-10px flex cursor-pointer items-center rounded-4px px-10px py-4px text-18px font-500" @click="router.back()">
          <SvgIcon name="ep:back" />
          <span class="ml-4px text-14px">返回</span>
        </div>
      </template>
    </EDesigner>
  </div>
</template>

<style lang="scss" scoped>
.header-back {
  &:hover {
    background-color:var(--g-ui-primary-light-8);
    color:var(--g-ui-primary);
  }
}
</style>
