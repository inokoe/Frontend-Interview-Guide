# React 状态管理详解

## 1. 内置状态管理

### 1.1 useState

```jsx
const [state, setState] = useState(initialState)
```

### 1.2 useReducer

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

### 1.3 Context

```jsx
const MyContext = React.createContext(defaultValue)

function Provider({ children }) {
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
```

## 2. Redux

### 2.1 核心概念

- Store
- Action
- Reducer
- Middleware

### 2.2 基本使用

```jsx
// Action
const increment = () => ({
  type: 'INCREMENT',
})

// Reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

// Store
const store = createStore(counter)
```

### 2.3 Redux Toolkit

```jsx
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },
})
```

## 3. MobX

### 3.1 核心概念

- Observable State
- Actions
- Computed Values
- Reactions

### 3.2 基本使用

```jsx
import { makeAutoObservable } from 'mobx'

class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }
}
```

## 4. Zustand

### 4.1 基本使用

```jsx
import create from 'zustand'

const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}))
```

## 5. 状态管理最佳实践

### 5.1 选择状态管理方案

- 项目规模
- 团队熟悉度
- 性能需求
- 开发效率

### 5.2 状态设计

- 状态规范化
- 避免状态冗余
- 合理划分模块

### 5.3 性能优化

- 选择性更新
- 状态缓存
- 异步处理

## 6. 常见问题与解决方案

### 6.1 状态同步

- 处理异步操作
- 状态一致性
- 竞态条件

### 6.2 状态持久化

- localStorage
- Redux Persist
- 服务端同步

### 6.3 调试技巧

- Redux DevTools
- 状态追踪
- 性能分析
