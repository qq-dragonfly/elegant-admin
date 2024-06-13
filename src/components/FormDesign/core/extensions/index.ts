/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-11 16:37:22
 * @LastEditTime: 2024-06-13 08:48:24
 * @LastEditors: zhangyao
 */
import type { PluginManager } from '../../utils'
import MonacoEditor from './MonacoEditor'
import Page from './Page'

export function setupComponent(pluginManager: PluginManager): void {
  pluginManager.component('EInputSize', async () => await import('./EInputSize/index.vue'))
  pluginManager.component('EColEditor', async () => await import('./EColEditor/index.vue'))
  pluginManager.component('EActionEditor', async () => await import('./EActionEditor/index.vue'))
  pluginManager.component('ERuleEditor', async () => await import('./ERuleEditor/index.vue'))
  pluginManager.component('EOptionsEditor', async () => await import('./EOptionsEditor/index.vue'))
  pluginManager.component('ENode', async () => await import('../components/node/index'))
  pluginManager.component('EOptionCorrelation', async () => await import('./EOptionCorrelation/index.vue'))

  // 左侧菜单初始化
  pluginManager.registerActivitybar({
    id: 'component_view',
    title: '组件',
    icon: 'elegant-icon-mokuai_1',
    component: async () =>
      await import(
        '../components/designer/src/modules/componentView/index.vue'
      ),
  })

  pluginManager.registerActivitybar({
    id: 'sound_code_view',
    title: '源码',
    icon: 'elegant-icon-daima1',
    component: async () =>
      await import(
        '../components/designer/src/modules/sourceCode/index.vue'
      ),
  })

  pluginManager.registerActivitybar({
    id: 'outline_view',
    title: '大纲',
    icon: 'elegant-icon-juxingkaobei',
    component: async () =>
      await import('../components/designer/src/modules/outline/outline.vue'),
  })

  pluginManager.registerRightSidebar({
    id: 'attribute_view',
    title: '属性',
    component: async () =>
      await import(
        '../components/designer/src/modules/attributeView/attributeView.vue'
      ),
  })

  pluginManager.registerRightSidebar({
    id: 'style_view',
    title: '样式',
    component: async () =>
      await import(
        '../components/designer/src/modules/attributeView/styleView.vue'
      ),
  })
  pluginManager.registerRightSidebar({
    id: 'event_view',
    title: '事件',
    component: async () =>
      await import(
        '../components/designer/src/modules/attributeView/eventView.vue'
      ),
  })

  const componentArray = [MonacoEditor, Page]

  componentArray.forEach((item) => {
    pluginManager.registerComponent(item)
  })
}
