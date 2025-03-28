# React Router 详解

## 1. 基础概念

### 1.1 路由组件

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/about'
          element={<About />}
        />
      </Routes>
    </BrowserRouter>
  )
}
```

### 1.2 路由参数

```jsx
// 动态路由参数
;<Route
  path='/user/:id'
  element={<User />}
/>

// 在组件中获取参数
function User() {
  const { id } = useParams()
  return <div>User ID: {id}</div>
}
```

## 2. 路由导航

### 2.1 声明式导航

```jsx
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <Link to='/'>首页</Link>
      <Link to='/about'>关于</Link>
    </nav>
  )
}
```

### 2.2 编程式导航

```jsx
import { useNavigate } from 'react-router-dom'

function LoginButton() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/dashboard')
  }

  return <button onClick={handleLogin}>登录</button>
}
```

## 3. 路由守卫

### 3.1 权限控制

```jsx
function PrivateRoute({ children }) {
  const isAuthenticated = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return children
}
```

### 3.2 路由拦截

```jsx
function AuthGuard({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // 检查权限
    if (!hasPermission(location.pathname)) {
      navigate('/403')
    }
  }, [location])

  return children
}
```

## 4. 路由配置

### 4.1 嵌套路由

```jsx
<Route
  path='/dashboard'
  element={<Dashboard />}
>
  <Route
    index
    element={<DashboardHome />}
  />
  <Route
    path='profile'
    element={<Profile />}
  />
  <Route
    path='settings'
    element={<Settings />}
  />
</Route>
```

### 4.2 路由懒加载

```jsx
const Dashboard = React.lazy(() => import('./Dashboard'))
const Profile = React.lazy(() => import('./Profile'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path='/dashboard'
          element={<Dashboard />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
      </Routes>
    </Suspense>
  )
}
```

## 5. 路由状态管理

### 5.1 路由状态

```jsx
function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  return <div>搜索结果: {query}</div>
}
```

### 5.2 路由历史

```jsx
function HistoryDemo() {
  const location = useLocation()
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <p>当前位置: {location.pathname}</p>
      <button onClick={goBack}>返回</button>
    </div>
  )
}
```

## 6. 最佳实践

### 6.1 路由组织

- 路由模块化
- 权限管理
- 路由守卫

### 6.2 性能优化

- 路由懒加载
- 预加载
- 缓存策略

### 6.3 用户体验

- 加载状态
- 错误处理
- 过渡动画
