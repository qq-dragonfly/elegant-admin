/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 18:43:43
 * @LastEditors: zhangyao
 */
import { type PropType, defineComponent, h, renderSlot } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import type { ComponentSchema } from '../../../core/types/elegant-designer'

export default defineComponent({
  props: {
    componentSchema: {
      type: Object as PropType<ComponentSchema>,
      default: () => ({}),
    },
  },
  emits: ['ok', 'close', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    return () => {
      const componentSchema = {
        ...props.componentSchema,
        ...attrs,
        'title': props.componentSchema?.label ?? '',
        'class': 'elegant-modal-el',
        'destroy-on-close': true,
        'onUpdate:modelValue': handleClose,
      } as Record<string, any>
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

      function handleOk() {
        emit('ok')
      }

      function handleClose(e: any) {
        console.log(e)
        emit('update:modelValue', false)
        emit('close')
      }

      return h(ElDialog, componentSchema, {
        default: () => [
          renderSlot(slots, 'edit-node', {}, vNodeClildren),
          h('div', { class: 'elegant-modal-footer' }, [
            h(
              ElButton,
              { onClick: handleClose },
              {
                default: () => '关闭',
              },
            ),
            h(
              ElButton,
              { type: 'primary', onClick: handleOk },
              {
                default: () => componentSchema.okText ?? '确定',
              },
            ),
          ]),
        ],
      })
    }
  },
})
