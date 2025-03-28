# Vue3 组合式 API

## 背景介绍

组合式 API 是 Vue3 中新增的一种组织组件逻辑的方式，它提供了一种更灵活、更强大的方式来复用组件逻辑。组合式 API 基于函数的组合，可以更好地组织代码，提高代码的可维护性和可复用性。

## 基础概念

### 1. setup 函数

```javascript
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)

    onMounted(() => {
      console.log('组件已挂载')
    })

    return {
      count,
    }
  },
}
```

### 2. 响应式系统

```javascript
import { ref, reactive, computed } from 'vue'

export default {
  setup() {
    // ref 用于基本类型
    const count = ref(0)

    // reactive 用于对象
    const state = reactive({
      name: 'Vue3',
      age: 3,
    })

    // computed 计算属性
    const doubleCount = computed(() => count.value * 2)

    return {
      count,
      state,
      doubleCount,
    }
  },
}
```

## 生命周期钩子

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

### 2. 生命周期对应关系

```javascript
// 选项式 API -> 组合式 API
beforeCreate -> setup()
created -> setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
```

## 组合式函数

### 1. 创建组合式函数

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter() {
  const count = ref(0)

  const increment = () => count.value++
  const decrement = () => count.value--

  const doubleCount = computed(() => count.value * 2)

  return {
    count,
    increment,
    decrement,
    doubleCount,
  }
}

// 使用组合式函数
export default {
  setup() {
    const { count, increment, decrement, doubleCount } = useCounter()

    return {
      count,
      increment,
      decrement,
      doubleCount,
    }
  },
}
```

### 2. 异步组合式函数

```javascript
// useAsync.js
import { ref } from 'vue'

export function useAsync(fn) {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  async function execute(...args) {
    loading.value = true
    error.value = null
    try {
      data.value = await fn(...args)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    execute,
  }
}

// 使用异步组合式函数
export default {
  setup() {
    const { loading, error, data, execute } = useAsync(async () => {
      const response = await fetch('/api/data')
      return response.json()
    })

    return {
      loading,
      error,
      data,
      execute,
    }
  },
}
```

## 模板引用

### 1. ref 模板引用

```vue
<template>
  <div ref="divRef">内容</div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const divRef = ref(null)

    onMounted(() => {
      console.log(divRef.value)
    })

    return {
      divRef,
    }
  },
}
</script>
```

### 2. 组件引用

```vue
<template>
  <child-component ref="childRef" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const childRef = ref(null)

    const callChildMethod = () => {
      childRef.value.someMethod()
    }

    return {
      childRef,
      callChildMethod,
    }
  },
}
</script>
```

## 常见问题

### 1. 响应式解构

```javascript
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      name: 'Vue3',
      age: 3,
    })

    // 使用 toRefs 保持响应性
    const { name, age } = toRefs(state)

    return {
      name,
      age,
    }
  },
}
```

### 2. 生命周期顺序

```javascript
import { onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    // 按照调用顺序执行
    onMounted(() => {
      console.log('第一个 mounted 钩子')
    })

    onMounted(() => {
      console.log('第二个 mounted 钩子')
    })

    onUnmounted(() => {
      console.log('第一个 unmounted 钩子')
    })
  },
}
```

## 面试题

1. **组合式 API 和选项式 API 有什么区别？**

```javascript
// 答案要点：
// 1. 更好的代码组织
// 2. 更好的类型推导
// 3. 更小的打包体积
// 4. 更好的代码复用
// 5. 更灵活的逻辑组合
```

2. **setup 函数的作用是什么？**

```javascript
// 答案要点：
// 1. 组件逻辑的入口
// 2. 在组件创建之前执行
// 3. 返回的数据和方法可以在模板中使用
// 4. 可以访问 props 和 context
```

3. **如何创建可复用的组合式函数？**

```javascript
// 答案要点：
// 1. 使用 ref 和 reactive 管理状态
// 2. 使用 computed 和 watch 处理副作用
// 3. 使用生命周期钩子处理组件生命周期
// 4. 返回需要暴露的状态和方法
```
