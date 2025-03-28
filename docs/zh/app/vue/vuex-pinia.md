# Vuex 与 Pinia

## 背景介绍

状态管理是大型 Vue 应用中的重要概念，用于集中管理应用的状态。Vuex 是 Vue 2 的官方状态管理方案，而 Pinia 则是 Vue 3 推荐的状态管理方案，它提供了更简单的 API 和更好的 TypeScript 支持。

## Vuex

### 1. 核心概念

```javascript
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  // 状态
  state: {
    count: 0,
    user: null,
  },

  // getter
  getters: {
    doubleCount: state => state.count * 2,
    isLoggedIn: state => !!state.user,
  },

  // mutation
  mutations: {
    increment(state) {
      state.count++
    },
    setUser(state, user) {
      state.user = user
    },
  },

  // action
  actions: {
    async login({ commit }, credentials) {
      const user = await api.login(credentials)
      commit('setUser', user)
    },
  },

  // 模块
  modules: {
    cart: {
      state: { items: [] },
      mutations: {
        addItem(state, item) {
          state.items.push(item)
        },
      },
    },
  },
})
```

### 2. 使用方式

```javascript
// 组件中使用
export default {
  computed: {
    count() {
      return this.$store.state.count
    },
    doubleCount() {
      return this.$store.getters.doubleCount
    },
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    async login() {
      await this.$store.dispatch('login', {
        username: 'admin',
        password: '123456',
      })
    },
  },
}
```

## Pinia

### 1. 基础配置

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),

  getters: {
    doubleCount: state => state.count * 2,
  },

  actions: {
    increment() {
      this.count++
    },

    async fetchData() {
      const data = await api.getData()
      this.count = data.count
    },
  },
})
```

### 2. 组合式 API 风格

```javascript
// stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  function setUser(newUser) {
    user.value = newUser
  }

  async function login(credentials) {
    const data = await api.login(credentials)
    setUser(data)
  }

  return {
    user,
    isLoggedIn,
    setUser,
    login,
  }
})
```

## 状态管理最佳实践

### 1. 模块化

```javascript
// stores/modules/cart.js
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    total: state => state.items.reduce((sum, item) => sum + item.price, 0),
  },

  actions: {
    addItem(item) {
      this.items.push(item)
    },

    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
  },
})
```

### 2. 持久化

```javascript
// 使用 pinia-plugin-persistedstate
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// store 中配置
export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
  }),
  persist: true,
})
```

## 常见问题

### 1. 状态持久化

```javascript
// Vuex 持久化
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ['user.token'],
    }),
  ],
})
```

### 2. 状态订阅

```javascript
// Pinia 订阅状态变化
const store = useCounterStore()
store.$subscribe((mutation, state) => {
  console.log('状态变化:', mutation)
})
```

## 面试题

1. **Vuex 和 Pinia 有什么区别？**

```javascript
// 答案要点：
// 1. Pinia 更轻量级
// 2. Pinia 支持 TypeScript
// 3. Pinia 不需要嵌套模块
// 4. Pinia 支持组合式 API
// 5. Pinia 不需要命名空间
```

2. **什么时候需要使用状态管理？**

```javascript
// 答案要点：
// 1. 多个组件共享状态
// 2. 需要集中管理状态
// 3. 需要状态持久化
// 4. 需要状态追踪和调试
```

3. **Vuex 的核心概念有哪些？**

```javascript
// 答案要点：
// 1. State：状态
// 2. Getter：计算属性
// 3. Mutation：同步修改状态
// 4. Action：异步操作
// 5. Module：模块化
```
