/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:32:49
 * @LastEditors: zhangyao
 */
import type { ComponentConfigModel } from '../../../utils'

export default {
  component: () => import('./card'),
  groupName: '布局',
  icon: 'elegant-icon-qiapian',
  defaultSchema: {
    label: '卡片布局',
    type: 'card',
    children: [],
    componentProps: {
    },
  },
  config: {
    attribute: [
      {
        label: '标题',
        type: 'input',
        field: 'label',
      },
      {
        label: '阴影时机',
        type: 'select',
        componentProps: {
          options: [
            {
              label: 'always',
              value: 'always',
            },
            {
              label: 'hover',
              value: 'hover',
            },
            {
              label: 'never',
              value: 'never',
            },
          ],
          placeholder: '请选择',
          clearable: true,
        },
        field: 'componentProps.shadow',
      },
      {
        label: '隐藏',
        type: 'switch',
        field: 'componentProps.hidden',
      },
    ],
  },
} as ComponentConfigModel
