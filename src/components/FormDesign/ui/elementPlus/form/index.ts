import type { ComponentConfigModel } from '../../../utils'

export default {
  component: () => import('./form.vue'),
  groupName: '',
  icon: 'elegant-icon-daibanshixiang',
  defaultSchema: {
    label: '表单',
    type: 'form',
    componentProps: {
      name: 'default',
      labelWidth: 100,
    },
    children: [],
  },
  config: {
    attribute: [
      {
        label: 'name',
        type: 'input',
        field: 'componentProps.name',
        componentProps: {
          name: 'default',
          disabled: true,
        },
      },
      {
        label: '标签宽度',
        type: 'EInputSize',
        field: 'componentProps.labelWidth',
      },
      {
        label: '标签后缀',
        type: 'input',
        field: 'componentProps.labelSuffix',
        componentProps: {
          placeholder: '请输入',
        },
      },
      {
        label: '标签位置',
        type: 'select',
        field: 'componentProps.label-position',
        componentProps: {
          placeholder: '请选择',
          clearable: true,
          options: [
            {
              label: '左边',
              value: 'left',
            },
            {
              label: '上边',
              value: 'top',
            },
          ],
        },
      },

      {
        label: '星号位置',
        type: 'select',
        field: 'componentProps.require-asterisk-position',
        componentProps: {
          placeholder: '请选择',
          clearable: true,
          options: [
            {
              label: '左边',
              value: 'left',
            },
            {
              label: '右边',
              value: 'right',
            },
          ],
        },
      },
      {
        label: '行内展示校验信息',
        type: 'switch',
        field: 'componentProps.inline-message',
      },
      {
        label: '校验反馈图标',
        type: 'switch',
        field: 'componentProps.status-icon',
      },
      {
        label: '滚动校验错误处',
        type: 'switch',
        field: 'componentProps.scroll-to-error',
        componentProps: {
          'scroll-to-error': true,
        },
      },
      {
        label: '行内模式',
        type: 'switch',
        field: 'componentProps.inline',
      },
      {
        label: '禁用',
        type: 'switch',
        field: 'componentProps.disabled',
      },
    ],
    action: [
      {
        type: 'getData',
        describe: '获取表单数据',
      },
      {
        type: 'setData',
        describe: '设置表单数据',
      },
      {
        type: 'validate',
        describe: '校验表单',
      },
    ],
  },
} as ComponentConfigModel
