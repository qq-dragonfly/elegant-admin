import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/feature_demo',
  component: Layout,
  redirect: '/feature_demo/vueuse',
  name: 'featureDemo',
  meta: {
    title: '功能',
    icon: 'i-ic:twotone-auto-awesome',
  },
  children: [
    {
      path: 'vueuse',
      name: 'featureDemoVueuse',
      component: () => import('@/views/feature_demo/vueuse.vue'),
      meta: {
        title: 'VueUse',
        icon: 'i-logos:vueuse',
      },
    },
    {
      path: 'rules',
      name: 'featureDemoRules',
      component: () => import('@/views/feature_demo/rules.vue'),
      meta: {
        title: '常用正则',
        icon: 'i-mdi:regex',
      },
    },
    {
      path: 'reload',
      name: 'featureDemoReload',
      component: () => import('@/views/feature_demo/reload.vue'),
      meta: {
        title: '主页面刷新',
        icon: 'i-iconoir:refresh-double',
        cache: true,
      },
    },
    {
      path: 'leavetips',
      name: 'featureDemoLeavetips',
      component: () => import('@/views/feature_demo/leavetips.vue'),
      meta: {
        title: '页面离开提醒',
        icon: 'i-pepicons:leave',
      },
    },
  ],
}

export default routes
