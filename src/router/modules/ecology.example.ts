import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}
function LinkLayout() {
  return import('@/layouts/components/views/link.vue')
}

const routes: RouteRecordRaw[] = [
  {
    path: '/recommand',
    component: Layout,
    meta: {
      title: '友情推荐',
      icon: 'i-ic:outline-handshake',
    },
    children: [
      {
        path: 'vform',
        component: LinkLayout,
        name: 'recommandVform',
        meta: {
          title: 'VForm 低代码表单',
          icon: 'https://www.vform666.com/mini-logo.png',
          link: 'https://www.vform666.com',
        },
      },
      {
        path: 'form-create',
        component: LinkLayout,
        name: 'recommandFormcreate',
        meta: {
          title: 'Form-create 动态表单生成器',
          icon: 'https://form-create.com/logo.png',
          link: 'https://form-create.com',
        },
      },
    ],
  },
]

export default routes
