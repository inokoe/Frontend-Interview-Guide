# Vue Router

## 背景介绍

Vue Router 是 Vue.js 的官方路由管理器，它与 Vue.js 深度集成，让构建单页面应用变得简单。Vue Router 提供了路由配置、导航守卫、动态路由等功能，是 Vue 应用中不可或缺的一部分。

## 基础配置

### 1. 路由配置

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

### 2. 路由模式

```javascript
// Hash 模式
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// History 模式
const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

## 路由导航

### 1. 声明式导航

```vue
<template>
  <router-link to="/">首页</router-link>
  <router-link :to="{ name: 'User', params: { id: 123 } }">用户页</router-link>
</template>
```

### 2. 编程式导航

```javascript
// 基础导航
router.push('/')
router.push({ name: 'Home' })

// 带参数的导航
router.push({
  name: 'User',
  params: { id: 123 },
  query: { type: 'vip' },
})

// 替换当前路由
router.replace('/about')

// 返回上一页
router.back()
```

## 路由守卫

### 1. 全局守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 路由切换后的操作
  document.title = to.meta.title || '默认标题'
})
```

### 2. 路由独享守卫

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next()
      } else {
        next('/403')
      }
    },
  },
]
```

### 3. 组件内守卫

```javascript
export default {
  beforeRouteEnter(to, from, next) {
    // 组件渲染前调用
    next(vm => {
      // 通过 vm 访问组件实例
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 当前路由改变，组件复用时调用
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件时调用
    next()
  },
}
```

## 动态路由

### 1. 动态添加路由

```javascript
// 动态添加路由
router.addRoute({
  path: '/new',
  component: NewComponent,
})

// 动态添加嵌套路由
router.addRoute('parent', {
  path: 'child',
  component: ChildComponent,
})
```

### 2. 路由元信息

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: '管理后台',
    },
  },
]
```

## 常见问题

### 1. 路由懒加载

```javascript
// 使用动态导入实现懒加载
const routes = [
  {
    path: '/user',
    component: () => import('../views/User.vue'),
  },
]
```

### 2. 路由缓存

```vue
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

## 最佳实践

1. **路由配置**

   - 使用路由懒加载
   - 合理使用路由元信息
   - 统一的路由命名规范

2. **导航守卫**

   - 权限控制
   - 数据预加载
   - 页面标题管理

3. **性能优化**
   - 路由组件缓存
   - 路由懒加载
   - 避免不必要的路由跳转

## 面试题

1. **Vue Router 有哪几种导航守卫？**

```javascript
// 答案要点：
// 1. 全局前置守卫：beforeEach
// 2. 全局后置钩子：afterEach
// 3. 路由独享守卫：beforeEnter
// 4. 组件内守卫：
//    - beforeRouteEnter
//    - beforeRouteUpdate
//    - beforeRouteLeave
```

2. **Hash 模式和 History 模式有什么区别？**

```javascript
// 答案要点：
// 1. Hash 模式：
//    - URL 中带 # 号
//    - 不需要服务器配置
//    - 兼容性好
// 2. History 模式：
//    - URL 更美观
//    - 需要服务器配置
//    - 需要服务器支持
```

3. **如何实现路由懒加载？**

```javascript
// 答案要点：
// 1. 使用动态导入
// 2. 使用 webpack 的 import()
// 3. 使用 Vue 的异步组件
// 4. 使用路由的 component 配置
```
