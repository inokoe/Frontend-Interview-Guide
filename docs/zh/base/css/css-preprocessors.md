# CSS 预处理器与工具

## 1. Less

Less 是一个 CSS 预处理器，它扩展了 CSS 语言，添加了变量、嵌套规则、混合（Mixins）、函数等特性。

### 主要特性

- **变量**：使用 `@` 符号定义变量

```less
@primary-color: #007bff;
.button {
  background-color: @primary-color;
}
```

- **嵌套规则**：可以像 HTML 结构一样嵌套 CSS

```less
.nav {
  background: #fff;
  &-item {
    padding: 10px;
    &:hover {
      background: #f0f0f0;
    }
  }
}
```

- **混合（Mixins）**：可重用的样式块

```less
.border-radius(@radius) {
  border-radius: @radius;
}
.button {
  .border-radius(5px);
}
```

## 2. Sass/SCSS

Sass 是最流行的 CSS 预处理器之一，提供了两种语法：缩进语法（Sass）和 SCSS。

### 主要特性

- **变量**：使用 `$` 符号定义变量

```scss
$primary-color: #007bff;
.button {
  background-color: $primary-color;
}
```

- **嵌套规则**：支持嵌套和父选择器引用

```scss
.nav {
  background: #fff;
  &-item {
    padding: 10px;
    &:hover {
      background: #f0f0f0;
    }
  }
}
```

- **混合（Mixins）**：使用 `@mixin` 和 `@include`

```scss
@mixin border-radius($radius) {
  border-radius: $radius;
}
.button {
  @include border-radius(5px);
}
```

- **函数**：内置函数和自定义函数

```scss
@function calculate-width($n) {
  @return $n * 100px;
}
.container {
  width: calculate-width(5);
}
```

## 3. Tailwind CSS

Tailwind CSS 是一个功能类优先的 CSS 框架，通过组合预定义的工具类来构建界面。

### 主要特性

- **原子化 CSS**：使用预定义的工具类

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">按钮</button>
```

- **响应式设计**：使用前缀实现响应式

```html
<div class="w-full md:w-1/2 lg:w-1/3">响应式容器</div>
```

- **暗黑模式**：使用 `dark:` 前缀

```html
<div class="bg-white dark:bg-gray-800">支持暗黑模式</div>
```

- **自定义配置**：通过 `tailwind.config.js` 扩展

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
      },
    },
  },
}
```

## 4. 其他工具

### PostCSS

PostCSS 是一个用 JavaScript 转换 CSS 的工具，可以：

- 自动添加浏览器前缀
- 支持未来的 CSS 特性
- 压缩和优化 CSS
- 支持 CSS Modules

### CSS Modules

CSS Modules 是一个 CSS 模块化解决方案，可以：

- 自动生成唯一的类名
- 避免样式冲突
- 支持组合和继承

## 5. 选择建议

1. **项目规模**：

   - 小型项目：原生 CSS 或 Tailwind CSS
   - 中型项目：Less 或 Sass
   - 大型项目：Sass + PostCSS

2. **团队情况**：

   - 熟悉 React：考虑 CSS Modules
   - 需要快速开发：考虑 Tailwind CSS
   - 需要复杂样式逻辑：考虑 Sass

3. **维护性**：
   - 需要主题定制：Less 或 Sass
   - 需要组件化：CSS Modules
   - 需要快速迭代：Tailwind CSS
