/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:40:00
 * @LastEditors: zhangyao
 */
import type { ComponentConfigModel } from '../../../utils'

export default {
  component: () => import('./collapse'),
  icon: 'elegant-icon-xiala',
  defaultSchema: {
    label: '折叠面板',
    type: 'collapse',
    children: [
      {
        type: 'collapse-item',
        children: [],
        componentProps: {
          span: 12,
        },
        id: 'g062zikd2jk001',
      },
      {
        type: 'collapse-item',
        children: [],
        componentProps: {
          span: 12,
        },
        id: 'gy5z9jtfb3s001',
      },
    ],
  },
  config: {
    attribute: [
      {
        label: '折叠项管理',
        type: 'EColEditor',
        field: 'children',
      },
      {
        label: '隐藏',
        type: 'switch',
        field: 'componentProps.hidden',
      },
    ],
  },
} as ComponentConfigModel
