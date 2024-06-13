/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-11 17:04:42
 * @LastEditors: zhangyao
 */
import type { PageSchema } from '../../../types/elegant-designer'

export interface DesignerProps {
  disabledZoom?: boolean
  hiddenHeader?: boolean
  lockDefaultSchemaEdit?: boolean
  title?: string
  defaultSchema?: PageSchema
}
