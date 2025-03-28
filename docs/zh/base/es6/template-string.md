# 模板字符串

## 背景介绍

模板字符串是 ES6（ECMAScript 2015）引入的重要特性，它解决了 JavaScript 中字符串拼接的痛点问题。在 ES6 之前，开发者需要使用字符串连接符（+）来构建复杂字符串，这种方式不仅繁琐且易出错，尤其在处理多行文本和变量插值时。模板字符串使用反引号(`)代替单引号或双引号，提供了更优雅、可读性更强的字符串处理方式。

## 基本语法

### 1. 字符串插值

```javascript
// 基本用法
const name = 'John'
const greeting = `Hello, ${name}!`
console.log(greeting) // "Hello, John!"

// 表达式计算
const a = 10
const b = 20
console.log(`Sum: ${a + b}`) // "Sum: 30"

// 调用函数
function getTime() {
  return new Date().toLocaleTimeString()
}
console.log(`Current time: ${getTime()}`)
```

### 2. 多行字符串

```javascript
// 传统写法
const multiLine = 'line 1\n' + 'line 2\n' + 'line 3'

// 模板字符串写法
const multiLine = `
  line 1
  line 2
  line 3
`

// HTML模板
const html = `
  <div class="container">
    <h1>${title}</h1>
    <p>${content}</p>
  </div>
`
```

## 标签模板（Tagged Templates）

### 1. 基本用法

```javascript
function tag(strings, ...values) {
  console.log(strings) // 字符串数组
  console.log(values) // 插值数组
  return '处理结果'
}

const name = 'John'
const age = 30
const result = tag`Name: ${name}, Age: ${age}`
```

### 2. 实际应用

```javascript
// 安全的HTML模板
function safeHtml(strings, ...values) {
  const escaped = values.map(value =>
    String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  )

  return strings.reduce((result, str, i) => result + str + (escaped[i] || ''), '')
}

const userInput = '<script>alert("xss")</script>'
const safe = safeHtml`<div>${userInput}</div>`
```

### 3. 样式组件示例

```javascript
// styled-components风格
function styled(strings, ...values) {
  return function (props) {
    const result = strings.reduce((acc, str, i) => {
      const value = values[i]
      const resolved = typeof value === 'function' ? value(props) : value
      return acc + str + (resolved || '')
    }, '')
    return result
  }
}

const Button = styled`
  background: ${props => (props.primary ? 'blue' : 'white')};
  color: ${props => (props.primary ? 'white' : 'black')};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
`
```

## 常见应用场景

### 1. 动态字符串生成

```javascript
// URL构建
const baseUrl = 'https://api.example.com'
const endpoint = 'users'
const id = 123
const url = `${baseUrl}/${endpoint}/${id}`

// 动态类名
const className = `header ${isActive ? 'active' : ''} ${isHidden ? 'hidden' : ''}`
```

### 2. SQL 查询构建

```javascript
const table = 'users'
const fields = ['name', 'age']
const condition = 'age > 18'

const query = `
  SELECT ${fields.join(', ')}
  FROM ${table}
  WHERE ${condition}
`
```

### 3. 国际化

```javascript
const i18n = {
  greeting: (name, time) => `Hello ${name}, good ${time}!`,
  farewell: name => `Goodbye ${name}, see you next time!`,
}

console.log(i18n.greeting('John', 'morning'))
```

## 最佳实践

1. **使用场景**

   - HTML 模板生成
   - 多行字符串
   - 动态字符串
   - 国际化文本

2. **注意事项**

   - 注意空格和换行的处理
   - 避免过度嵌套
   - 考虑 XSS 安全问题
   - 对于大型模板，考虑使用专门的模板引擎

3. **性能考虑**
   - 模板字符串在频繁拼接大字符串时可能不如`join()`方法高效
   - 避免在循环中频繁创建新的模板字符串

## 面试常见问题

### 1. 模板字符串相比传统字符串有哪些优势？

**参考答案**：

- **字符串插值**：可以直接在字符串中嵌入表达式，无需使用 `+` 进行拼接
- **多行字符串**：支持创建多行字符串，无需使用 `\n` 转义符
- **表达式执行**：可以在 `${}` 中放置任何有效的 JavaScript 表达式
- **标签模板**：支持自定义字符串处理逻辑
- **可读性更强**：代码更简洁，更易于维护
- **语法灵活**：可以在表达式中调用函数、访问对象属性等

### 2. 什么是标签模板，有什么用途？

**参考答案**：
标签模板是模板字符串的高级用法，本质上是一个函数调用，函数名（标签）位于模板字符串之前。

格式：`tag`\`template string\`

主要用途：

- **HTML 转义**：防止 XSS 攻击
- **国际化（i18n）**：根据不同语言环境处理文本
- **CSS-in-JS**：如 styled-components 库
- **SQL 查询构建**：安全处理 SQL 查询
- **自定义模板处理**：格式化、语法高亮等

标签函数接收被模板字符串分割的文本数组作为第一个参数，后续参数为模板中的表达式值。

### 3. 如何在模板字符串中转义特殊字符？

**参考答案**：
在模板字符串中，反引号（\`）和美元符号加大括号（${）需要转义：

```javascript
// 转义反引号
console.log(`这是一个转义的反引号：\``)

// 转义${}
console.log(`实际价格：\${price}美元`)
```

也可以使用标签模板函数来处理特殊字符：

```javascript
function escape(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let val = values[i] || ''
    // 处理特殊字符
    val = String(val).replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return result + str + val
  }, '')
}

