/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-05 17:51:38
 * @LastEditTime: 2024-06-11 18:59:17
 * @LastEditors: zhangyao
 */
import { pluginManager } from '../utils'

export function setupElementPlusFn() {
  import('./elementPlus').then(({ setupElementPlus }) => {
    setupElementPlus.bind(null, pluginManager)()
  })
}
