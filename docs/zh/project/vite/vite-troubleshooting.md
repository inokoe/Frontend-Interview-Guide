# Vite 常见问题排查

## 常见问题及解决方案

### 1. 依赖预构建问题

#### 问题描述

依赖预构建失败或性能问题

#### 解决方案

```javascript
export default {
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@vueuse/core'],
    force: true, // 强制重新预构建
  },
}
```

### 2. HMR 不生效

#### 问题描述

热模块替换（HMR）无法正常工作

#### 解决方案

1. 检查配置

```javascript
export default {
  server: {
    hmr: {
      overlay: true,
      protocol: 'ws',
    },
  },
}
```

2. 检查代码

```javascript
// 确保正确使用 HMR API
if (import.meta.hot) {
  import.meta.hot.accept('./module.js', newModule => {
    // 处理更新
  })
}
```

### 3. 构建性能问题

#### 问题描述

构建速度慢或内存占用高

#### 解决方案

```javascript
export default {
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
}
```

### 4. 代理配置问题

#### 问题描述

API 代理不生效或跨域问题

#### 解决方案

```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
    },
  },
}
```

### 5. 静态资源问题

#### 问题描述

静态资源加载失败或路径错误

#### 解决方案

```javascript
export default {
  publicDir: 'public',
  base: '/',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
}
```

## 调试技巧

### 1. 日志调试

```javascript
export default {
  logLevel: 'info',
  clearScreen: false,
  server: {
    hmr: {
      overlay: true,
    },
  },
}
```

### 2. 性能分析

```javascript
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
}
```

### 3. 环境变量调试

```javascript
// .env.development
VITE_DEBUG=true
VITE_API_URL=http://localhost:8080
```

## 常见错误处理

### 1. 模块解析错误

```javascript
export default {
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
}
```

### 2. 类型错误

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "moduleResolution": "Node",
    "strict": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "noEmit": true,
    "jsx": "preserve"
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 3. 构建错误

```javascript
export default {
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: false,
      },
    },
  },
}
```

## 性能优化建议

### 1. 开发环境优化

```javascript
export default {
  server: {
    hmr: true,
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
}
```

### 2. 生产环境优化

```javascript
export default {
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}
```

## 最佳实践

1. **依赖管理**

   - 合理使用依赖预构建
   - 避免不必要的依赖

2. **构建优化**

   - 使用适当的构建目标
   - 优化代码分割

3. **开发体验**

   - 配置适当的 HMR
   - 优化错误提示

4. **性能监控**
   - 使用性能分析工具
   - 监控构建时间

## 注意事项

1. 保持依赖版本兼容
2. 合理配置构建选项
3. 注意内存使用
4. 优化开发体验
5. 定期清理缓存
