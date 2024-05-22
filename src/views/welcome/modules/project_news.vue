<script setup lang="ts">
import { useRenderFlicker } from '@/components/ProFlicker'

defineOptions({
  name: 'ProjectNews',
})
const { lastBuildTime } = __SYSTEM_INFO__
interface NewsItem {
  id: number
  content: string
  time: string
}

const newses = computed<NewsItem[]>(() => [
  { id: 1, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-05-28 22:22:22' },
  { id: 2, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-10-27 10:24:54' },
  { id: 3, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-10-31 22:43:12' },
  { id: 4, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-11-03 20:33:31' },
  { id: 5, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-11-07 22:45:32' },
  { id: 6, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-11-07 22:45:32' },
  { id: 7, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-11-07 22:45:32' },
  { id: 8, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-11-07 22:45:32' },
  { id: 8, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-11-07 22:45:32' },
  { id: 8, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-11-07 22:45:32' },
  { id: 8, content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!', time: '2021-11-07 22:45:32' },
])
const activities = [
  {
    id: 1,
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker()),
  },
  {
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker({ borderRadius: '50%', background: '#67C23A' })),
  },
  {
    id: 1,
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker()),
  },
  {
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker({ borderRadius: '50%', background: '#67C23A' })),
  },
  {
    id: 1,
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker()),
  },
  {
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker({ borderRadius: '50%', background: '#67C23A' })),
  },
  {
    id: 1,
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker()),
  },
  {
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker({ borderRadius: '50%', background: '#67C23A' })),
  },
  {
    id: 1,
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker()),
  },
  {
    content: 'zhangyao1990 在2022年10月31日创建了开源项目 elegant-admin!',
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker({ borderRadius: '50%', background: '#67C23A' })),
  },
]
</script>

<template>
  <ElCard title="项目动态" shadow="hover" class="rounded-10px">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="text-32rpx">
          最新动态
        </div>
      </div>
    </template>
    <el-scrollbar height="500px">
      <div class="py-10px">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-scrollbar>
  </ElCard>
</template>

<style scoped lang="scss">
.scrollbar-list-item {
  display: flex;
  align-items: center;
  background: var(--g-container-bg);

  &__divider {
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--g-border-color);
    transition: background-color .3s var(--n-bezier);
    pointer-events: none;

  }
}
</style>
