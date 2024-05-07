import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/multilevel_menu_demo',
  component: Layout,
  redirect: '/multilevel_menu_demo/page',
  name: 'multilevelMenuDemo',
  meta: {
    title: '多级导航',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'page',
      name: 'multilevelMenuDemo1',
      component: () => import('@/views/multilevel_menu_demo/page.vue'),
      meta: {
        title: '导航1',
      },
    },
    {
      path: 'level2',
      name: 'multilevelMenuDemo2',
      redirect: '/multilevel_menu_demo/level2/page',
      meta: {
        title: '导航2',
      },
      children: [
        {
          path: 'page',
          name: 'multilevelMenuDemo2-1',
          component: () => import('@/views/multilevel_menu_demo/level2/page.vue'),
          meta: {
            title: '导航2-1',
          },
        },
        {
          path: 'level3',
          name: 'multilevelMenuDemo2-2',
          redirect: '/multilevel_menu_demo/level2/level3/page1',
          meta: {
            title: '导航2-2',
          },
          children: [
            {
              path: 'page1',
              name: 'multilevelMenuDemo2-2-1',
              component: () => import('@/views/multilevel_menu_demo/level2/level3/page1.vue'),
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: 'page2',
              name: 'multilevelMenuDemo2-2-2',
              component: () => import('@/views/multilevel_menu_demo/level2/level3/page2.vue'),
              meta: {
                title: '导航2-2-2',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default routes
