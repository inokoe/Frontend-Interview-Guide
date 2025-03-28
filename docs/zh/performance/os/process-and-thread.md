# 进程与线程

## 基本概念

### 进程（Process）

进程是操作系统进行资源分配和调度的基本单位。每个进程都有自己独立的地址空间、内存、数据栈以及其他用于跟踪执行的辅助数据。

### 线程（Thread）

线程是进程中的一个执行单元，是 CPU 调度的基本单位。同一个进程中的多个线程共享进程的地址空间和资源，但每个线程都有自己的栈空间和程序计数器。

## 进程与线程的区别

1. **资源分配**

   - 进程是资源分配的基本单位
   - 线程是 CPU 调度的基本单位

2. **地址空间**

   - 进程有独立的地址空间
   - 线程共享所属进程的地址空间

3. **通信方式**

   - 进程间通信需要 IPC（进程间通信）机制
   - 线程间可以直接读写进程数据段

4. **切换开销**
   - 进程切换开销大，需要保存和恢复更多状态
   - 线程切换开销小，只需要保存和恢复少量状态

## 多进程与多线程的应用场景

### 多进程适用场景

- 需要独立内存空间的程序
- 对安全性要求高的应用
- 需要充分利用多核 CPU 的计算密集型任务

### 多线程适用场景

- I/O 密集型应用
- 需要共享数据的并发程序
- 需要快速响应的用户界面程序

## 进程间通信（IPC）方式

1. **管道（Pipe）**

   - 单向通信
   - 只能用于有亲缘关系的进程

2. **命名管道（Named Pipe）**

   - 双向通信
   - 可用于无亲缘关系的进程

3. **消息队列（Message Queue）**

   - 消息的链表
   - 支持多进程读写

4. **共享内存（Shared Memory）**

   - 最快的 IPC 方式
   - 需要同步机制

5. **信号量（Semaphore）**

   - 用于进程间同步
   - 控制对共享资源的访问

6. **Socket**
   - 可用于网络通信
   - 支持跨机器通信

## 线程同步机制

1. **互斥锁（Mutex）**

   - 最基本的同步机制
   - 保证同一时间只有一个线程访问共享资源

2. **信号量（Semaphore）**

   - 控制多个线程对共享资源的访问
   - 可以实现更复杂的同步需求

3. **条件变量（Condition Variable）**

   - 用于线程间的等待/通知机制
   - 常与互斥锁配合使用

4. **读写锁（Read-Write Lock）**
   - 允许多个读操作同时进行
   - 写操作时独占访问

## 性能考虑

1. **创建开销**

   - 进程创建开销大
   - 线程创建开销小

2. **切换开销**

   - 进程切换需要切换页表、刷新 TLB
   - 线程切换只需要切换栈和寄存器

3. **资源利用**
   - 进程可以充分利用多核 CPU
   - 线程适合 I/O 密集型任务

## 最佳实践

1. **选择建议**

   - 优先考虑多线程
   - 需要隔离性时使用多进程

2. **同步处理**

   - 合理使用同步机制
   - 避免死锁和竞态条件

3. **资源管理**

   - 及时释放资源
   - 注意内存泄漏问题

4. **错误处理**
   - 做好异常处理
   - 实现优雅的退出机制

## 延伸

### Chrome 每开一个标签页就是创建一个新进程

Chrome 采用多进程架构，主要包含以下进程：

1. **浏览器主进程（Browser Process）**

   - 负责浏览器界面的显示
   - 管理其他进程的创建和销毁
   - 处理用户交互

2. **渲染进程（Renderer Process）**

   - 每个标签页对应一个渲染进程
   - 负责页面的渲染和 JavaScript 执行
   - 包含主线程和合成线程

3. **GPU 进程（GPU Process）**

   - 处理 GPU 加速任务
   - 为所有渲染进程提供 GPU 支持

