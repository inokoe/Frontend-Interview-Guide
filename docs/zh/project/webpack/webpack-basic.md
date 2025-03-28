# Webpack 基础概念

## 什么是 Webpack？

Webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。当 Webpack 处理应用程序时，它会在内部构建一个依赖图，这个依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。

## 核心概念

### 1. Entry（入口）

入口起点指示 Webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，Webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

```javascript
module.exports = {
  entry: './src/index.js',
}
```

### 2. Output（输出）

Output 属性告诉 Webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。

```javascript
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
}
```

### 3. Mode（模式）

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。

```javascript
module.exports = {
  mode: 'development',
}
```

### 4. Module（模块）

在 Webpack 中，模块可以是：

- JavaScript 模块
- CSS 文件
- 图片
- 字体
- 其他资源

### 5. Chunk（代码块）

Chunk 是 Webpack 打包过程中的中间产物，Webpack 会根据入口文件（Entry）对应的依赖（Module）进行打包，打包后的文件就叫做 Chunk。

## 基本配置示例

```javascript
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
```

## 常见配置项说明

### resolve

用于设置模块如何被解析。

```javascript
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

### devtool

选择一种 source map 格式来增强调试过程。

```javascript
module.exports = {
  devtool: 'source-map',
}
```

## 最佳实践

1. 合理设置入口文件
2. 使用适当的 source map
3. 根据环境选择合适的 mode
4. 合理组织项目结构
5. 使用模块化开发方式

## 注意事项

1. 确保 entry 路径正确
2. 注意 output 的 path 需要是绝对路径
3. 合理使用 mode 来优化构建
4. 注意文件命名规范
5. 合理使用 resolve 配置
