/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:39:11
 * @LastEditors: zhangyao
 */
import type { ComponentConfigModel } from '../../../utils'

export default {
  component: () => import('./col'),
  defaultSchema: {
    label: '栅格布局-列',
    type: 'col',
    children: [],
    componentProps: {
      span: 6,
    },
  },
  config: {
    attribute: [
      {
        label: '占位格数',
        type: 'number',
        field: 'componentProps.span',
      },
    ],
  },
} as ComponentConfigModel
