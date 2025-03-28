# 文本省略号

## 超行省略号如何实现

**标准答案**：

### 1. 单行文本溢出显示省略号

```css
.ellipsis-single {
  white-space: nowrap; /* 文本不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
  width: 200px; /* 必须设置宽度 */
}
```

### 2. 多行文本溢出显示省略号

#### 方法一：使用 -webkit-line-clamp（推荐）

```css
.ellipsis-multi {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 显示行数 */
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px; /* 必须设置宽度 */
}
```

#### 方法二：使用伪元素（兼容性好）

```css
.ellipsis-multi-compatible {
  position: relative;
  height: 4.5em; /* 行高 × 行数 */
  line-height: 1.5em;
  overflow: hidden;
}

.ellipsis-multi-compatible::after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: linear-gradient(to right, transparent, #fff 55%);
}
```

#### 方法三：使用 JavaScript 动态监测

```javascript
function truncateText(element, maxLines) {
  const lineHeight = parseInt(window.getComputedStyle(element).lineHeight)
  const maxHeight = lineHeight * maxLines

  while (element.scrollHeight > maxHeight) {
    element.textContent = element.textContent.slice(0, -1)
  }

  element.textContent += '...'
}
```

### 3. 响应式文本省略

```css
.responsive-ellipsis {
  width: 100%;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .responsive-ellipsis {
    max-width: 200px;
  }
}
```

### 4. 自定义省略号样式

```css
.custom-ellipsis {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-ellipsis::after {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
  color: #ff0000; /* 自定义省略号颜色 */
  font-weight: bold; /* 自定义省略号样式 */
}
```

### 5. 表格单元格文本省略

```css
.table-cell-ellipsis {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 6. 注意事项

1. **宽度设置**：

   - 必须设置容器宽度
   - 可以使用固定宽度或百分比
   - 考虑响应式布局需求

2. **兼容性处理**：

   - -webkit-line-clamp 需要添加浏览器前缀
   - 考虑降级方案
   - 使用 JavaScript 方案作为备选

3. **性能优化**：

   - 避免频繁的 DOM 操作
   - 使用 CSS 方案优先
   - JavaScript 方案考虑防抖处理

4. **特殊场景**：
   - 动态内容更新
   - 多语言支持
   - 不同字体大小适配

### 7. 常见问题解决

1. **省略号不显示**：

   - 检查容器宽度是否设置
   - 确认文本是否超出容器
   - 验证 CSS 属性是否正确

2. **多行省略不生效**：

   - 检查 -webkit-line-clamp 兼容性
   - 确认父元素高度设置
   - 验证文本内容是否足够长

3. **响应式适配问题**：
   - 使用相对单位
   - 添加媒体查询
   - 考虑容器自适应

### 8. 最佳实践

1. **CSS 方案优先**：

   - 优先使用 CSS 实现
   - 代码简洁，性能好
   - 维护成本低

2. **降级处理**：

   - 提供合适的降级方案
   - 保证基本功能可用
   - 考虑用户体验

3. **响应式设计**：

   - 适配不同屏幕尺寸
   - 考虑不同设备特性
   - 保持布局稳定性

4. **性能考虑**：
   - 避免不必要的计算
   - 合理使用缓存
   - 优化重绘和回流
