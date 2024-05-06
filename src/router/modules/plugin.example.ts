import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/plugin_example',
  component: Layout,
  redirect: '/plugin_example/qrcode',
  name: 'pluginExample',
  meta: {
    title: '插件',
    icon: 'i-clarity:plugin-outline-alerted',
  },
  children: [
    {
      path: 'qrcode',
      name: 'pluginExampleQrcode',
      component: () => import('@/views/plugin_example/qrcode.vue'),
      meta: {
        title: '二维码',
        icon: 'i-material-symbols:qr-code',
      },
    },
    {
      path: 'esign',
      name: 'pluginExampleEsign',
      component: () => import('@/views/plugin_example/esign.vue'),
      meta: {
        title: '电子签名',
        icon: 'i-mdi:draw',
      },
    },
    {
      path: 'swiper',
      name: 'pluginExampleSwiper',
      component: () => import('@/views/plugin_example/swiper.vue'),
      meta: {
        title: '轮播动画',
        icon: 'i-carbon:carousel-horizontal',
      },
    },
    {
      path: 'tinymce',
      name: 'pluginExampleTinymce',
      component: () => import('@/views/plugin_example/tinymce.vue'),
      meta: {
        title: 'TinyMCE 编辑器',
        icon: 'i-file-icons:tinymce',
      },
    },
    {
      path: 'markdown',
      name: 'pluginExampleMarkdown',
      component: () => import('@/views/plugin_example/markdown.vue'),
      meta: {
        title: 'Markdown 编辑器',
        icon: 'i-teenyicons:markdown-outline',
      },
    },
    {
      path: 'countto',
      name: 'pluginExampleCountTo',
      component: () => import('@/views/plugin_example/count.to.vue'),
      meta: {
        title: '计数器',
        icon: 'i-carbon:character-whole-number',
      },
    },

    {
      path: 'splitpanes',
      name: 'pluginExampleSplitpanes',
      component: () => import('@/views/plugin_example/splitpanes.vue'),
      meta: {
        title: '拆分面板',
        icon: 'i-icon-park-outline:split-cells',
      },
    },
  ],
}

export default routes
