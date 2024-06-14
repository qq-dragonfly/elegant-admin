import type { ComponentConfigModel } from '../../../utils'
import { getUUID } from '../../../utils'

export default {
  component: () => import('./radio'),
  groupName: '表单',
  icon: 'elegant-icon-danxuan-cuxiantiao',
  defaultSchema: {
    label: '单选框',
    type: 'radio',
    field: 'radio',
    input: true,
    componentProps: {
      options: [
        {
          label: '选项1',
          value: `option_${getUUID(8)}`,
        },
      ],
      size: 'default',
    },
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
        type: 'radio',
        field: 'componentProps.defaultValue',
      },
      {
        label: '尺寸',
        type: 'select',
        componentProps: {
          placeholder: '请选择',
          clearable: true,
          options: [
            {
              label: 'large',
              value: 'large',
            },
            {
              label: 'default',
              value: 'default',
            },
            {
              label: 'small',
              value: 'small',
            },
          ],
        },
        field: 'componentProps.size',
      },
      {
        label: '按钮模式',
        type: 'switch',
        field: 'componentProps.radioButton',
      },
      {
        label: '选项文本颜色',
        type: 'color-picker',
        layout: 'horizontal',
        field: 'componentProps.textColor',
        show: ({ values }: any) => {
          return values.componentProps.radioButton
        },
        describe: '按钮模式下生效',
      },
      {
        label: '选项按钮颜色',
        type: 'color-picker',
        layout: 'horizontal',
        field: 'componentProps.fill',
        show: ({ values }: any) => {
          return values.componentProps.radioButton
        },
        describe: '按钮模式下生效',
      },
      {
        label: '禁用',
        type: 'switch',
        field: 'componentProps.disabled',
      },
      {
        label: '隐藏',
        type: 'switch',
        field: 'componentProps.hidden',
      },
      {
        label: '选项管理',
        type: 'EOptionsEditor',
        layout: 'vertical',
        field: 'componentProps.options',
      },
      {
        label: '逻辑设置',
        type: 'EOptionCorrelation',
        field: 'componentProps.links',
      },
      {
        label: '表单校验',
        type: 'ERuleEditor',
        layout: 'vertical',
        field: 'rules',
        describe: '校验规则需要配合表单使用',
      },
    ],
    event: [
      {
        type: 'change',
        describe: '值变化时',
      },
    ],
  },
} as ComponentConfigModel
