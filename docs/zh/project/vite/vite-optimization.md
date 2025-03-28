# Vite 优化配置

## 构建优化

### 1. 代码分割

Vite 提供了灵活的代码分割配置：

```javascript
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash', 'axios'],
        },
      },
    },
  },
}
```

### 2. 压缩优化

```javascript
export default {
  build: {
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

### 3. 资源处理

```javascript
export default {
  build: {
    assetsInlineLimit: 4096, // 4kb 以下的资源会被内联
    chunkSizeWarningLimit: 1000, // 块大小警告限制
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
}
```

## 开发优化

### 1. 依赖预构建

```javascript
export default {
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: ['@vueuse/core'],
  },
}
```

### 2. 缓存优化

```javascript
export default {
  server: {
    hmr: {
      overlay: false, // 禁用错误遮罩
    },
    watch: {
      usePolling: true, // 使用轮询
      interval: 1000, // 轮询间隔
    },
  },
}
```

## 性能优化

### 1. 构建性能

```javascript
export default {
  build: {
    target: 'esnext',
    cssTarget: 'chrome61',
    reportCompressedSize: false, // 禁用压缩大小报告
    chunkSizeWarningLimit: 1000,
  },
}
```

### 2. 开发性能

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

## 优化策略

### 1. 依赖优化

1. **预构建依赖**

   - 使用 `optimizeDeps.include` 预构建常用依赖
   - 使用 `optimizeDeps.exclude` 排除不需要预构建的依赖

2. **依赖分割**
   - 合理使用 `manualChunks` 分割第三方库
   - 按功能模块分割代码

### 2. 资源优化

1. **静态资源处理**

   - 合理设置 `assetsInlineLimit`
   - 使用适当的资源命名策略

2. **CSS 优化**
   - 使用 CSS 代码分割
   - 优化 CSS 加载顺序

### 3. 构建优化

1. **压缩优化**

   - 使用 Terser 进行代码压缩
   - 配置适当的压缩选项

2. **缓存优化**
   - 合理使用构建缓存
   - 优化 HMR 配置

## 最佳实践

1. **开发环境**

   - 启用 HMR
   - 配置适当的 watch 选项
   - 使用依赖预构建

2. **生产环境**

   - 启用代码压缩
   - 配置代码分割
   - 优化资源处理

3. **通用优化**
   - 使用环境变量
   - 合理配置缓存
   - 优化构建输出

## 注意事项

1. 合理配置依赖预构建
2. 注意代码分割粒度
3. 优化资源加载策略
4. 合理使用缓存机制
5. 注意构建性能影响
