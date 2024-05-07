import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/plugin_demo',
  component: Layout,
  redirect: '/plugin_demo/qrcode',
  name: 'pluginDemo',
  meta: {
    title: '插件',
    icon: 'i-clarity:plugin-outline-alerted',
  },
  children: [
    {
      path: 'qrcode',
      name: 'pluginDemoQrcode',
      component: () => import('@/views/plugin_demo/qrcode.vue'),
      meta: {
        title: '二维码',
        icon: 'i-material-symbols:qr-code',
      },
    },
    {
      path: 'esign',
      name: 'pluginDemoEsign',
      component: () => import('@/views/plugin_demo/esign.vue'),
      meta: {
        title: '电子签名',
        icon: 'i-mdi:draw',
      },
    },
    {
      path: 'swiper',
      name: 'pluginDemoSwiper',
      component: () => import('@/views/plugin_demo/swiper.vue'),
      meta: {
        title: '轮播动画',
        icon: 'i-carbon:carousel-horizontal',
      },
    },
    {
      path: 'tinymce',
      name: 'pluginDemoTinymce',
      component: () => import('@/views/plugin_demo/tinymce.vue'),
      meta: {
        title: 'TinyMCE 编辑器',
        icon: 'i-file-icons:tinymce',
      },
    },
    {
      path: 'markdown',
      name: 'pluginDemoMarkdown',
      component: () => import('@/views/plugin_demo/markdown.vue'),
      meta: {
        title: 'Markdown 编辑器',
        icon: 'i-teenyicons:markdown-outline',
      },
    },
    {
      path: 'countto',
      name: 'pluginDemoCountTo',
      component: () => import('@/views/plugin_demo/count.to.vue'),
      meta: {
        title: '计数器',
        icon: 'i-carbon:character-whole-number',
      },
    },

    {
      path: 'splitpanes',
      name: 'pluginDemoSplitpanes',
      component: () => import('@/views/plugin_demo/splitpanes.vue'),
      meta: {
        title: '拆分面板',
        icon: 'i-icon-park-outline:split-cells',
      },
    },
  ],
}

export default routes
