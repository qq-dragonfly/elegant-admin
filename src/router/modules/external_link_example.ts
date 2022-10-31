import type { Route } from '@/global'

const Layout = () => import('@/layouts/index.vue')

const routes: Route.recordRaw = {
  path: '/link',
  component: Layout,
  name: 'externalLinkExample',
  meta: {
    title: '外链',
    icon: 'sidebar-external-link',
  },
  children: [
    {
      path: 'https://github.com/zhangyao1990/elegant-admin',
      meta: {
        title: 'Github 仓库',
      },
    },
  ],
}

export default routes
