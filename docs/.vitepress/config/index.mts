import { defineConfig, type DefaultTheme } from 'vitepress'
import { zhConfig } from './zh.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: 'Frontend Interview Guide',
  description: '前端开发面试知识导航',

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
  },

  rewrites: {
    'zh/:rest*': ':rest*',
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/vitepress-logo-mini.svg', width: 24, height: 24 },
    socialLinks: [{ icon: 'github', link: 'https://github.com/inokoe/Frontend-Interview-Guide' }],
    ...zhConfig,
  },

  // 站点配置
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/vitepress-logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh' }],
  ],
})
