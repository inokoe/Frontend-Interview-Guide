# React 生命周期详解

## 1. 类组件生命周期

### 1.1 挂载阶段

- `constructor()`: 组件初始化
- `static getDerivedStateFromProps()`: 从 props 获取派生状态
- `render()`: 渲染组件
- `componentDidMount()`: 组件挂载完成

### 1.2 更新阶段

- `static getDerivedStateFromProps()`: 从 props 获取派生状态
- `shouldComponentUpdate()`: 是否应该更新组件
- `render()`: 渲染组件
- `getSnapshotBeforeUpdate()`: 获取更新前的快照
- `componentDidUpdate()`: 组件更新完成

### 1.3 卸载阶段

- `componentWillUnmount()`: 组件即将卸载

## 2. 函数组件生命周期

### 2.1 useEffect 的使用

```jsx
// 挂载和更新时执行
useEffect(() => {
  // 副作用代码
})

// 仅在挂载时执行
useEffect(() => {
  // 副作用代码
}, [])

// 在特定依赖项变化时执行
useEffect(() => {
  // 副作用代码
}, [dep1, dep2])

// 清理函数
useEffect(() => {
  // 副作用代码
  return () => {
    // 清理代码
  }
}, [])
```

## 3. 生命周期最佳实践

### 3.1 数据获取

- 在 `componentDidMount` 或 `useEffect` 中进行数据获取
- 避免在 `render` 中直接获取数据

### 3.2 事件订阅

- 在 `componentDidMount` 中订阅事件
- 在 `componentWillUnmount` 中取消订阅
- 使用 `useEffect` 处理事件订阅和清理

### 3.3 性能优化

- 合理使用 `shouldComponentUpdate`
- 使用 `React.memo` 优化函数组件
- 避免不必要的重渲染

## 4. 常见问题与解决方案

### 4.1 内存泄漏

- 及时清理定时器
- 取消事件订阅
- 清理异步操作

### 4.2 状态更新

- 避免在 `render` 中直接修改状态
- 使用 `setState` 的函数式更新
- 处理异步状态更新

### 4.3 副作用处理

- 合理使用 `useEffect` 的依赖数组
- 避免无限循环
- 正确处理异步操作
