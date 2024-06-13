/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 17:30:28
 * @LastEditors: zhangyao
 */
import type { ComponentConfigModel } from '../../../utils'

export default {
  component: async () => await import('./index.vue'),
  defaultSchema: {
    label: '代码编辑器',
    type: 'monacoEditor',
    field: 'monacoEditor',
    icon: 'elegant-icon-write',
    input: true,
  },
  config: {
    attribute: [
      {
        label: '字段名',
        type: 'input',
        field: 'field',
      },
      {
        label: '标题',
        type: 'input',
        field: 'label',
      },
      {
        label: '默认值',
        type: 'monacoEditor',
        field: 'componentProps.defaultValue',
      },
    ],
  },
  bindModel: 'model-value',
} as ComponentConfigModel
