import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/keep_alive_demo',
  component: Layout,
  redirect: '/keep_alive_demo/page',
  name: 'keepAliveDemo',
  meta: {
    title: '页面缓存',
    icon: 'i-cil:window-restore',
  },
  children: [
    {
      path: 'page',
      name: 'keepAliveDemoPage',
      component: () => import('@/views/keep_alive_demo/page.vue'),
      meta: {
        title: '页面缓存',
        breadcrumb: false,
      },
    },
    {
      path: 'detail',
      name: 'keepAliveDemoDetail',
      component: () => import('@/views/keep_alive_demo/detail.vue'),
      meta: {
        title: '平级路由',
        menu: false,
        activeMenu: '/keep_alive_demo/page',
      },
    },
    {
      path: 'nested',
      redirect: '/keep_alive_demo/nested/detail',
      meta: {
        title: '嵌套路由',
        menu: false,
      },
      children: [
        {
          path: 'detail',
          name: 'keepAliveDemoNestedDetail',
          component: () => import('@/views/keep_alive_demo/detail.vue'),
          meta: {
            title: '嵌套路由',
            activeMenu: '/keep_alive_demo/page',
          },
        },
      ],
    },
    {
      path: 'nested1',
      name: 'keepAliveDemoNested1',
      component: () => import('@/views/keep_alive_demo/nested/nested.vue'),
      meta: {
        title: '路由多级缓存1',
      },
      children: [
        {
          path: 'nested2',
          name: 'keepAliveDemoNested2',
          component: () => import('@/views/keep_alive_demo/nested/nested/nested.vue'),
          meta: {
            title: '路由多级缓存1-1',
          },
          children: [
            {
              path: 'index',
              name: 'keepAliveDemoNestedIndex',
              component: () => import('@/views/keep_alive_demo/nested/nested/nested/index.vue'),
              meta: {
                title: '路由多级缓存1-1-1',
                cache: true,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default routes
