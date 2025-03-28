# Webpack Loader

## 什么是 Loader？

Loader 是 Webpack 的核心概念之一，它用于对模块的源代码进行转换。Loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。

## Loader 的特点

1. 单一职责：一个 Loader 只做一件事
2. 链式调用：按照从右到左的顺序执行
3. 模块化：每个 Loader 都是一个独立的模块
4. 无状态：Loader 不应该保存状态

## 常用 Loader

### 1. babel-loader

用于将 ES6+代码转换为向后兼容的 JavaScript 版本。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
```

### 2. css-loader

用于处理 CSS 文件，使其能够被 JavaScript 模块导入。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```

### 3. file-loader

用于处理文件资源，如图片、字体等。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
```

### 4. url-loader

将文件转换为 base64 URI。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8kb的文件会被转换为base64
            },
          },
        ],
      },
    ],
  },
}
```

## 编写自定义 Loader

### 基本结构

```javascript
module.exports = function (source) {
  // source是文件内容
  // 在这里处理source
  return source // 返回处理后的内容
}
```

### 示例：移除 console.log 的 Loader

```javascript
module.exports = function (source) {
  return source.replace(/console\.log\(.*?\);?/g, '')
}
```

## Loader 的使用方式

### 1. 内联方式

```javascript
import Styles from 'style-loader!css-loader!./styles.css'
```

### 2. CLI 方式

```bash
webpack --module-bind 'css=style-loader!css-loader'
```

### 3. 配置方式（推荐）

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
}
```

## Loader 的配置选项

### 1. test

用于匹配文件的正则表达式。

### 2. exclude

排除不需要处理的文件。

### 3. include

指定需要处理的文件。

### 4. use

指定使用的 loader。

## 最佳实践

1. 合理使用 loader 链
2. 注意 loader 的执行顺序
3. 适当使用 loader 的 options
4. 避免不必要的 loader
5. 合理使用 exclude 和 include

## 常见问题

1. loader 执行顺序问题
2. loader 配置错误
3. loader 版本兼容性问题
4. loader 性能问题
5. loader 缓存问题
