<script setup lang="ts">
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
function handleJump(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <PageHeader>
      <template #title>
        <div>
          <div class="flex" items-start>
            <div class="h-100px w-100px rounded-100px bg-#d4d4d8">
              <img class="h-100px w-100px rounded-100px" :src="userStore.avatar" alt="">
            </div>
            <div class="mt-2 flex flex-col justify-center md:ml-6 md:mt-0">
              <h1 class="text-md md:text-lg">
                早安, {{ userStore.account }}, 开始您一天的工作吧！
              </h1>
              <span class="text-emphasis text-16px"> 今日晴，20℃ - 32℃！ </span>
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <div class="mb-40px flex justify-end">
          <HButton outline @click="handleJump('https://zhangyao1990.github.io/elegant-admin-docs')">
            <SvgIcon name="i-ri:file-text-line" />
            开发文档
          </HButton>
          <HDropdownMenu
            :items="[
              [
                { label: 'Gitee', handle: () => handleJump('https://gitee.com/git.zhangyao_ping.net/elegant-admin') },
                { label: 'Github', handle: () => handleJump('https://github.com/zhangyao1990/elegant-admin') },
              ],
            ]"
          >
            <HButton class="ml-2">
              <SvgIcon name="i-ri:code-s-slash-line" />
              代码仓库
              <SvgIcon name="i-ep:arrow-down" />
            </HButton>
          </HDropdownMenu>
        </div>

        <div class="text-sm">
          <div>
            这是一款 开箱即用 的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护
          </div>
        </div>
      </template>
    </PageHeader>
  </div>
</template>

  <style lang="scss" scoped>
  .text-emphasis {
    text-emphasis-style: "❤";
  }

  .ecology {
    --at-apply: flex-1 m-0;

    :deep(.title-container) {
      --at-apply: flex items-center justify-between flex-wrap gap-4;

      .title-info {
        --at-apply: flex items-center gap-4;

        img {
          --at-apply: block w-12 h-12;
        }

        h1 {
          --at-apply: m-0 text-2xl;
        }

        h2 {
          --at-apply: m-0 text-base text-stone-5 font-normal;
        }
      }
    }
  }

  .question {
    .answer {
      --at-apply: m-0 pl-6 text-stone-5;

      li {
        --at-apply: mb-2 lh-6 last:mb-0;
      }

      span {
        --at-apply: text-stone-7 dark:text-stone-3 font-bold;
      }
    }
  }
  </style>
