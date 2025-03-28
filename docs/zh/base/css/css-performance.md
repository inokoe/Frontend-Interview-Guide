# CSS 性能优化

## CSS 提高性能的方法

### 1. 选择器优化

#### 1.1 选择器性能原则

- 避免使用通配符和深层次的嵌套选择器
- 尽量使用类选择器，减少使用复杂的选择器
- 避免使用标签选择器作为关键选择器
- 减少选择器的嵌套层级
- 优先使用类选择器
- 避免使用 `!important`

#### 1.2 选择器优化示例

```css
/* 不推荐 */
div ul li a span {
  color: red;
}

/* 推荐 */
.nav-link {
  color: red;
}
```

### 2. 重排（Reflow）和重绘（Repaint）优化

#### 2.1 重排和重绘的概念

- **重排（Reflow）**：当 DOM 元素的尺寸、结构或某些属性发生变化时，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程称为重排。
- **重绘（Repaint）**：当 DOM 元素的样式发生变化，但不影响布局时，浏览器会重新绘制元素，这个过程称为重绘。

#### 2.2 触发重排的操作

1. **改变元素尺寸**：

   ```css
   /* 会触发重排 */
   element.style.width = '100px';
   element.style.height = '100px';
   element.style.padding = '10px';
   element.style.margin = '10px';
   ```

2. **改变元素位置**：

   ```css
   /* 会触发重排 */
   element.style.position = 'absolute';
   element.style.top = '100px';
   element.style.left = '100px';
   ```

3. **改变元素内容**：

   ```javascript
   // 会触发重排
   element.innerHTML = 'new content'
   element.innerText = 'new text'
   ```

4. **改变窗口大小**：
   ```javascript
   // 会触发重排
   window.addEventListener('resize', () => {})
   ```

#### 2.3 触发重绘的操作

1. **改变颜色相关属性**：

   ```css
   /* 只触发重绘 */
   element.style.color = 'red';
   element.style.backgroundColor = 'blue';
   element.style.borderColor = 'green';
   ```

2. **改变透明度**：

   ```css
   /* 只触发重绘 */
   element.style.opacity = '0.5';
   ```

3. **改变阴影**：
   ```css
   /* 只触发重绘 */
   element.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
   ```

#### 2.4 优化重排和重绘的方法

1. **使用 transform 代替位置改变**：

   ```css
   /* 不推荐 */
   element.style.left = '100px';
   element.style.top = '100px';

   /* 推荐 */
   element.style.transform = 'translate(100px, 100px)';
   ```

2. **批量修改 DOM**：

   ```javascript
   // 不推荐
   for (let i = 0; i < 100; i++) {
     element.style.width = i + 'px'
   }

   // 推荐
   const fragment = document.createDocumentFragment()
   for (let i = 0; i < 100; i++) {
     const div = document.createElement('div')
     div.style.width = i + 'px'
     fragment.appendChild(div)
   }
   document.body.appendChild(fragment)
   ```

3. **使用 CSS 类名批量修改样式**：

   ```css
   /* 推荐 */
   .active {
     background: red;
     color: white;
     padding: 10px;
     margin: 5px;
   }
   ```

4. **使用绝对定位脱离文档流**：

   ```css
   /* 推荐 */
   .animation-element {
     position: absolute;
     top: 0;
     left: 0;
   }
   ```

5. **使用 CSS3 硬件加速**：
   ```css
   /* 推荐 */
   .hardware-accelerated {
     transform: translateZ(0);
     /* 或 */
     backface-visibility: hidden;
     /* 或 */
     perspective: 1000;
   }
   ```

### 3. 资源优化

#### 3.1 CSS 文件优化

- 压缩 CSS 文件
- 合并多个 CSS 文件
- 移除未使用的 CSS
- 使用 CSS 预处理器（Sass/Less）和后处理器（PostCSS）

#### 3.2 图片资源优化

- 使用 CSS Sprites 合并图片
- 使用字体图标（Icon Font）代替图片
- 使用 SVG 代替位图
- 使用 WebP 格式图片
- 使用响应式图片

### 4. 加载优化

#### 4.1 关键 CSS 优化

```html
<!-- 关键 CSS 内联 -->
<style>
  /* 首屏关键样式 */
</style>

<!-- 非关键 CSS 异步加载 -->
<link
  rel="preload"
  href="non-critical.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

#### 4.2 媒体查询优化

```css
/* 分离桌面和移动端样式 */
@media screen and (min-width: 768px) {
  /* 桌面端样式 */
}

@media screen and (max-width: 767px) {
  /* 移动端样式 */
}
```

### 5. 其他优化建议

1. **使用 CSS 变量**：

   ```css
   :root {
     --primary-color: #007bff;
     --secondary-color: #6c757d;
   }

   .element {
     color: var(--primary-color);
   }
   ```

2. **使用 CSS Grid 和 Flexbox 布局**：

   ```css
   /* 使用 Flexbox */
   .container {
     display: flex;
     justify-content: space-between;
   }

   /* 使用 Grid */
   .grid-container {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
   }
   ```

3. **使用 will-change 提示浏览器**：

   ```css
   .will-animate {
     will-change: transform;
   }
   ```

4. **避免使用 @import**：

   ```css
   /* 不推荐 */
   @import 'other.css';

   /* 推荐 */
   <link rel="stylesheet" href="other.css">
   ```
