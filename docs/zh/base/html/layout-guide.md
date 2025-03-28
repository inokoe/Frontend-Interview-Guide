# CSS 布局指南

## 一、Flex 布局

Flex 布局（弹性盒子布局）是一种一维布局模型，特别适合处理行或列的项目排列。

### 容器属性

1. **display: flex | inline-flex**：定义 flex 容器
2. **flex-direction: row | row-reverse | column | column-reverse**：主轴方向
3. **flex-wrap: nowrap | wrap | wrap-reverse**：是否换行
4. **flex-flow**：flex-direction 和 flex-wrap 的简写
5. **justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly**：主轴对齐方式
6. **align-items: flex-start | flex-end | center | baseline | stretch**：交叉轴对齐方式
7. **align-content: flex-start | flex-end | center | space-between | space-around | stretch**：多行对齐方式

### 项目属性

1. **order**：项目排列顺序，数值越小越靠前
2. **flex-grow**：放大比例，默认 0（不放大）
3. **flex-shrink**：缩小比例，默认 1（空间不足时缩小）
4. **flex-basis**：项目在主轴上的基础尺寸，默认 auto
5. **flex**：flex-grow、flex-shrink 和 flex-basis 的简写，默认 0 1 auto
   - flex: 1 = flex: 1 1 0%
   - flex: auto = flex: 1 1 auto
   - flex: none = flex: 0 0 auto
6. **align-self**：单个项目的对齐方式，覆盖 align-items

## 二、Grid 布局

Grid 布局是一个二维的布局系统，可以同时处理行和列。

### 容器属性

1. **display: grid | inline-grid**：定义 grid 容器
2. **grid-template-columns**：定义列宽
3. **grid-template-rows**：定义行高
4. **grid-gap**：网格间距
5. **grid-template-areas**：定义区域
6. **justify-items**：单元格水平对齐
7. **align-items**：单元格垂直对齐
8. **justify-content**：整个网格水平对齐
9. **align-content**：整个网格垂直对齐

### 项目属性

1. **grid-column**：定义项目在哪一列
2. **grid-row**：定义项目在哪一行
3. **grid-area**：定义项目在哪个区域
4. **justify-self**：单个单元格水平对齐
5. **align-self**：单个单元格垂直对齐

## 三、响应式布局

### 实现方案

1. **媒体查询**：

```css
@media (max-width: 768px) {
  /* 移动端样式 */
}
```

2. **百分比布局**：相对于父元素的尺寸使用百分比
3. **弹性盒布局(Flexbox)**：一维布局模型
4. **网格布局(Grid)**：二维布局模型
5. **视口单位**：使用 vw、vh 等
6. **响应式图片**：使用`srcset`和`sizes`属性
7. **CSS 函数**：使用 min()、max()、clamp()等

### 移动端适配方案

1. **响应式布局**：

   - 媒体查询
   - 流式布局
   - Flexbox 和 Grid

2. **rem 适配方案**：

   - 动态设置 html 的 font-size
   - 配合 JS 使用
   - 淘宝 flexible.js 方案

3. **vw/vh 适配方案**：

   - 视口单位
   - 配合 postcss-px-to-viewport 使用

4. **vw+rem 方案**：

   - 设置 html 字体大小为 vw 单位
   - 结合两者优点

5. **CSS 变量方案**：

   - 利用 CSS 变量和 calc()函数
   - 结合媒体查询

6. **1px 边框解决方案**：

   - 伪元素+transform: scale()
   - border-image
   - box-shadow

7. **图片适配**：

   - srcset 和 sizes 属性
   - `<picture>`元素
   - SVG 矢量图形

8. **适配安全区**：
   - iOS 环境使用 env()和 constant()
   - 环境变量：safe-area-inset-top 等

## 四、布局单位

### 相对单位

1. **rem**：相对于根元素（html）的字体大小
2. **em**：相对于父元素的字体大小
3. **vw/vh**：相对于视口宽度/高度
4. **%**：相对于父元素
5. **ch**：相对于"0"字符的宽度
6. **ex**：相对于"x"字符的高度

### 绝对单位

1. **px**：像素
2. **pt**：磅
3. **cm/mm/in**：物理单位

## 五、常见布局场景

1. **居中布局**：

   - Flex 居中
   - Grid 居中
   - 绝对定位居中
   - transform 居中

2. **两栏布局**：

   - Flex 实现
   - Grid 实现
   - Float 实现

3. **三栏布局**：

   - 圣杯布局
   - 双飞翼布局
   - Flex 实现
   - Grid 实现

4. **等高布局**：

   - Flex 实现
   - Grid 实现
   - 负边距实现

5. **瀑布流布局**：
   - CSS columns
   - Grid 实现
   - Flex 实现
   - JavaScript 实现

## 六、垂直居中实现方案

### 1. Flex 布局实现垂直居中

```css
/* 单行文本垂直居中 */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 多行文本垂直居中 */
.flex-center-multi {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 或具体高度 */
}
```

### 2. Grid 布局实现垂直居中

```css
.grid-center {
  display: grid;
  place-items: center;
  min-height: 100vh; /* 或具体高度 */
}

/* 或者使用以下方式 */
.grid-center-alt {
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 100vh;
}
```

### 3. 绝对定位实现垂直居中

```css
/* 已知元素宽高 */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px; /* 具体宽度 */
  height: 100px; /* 具体高度 */
}

/* 未知元素宽高 */
.absolute-center-unknown {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 4. 表格布局实现垂直居中

```css
.table-center {
  display: table;
  width: 100%;
  height: 100vh;
}

.table-center-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```

### 5. 行高实现垂直居中

```css
/* 单行文本 */
.line-height-center {
  line-height: 100px; /* 等于容器高度 */
  text-align: center;
}

/* 多行文本 */
.line-height-center-multi {
  line-height: 1.5;
  padding: 20px 0;
}
```

### 6. margin 实现垂直居中

```css
.margin-center {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100px; /* 具体宽度 */
  height: 100px; /* 具体高度 */
}
```

### 7. CSS Grid + Flex 组合实现

```css
.grid-flex-center {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  min-height: 100vh;
}

.grid-flex-center > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 8. 视口单位实现

```css
.vh-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 9. CSS 变量实现动态居中

```css
:root {
  --container-height: 100vh;
}

.var-center {
  height: var(--container-height);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 10. 响应式垂直居中

```css
.responsive-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

@media (max-width: 768px) {
  .responsive-center {
    min-height: 100vh;
    padding: 10px;
  }
}
```

### 最佳实践建议

1. **现代布局方案优先**：

   - 优先使用 Flex 或 Grid 布局实现居中
   - 这些方案代码简洁，维护方便

2. **兼容性考虑**：

   - 需要兼容旧版浏览器时，可以使用绝对定位方案
   - 考虑使用 CSS 预处理器或后处理器处理兼容性问题

3. **性能优化**：

   - 避免使用 transform 进行居中（可能影响性能）
   - 合理使用 CSS 变量，便于主题切换

4. **响应式设计**：

   - 使用相对单位（vh、vw、%）
   - 结合媒体查询实现不同设备下的居中效果

5. **特殊情况处理**：
   - 多行文本居中考虑使用 padding
   - 图片居中注意保持宽高比
   - 考虑内容溢出情况
