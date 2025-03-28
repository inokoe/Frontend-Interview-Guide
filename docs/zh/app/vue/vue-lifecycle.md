# Vue 生命周期

## 背景介绍

Vue 的生命周期是指 Vue 实例从创建到销毁的整个过程。理解 Vue 的生命周期对于开发高质量的 Vue 应用至关重要，它帮助我们更好地控制组件的创建、更新和销毁过程，以及在合适的时机执行相应的操作。

## Vue2 生命周期

### 1. 生命周期钩子

```javascript
export default {
  beforeCreate() {
    // 实例初始化之后，数据观测和事件配置之前
    console.log('beforeCreate')
  },
  created() {
    // 实例创建完成后被调用
    // 数据观测、属性和方法的运算，watch/event 事件回调
    console.log('created')
  },
  beforeMount() {
    // 挂载开始之前被调用
    // 相关的 render 函数首次被调用
    console.log('beforeMount')
  },
  mounted() {
    // 挂载到实例上去之后调用
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    console.log('mounted')
  },
  beforeUpdate() {
    // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前
    console.log('beforeUpdate')
  },
  updated() {
    // 数据更新之后调用，发生在虚拟 DOM 重新渲染和打补丁之后
    console.log('updated')
  },
  beforeDestroy() {
    // 实例销毁之前调用
    console.log('beforeDestroy')
  },
  destroyed() {
    // 实例销毁后调用
    console.log('destroyed')
  },
}
```

### 2. 生命周期图示

```
创建 -> 挂载 -> 更新 -> 销毁
```

## Vue3 生命周期

### 1. 组合式 API 中的生命周期

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载')
    })

    onUpdated(() => {
      console.log('组件已更新')
    })

    onUnmounted(() => {
      console.log('组件已卸载')
    })
  },
}
```

### 2. 生命周期钩子对应关系

| Vue2 选项式 API | Vue3 组合式 API |
| --------------- | --------------- |
| beforeCreate    | setup()         |
| created         | setup()         |
| beforeMount     | onBeforeMount   |
| mounted         | onMounted       |
| beforeUpdate    | onBeforeUpdate  |
| updated         | onUpdated       |
| beforeDestroy   | onBeforeUnmount |
| destroyed       | onUnmounted     |

## 常见问题

### 1. created 和 mounted 的区别

- `created`: 在实例创建完成后被调用，此时已完成数据观测、属性和方法的运算，但尚未挂载到 DOM
- `mounted`: 在实例挂载到 DOM 后调用，此时可以访问到 DOM 元素

### 2. 异步数据获取的时机

```javascript
// 推荐在 created 中进行异步数据获取
export default {
  async created() {
    // 尽早开始数据获取
    const data = await fetchData()
    this.data = data
  },
}
```

## 最佳实践

1. **数据初始化**

   - 在 `created` 中进行数据初始化
   - 避免在 `mounted` 中进行数据初始化，除非需要访问 DOM

2. **DOM 操作**

   - 在 `mounted` 中进行 DOM 操作
   - 使用 `nextTick` 确保 DOM 更新完成

3. **资源清理**
   - 在 `beforeDestroy` 或 `onBeforeUnmount` 中清理定时器、事件监听等资源

## 面试题

1. **Vue 的生命周期有哪些？分别在什么时候调用？**

```javascript
// 答案要点：
// 1. 创建阶段：beforeCreate、created
// 2. 挂载阶段：beforeMount、mounted
// 3. 更新阶段：beforeUpdate、updated
// 4. 销毁阶段：beforeDestroy、destroyed
```

2. **Vue2 和 Vue3 的生命周期有什么区别？**

```javascript
// 答案要点：
// 1. Vue3 使用组合式 API，生命周期钩子需要导入
// 2. 命名变化：beforeDestroy -> onBeforeUnmount
// 3. setup 函数替代了 beforeCreate 和 created
```

3. **为什么要在 created 而不是 mounted 中发起数据请求？**

```javascript
// 答案要点：
// 1. 更早获取数据，减少页面加载时间
// 2. mounted 时 DOM 已经渲染，可能导致页面闪烁
// 3. 服务端渲染时 mounted 不会执行
```
