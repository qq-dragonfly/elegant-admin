/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-03 08:42:54
 * @LastEditTime: 2024-06-11 18:07:42
 * @LastEditors: zhangyao
 */
import { useToggle } from '@vueuse/core'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { B } from 'mockjs'
import { useShareStore } from '../shareStore'

export function useTheme() {
  const { isDark } = useShareStore()
  const toggleDark = useToggle(isDark)
  return {
    isDark,
    toggleDark,
  }
}

export function useDark() {
  const isDark = ref<boolean>(false)
  onMounted(() => {
    getDarkState(isDark)
    monitorHtml(isDark)
  })

  watch(
    () => isDark.value,
    () => {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      }
      else {
        document.documentElement.classList.remove('dark')
      }
    },
  )
  return {
    isDark,
  }
}

/**
 * 获取dark初始化状态
 * @param isDark
 */
export function getDarkState(isDark: any) {
  let targetNode = document.documentElement
  if (!targetNode) {
    return
  }
  if (targetNode.classList.contains('dark')) {
    isDark.value = true
  }
  else {
    isDark.value = false
  }
}

/**
 * 监听html元素
 * @param isDark
 */
function monitorHtml(isDark: any) {
  // 选择需要监听的元素
  let targetNode = document.querySelector('html')

  // 创建MutationObserver对象
  let observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (
        mutation.type === 'attributes'
        && mutation.attributeName === 'class'
      ) {
        const target = mutation.target as any
        isDark.value = Array.from(target.classList).includes('dark')
      }
    }
  })

  // 开始监听
  observer.observe(targetNode!, {
    attributes: true,
    attributeFilter: ['class'],
  })

  // 销毁监听
  onUnmounted(() => {
    observer.disconnect()
  })
}
