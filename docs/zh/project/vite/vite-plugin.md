# Vite 插件系统

## 插件概述

Vite 插件系统基于 Rollup 插件接口，提供了一套简单而强大的插件 API。插件可以用于扩展 Vite 的功能，包括：

- 转换文件内容
- 注入环境变量
- 修改配置
- 添加中间件
- 自定义构建过程

## 插件开发

### 基本结构

一个基本的 Vite 插件结构如下：

```javascript
export default function myPlugin() {
  return {
    name: 'vite-plugin-my',

    // 配置钩子
    config(config) {
      // 修改配置
    },

    // 配置解析钩子
    configResolved(config) {
      // 配置解析完成
    },

    // 转换钩子
    transform(code, id) {
      // 转换文件内容
    },

    // 加载钩子
    load(id) {
      // 加载文件
    },
  }
}
```

### 常用钩子

1. **config**

   - 在配置加载前执行
   - 可以修改配置对象

2. **configResolved**

   - 在配置解析完成后执行
   - 可以获取完整的配置信息

3. **transform**

   - 用于转换文件内容
   - 支持异步操作

4. **load**
   - 用于加载文件
   - 可以返回自定义内容

## 常用插件示例

### 1. 环境变量注入插件

```javascript
export default function envPlugin() {
  return {
    name: 'vite-plugin-env',
    config(config) {
      config.define = {
        ...config.define,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }
    },
  }
}
```

### 2. 文件转换插件

```javascript
export default function transformPlugin() {
  return {
    name: 'vite-plugin-transform',
    transform(code, id) {
      if (id.endsWith('.custom')) {
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: null,
        }
      }
    },
  }
}
```

## 插件最佳实践

1. **命名规范**

   - 使用 `vite-plugin-` 前缀
   - 使用有意义的名称

2. **钩子使用**

   - 只实现需要的钩子
   - 注意钩子的执行顺序

3. **错误处理**

   - 合理处理异常
   - 提供有意义的错误信息

4. **性能优化**
   - 避免不必要的文件处理
   - 合理使用缓存

## 常用官方插件

1. **@vitejs/plugin-vue**

   - Vue 3 支持
   - JSX 支持

2. **@vitejs/plugin-react**

   - React 支持
   - Fast Refresh

3. **@vitejs/plugin-legacy**
   - 旧版浏览器支持
   - 自动 polyfill

## 插件配置示例

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    vue({
      // Vue 插件配置
      include: [/\.vue$/, /\.md$/],
      exclude: [/node_modules/],
    }),
    react({
      // React 插件配置
      babel: {
        plugins: [['@babel/plugin-transform-runtime']],
      },
    }),
  ],
})
```

## 注意事项

1. 插件顺序很重要，注意配置顺序
2. 避免插件之间的冲突
3. 合理使用插件选项
4. 注意性能影响
5. 保持插件简单和可维护
