# Vite 基础概念

## 什么是 Vite？

Vite 是一个现代化的前端构建工具，它利用浏览器原生 ES 模块导入，在开发环境下提供极速的开发体验。Vite 使用 Rollup 在生产环境下进行打包，确保最佳的构建性能。

## 核心概念

### 1. 开发服务器

Vite 的开发服务器基于原生 ES 模块，提供了以下特性：

- 即时的模块热更新（HMR）
- 按需编译
- 开箱即用的 TypeScript、JSX、CSS 支持

### 2. 构建优化

Vite 在生产环境构建时：

- 使用 Rollup 进行打包
- 自动代码分割
- 静态资源处理
- 预构建依赖

### 3. 配置系统

Vite 提供了灵活的配置系统：

```javascript
// vite.config.js
export default {
  // 基础配置
  base: '/',

  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
  },

  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}
```

## 基本配置示例

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

## 常见配置项说明

### plugins

配置 Vite 插件：

```javascript
export default {
  plugins: [
    vue(),
    react(),
    // 其他插件
  ],
}
```

### resolve

配置模块解析选项：

```javascript
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
}
```

### build

构建相关配置：

```javascript
export default {
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
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

## 最佳实践

1. 合理使用插件系统
2. 配置适当的构建选项
3. 使用环境变量管理配置
4. 优化依赖预构建
5. 合理使用静态资源处理

## 注意事项

1. 确保 Node.js 版本兼容（推荐 14.18+）
2. 注意插件配置顺序
3. 合理使用环境变量
4. 注意构建输出配置
5. 合理使用依赖预构建
