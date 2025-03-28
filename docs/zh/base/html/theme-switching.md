# 主题切换

## 网站主题换肤方案

**标准答案**：
网站主题换肤主要实现方案：

1. **CSS 变量（最推荐）**：

```css
/* 定义变量 */
:root {
  --primary-color: #409eff;
  --text-color: #333;
  --bg-color: #fff;
}

/* 暗黑主题 */
[data-theme='dark'] {
  --primary-color: #79bbff;
  --text-color: #eee;
  --bg-color: #333;
}

/* 使用变量 */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

2. **动态切换 CSS 文件**：

```javascript
function changeTheme(theme) {
  const link = document.getElementById('theme-style')
  link.href = `/themes/${theme}.css`
}
```

3. **使用类名控制**：

```javascript
function toggleDarkMode() {
  document.body.classList.toggle('dark-theme')
}
```

4. **使用 CSS 预处理器（如 SASS/LESS）**：

```scss
// _variables.scss
$themes: (
  light: (
    primary-color: #409eff,
    text-color: #333,
  ),
  dark: (
    primary-color: #79bbff,
    text-color: #eee,
  ),
);

// 主题混入
@mixin themed() {
  @each $theme, $map in $themes {
    .theme-#{$theme} & {
      $theme-map: $map !global;
      @content;
    }
  }
}

@function themed($key) {
  @return map-get($theme-map, $key);
}
```

5. **动态生成样式**：

```javascript
function createStylesheet(theme) {
  const style = document.createElement('style')
  style.textContent = `
    body {
      background-color: ${theme.background};
      color: ${theme.textColor};
    }
    /* 其他样式 */
  `
  document.head.appendChild(style)
}
```

6. **利用滤镜实现快速切换**：

```css
.dark-mode {
  filter: invert(1) hue-rotate(180deg);
}
```

最佳实践：

- 考虑用户偏好（prefers-color-scheme）
- 记住用户选择（localStorage）
- 考虑切换过渡动画
- 确保所有 UI 组件都支持主题切换
