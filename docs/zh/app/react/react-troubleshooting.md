# React 问题排查详解

## 1. 常见错误

### 1.1 渲染错误

```jsx
// 错误示例
function Component() {
  return <div>{undefined.property}</div> // TypeError
}

// 正确示例
function Component() {
  return <div>{data?.property}</div>
}
```

### 1.2 状态更新错误

```jsx
// 错误示例
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1) // 无限循环
  })
}

// 正确示例
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(prev => prev + 1)
  }, [])
}
```

## 2. 性能问题

### 2.1 不必要的重渲染

```jsx
// 问题代码
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Child count={count} />
      <button onClick={() => setCount(c => c + 1)}>增加</button>
    </div>
  )
}

// 优化代码
const Child = React.memo(function Child({ count }) {
  return <div>{count}</div>
})
```

### 2.2 内存泄漏

```jsx
// 问题代码
useEffect(() => {
  const subscription = data.subscribe()
  // 没有清理订阅
})

// 正确代码
useEffect(() => {
  const subscription = data.subscribe()
  return () => subscription.unsubscribe()
}, [])
```

## 3. 调试技巧

### 3.1 React DevTools

- 组件检查
- 性能分析
- 状态追踪

### 3.2 日志调试

```jsx
function Component() {
  useEffect(() => {
    console.log('组件挂载')
    return () => console.log('组件卸载')
  }, [])

  console.log('组件渲染')
  return <div>内容</div>
}
```

## 4. 网络问题

### 4.1 请求错误

```jsx
// 错误处理
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error('网络请求失败')
    }
    return await response.json()
  } catch (error) {
    console.error('请求错误:', error)
    // 错误处理逻辑
  }
}
```

### 4.2 数据加载状态

```jsx
function DataComponent() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const result = await fetchData()
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error.message}</div>
  return <div>{data}</div>
}
```

## 5. 状态管理问题

### 5.1 状态同步问题

```jsx
// 问题代码
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 异步操作
    setTimeout(() => {
      setCount(count + 1) // 使用过期的状态
    }, 1000)
  }, [])
}

// 正确代码
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setCount(prev => prev + 1)
    }, 1000)
  }, [])
}
```

### 5.2 状态更新竞态

```jsx
// 问题代码
async function handleSubmit() {
  const result = await saveData(data)
  setData(result) // 可能使用过期的数据
}

// 正确代码
async function handleSubmit() {
  const result = await saveData(data)
  setData(prev => ({ ...prev, ...result }))
}
```

## 6. 最佳实践

### 6.1 错误处理

- 使用错误边界
- 优雅降级
- 用户反馈

### 6.2 性能优化

- 合理使用 memo
- 避免不必要的渲染
- 优化大型列表

### 6.3 调试流程

- 问题复现
- 日志分析
- 性能分析
- 解决方案
