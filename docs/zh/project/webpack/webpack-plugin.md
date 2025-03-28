# Webpack Plugin

## 什么是 Plugin？

Plugin 是 Webpack 的另一个核心概念，它用于扩展 Webpack 的功能。Plugin 可以用于打包优化、资源管理、注入环境变量等。

## Plugin 的特点

1. 功能强大：可以访问 Webpack 的整个生命周期
2. 可配置：支持自定义配置
3. 可复用：可以在不同项目中重复使用
4. 可扩展：可以扩展 Webpack 的功能

## 常用 Plugin

### 1. HtmlWebpackPlugin

用于生成 HTML 文件，自动引入打包后的资源。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
```

### 2. CleanWebpackPlugin

用于清理构建目录。

```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  plugins: [new CleanWebpackPlugin()],
}
```

### 3. MiniCssExtractPlugin

用于将 CSS 提取到单独的文件中。

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
}
```

### 4. DefinePlugin

用于定义全局常量。

```javascript
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}
```

## 编写自定义 Plugin

### 基本结构

```javascript
class MyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('MyPlugin', stats => {
      console.log('编译完成！')
    })
  }
}

module.exports = MyPlugin
```

### 示例：输出构建信息的 Plugin

```javascript
class BuildInfoPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildInfoPlugin', stats => {
      console.log('构建时间：', new Date().toLocaleString())
      console.log('构建大小：', stats.toJson().assets)
    })
  }
}

module.exports = BuildInfoPlugin
```

## Plugin 的使用方式

### 1. 配置方式

```javascript
module.exports = {
  plugins: [new MyPlugin()],
}
```

## Plugin 的生命周期钩子

### 1. 编译阶段

- entry-option
- run
- compile
- make
- after-compile
- done

### 2. 输出阶段

- emit
- after-emit
- done

## 最佳实践

1. 合理使用 Plugin
2. 注意 Plugin 的执行顺序
3. 适当使用 Plugin 的配置选项
4. 避免不必要的 Plugin
5. 合理使用 Plugin 的生命周期钩子

## 常见问题

1. Plugin 执行顺序问题
2. Plugin 配置错误
3. Plugin 版本兼容性问题
4. Plugin 性能问题
5. Plugin 缓存问题
