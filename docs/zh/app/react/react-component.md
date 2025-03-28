# React 组件系统详解

## 1. 组件类型

### 1.1 函数组件

```jsx
function FunctionComponent(props) {
  return <div>{props.name}</div>
}
```

### 1.2 类组件

```jsx
class ClassComponent extends React.Component {
  render() {
    return <div>{this.props.name}</div>
  }
}
```

## 2. 组件通信

### 2.1 Props 传递

- 父组件向子组件传递数据
- 类型检查（PropTypes）
- 默认值设置

### 2.2 Context

- 跨层级数据传递
- Provider 和 Consumer
- useContext Hook

### 2.3 状态提升

- 共享状态管理
- 单向数据流
- 组件解耦

## 3. 组件设计模式

### 3.1 容器组件与展示组件

- 关注点分离
- 逻辑复用
- 代码组织

### 3.2 高阶组件（HOC）

```jsx
function withLogging(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log('Component mounted')
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
```

### 3.3 渲染属性模式

```jsx
class DataProvider extends React.Component {
  render() {
    return this.props.children(this.state)
  }
}
```

## 4. 组件优化

### 4.1 性能优化

- React.memo
- PureComponent
- shouldComponentUpdate

### 4.2 代码分割

- 动态导入
- React.lazy
- Suspense

### 4.3 错误边界

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

## 5. 组件最佳实践

### 5.1 命名规范

- 使用 PascalCase
- 语义化命名
- 文件组织

### 5.2 代码组织

- 单一职责
- 组件拆分
- 逻辑复用

### 5.3 状态管理

- 合理使用状态
- 避免状态冗余
- 状态更新优化
