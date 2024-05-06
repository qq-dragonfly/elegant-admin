import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}
function LinkLayout() {
  return import('@/layouts/components/views/link.vue')
}
const routes: RouteRecordRaw = {
  path: '/link',
  component: Layout,
  redirect: '/link/gitee',
  name: 'externalLinkExample',
  meta: {
    title: '外链',
    icon: 'i-ri:external-link-fill',
  },
  children: [
    {
      path: 'gitee',
      component: LinkLayout,
      name: 'linkExampleWindowGitee',
      meta: {
        title: 'Gitee 仓库',
        link: 'https://github.com/zhangyao1990/elegant-admin',
      },
    },
    {
      path: 'github',
      component: LinkLayout,
      name: 'linkExampleWindowGithub',
      meta: {
        title: 'Github 仓库',
        link: 'https://github.com/zhangyao1990/elegant-admin',
      },
    },
  ],
}

export default routes
