# CSS3 的特性

## CSS3 的三大特性

### 1. 层叠性

- **定义**：多个 CSS 样式可以同时作用于同一个 HTML 元素
- **原则**：
  - 样式冲突时，遵循就近原则
  - 权重不同时，权重高的样式生效
  - 权重相同时，遵循就近原则
- **示例**：

```css
/* 权重相同，就近原则 */
.box {
  color: red;
}
.box {
  color: blue; /* 最终显示蓝色 */
}

/* 权重不同，权重高的生效 */
#box {
  color: red; /* ID选择器权重高，显示红色 */
}
.box {
  color: blue;
}
```

### 2. 继承性

- **定义**：子标签会继承父标签的某些样式
- **特点**：
  - 子元素可以继承父元素的样式
  - 不是所有属性都可以继承
  - 继承的权重为 0
- **可继承属性**：
  - 文本相关：color、font-size、font-family、font-weight、line-height
  - 列表相关：list-style、list-style-type、list-style-position
  - 表格相关：border-collapse、border-spacing
  - 其他：visibility、cursor
- **不可继承属性**：
  - 盒模型相关：width、height、margin、padding、border
  - 定位相关：position、top、right、bottom、left
  - 显示相关：display
  - 背景相关：background
- **示例**：

```css
.parent {
  color: red;
  font-size: 16px;
  width: 100px;
}

.child {
  /* 继承 color 和 font-size */
  /* 不继承 width */
}
```

### 3. 优先级

- **定义**：不同选择器具有不同的优先级
- **权重计算**：
  - 内联样式：1000
  - ID 选择器：100
  - 类选择器、属性选择器、伪类：10
  - 元素选择器、伪元素：1
  - 通配符、子选择器、相邻选择器：0
- **权重叠加**：
  - 多个选择器组合时，权重相加
  - 权重相同时，遵循就近原则
- **示例**：

```css
/* 权重计算 */
#box .title {
  /* 100 + 10 = 110 */
  color: red;
}

.box .title {
  /* 10 + 10 = 20 */
  color: blue;
}

/* 权重叠加 */
.box .title span {
  /* 10 + 10 + 1 = 21 */
  color: green;
}

/* !important 优先级最高 */
.title {
  color: red !important; /* 优先级最高 */
}
```

## CSS3 新增特性

### 1. 选择器

- **属性选择器**：

  ```css
  /* 包含属性 */
  [class] {
  }

  /* 属性值等于 */
  [class='box'] {
  }

  /* 属性值包含 */
  [class*='box'] {
  }

  /* 属性值开头 */
  [class^='box'] {
  }

  /* 属性值结尾 */
  [class$='box'] {
  }
  ```

- **结构伪类选择器**：

  ```css
  /* 第一个子元素 */
  :first-child {
  }

  /* 最后一个子元素 */
  :last-child {
  }

  /* 第n个子元素 */
  :nth-child(n) {
  }

  /* 偶数子元素 */
  :nth-child(even) {
  }

  /* 奇数子元素 */
  :nth-child(odd) {
  }
  ```

### 2. 盒模型

- **box-sizing**：

  ```css
  /* 标准盒模型 */
  box-sizing: content-box;

  /* IE盒模型 */
  box-sizing: border-box;
  ```

### 3. 背景

- **background-size**：

  ```css
  /* 覆盖 */
  background-size: cover;

  /* 包含 */
  background-size: contain;

  /* 具体尺寸 */
  background-size: 100px 100px;
  ```

- **background-origin**：
  ```css
  background-origin: padding-box;
  background-origin: border-box;
  background-origin: content-box;
  ```

### 4. 渐变

- **线性渐变**：

  ```css
  background: linear-gradient(to right, red, blue);
  background: linear-gradient(45deg, red, blue);
  ```

- **径向渐变**：
  ```css
  background: radial-gradient(circle, red, blue);
  ```

### 5. 过渡

- **transition**：

  ```css
  /* 简写 */
  transition: all 0.3s ease;

  /* 分开写 */
  transition-property: width;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
  ```

### 6. 动画

- **@keyframes**：

  ```css
  @keyframes move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100px);
    }
  }

  .box {
    animation: move 1s infinite;
  }
  ```

### 7. 2D/3D 变换

- **2D 变换**：

  ```css
  /* 位移 */
  transform: translate(100px, 100px);

  /* 旋转 */
  transform: rotate(45deg);

  /* 缩放 */
  transform: scale(1.5);

  /* 倾斜 */
  transform: skew(10deg);
  ```

- **3D 变换**：

  ```css
  /* 3D位移 */
  transform: translate3d(100px, 100px, 100px);

  /* 3D旋转 */
  transform: rotate3d(1, 1, 1, 45deg);

  /* 3D缩放 */
  transform: scale3d(1.5, 1.5, 1.5);
  ```

### 8. 弹性布局

- **Flex 布局**：

  ```css
  /* 容器属性 */
  display: flex;
  flex-direction: row | column;
  justify-content: center | space-between;
  align-items: center;
  flex-wrap: wrap;

  /* 项目属性 */
  flex: 1;
  order: 1;
  align-self: center;
  ```

### 9. 网格布局

- **Grid 布局**：

  ```css
  /* 容器属性 */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;

  /* 项目属性 */
  grid-column: span 2;
  grid-row: span 2;
  ```

### 10. 媒体查询

- **响应式布局**：
  ```css
  @media screen and (max-width: 768px) {
    .box {
      width: 100%;
    }
  }
  ```

### 11. 多列布局

- **column**：
  ```css
  .box {
    column-count: 3;
    column-gap: 20px;
    column-rule: 1px solid #ccc;
  }
  ```

### 12. 文字阴影和盒子阴影

- **阴影效果**：

  ```css
  /* 文字阴影 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  /* 盒子阴影 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  ```
