# HTML 语义化

## HTML5 新特性

**标准答案**：

1. **语义化标签**：

   - `<header>`：页头
   - `<nav>`：导航
   - `<main>`：主要内容
   - `<article>`：文章
   - `<section>`：区块
   - `<aside>`：侧边栏
   - `<footer>`：页脚
   - `<figure>`：图片相关
   - `<figcaption>`：图片说明
   - `<time>`：时间
   - `<mark>`：标记
   - `<progress>`：进度条
   - `<meter>`：度量
   - `<details>`：详情
   - `<summary>`：摘要

2. **表单增强**：

   - 新增输入类型：`email`、`url`、`number`、`range`、`date`、`time`、`color`、`tel`、`search`
   - 新增表单属性：`required`、`pattern`、`min`、`max`、`step`、`autocomplete`、`autofocus`
   - 新增表单元素：`<datalist>`、`<output>`、`<keygen>`

3. **多媒体支持**：

   - `<audio>`：音频
   - `<video>`：视频
   - `<source>`：媒体源
   - `<track>`：字幕

4. **Canvas 和 SVG**：

   - `<canvas>`：画布
   - `<svg>`：矢量图形

5. **Web 存储**：

   - `localStorage`：本地存储
   - `sessionStorage`：会话存储

6. **WebSocket**：

   - 支持全双工通信

7. **Web Workers**：

   - 支持后台线程

8. **拖放 API**：

   - 支持元素拖放

9. **地理位置**：

   - `Geolocation API`

10. **历史管理**：

    - `History API`

11. **核心 API**：
    - **File API**：
      - 文件读取和操作
      - 文件拖放上传
      - 文件系统访问
    - **WebRTC**：
      - 实时音视频通信
      - 点对点数据传输
    - **Service Worker**：
      - 离线缓存
      - 推送通知
      - 后台同步
    - **Web Components**：
      - Custom Elements
      - Shadow DOM
      - HTML Templates
    - **WebAssembly**：
      - 高性能代码执行
      - 跨语言互操作
    - **Web Notifications**：
      - 桌面通知
      - 消息提醒
    - **Web Share API**：
      - 原生分享功能
      - 跨应用数据共享
    - **Web Speech API**：
      - 语音识别
      - 语音合成
    - **Web Bluetooth API**：
      - 蓝牙设备连接
      - 设备数据交互
    - **Web USB API**：
      - USB 设备访问
      - 硬件交互

## HTML 语义化的好处

**标准答案**：

1. **可访问性更好**：

   - 帮助屏幕阅读器等辅助技术更好地理解网页内容
   - 提高残障用户的使用体验
   - 支持键盘导航

2. **SEO 友好**：

   - 搜索引擎更容易理解页面结构和内容
   - 提高网站在搜索结果中的排名
   - 更好的内容索引

3. **代码可维护性**：

   - 使代码结构清晰
   - 便于团队理解和维护
   - 减少代码冗余

4. **用户体验**：

   - 即使在 CSS 加载失败的情况下，页面仍具有较好的结构和阅读体验
   - 更好的页面结构展示
   - 更快的页面加载速度

5. **未来兼容性**：
   - 符合 W3C 标准
   - 有利于适应未来的网络发展
   - 更好的浏览器兼容性

## 语义化标签的使用场景

**标准答案**：

1. **页面结构**：

   ```html
   <header>
     <nav>...</nav>
   </header>
   <main>
     <article>
       <section>...</section>
     </article>
     <aside>...</aside>
   </main>
   <footer>...</footer>
   ```

2. **文章内容**：

   ```html
   <article>
     <header>
       <h1>文章标题</h1>
       <time>发布时间</time>
     </header>
     <section>
       <p>文章内容...</p>
       <figure>
         <img
           src="image.jpg"
           alt="图片描述"
         />
         <figcaption>图片说明</figcaption>
       </figure>
     </section>
   </article>
   ```

3. **导航菜单**：
   ```html
   <nav>
     <ul>
       <li><a href="#">首页</a></li>
       <li><a href="#">关于</a></li>
       <li><a href="#">服务</a></li>
     </ul>
   </nav>
   ```

## 最佳实践

**标准答案**：

1. **合理使用语义化标签**：

   - 根据内容选择合适的标签
   - 避免过度使用 `<div>` 和 `<span>`
   - 保持标签的嵌套结构清晰

2. **标题层级**：

   - 合理使用 `<h1>` 到 `<h6>`
   - 保持标题层级结构完整
   - 每个页面只使用一个 `<h1>`

3. **表单语义化**：

   - 使用 `<label>` 关联表单控件
   - 使用 `fieldset` 和 `legend` 组织表单
   - 使用适当的输入类型和属性

4. **图片处理**：

   - 使用 `<figure>` 和 `<figcaption>` 包装图片
   - 为图片提供有意义的 `alt` 属性
   - 使用 `<picture>` 和 `<source>` 处理响应式图片

5. **列表使用**：
   - 使用 `<ul>`、`<ol>`、`<dl>` 等列表标签
   - 合理使用列表的嵌套结构
   - 为列表项提供有意义的描述
