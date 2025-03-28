# Webpack Dev Server

## 什么是 Webpack Dev Server？

Webpack Dev Server 是一个基于 Express 的轻量级开发服务器，它提供了实时重载（live reloading）功能，能够帮助开发者更高效地进行开发。

## 基本配置

### 1. 安装

```bash
npm install webpack-dev-server --save-dev
```

### 2. 基础配置

```javascript
module.exports = {
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
    open: true,
  },
}
```

## 常用配置选项

### 1. 服务器配置

```javascript
module.exports = {
  devServer: {
    host: 'localhost',
    port: 3000,
    https: false,
    compress: true,
  },
}
```

### 2. 代理配置

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
```

### 3. 静态文件配置

```javascript
module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
}
```

## 高级功能

### 1. 热模块替换（HMR）

```javascript
module.exports = {
  devServer: {
    hot: true,
  },
}
```

### 2. 自动打开浏览器

```javascript
module.exports = {
  devServer: {
    open: true,
    openPage: 'different/page',
  },
}
```

### 3. 客户端配置

```javascript
module.exports = {
  devServer: {
    client: {
      overlay: true,
      progress: true,
    },
  },
}
```

## 开发体验优化

### 1. 错误处理

```javascript
module.exports = {
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
}
```

### 2. 进度显示

```javascript
module.exports = {
  devServer: {
    client: {
      progress: true,
    },
  },
}
```

### 3. 浏览器兼容性

```javascript
module.exports = {
  devServer: {
    allowedHosts: 'all',
  },
}
```

## 最佳实践

1. 合理配置开发服务器
2. 使用代理解决跨域问题
3. 开启热模块替换
4. 配置适当的错误处理
5. 优化开发体验

## 常见问题

### 1. 端口占用

```javascript
module.exports = {
  devServer: {
    port: 3000,
    port: 'auto', // 自动寻找可用端口
  },
}
```

### 2. 跨域问题

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
}
```

### 3. 静态资源访问

```javascript
module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/public',
    },
  },
}
```

## 注意事项

1. 开发环境和生产环境使用不同的配置
2. 注意代理配置的安全性
3. 合理使用热模块替换
4. 注意静态资源的访问权限
5. 定期检查和更新配置
