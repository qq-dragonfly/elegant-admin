/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:40:34
 * @LastEditors: zhangyao
 */
import type { ComponentConfigModel } from '../../../utils'

export default {
  component: () => import('./collapseItem'),
  defaultSchema: {
    label: '折叠项',
    type: 'collapse-item',
    children: [],
  },
  config: {
    attribute: [],
  },
} as ComponentConfigModel
