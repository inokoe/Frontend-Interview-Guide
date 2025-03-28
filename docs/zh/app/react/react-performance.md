# React 性能优化详解

## 1. 渲染优化

### 1.1 避免不必要的渲染

- React.memo
- PureComponent
- shouldComponentUpdate

### 1.2 状态管理优化

```jsx
// 使用函数式更新
setState(prevState => ({
  count: prevState.count + 1,
}))

// 批量更新
ReactDOM.unstable_batchedUpdates(() => {
  setState({ count: count + 1 })
  setState({ flag: true })
})
```

### 1.3 虚拟列表

```jsx
import { FixedSizeList } from 'react-window'

function Row({ index, style }) {
  return <div style={style}>Row {index}</div>
}

function VirtualList() {
  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={1000}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  )
}
```

## 2. 代码分割

### 2.1 路由分割

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
```

### 2.2 组件分割

- 按需加载
- 动态导入
- 预加载

## 3. 缓存优化

### 3.1 useMemo

```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])
```

### 3.2 useCallback

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

## 4. 网络优化

### 4.1 数据预加载

- 预加载关键数据
- 使用 SWR 或 React Query
- 实现数据缓存

### 4.2 图片优化

- 懒加载
- 图片压缩
- 使用合适的图片格式

## 5. 性能监控

### 5.1 React Profiler

- 使用 React DevTools Profiler
- 分析组件渲染时间
- 识别性能瓶颈

### 5.2 性能指标

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)

## 6. 最佳实践

### 6.1 组件优化

- 合理拆分组件
- 避免深层嵌套
- 使用 Fragment

### 6.2 状态管理

- 避免状态冗余
- 合理使用 Context
- 考虑使用状态管理库

### 6.3 事件处理

- 事件委托
- 防抖和节流
- 避免内联函数
