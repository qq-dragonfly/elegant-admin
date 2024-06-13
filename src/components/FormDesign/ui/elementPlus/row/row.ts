/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:45:15
 * @LastEditors: zhangyao
 */
import { type PropType, defineComponent, h, renderSlot } from 'vue'
import { ElRow } from 'element-plus'
import type { ComponentSchema } from '../../../core/types/elegant-designer'

export default defineComponent({
  props: {
    componentSchema: {
      type: Object as PropType<ComponentSchema>,
      require: true,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return () => {
      const componentSchema = {
        ...props.componentSchema,
        title: props.componentSchema?.label ?? '',
      } as any
      const children = componentSchema.children
      delete componentSchema.children

      return h(ElRow, componentSchema, {
        default: () => [
          renderSlot(slots, 'edit-node', {}, () =>
            children.map((subcomponentSchema: ComponentSchema) =>
              renderSlot(slots, 'node', { componentSchema: subcomponentSchema }),
            ),
          ),
        ],
      })
    }
  },
})
