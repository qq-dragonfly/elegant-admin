import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/breadcrumb_demo',
  component: Layout,
  redirect: '/breadcrumb_demo/list1',
  name: 'breadcrumbDemo',
  meta: {
    title: '面包屑导航',
    icon: 'i-mdi:biscuit-crumbs',
  },
  children: [
    {
      path: 'list1',
      name: 'breadcrumbDemoList1',
      component: () => import('@/views/breadcrumb_demo/list1.vue'),
      meta: {
        title: '列表1（平级模式）',
      },
    },
    {
      path: 'detail1',
      name: 'breadcrumbDemoDetail1',
      component: () => import('@/views/breadcrumb_demo/detail1.vue'),
      meta: {
        title: '详情1',
        menu: false,
        activeMenu: '/breadcrumb_demo/list1',
      },
    },
    {
      path: 'list2',
      name: 'breadcrumbDemoList2',
      redirect: '/breadcrumb_demo/list2',
      meta: {
        title: '列表2（层级模式）',
      },
      children: [
        {
          path: '',
          component: () => import('@/views/breadcrumb_demo/list2.vue'),
          meta: {
            title: '列表2（层级模式）',
            menu: false,
            breadcrumb: false,
          },
        },
        {
          path: 'detail2',
          name: 'breadcrumbDemoDetail2',
          component: () => import('@/views/breadcrumb_demo/detail2.vue'),
          meta: {
            title: '详情2',
            menu: false,
            activeMenu: '/breadcrumb_demo/list2',
          },
        },
      ],
    },
  ],
}

export default routes
