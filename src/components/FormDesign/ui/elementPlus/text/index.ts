/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 09:14:46
 * @LastEditTime: 2024-06-11 10:58:40
 * @LastEditors: zhangyao
 */
import type { ComponentConfigModel } from '../../../utils'

export default {
  component: async () => await import('./index.vue'),
  groupName: '表单',
  icon: 'elegant-icon-zihao',
  defaultSchema: {
    type: 'text',
    field: 'input',
    input: false,
    label: '静态文字',
    componentProps: {
      size: 'h4',
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
        label: '尺寸',
        type: 'select',
        componentProps: {
          placeholder: '请选择',
          allowClear: !0,
          options: [
            {
              label: 'h1',
              value: 'h1',
            },
            {
              label: 'h2',
              value: 'h2',
            },
            {
              label: 'h3',
              value: 'h3',
            },
            {
              label: 'h4',
              value: 'h4',
            },
            {
              label: 'h5',
              value: 'h5',
            },
            {
              label: 'h6',
              value: 'h6',
            },
          ],
        },
        field: 'componentProps.size',
      },
      {
        label: '对齐方式',
        type: 'select',
        componentProps: {
          placeholder: '请选择',
          allowClear: !0,
          options: [
            {
              label: '左对齐',
              value: 'left',
            },
            {
              label: '居中对齐',
              value: 'center',
            },
            {
              label: '右对齐',
              value: 'right',
            },

          ],
        },
        field: 'componentProps.align',
      },
    ],
  },
} as ComponentConfigModel
