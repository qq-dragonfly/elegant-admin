/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-13 08:40:21
 * @LastEditors: zhangyao
 */
import { type PropType, defineComponent, h, renderSlot } from 'vue'
import { ElCard } from 'element-plus'
import type { ComponentSchema } from '../../../core/types/elegant-designer'

export default defineComponent({
  props: {
    componentSchema: {
      type: Object as PropType<ComponentSchema>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props, { _attrs, slots }: any) {
    console.log('_attrs', _attrs)
    return () => {
      const componentSchema = {
        ...props.componentSchema,
        header: props.componentSchema?.label ?? '',
      } as ComponentSchema
      const children = componentSchema.children ?? []
      delete componentSchema.children

      let vNodeClildren: any = null
      if (children.length) {
        vNodeClildren = () =>
          children.map((node: ComponentSchema) =>
            renderSlot(slots, 'node', { componentSchema: node }),
          )
      }
      else {
        vNodeClildren = () => [renderSlot(slots, 'default')]
      }
      return h(ElCard, componentSchema, {
        default: () => renderSlot(slots, 'edit-node', {}, vNodeClildren),
        header: () => renderSlot(slots, 'header'),
      })
    }
  },
})
