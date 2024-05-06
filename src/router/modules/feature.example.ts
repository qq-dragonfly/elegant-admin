import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/feature_example',
  component: Layout,
  redirect: '/feature_example/vueuse',
  name: 'featureExample',
  meta: {
    title: '功能',
    icon: 'i-ic:twotone-auto-awesome',
  },
  children: [
    {
      path: 'vueuse',
      name: 'featureExampleVueuse',
      component: () => import('@/views/feature_example/vueuse.vue'),
      meta: {
        title: 'VueUse',
        icon: 'i-logos:vueuse',
      },
    },
    {
      path: 'rules',
      name: 'featureExampleRules',
      component: () => import('@/views/feature_example/rules.vue'),
      meta: {
        title: '常用正则',
        icon: 'i-mdi:regex',
      },
    },
    {
      path: 'reload',
      name: 'featureExampleReload',
      component: () => import('@/views/feature_example/reload.vue'),
      meta: {
        title: '主页面刷新',
        icon: 'i-iconoir:refresh-double',
        cache: true,
      },
    },
    {
      path: 'leavetips',
      name: 'featureExampleLeavetips',
      component: () => import('@/views/feature_example/leavetips.vue'),
      meta: {
        title: '页面离开提醒',
        icon: 'i-pepicons:leave',
      },
    },
  ],
}

export default routes
