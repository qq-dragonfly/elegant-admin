import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/mock/app/route/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 200,
        data: [
          {
            meta: {
              title: '演示',
              icon: 'ri:function-add-fill',
            },
            children: [
              {
                path: '/breadcrumb_example',
                component: 'Layout',
                redirect: '/breadcrumb_example/list1',
                name: 'breadcrumbExample',
                meta: {
                  title: '面包屑导航',
                  icon: 'i-mdi:biscuit-crumbs',
                },
                children: [
                  {
                    path: 'list1',
                    name: 'breadcrumbExampleList1',
                    component: 'breadcrumb_example/list1.vue',
                    meta: {
                      title: '列表1（平级模式）',
                    },
                  },
                  {
                    path: 'detail1',
                    name: 'breadcrumbExampleDetail1',
                    component: 'breadcrumb_example/detail1.vue',
                    meta: {
                      title: '详情1',
                      menu: false,
                      activeMenu: '/breadcrumb_example/list1',
                    },
                  },
                  {
                    path: 'list2',
                    name: 'breadcrumbExampleList2',
                    redirect: '/breadcrumb_example/list2',
                    meta: {
                      title: '列表2（层级模式）',
                    },
                    children: [
                      {
                        path: '',
                        component: 'breadcrumb_example/list2.vue',
                        meta: {
                          title: '列表2（层级模式）',
                          menu: false,
                          breadcrumb: false,
                        },
                      },
                      {
                        path: 'detail2',
                        name: 'breadcrumbExampleDetail2',
                        component: 'breadcrumb_example/detail2.vue',
                        meta: {
                          title: '详情2',
                          menu: false,
                          breadcrumb: false,
                          activeMenu: '/breadcrumb_example/list2',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                redirect: '/multilevel_menu_example/page',
                name: 'multilevelMenuExample',
                meta: {
                  title: '菜单嵌套',
                  icon: 'heroicons-solid:menu-alt-3',
                },
                children: [
                  {
                    path: 'page',
                    name: 'multilevelMenuExample1',
                    component: 'multilevel_menu_example/page.vue',
                    meta: {
                      title: '菜单1',
                    },
                  },
                  {
                    path: 'level2',
                    name: 'multilevelMenuExample2',
                    redirect: '/multilevel_menu_example/level2/page',
                    meta: {
                      title: '菜单2',
                    },
                    children: [
                      {
                        path: 'page',
                        name: 'multilevelMenuExample2-1',
                        component: 'multilevel_menu_example/level2/page.vue',
                        meta: {
                          title: '菜单2-1',
                        },
                      },
                      {
                        path: 'level3',
                        name: 'multilevelMenuExample2-2',
                        redirect: '/multilevel_menu_example/level2/level3/page1',
                        meta: {
                          title: '菜单2-2',
                        },
                        children: [
                          {
                            path: 'page1',
                            name: 'multilevelMenuExample2-2-1',
                            component: 'multilevel_menu_example/level2/level3/page1.vue',
                            meta: {
                              title: '菜单2-2-1',
                            },
                          },
                          {
                            path: 'page2',
                            name: 'multilevelMenuExample2-2-2',
                            component: 'multilevel_menu_example/level2/level3/page2.vue',
                            meta: {
                              title: '菜单2-2-2',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                path: '/plugin_example',
                component: 'Layout',
                redirect: '/plugin_example/qrcode',
                name: 'pluginExample',
                meta: {
                  title: '插件',
                  icon: 'i-clarity:plugin-outline-alerted',
                },
                children: [
                  {
                    path: 'qrcode',
                    name: 'pluginExampleQrcode',
                    component: 'plugin_example/qrcode.vue',
                    meta: {
                      title: '二维码',
                      icon: 'i-material-symbols:qr-code',
                    },
                  },
                  {
                    path: 'esign',
                    name: 'pluginExampleEsign',
                    component: 'plugin_example/esign.vue',
                    meta: {
                      title: '电子签名',
                      icon: 'i-mdi:draw',
                    },
                  },
                  {
                    path: 'swiper',
                    name: 'pluginExampleSwiper',
                    component: 'plugin_example/swiper.vue',
                    meta: {
                      title: '轮播动画',
                      icon: 'i-carbon:carousel-horizontal',
                    },
                  },
                  {
                    path: 'tinymce',
                    name: 'pluginExampleTinymce',
                    component: 'plugin_example/tinymce.vue',
                    meta: {
                      title: 'TinyMCE 编辑器',
                      icon: 'i-file-icons:tinymce',
                    },
                  },
                  {
                    path: 'markdown',
                    name: 'pluginExampleMarkdown',
                    component: 'plugin_example/markdown.vue',
                    meta: {
                      title: 'Markdown 编辑器',
                      icon: 'i-teenyicons:markdown-outline',
                    },
                  },
                  {
                    path: 'countto',
                    name: 'pluginExampleCountTo',
                    component: 'plugin_example/count.to.vue',
                    meta: {
                      title: '计数器',
                      icon: 'i-carbon:character-whole-number',
                    },
                  },
                  {
                    path: 'splitpanes',
                    name: 'pluginExampleSplitpanes',
                    component: 'plugin_example/splitpanes.vue',
                    meta: {
                      title: '拆分面板',
                      icon: 'i-icon-park-outline:split-cells',
                    },
                  },
                ],
              },
              {
                path: '/feature_example',
                component: 'Layout',
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
                    component: 'feature_example/vueuse.vue',
                    meta: {
                      title: 'VueUse',
                      icon: 'i-logos:vueuse',
                    },
                  },
                  {
                    path: 'rules',
                    name: 'featureExampleRules',
                    component: 'feature_example/rules.vue',
                    meta: {
                      title: '常用正则',
                      icon: 'i-mdi:regex',
                    },
                  },
                  {
                    path: 'reload',
                    name: 'featureExampleReload',
                    component: 'feature_example/reload.vue',
                    meta: {
                      title: '主页面刷新',
                      icon: 'i-iconoir:refresh-double',
                      cache: true,
                    },
                  },
                  {
                    path: 'leavetips',
                    name: 'featureExampleLeavetips',
                    component: 'feature_example/leavetips.vue',
                    meta: {
                      title: '页面离开提醒',
                      icon: 'i-pepicons:leave',
                    },
                  },
                ],
              },
              {
                path: '/link',
                component: 'Layout',
                redirect: '/link/github',
                name: 'externalLinkExample',
                meta: {
                  title: '外链',
                  icon: 'i-ri:external-link-fill',
                },
                children: [
                  {
                    path: 'github',
                    component: 'LinkLayout',
                    name: 'linkExampleWindowGithub',
                    meta: {
                      title: 'Github 仓库',
                      link: 'https://github.com/zhangyao1990/elegant-admin',
                    },
                  }, {
                    path: 'vue-doc',
                    component: 'LinkLayout',
                    name: 'iframeExampleWindowGithub',
                    meta: {
                      title: 'vue3文档',
                      iframe: 'https://cn.vuejs.org/guide/introduction.html',
                    },
                  },
                ],
              },
              {
                path: '/mock_example',
                component: 'Layout',
                redirect: '/mock_example/index',
                name: 'mockExample',
                meta: {
                  title: 'Mock',
                  icon: 'i-ri:database-2-line',
                },
                children: [
                  {
                    path: 'index',
                    name: 'mockExampleIndex',
                    component: 'mock_example/index.vue',
                    meta: {
                      title: 'Mock',
                      menu: false,
                      breadcrumb: false,
                      activeMenu: '/mock_example',
                    },
                  },
                ],
              }, {
                path: '/permission_example',
                component: 'Layout',
                redirect: '/permission_example/index',
                name: 'permissionExample',
                meta: {
                  title: '权限验证',
                  icon: 'ri:shield-keyhole-line',
                },
                children: [
                  {
                    path: 'index',
                    name: 'permissionExampleIndex',
                    component: 'permission_example/index.vue',
                    meta: {
                      title: '权限验证',
                      menu: false,
                      breadcrumb: false,
                      activeMenu: '/permission_example',
                    },
                  },
                  {
                    path: 'test',
                    name: 'permissionExampleTest',
                    component: 'permission_example/test.vue',
                    meta: {
                      title: '测试页面',
                      auth: ['permission.browse'],
                      menu: false,
                      breadcrumb: false,
                      activeMenu: '/permission_example',
                    },
                  },
                ],
              },
            ],
          }, {
            meta: {
              title: '配置',
              icon: 'ep:setting',
            },
            children: [{
              path: '/sys_setting',
              component: 'Layout',
              redirect: '/sys_setting/sys_user',
              name: 'systemSetting',
              meta: {
                title: '系统设置',
                icon: 'fluent:laptop-settings-20-regular',
              },
              children: [
                {
                  path: 'sys_user',
                  name: 'SysUser',
                  component: 'sys_setting/sys_user/index.vue',
                  meta: {
                    title: '账号管理',
                  },
                },

                {
                  path: 'sys_role',
                  name: 'SysRole',
                  component: 'sys_setting/sys_role/index.vue',
                  meta: {
                    title: '角色管理',
                  },
                },
                {
                  path: 'sys_menu',
                  name: 'SysMenu',
                  component: 'sys_setting/sys_menu/index.vue',
                  meta: {
                    title: '菜单管理',
                  },
                }, {
                  path: 'sys_resource',
                  name: 'SysResource',
                  component: 'sys_setting/sys_resource/index.vue',
                  meta: {
                    title: '资源管理',
                  },
                },
              ],
            }],
          },
        ],
      }
    },
  },
  {
    url: '/mock/app/menu/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 200,
        data: [
          {
            meta: {
              title: '演示',
              icon: 'uim:box',
            },
            children: [
              {
                meta: {
                  title: '多级导航',
                  icon: 'heroicons-solid:menu-alt-3',
                },
                children: [
                  {
                    path: '/multilevel_menu_example/page',
                    meta: {
                      title: '导航1',
                    },
                  },
                  {
                    meta: {
                      title: '导航2',
                    },
                    children: [
                      {
                        path: '/multilevel_menu_example/level2/page',
                        meta: {
                          title: '导航2-1',
                        },
                      },
                      {
                        meta: {
                          title: '导航2-2',
                        },
                        children: [
                          {
                            path: '/multilevel_menu_example/level2/level3/page1',
                            meta: {
                              title: '导航2-2-1',
                            },
                          },
                          {
                            path: '/multilevel_menu_example/level2/level3/page2',
                            meta: {
                              title: '导航2-2-2',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  },
])
