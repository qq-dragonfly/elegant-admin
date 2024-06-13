/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:29:08
 * @LastEditors: zhangyao
 */
import { type PropType, defineComponent, h, renderSlot } from 'vue'
import { ElButton } from 'element-plus'
import type { ComponentSchema } from '../../../core/types/elegant-designer'

// 二次封装组件
export default defineComponent({
  props: {
    componentSchema: {
      type: Object as PropType<ComponentSchema>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return () => {
      const componentProps: Record<string, any> = {
        ...props.componentSchema?.componentProps,
      }

      return h(ElButton, componentProps, {
        default: () =>
          renderSlot(slots, 'default', {}, () => [props.componentSchema?.label]),
      })
    }
  },
})
