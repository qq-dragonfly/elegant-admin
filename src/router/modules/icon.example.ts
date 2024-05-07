import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/icon_demo',
  component: Layout,
  redirect: '/icon_demo/svg',
  name: 'iconDemo',
  meta: {
    title: '扩展图标',
    icon: 'i-ri:remixicon-line',
  },
  children: [
    {
      path: 'svg',
      name: 'iconDemoSvg',
      component: () => import('@/views/icon_demo/svg.vue'),
      meta: {
        title: 'SVG Icon',
      },
    },
    {
      path: 'iconify',
      name: 'iconDemoIconify',
      component: () => import('@/views/icon_demo/iconify.vue'),
      meta: {
        title: 'Iconify',
      },
    },
  ],
}

export default routes
