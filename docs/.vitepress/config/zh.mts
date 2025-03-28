import { DefaultTheme } from 'vitepress'

const DICTIONARY = {
  es6i: '/base/es6/',
  html5: '/base/html/',
  css3: '/base/css/',
  vue: '/app/vue/',
  vite: '/project/vite/',
  webpack: '/project/webpack/',
  network: '/performance/network/',
  os: '/performance/os/',
}

export const zhConfig: DefaultTheme.Config = {
  // 导航栏
  nav: [
    { text: '首页', link: '/' },
    { text: '基础', link: `${DICTIONARY.es6i}variables-and-scope`, activeMatch: '/base' },
    { text: '框架', link: `${DICTIONARY.vue}vue-lifecycle`, activeMatch: '/app' },
    { text: '工程化', link: `${DICTIONARY.webpack}webpack-basic`, activeMatch: '/project' },
    { text: '通用与场景', link: `${DICTIONARY.network}http`, activeMatch: '/performance' },
  ],

  // 侧边栏
  sidebar: {
    '/base/': [
      {
        items: [
          {
            text: 'ES6',
            items: [
              { text: '变量声明与作用域', link: `${DICTIONARY.es6i}variables-and-scope` },
              { text: '变量类型', link: `${DICTIONARY.es6i}variable-type` },
              { text: '箭头函数', link: `${DICTIONARY.es6i}arrow-function` },
              { text: '解构赋值', link: `${DICTIONARY.es6i}structural-assignment` },
              { text: '拓展运算符', link: `${DICTIONARY.es6i}extended-operator` },
              { text: '模版字符串', link: `${DICTIONARY.es6i}template-string` },
              { text: 'Promise', link: `${DICTIONARY.es6i}promise` },
              { text: 'ES Module', link: `${DICTIONARY.es6i}es-module` },
              { text: 'ES6 API', link: `${DICTIONARY.es6i}es6-api` },
              { text: 'ES6 Hash', link: `${DICTIONARY.es6i}es6-hash` },
              { text: '基础手撕题', link: `${DICTIONARY.es6i}interview-code-questions` },
            ],
          },
          {
            text: 'HTML5',
            items: [
              { text: 'HTML5语义化与新特性', link: `${DICTIONARY.html5}semantic-html` },
              { text: '布局', link: `${DICTIONARY.html5}layout-guide` },
              { text: '文本省略', link: `${DICTIONARY.html5}text-ellipsis` },
              { text: 'Script 标签加载', link: `${DICTIONARY.html5}script-loading` },
            ],
          },
          {
            text: 'CSS3',
            items: [
              { text: 'CSS3 的特性', link: `${DICTIONARY.css3}css3` },
              { text: 'CSS 选择器与优先级', link: `${DICTIONARY.css3}css-selectors` },
              { text: 'CSS 性能优化', link: `${DICTIONARY.css3}css-performance` },
              { text: 'CSS 预处理器与工具', link: `${DICTIONARY.css3}css-preprocessors` },
            ],
          },
        ],
      },
    ],
    '/app/': [
      {
        items: [
          {
            text: 'Vue',
            items: [
              { text: '生命周期', link: `${DICTIONARY.vue}vue-lifecycle` },
              { text: '响应式原理', link: `${DICTIONARY.vue}vue-reactive` },
              { text: '组件通信', link: `${DICTIONARY.vue}vue-component` },
              { text: '路由原理', link: `${DICTIONARY.vue}vue-router` },
              { text: '状态管理', link: `${DICTIONARY.vue}vuex-pinia` },
              { text: '性能优化', link: `${DICTIONARY.vue}vue-performance` },
              { text: '组合式API', link: `${DICTIONARY.vue}vue3-composition` },
            ],
          },
          {
            text: 'React',
            items: [
              { text: '生命周期', link: '/app/react/react-lifecycle' },
              { text: '组件系统', link: '/app/react/react-component' },
              { text: 'Hooks', link: '/app/react/react-hooks' },
              { text: '状态管理', link: '/app/react/react-state' },
              { text: '性能优化', link: '/app/react/react-performance' },
              { text: '路由系统', link: '/app/react/react-router' },
              { text: '问题排查', link: '/app/react/react-troubleshooting' },
            ],
          },
        ],
      },
    ],
    '/project/': [
      {
        items: [
          {
            text: 'Webpack',
            items: [
              { text: '基础概念', link: `${DICTIONARY.webpack}webpack-basic` },
              { text: 'Loader 机制', link: `${DICTIONARY.webpack}webpack-loader` },
              { text: 'Plugin 机制', link: `${DICTIONARY.webpack}webpack-plugin` },
              { text: '开发服务器', link: `${DICTIONARY.webpack}webpack-dev-server` },
              { text: '性能优化', link: `${DICTIONARY.webpack}webpack-optimization` },
              { text: '问题排查', link: `${DICTIONARY.webpack}webpack-troubleshooting` },
            ],
          },
          {
            text: 'Vite',
            items: [
              { text: '基础概念', link: `${DICTIONARY.vite}vite-basic` },
              { text: '插件系统', link: `${DICTIONARY.vite}vite-plugin` },
              { text: '构建优化', link: `${DICTIONARY.vite}vite-optimization` },
              { text: '开发服务器', link: `${DICTIONARY.vite}vite-dev-server` },
              { text: '问题排查', link: `${DICTIONARY.vite}vite-troubleshooting` },
            ],
          },
        ],
      },
    ],
    '/performance/': [
      {
        text: '性能',
        items: [
          {
            text: '网络',
            items: [
              { text: 'CDN', link: '/performance/network/cdn' },
              { text: 'HTTP', link: '/performance/network/http' },
              { text: 'OSI', link: '/performance/network/osi' },
              { text: 'TCP', link: '/performance/network/tcp' },
            ],
          },
          {
            text: '操作系统',
            items: [{ text: '进程与线程', link: '/performance/os/process-and-thread' }],
          },
        ],
      },
    ],
  },

  // 大纲
  outline: {
    label: '页面导航',
    level: [1, 3],
  },

  // 页脚
  footer: {
    message: '基于 MIT 许可发布',
    copyright: `版权所有 © 2025-${new Date().getFullYear()} FIG`,
  },

  // 文档页脚
  docFooter: {
    prev: '上一页',
    next: '下一页',
  },

  // 界面文本
  outlineTitle: '本页目录',
  returnToTopLabel: '返回顶部',
  sidebarMenuLabel: '菜单',
  darkModeSwitchLabel: '主题',
  langMenuLabel: '切换语言',

  // 最后更新时间
  lastUpdated: {
    text: '最后更新于',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'medium',
    },
  },

  // 搜索配置
  search: {
    provider: 'local',
    options: {
      locales: {
        root: {
          translations: {
            button: {
              buttonText: '搜索',
              buttonAriaLabel: '搜索',
            },
            modal: {
              displayDetails: '显示详细列表',
              resetButtonTitle: '重置搜索',
              backButtonTitle: '关闭搜索',
              noResultsText: '没有结果',
              footer: {
                selectText: '选择',
                selectKeyAriaLabel: '输入',
                navigateText: '导航',
                navigateUpKeyAriaLabel: '上箭头',
                navigateDownKeyAriaLabel: '下箭头',
                closeText: '关闭',
                closeKeyAriaLabel: 'esc',
              },
            },
          },
        },
      },
    },
  },
}
