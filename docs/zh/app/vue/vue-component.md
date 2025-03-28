# Vue 组件通信

## 背景介绍

组件通信是 Vue 应用开发中的重要概念，不同的组件之间需要共享数据、传递事件。Vue 提供了多种组件通信的方式，每种方式都有其适用场景。

## 组件通信方式

### 1. Props 和 Emit

```javascript
// 父组件
<template>
  <child-component
    :message="parentMessage"
    @update="handleUpdate"
  />
</template>

<script>
export default {
  data() {
    return {
      parentMessage: 'Hello'
    }
  },
  methods: {
    handleUpdate(newValue) {
      this.parentMessage = newValue
    }
  }
}
</script>

// 子组件
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="sendToParent">发送到父组件</button>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
  methods: {
    sendToParent() {
      this.$emit('update', 'New Message')
    }
  }
}
</script>
```

### 2. Provide/Inject

```javascript
// 父组件
<script>
export default {
  provide() {
    return {
      theme: 'dark',
      toggleTheme: this.toggleTheme
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    }
  }
}
</script>

// 子组件
<script>
export default {
  inject: ['theme', 'toggleTheme']
}
</script>
```

### 3. Vuex/Pinia 状态管理

```javascript
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    }
  }
})

// 组件中使用
<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    increment() {
      this.$store.dispatch('increment')
    }
  }
}
</script>
```

### 4. EventBus（不推荐）

```javascript
// eventBus.js
import mitt from 'mitt'
export default mitt()

// 组件A
import eventBus from './eventBus'

export default {
  methods: {
    sendMessage() {
      eventBus.emit('message', 'Hello')
    }
  }
}

// 组件B
import eventBus from './eventBus'

export default {
  mounted() {
    eventBus.on('message', (msg) => {
      console.log(msg)
    })
  },
  beforeUnmount() {
    eventBus.off('message')
  }
}
```

## 组件通信最佳实践

### 1. 父子组件通信

```javascript
// 推荐使用 props/emit
// 父组件
<template>
  <child-component
    v-model="value"
    :config="config"
    @update="handleUpdate"
  />
</template>

// 子组件
<script>
export default {
  props: {
    modelValue: String,
    config: Object
  },
  emits: ['update:modelValue', 'update'],
  methods: {
    updateValue(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
}
</script>
```

### 2. 跨组件通信

```javascript
// 推荐使用 Pinia
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    async fetchUserInfo() {
      const data = await api.getUserInfo()
      this.userInfo = data
    },
  },
})
```

## 常见问题

### 1. Props 单向数据流

```javascript
// 错误示例
export default {
  props: {
    message: String
  },
  methods: {
    updateMessage() {
      this.message = 'New Message' // 错误：直接修改 props
    }
  }
}

// 正确示例
export default {
  props: {
    message: String
  },
  methods: {
    updateMessage() {
      this.$emit('update:message', 'New Message')
    }
  }
}
```

### 2. 组件解耦

```javascript
// 使用组合式函数
function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--

  return {
    count,
    increment,
    decrement,
  }
}
```

## 面试题

1. **Vue 组件间有哪些通信方式？**

```javascript
// 答案要点：
// 1. props/emit：父子组件通信
// 2. provide/inject：跨层级通信
// 3. Vuex/Pinia：状态管理
// 4. EventBus：事件总线（不推荐）
// 5. $parent/$children：直接访问
// 6. $refs：组件引用
```

2. **为什么 Vue 不推荐使用 EventBus？**

```javascript
// 答案要点：
// 1. 难以追踪数据流向
// 2. 可能导致内存泄漏
// 3. 不利于代码维护
// 4. 难以调试
```

3. **Vue3 中如何实现组件通信？**

```javascript
// 答案要点：
// 1. 使用 defineProps 和 defineEmits
// 2. 使用 provide/inject
// 3. 使用 Pinia 进行状态管理
// 4. 使用组合式函数实现逻辑复用
```
