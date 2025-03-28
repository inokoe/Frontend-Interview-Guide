---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: Frontend Interview Guide（FIG）
titleTemplate: 前端面试指南

hero:
  name: 'FIG'
  text: '前端面试指南'
  tagline: '吃点干货、然后开启面试✨'
  actions:
    - theme: brand
      text: 快速开始
      link: /base/es6/variables-and-scope
    - theme: alt
      text: Github
      link: https://github.com/inokoe/Frontend-Interview-Guide
  image:
    src: /IconBlocksStacks.svg
    alt: VitePress

features:
  - icon: <svg t="1742888781520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="30"><path d="M145.6 0c-44.8 0-80 36.8-80 81.6v860.8c0 44.8 35.2 81.6 80 81.6h732.8c44.8 0 81.6-36.8 81.6-81.6V324.8L657.6 0h-512z" fill="#F7622C" p-id="1501"></path><path d="M960 326.4v16H755.2s-100.8-20.8-99.2-108.8c0 0 4.8 92.8 97.6 92.8H960z" fill="#F54921" p-id="1502"></path><path d="M657.6 0v233.6c0 25.6 17.6 92.8 97.6 92.8H960L657.6 0z" fill="#FFFFFF" p-id="1503"></path><path d="M366.4 812.8h-4.8L240 758.4c-8-3.2-12.8-11.2-12.8-20.8 0-8 4.8-16 12.8-19.2l121.6-54.4c1.6 0 3.2-1.6 4.8-1.6 8 0 14.4 6.4 14.4 14.4 0 6.4-3.2 11.2-8 14.4l-112 48 112 46.4c4.8 3.2 8 8 8 14.4 0 8-6.4 12.8-14.4 12.8z m136-176L432 849.6c-3.2 6.4-8 9.6-14.4 9.6-9.6 0-16-6.4-16-14.4 0-1.6 1.6-3.2 1.6-4.8l70.4-211.2c3.2-6.4 8-11.2 14.4-11.2 9.6 0 14.4 6.4 14.4 14.4v4.8z m163.2 121.6L544 812.8h-4.8c-8 0-14.4-4.8-14.4-12.8 0-6.4 3.2-11.2 8-14.4l113.6-46.4-113.6-48c-4.8-3.2-8-8-8-14.4 0-8 6.4-14.4 14.4-14.4 1.6 0 3.2 1.6 4.8 1.6l121.6 54.4c8 3.2 12.8 11.2 12.8 19.2 0 9.6-4.8 17.6-12.8 20.8z" fill="#FFFFFF" p-id="1504"></path></svg>
    title: 前端基础
    details: HTML、CSS、JavaScript 核心基础
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 220.8"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"/><path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"/><path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"/></svg>
    title: 框架与库
    details: Vue、React 框架核心基础
  - icon: <svg t="1742888993233" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6475" width="30"><path d="M298.666667 85.333333v469.333334h128v384l298.666666-512h-170.666666l170.666666-341.333334H298.666667z" fill="#FFAB00" p-id="6476"></path></svg>
    title: 工程化
    details: 前端工程化与管理核心基础
  - icon: <svg t="1742893809091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5983" width="30"><path d="M498.1 511.8m-348.1 0a348.1 348.1 0 1 0 696.2 0 348.1 348.1 0 1 0-696.2 0Z" fill="#E5ECFF" p-id="5984"></path><path d="M415.3 743.9c-99.5-49.7-240.4-41.4-149.2-232.1 31.8-66.6-28.2-99.4-98.3-109.8-11.5 34.5-17.8 71.4-17.8 109.8 0 185.1 144.5 336.3 326.8 347.4 3.3-37.6-5.1-87.1-61.5-115.3zM630.8 487s41.4 49.7-24.9 66.3c-66.3 16.6-107.7 49.7-91.2 116s0 66.3 91.2 58 116-91.2 116-107.7c0-16.6 24.9-107.7-24.9-132.6-49.7-24.9-58-41.5-66.2 0z" fill="#5B79FB" p-id="5985"></path><path d="M957.9 440.1c-6.3-45.3-59.4-77.8-153.5-94.1h-0.2c6.5 12 12.3 24.4 17.4 37.2 61.7 13.7 99.9 36.1 103.5 61.5 4 28.4-34.6 65.1-103.3 98.2-76.2 36.8-180.7 65.8-294.2 81.7-113.5 15.9-221.9 16.7-305.3 2.3-75.1-13-122.4-37.7-126.3-66-2.9-20.9 17.3-46.3 55.7-71.5-0.2-0.3-0.5-0.5-0.7-0.7 0.9-13.9 2.7-27.5 5.2-40.8-66.5 37.4-98.6 77.8-93 117.7 6.3 45.3 59.4 77.8 153.5 94.1 41.4 7.1 88.5 10.7 139.1 10.7 55.5 0 115.3-4.3 176.4-12.8 116.8-16.4 224.7-46.4 304-84.7 85.9-41.6 128-87.5 121.7-132.8z" fill="#FF7E71" p-id="5986"></path><path d="M514.9 164.1c-5.5-0.2-11.1-0.4-16.7-0.4-125.4 0-235.2 66.3-296.5 165.7 53.4-0.6 97.9-25.6 110.5-59.3 9.3 0.9 18.8 1.4 28.5 1.4 59.3 0 111.9-17.4 145.1-44.3 9.1 6.9 22.4 11.2 37.2 11.2 0.6 0 1.1 0 1.6-0.1 5.4 26 29.6 98.3 130.6 95.8 0 0 61.5-1.5 90.1 123 0 0 64.1 25.6 81.9-58.8C781.9 266.8 660.1 171 514.9 164.1z" fill="#A4BEFF" p-id="5987"></path><path d="M440.1 358.5a33.2 29 0 1 0 66.4 0 33.2 29 0 1 0-66.4 0Z" fill="#83A4FF" p-id="5988"></path><path d="M536.418053 368.541887a20.7 12.4 36.079 1 0 14.604724-20.043504 20.7 12.4 36.079 1 0-14.604724 20.043504Z" fill="#A4BEFF" p-id="5989"></path></svg>
    title: 性能优化与实践
    details: 前端性能优化策略与最佳实践
---
