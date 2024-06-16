import type { ComponentConfigModel } from '../../../utils'

export default {
  component: async () => (await import('element-plus')).ElInput,
  groupName: '表单',
  icon: 'elegant-icon-write',
  defaultSchema: {
    label: '输入框',
    type: 'input',
    field: 'input',
    input: true,
    componentProps: {
      placeholder: '请输入',
    },
  },
  config: {
    attribute: [
      {
        label: '字段名',
        type: 'input',
        field: 'field',
        componentProps: {
          clearable: true,
        },
      },
      {
        label: '标题',
        type: 'input',
        field: 'label',
        componentProps: {
          clearable: true,
        },
      },
      {
        label: '默认值',
        type: 'input',
        field: 'componentProps.defaultValue',
        componentProps: {
          clearable: true,
        },
      },
      {
        label: '占位内容',
        type: 'input',
        field: 'componentProps.placeholder',
        componentProps: {
          clearable: true,
        },
      },
      {
        label: '最大输入长度',
        type: 'number',
        field: 'componentProps.maxlength',
        componentProps: {
          placeholder: '请输入',
          controlsPosition: 'right',
          min: 0,
        },
      },
      {
        label: '统计字数',
        type: 'switch',
        field: 'componentProps.showWordLimit',
        show: ({ values }: any) => {
          return values.componentProps.maxlength
        },
      },
      {
        label: '输入类型',
        type: 'select',
        defaultValue: 'text',
        componentProps: {
          placeholder: '请选择',
          clearable: true,
          options: [
            {
              label: 'text',
              value: 'text',
            },
            {
              label: 'number',
              value: 'number',
            },
            {
              label: 'password',
              value: 'password',
            },
          ],
        },
        field: 'componentProps.type',
      },
      {
        label: '显示切换图标',
        type: 'switch',
        field: 'componentProps.showPassword',
        show: ({ values }: any) => {
          return values.componentProps.type === 'password'
        },
      },
      {
        label: '只读',
        type: 'switch',
        field: 'componentProps.readonly',
      },
      {
        label: '可清空',
        type: 'switch',
        field: 'componentProps.clearable',
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
        label: '表单校验',
        type: 'ERuleEditor',
        layout: 'vertical',
        field: 'rules',
        describe: '校验规则需要配合表单使用',
      },
    ],
    event: [
      {
        type: 'input',
        describe: '输入值时',
      },
      {
        type: 'change',
        describe: '值修改时',
      },
      {
        type: 'focus',
        describe: '获取焦点时',
      },
      {
        type: 'blur',
        describe: '失去焦点时',
      },
      {
        type: 'clear',
        describe: '点击清空按钮时',
      },
    ],
    action: [
      {
        type: 'focus',
        describe: '使 input 获取焦点',
      },
      {
        type: 'blur',
        describe: '使 input 失去焦点',
      },
      {
        type: 'clear',
        describe: '清除 input 值',
      },
      {
        type: 'select',
        describe: '选中 input 中的文字',
      },
    ],
  },
} as ComponentConfigModel