const html = escape`<script>${userInput}</script>`
```

### 4. 模板字符串中的表达式可以是什么？

**参考答案**：
模板字符串的 `${}` 中可以包含任何有效的 JavaScript 表达式：

- **变量引用**：`const name = 'World'; `\`Hello ${name}\``
- **算术运算**：`\`2 + 2 = ${2 + 2}\``
- **函数调用**：`\`Current time: ${new Date().toLocaleTimeString()}\``
- **三元运算符**：`\`${age > 18 ? '成年' : '未成年'}\``
- **对象属性访问**：`\`Welcome ${user.name}!\``
- **方法调用**：`\`Uppercase: ${name.toUpperCase()}\``
- **数组操作**：`\`Items: ${items.join(', ')}\``

表达式会被求值，然后转换为字符串并插入到结果字符串中。

### 5. 如何使用模板字符串实现多行字符串？

**参考答案**：
模板字符串天然支持多行文本，只需直接在代码中换行即可：

```javascript
const multiLine = `
  这是第一行
  这是第二行
  这是第三行
`
```

需要注意的是：

- 模板字符串会保留所有的空格和换行
- 如果不希望保留首行的换行，可以让反引号紧跟第一行文本
- 可以使用标签函数处理多余的空格：

```javascript
function trimIndent(strings, ...values) {
  const result = strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '')
  return result.replace(/^\s+/gm, '').trim()
}

const html = trimIndent`
  <div>
    <p>多行文本，缩进会被移除</p>
  </div>
`
```

### 6. 模板字符串的性能如何？

**参考答案**：
模板字符串的性能特点：

- **一般场景**：对于简单的字符串拼接，模板字符串性能与传统方法（+运算符）相近
- **大量拼接**：在大量字符串拼接场景下，`Array.join()`可能比模板字符串更高效
- **频繁使用**：在热点代码（如循环内）使用复杂模板字符串可能导致性能问题
- **编译优化**：现代 JavaScript 引擎对模板字符串进行了优化，但复杂表达式求值仍有开销
- **标签模板**：使用标签函数可能带来额外性能开销，但通常可接受

实际开发中，应根据场景选择合适的方法：

- 注重可读性的普通场景：优先使用模板字符串
- 对性能极度敏感的场景：考虑使用 `join()` 或 `+=` 等方式
- 复杂处理逻辑：仍推荐使用标签模板，优点大于性能损失

### 7. 如何使用模板字符串实现国际化？

**参考答案**：
使用模板字符串实现国际化主要有两种方式：

**1. 结合翻译对象：**

