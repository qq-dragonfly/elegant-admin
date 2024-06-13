/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:42:22
 * @LastEditors: zhangyao
 */
import type { ComponentConfigModel } from '../../../utils'

export default {
  component: () => import('./formItem.vue'),
  defaultSchema: {
    label: '表单项',
    type: 'form-item',
  },
  config: {
  },
} as ComponentConfigModel
