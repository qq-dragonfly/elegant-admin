/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:23
 * @LastEditTime: 2024-06-11 17:59:09
 * @LastEditors: zhangyao
 */
/**
 * 防抖函数
 * @param handler
 * @param delay
 * @returns
 */

export function debounce(handler: Function, delay: number) {
  let timer: any = null
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      handler(...args)
    }, delay)
  }
}