```javascript
const i18n = {
  'zh-CN': {
    greeting: name => `你好，${name}！`,
    farewell: name => `再见，${name}！`,
  },
  'en-US': {
    greeting: name => `Hello, ${name}!`,
    farewell: name => `Goodbye, ${name}!`,
  },
}

const userLang = 'zh-CN'
console.log(i18n[userLang].greeting('张三'))
```

**2. 使用标签模板：**

```javascript
function i18n(strings, ...values) {
  const locale = getCurrentLocale() // 获取当前语言环境
  const translations = {
    'zh-CN': ['欢迎', '您已登录', '天'],
    'en-US': ['Welcome', 'You have been logged in for', 'days'],
  }

  const translated = translations[locale] || translations['en-US']

  return strings.reduce((result, str, i) => {
    return result + translated[i] + (values[i] !== undefined ? values[i] : '')
  }, '')
}

const username = '张三'
const days = 5
const message = i18n`${username}! ${days}`
```

这种方法结合专业的 i18n 库（如 i18next）使用效果更佳。

### 8. 模板字符串与 JSX 有什么异同？

**参考答案**：

**相同点：**

- 都支持表达式插值
- 都能处理多行文本
- 都能用于构建 UI 结构

**不同点：**

- **语法**：模板字符串使用`${}`插值，JSX 使用`{}`插值
- **解析时机**：模板字符串在运行时解析，JSX 在编译时转换为 JavaScript
- **类型检查**：JSX 可配合 TypeScript 提供类型检查，模板字符串没有内置类型检查
- **转换方式**：JSX 被转换为 React.createElement 调用，模板字符串保持为字符串
- **用途侧重**：JSX 主要用于 React 组件，模板字符串用途更广泛
- **性能**：JSX 通常更高效，因为它最终生成的是组件树而非字符串
- **安全性**：JSX 默认防止 XSS，而模板字符串需要手动处理安全问题

两者可以结合使用，如在 JSX 中使用模板字符串处理文本。

### 9. 如何在模板字符串中嵌套模板字符串？

**参考答案**：
模板字符串可以嵌套，有以下几种方式：

**1. 直接嵌套：**

```javascript
const name = 'World'
const greeting = `Hello ${`${name.toUpperCase()}`}!`
console.log(greeting) // "Hello WORLD!"
```

**2. 使用函数返回模板字符串：**

```javascript
function emphasize(text) {
  return `**${text}**`
}

const name = 'World'
const greeting = `Hello ${emphasize(name)}!`
console.log(greeting) // "Hello **World**!"
```

**3. 条件嵌套：**

```javascript
const isAdmin = true
const username = 'Alice'
const greeting = `Welcome ${isAdmin ? `Admin ${username}` : username}!`
```

嵌套模板字符串在构建复杂模板时非常有用，但过度嵌套会降低可读性，应适度使用。

### 10. 标签模板函数的参数是什么，如何处理这些参数？

**参考答案**：
标签模板函数接收以下参数：

**1. 第一个参数 (strings)：**

- 类型：字符串数组
- 内容：由插值表达式分割的静态字符串部分
- 特性：该数组有一个额外的`raw`属性，包含未处理的原始字符串

**2. 后续参数：**

- 所有插值表达式的计算结果，按顺序传入

示例：

```javascript
function tag(strings, ...values) {
  console.log(strings) // ["Hello, ", "! You are ", " years old."]
  console.log(strings.raw) // 同上，但转义字符不被处理
  console.log(values) // ["John", 30]

  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || '')
  }, '')
}

const name = 'John'
const age = 30
const result = tag`Hello, ${name}! You are ${age} years old.`
```

处理这些参数的常见模式：

1. **拼接处理**：使用 reduce 组合 strings 和 values
2. **转换处理**：在拼接前转换 values（如 HTML 转义）
3. **条件处理**：根据 values 内容选择不同处理逻辑
4. **结构化处理**：将结果转换为对象或其他结构化数据

标签函数强大之处在于它可以完全控制模板的处理逻辑，不仅限于生成字符串。
