# Vue 性能优化

## 背景介绍

性能优化是 Vue 应用开发中的重要环节，良好的性能可以提升用户体验。Vue 提供了多种性能优化的方式，包括虚拟 DOM、组件缓存、懒加载等技术。

## 虚拟 DOM 优化

### 1. 虚拟 DOM 原理

```javascript
// 简化的虚拟 DOM 实现
class VNode {
  constructor(tag, props, children) {
    this.tag = tag
    this.props = props
    this.children = children
  }
}

// 创建虚拟 DOM
function h(tag, props, children) {
  return new VNode(tag, props, children)
}

// 渲染虚拟 DOM
function render(vnode, container) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.props) {
    el.setAttribute(key, vnode.props[key])
  }
  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children
  } else {
    vnode.children.forEach(child => render(child, el))
  }
  container.appendChild(el)
}
```

### 2. Diff 算法优化

```javascript
// 简化的 Diff 算法
function patch(oldVNode, newVNode) {
  // 1. 如果节点类型不同，直接替换
  if (oldVNode.tag !== newVNode.tag) {
    return replaceNode(oldVNode, newVNode)
  }

  // 2. 如果节点类型相同，更新属性
  updateProps(oldVNode, newVNode)

  // 3. 更新子节点
  updateChildren(oldVNode.children, newVNode.children)
}
```

## 组件优化

### 1. 组件缓存

```vue
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: 'CachedComponent',
  // 指定需要缓存的组件
  include: ['Home', 'About'],
  // 指定不需要缓存的组件
  exclude: ['Login'],
}
</script>
```

### 2. 异步组件

```javascript
// 异步组件定义
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000,
})
```

## 数据优化

### 1. 计算属性缓存

```javascript
export default {
  computed: {
    // 使用计算属性缓存结果
    filteredList() {
      return this.items.filter(item => item.active)
    },
  },
}
```

### 2. 防抖和节流

```javascript
import { debounce } from 'lodash-es'

export default {
  methods: {
    // 防抖
    handleSearch: debounce(function () {
      this.search()
    }, 300),

    // 节流
    handleScroll: throttle(function () {
      this.checkScroll()
    }, 200),
  },
}
```

## 渲染优化

### 1. v-show 和 v-if

```vue
<template>
  <!-- 频繁切换使用 v-show -->
  <div v-show="isVisible">频繁切换的内容</div>

  <!-- 条件很少改变使用 v-if -->
  <div v-if="isAdmin">管理员内容</div>
</template>
```

### 2. 列表渲染优化

```vue
<template>
  <div
    v-for="item in items"
    :key="item.id"
  >
    {{ item.name }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    // 使用 Object.freeze 冻结不需要响应式的数据
    initItems() {
      this.items = Object.freeze([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ])
    },
  },
}
</script>
```

## 打包优化

### 1. 路由懒加载

```javascript
const routes = [
  {
    path: '/user',
    component: () => import('./views/User.vue'),
  },
]
```

### 2. 组件按需加载

```javascript
// 按需导入组件
import { Button, Input } from 'element-plus'
```

## 常见问题

### 1. 内存泄漏

```javascript
export default {
  mounted() {
    // 添加事件监听
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    // 移除事件监听
    window.removeEventListener('resize', this.handleResize)
  },
}
```

### 2. 大数据渲染

```javascript
// 虚拟列表实现
export default {
  data() {
    return {
      items: [],
      visibleCount: 20,
      startIndex: 0,
    }
  },
  computed: {
    visibleItems() {
      return this.items.slice(this.startIndex, this.startIndex + this.visibleCount)
    },
  },
}
```

## 面试题

1. **Vue 的性能优化方式有哪些？**

```javascript
// 答案要点：
// 1. 虚拟 DOM 和 Diff 算法优化
// 2. 组件缓存（keep-alive）
// 3. 异步组件和路由懒加载
// 4. 计算属性缓存
// 5. v-show 和 v-if 的合理使用
// 6. 大数据渲染优化
// 7. 打包优化
```

2. **v-show 和 v-if 的区别？**

```javascript
// 答案要点：
// 1. v-show 只是切换 display
// 2. v-if 会销毁和重建 DOM
// 3. v-show 适合频繁切换
// 4. v-if 适合条件很少改变
```

3. **如何优化大数据列表渲染？**

```javascript
// 答案要点：
// 1. 使用虚拟列表
// 2. 分页加载
// 3. 使用 Object.freeze
// 4. 使用 v-show 代替 v-if
// 5. 使用计算属性缓存
```
