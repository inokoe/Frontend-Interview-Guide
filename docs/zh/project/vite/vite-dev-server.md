# Vite 开发服务器

## 开发服务器概述

Vite 的开发服务器基于原生 ES 模块，提供了以下特性：

- 即时的模块热更新（HMR）
- 按需编译
- 开箱即用的 TypeScript、JSX、CSS 支持
- 自动依赖预构建

## 基本配置

### 1. 服务器配置

```javascript
export default {
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
  },
}
```

### 2. HMR 配置

```javascript
export default {
  server: {
    hmr: {
      overlay: true,
      protocol: 'ws',
      host: 'localhost',
    },
  },
}
```

### 3. 代理配置

```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
}
```

## 高级特性

### 1. 中间件

```javascript
export default {
  server: {
    middlewareMode: true,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // 自定义中间件逻辑
        next()
      })
    },
  },
}
```

### 2. WebSocket 配置

```javascript
export default {
  server: {
    ws: {
      port: 3001,
      protocol: 'ws',
    },
  },
}
```

### 3. 文件监听配置

```javascript
export default {
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
}
```

## 开发服务器功能

### 1. 热模块替换（HMR）

HMR 支持以下特性：

- 保持应用状态
- 即时更新
- 错误处理
- 自定义更新处理

### 2. 依赖预构建

```javascript
export default {
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@vueuse/core'],
  },
}
```

### 3. 静态资源处理

```javascript
export default {
  publicDir: 'public',
  server: {
    fs: {
      strict: true,
      allow: ['..'],
    },
  },
}
```

## 开发服务器最佳实践

### 1. 性能优化

1. **依赖预构建**

   - 预构建常用依赖
   - 排除不需要预构建的依赖

2. **文件监听优化**

   - 合理配置监听选项
   - 排除不必要的文件

3. **缓存优化**
   - 使用适当的缓存策略
   - 优化 HMR 配置

### 2. 开发体验

1. **代理配置**

   - 合理配置代理规则
   - 处理跨域问题

2. **错误处理**

   - 配置错误提示
   - 优化错误展示

3. **调试支持**
   - 配置 source map
   - 支持断点调试

## 常见配置示例

### 1. 完整开发服务器配置

```javascript
export default {
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
      protocol: 'ws',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
}
```

### 2. 生产环境预览配置

```javascript
export default {
  preview: {
    port: 5000,
    open: true,
    host: true,
  },
}
```

## 注意事项

1. 合理配置服务器选项
2. 注意 HMR 配置
3. 优化文件监听
4. 合理使用代理
5. 注意安全性配置
