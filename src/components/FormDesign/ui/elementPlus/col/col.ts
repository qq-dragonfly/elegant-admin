/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:38:57
 * @LastEditors: zhangyao
 */
import { type PropType, defineComponent, h, renderSlot } from 'vue'
import { ElCol } from 'element-plus'
import type { ComponentSchema } from '../../../core/types/elegant-designer'

export default defineComponent({
  props: {
    componentSchema: {
      type: Object as PropType<ComponentSchema>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props, { attrs, slots }) {
    console.log('_attrs', attrs)
    return () => {
      const componentSchema = {
        ...props.componentSchema,
        title: props.componentSchema?.label,
      } as ComponentSchema
      const children = componentSchema.children ?? []
      delete componentSchema.children

      return h(ElCol, componentSchema, {
        default: () =>
          renderSlot(slots, 'edit-node', {}, () =>
            children.map((node: ComponentSchema) =>
              renderSlot(slots, 'node', { componentSchema: node }),
            ),
          ),
      })
    }
  },
})
