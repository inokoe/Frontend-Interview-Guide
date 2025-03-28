# Webpack 优化策略

## 优化目标

1. 减小打包体积
2. 提高打包速度
3. 优化开发体验
4. 提高应用性能

## 代码分割（Code Splitting）

### 1. 入口分割

```javascript
module.exports = {
  entry: {
    main: './src/main.js',
    vendor: './src/vendor.js',
  },
}
```

### 2. 动态导入

```javascript
// 使用import()动态导入
const loadModule = () => import('./module.js')
```

### 3. 公共代码提取

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
}
```

## 缓存优化

### 1. 文件名哈希

```javascript
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
}
```

### 2. 模块标识符

```javascript
module.exports = {
  optimization: {
    moduleIds: 'deterministic',
  },
}
```

## 压缩优化

### 1. JavaScript 压缩

```javascript
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}
```

### 2. CSS 压缩

```javascript
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
}
```

## 构建速度优化

### 1. 多进程打包

```javascript
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
}
```

### 2. 缓存 Loader

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
}
```

## 开发体验优化

### 1. 热模块替换（HMR）

```javascript
module.exports = {
  devServer: {
    hot: true,
  },
}
```

### 2. Source Map

```javascript
module.exports = {
  devtool: 'eval-source-map',
}
```

## 性能优化

### 1. Tree Shaking

```javascript
module.exports = {
  optimization: {
    usedExports: true,
    minimize: true,
  },
}
```

### 2. Scope Hoisting

```javascript
module.exports = {
  optimization: {
    concatenateModules: true,
  },
}
```

## 最佳实践

1. 合理使用代码分割
2. 优化缓存策略
3. 使用压缩工具
4. 多进程构建
5. 合理使用 Source Map
6. 开启 Tree Shaking
7. 使用 Scope Hoisting

## 注意事项

1. 开发环境和生产环境使用不同的优化策略
2. 注意优化配置的兼容性
3. 合理使用缓存
4. 避免过度优化
5. 定期检查和更新优化策略
