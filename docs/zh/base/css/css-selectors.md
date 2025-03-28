# CSS 选择器与优先级

## CSS 中常见的选择器以及优先级

### 1. 基础选择器

#### 1.1 元素选择器

```css
/* 选择所有 div 元素 */
div {
  color: red;
}

/* 选择所有 p 元素 */
p {
  font-size: 16px;
}
```

#### 1.2 类选择器

```css
/* 选择所有 class 为 box 的元素 */
.box {
  width: 100px;
  height: 100px;
}

/* 多类选择器 */
.box.red {
  background-color: red;
}
```

#### 1.3 ID 选择器

```css
/* 选择 id 为 header 的元素 */
#header {
  background: #fff;
}
```

### 2. 属性选择器

```css
/* 选择具有 title 属性的元素 */
[title] {
  border: 1px solid red;
}

/* 选择 title 属性值等于 "hello" 的元素 */
[title='hello'] {
  color: blue;
}

/* 选择 title 属性值包含 "hello" 的元素 */
[title*='hello'] {
  font-weight: bold;
}

/* 选择 title 属性值以 "hello" 开头的元素 */
[title^='hello'] {
  background: yellow;
}

/* 选择 title 属性值以 "hello" 结尾的元素 */
[title$='hello'] {
  padding: 10px;
}
```

### 3. 伪类选择器

```css
/* 链接伪类 */
a:link {
  color: blue;
} /* 未访问的链接 */
a:visited {
  color: purple;
} /* 已访问的链接 */
a:hover {
  color: red;
} /* 鼠标悬停 */
a:active {
  color: orange;
} /* 激活状态 */

/* 表单伪类 */
input:focus {
  border-color: blue;
} /* 获得焦点 */
input:disabled {
  background: #eee;
} /* 禁用状态 */
input:checked {
  border-color: green;
} /* 选中状态 */

/* 结构伪类 */
li:first-child {
  color: red;
} /* 第一个子元素 */
li:last-child {
  color: blue;
} /* 最后一个子元素 */
li:nth-child(2) {
  color: green;
} /* 第2个子元素 */
li:nth-child(even) {
  background: #f0f0f0;
} /* 偶数子元素 */
li:nth-child(odd) {
  background: #fff;
} /* 奇数子元素 */
```

### 4. 伪元素选择器

```css
/* 首字母 */
p::first-letter {
  font-size: 24px;
  color: red;
}

/* 首行 */
p::first-line {
  background: yellow;
}

/* 前后内容 */
.box::before {
  content: '★';
  color: gold;
}

.box::after {
  content: '★';
  color: gold;
}
```

### 5. 组合选择器

```css
/* 后代选择器 */
div p {
  color: red; /* 选择 div 内的所有 p 元素 */
}

/* 子元素选择器 */
div > p {
  color: blue; /* 只选择 div 的直接子元素 p */
}

/* 相邻兄弟选择器 */
div + p {
  color: green; /* 选择紧跟在 div 后的 p 元素 */
}

/* 通用兄弟选择器 */
div ~ p {
  color: purple; /* 选择 div 后的所有 p 元素 */
}
```

### 6. 选择器优先级

优先级从高到低：

1. `!important`（特殊情况，覆盖所有其他样式）
2. 内联样式（1000）
3. ID 选择器（100）
4. 类选择器、属性选择器、伪类选择器（10）
5. 元素选择器、伪元素选择器（1）
6. 通用选择器（\*）、组合符（+, >, ~, 空格）（0）

#### 6.1 优先级计算示例

```css
/* 权重计算 */
#header .nav li a {
  /* 100 + 10 + 1 + 1 = 112 */
  color: red;
}

.nav li a {
  /* 10 + 1 + 1 = 12 */
  color: blue;
}

/* 权重相同，遵循就近原则 */
.box {
  color: red;
}
.box {
  color: blue; /* 最终显示蓝色 */
}

/* !important 优先级最高 */
.title {
  color: red !important; /* 优先级最高 */
}
```

#### 6.2 优先级注意事项

1. 权重计算不是简单的加法，而是按照选择器类型分别计算
2. 选择器越具体，优先级越高
3. 相同优先级的选择器，遵循就近原则
4. `!important` 会覆盖所有其他样式，但应谨慎使用
5. 内联样式的优先级高于外部样式表
6. 继承的样式优先级最低

### 7. 选择器性能优化

1. 避免使用通配符选择器 `*`
2. 避免使用标签选择器作为关键选择器
3. 减少选择器的嵌套层级
4. 优先使用类选择器
5. 避免使用 `!important`
6. 合理使用组合选择器