4. **网络进程（Network Process）**

   - 处理网络请求
   - 管理网络资源

5. **插件进程（Plugin Process）**
   - 运行浏览器插件
   - 每个插件一个独立进程

这种多进程架构的优势：

- 进程隔离，提高安全性
- 单个标签页崩溃不影响其他标签页
- 更好的内存管理和性能优化

### JS 的逻辑线程和渲染线程

JavaScript 在浏览器中采用单线程模型，但通过事件循环机制实现了异步特性。具体运行原理：

1. **主线程（Main Thread）工作流程**：

   - 执行栈（Call Stack）：
     - 同步代码立即执行，形成执行上下文栈
     - 函数调用会创建新的栈帧（Stack Frame）
   - 任务队列系统：
     - 宏任务队列（Macrotask Queue）：包含 script、setTimeout、DOM 事件等
     - 微任务队列（Microtask Queue）：Promise.then、MutationObserver
     - 动画帧队列（Animation Frames）：requestAnimationFrame 回调
   - 事件循环（Event Loop）三个阶段：
     1. 执行一个宏任务（从任务队列中取出）
     2. 清空微任务队列（全部执行）
     3. 执行渲染流程（需要时）

2. **渲染线程关键工作机制**：

   - 渲染管线（Rendering Pipeline）：
     1. Style Calculation：将 CSS 转换为 CSSOM
     2. Layout：计算元素几何信息（重排）
     3. Paint：生成绘制指令（重绘）
     4. Composite：图层合成（利用合成线程）
   - 垂直同步机制（VSync）：
     - 60Hz 屏幕每 16.6ms 触发一次渲染
     - 通过 requestAnimationFrame 对齐浏览器刷新率

3. **线程协作原理**：
   - DOM 操作：
     ```js
     // 主线程修改 DOM
     element.style.color = 'red'
     // 实际渲染由渲染线程在下一个渲染周期处理
     ```
   - 通信约束：
     - 主线程通过 Commit 操作提交 DOM 更新
     - 渲染线程通过 LayerTree 维护当前渲染状态
   - 性能临界点：
     - 超过 16.6ms 的任务会导致掉帧
     - 50ms 以上的任务会导致可感知延迟

技术实现细节：

- V8 引擎的优化：隐藏类（Hidden Classes）、即时编译（JIT）
- Blink 渲染引擎的多级缓存机制
- 合成线程（Compositor Thread）独立处理图层变换
- 光栅化线程（Raster Thread）处理图片解码

### 小程序的逻辑线程和渲染线程

小程序采用基于 WebView 改进的双线程架构，主要设计原理：

1. **架构实现原理**：

```text
   +-------------------+     Bridge       +-------------------+
   | 逻辑线程           | <=============>  | 渲染线程           |
   | (JavaScriptCore)  |   JSON + Event   | (WebView 内核)     |
   +-------------------+                  +-------------------+
         ↑                                    ↑
         | 系统 API 调用                      | 原生组件调用
         ↓                                    ↓
   +-------------------+               +-------------------+
   | 微信 Native 层     |               | 原生组件渲染层     |
   +-------------------+               +-------------------+
```

1. **逻辑线程（Logic Thread）**

   - 运行 JavaScript 代码
   - 处理业务逻辑
   - 管理数据状态
   - 处理网络请求
   - 执行定时器

2. **渲染线程（Render Thread）**
   - 负责页面渲染
   - 处理 WXML 和 WXSS
   - 执行布局和绘制
   - 处理用户交互

线程通信特点：

- 通过 Native 层进行通信
- 使用消息队列和事件机制
- 数据传输需要序列化和反序列化

性能优化策略：

- 减少线程间通信频率
- 合理使用 setData
- 避免频繁的页面切换
- 使用分包加载优化启动性能

小程序特有的优化机制：

- 预加载机制
- 分包加载
- 虚拟列表
- 骨架屏
- 图片懒加载
