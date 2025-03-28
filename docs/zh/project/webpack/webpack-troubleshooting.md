# Webpack 问题排查指南

## 常见问题类型

1. 构建错误
2. 运行时错误
3. 性能问题
4. 配置问题
5. 依赖问题

## 构建错误排查

### 1. 模块找不到

```javascript
// 错误信息
Module not found: Error: Can't resolve 'xxx'

// 解决方案
// 1. 检查依赖是否安装
npm install xxx

// 2. 检查路径是否正确
import xxx from './xxx';  // 相对路径
import xxx from '@/xxx';  // 别名路径
```

### 2. 语法错误

```javascript
// 错误信息
SyntaxError: Unexpected token

// 解决方案
// 1. 检查babel配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};

// 2. 检查文件编码
// 确保文件使用UTF-8编码
```

## 运行时错误排查

### 1. 白屏问题

```javascript
// 可能原因
// 1. 入口文件错误
module.exports = {
  entry: './src/index.js',
}

// 2. HTML模板问题
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
```

### 2. 资源加载失败

```javascript
// 解决方案
// 1. 检查publicPath配置
module.exports = {
  output: {
    publicPath: '/',
  },
}

// 2. 检查资源路径
import img from './img.png'
```

## 性能问题排查

### 1. 构建速度慢

```javascript
// 优化方案
// 1. 使用多进程打包
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

// 2. 使用缓存
module.exports = {
  cache: {
    type: 'filesystem',
  },
}
```

### 2. 包体积过大

```javascript
// 优化方案
// 1. 代码分割
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

// 2. Tree Shaking
module.exports = {
  optimization: {
    usedExports: true,
  },
}
```

## 配置问题排查

### 1. 环境变量问题

```javascript
// 解决方案
// 1. 使用DefinePlugin
const webpack = require('webpack')
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}

// 2. 使用dotenv
require('dotenv').config()
```

### 2. 路径别名问题

```javascript
// 解决方案
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

## 依赖问题排查

### 1. 版本冲突

```javascript
// 解决方案
// 1. 使用npm ls检查依赖
npm ls package-name

// 2. 使用yarn resolutions
{
  "resolutions": {
    "package-name": "version"
  }
}
```

### 2. 依赖重复

```javascript
// 解决方案
// 1. 使用dedupe
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
}
```

## 调试技巧

### 1. 使用 stats.json

```javascript
// 生成构建统计信息
webpack --json > stats.json
```

### 2. 使用 webpack-bundle-analyzer

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
}
```

## 最佳实践

1. 保持依赖版本更新
2. 使用合适的 source map
3. 合理配置缓存
4. 定期清理构建缓存
5. 使用性能分析工具

## 注意事项

1. 开发环境和生产环境分开配置
2. 注意依赖版本兼容性
3. 合理使用缓存
4. 定期检查和更新配置
5. 保持构建日志清晰
