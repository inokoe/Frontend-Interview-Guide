# 扩展运算符与 Rest 参数

## 背景介绍

扩展运算符（Spread Operator）和 Rest 参数是 ES6（ECMAScript 2015）引入的强大特性，它们使用相同的 `...` 语法但在不同上下文中起不同作用。扩展运算符将可迭代对象展开为单独的元素，而 Rest 参数则将多个元素收集为数组。这两个特性大大简化了数组和对象操作，使代码更简洁、更易读，已成为现代 JavaScript 开发的基础工具。

## 扩展运算符 (...)

扩展运算符可以将一个可迭代对象（如数组、字符串等）展开为独立的值。

### 1. 数组展开

```javascript
// 数组复制
const original = [1, 2, 3]
const copy = [...original]
console.log(copy) // [1, 2, 3]

// 合并数组
const arr1 = [1, 2]
const arr2 = [3, 4]
const combined = [...arr1, ...arr2]
console.log(combined) // [1, 2, 3, 4]

// 将字符串转为数组
const str = 'hello'
const chars = [...str]
console.log(chars) // ['h', 'e', 'l', 'l', 'o']
```

### 2. 对象展开

ES2018 进一步扩展了扩展运算符，支持在对象字面量中使用。

```javascript
// 对象复制
const original = { x: 1, y: 2 }
const copy = { ...original }
console.log(copy) // { x: 1, y: 2 }

// 合并对象
const obj1 = { a: 1, b: 2 }
const obj2 = { c: 3, d: 4 }
const merged = { ...obj1, ...obj2 }
console.log(merged) // { a: 1, b: 2, c: 3, d: 4 }

// 覆盖属性
const base = { a: 1, b: 2 }
const extended = { ...base, b: 3 }
console.log(extended) // { a: 1, b: 3 }
```

### 3. 常见应用场景

1. **数组操作**

```javascript
// 数组拷贝
const arr = [1, 2, 3]
const copy = [...arr]

// 合并数组
const merged = [...arr1, ...arr2]

// 将类数组转为数组
const nodeList = document.querySelectorAll('div')
const divArray = [...nodeList]

// 数组解构与扩展结合
const [first, ...rest] = [1, 2, 3, 4]
```

2. **函数参数传递**

```javascript
const numbers = [1, 2, 3]
console.log(Math.max(...numbers)) // 3

function sum(x, y, z) {
  return x + y + z
}
console.log(sum(...numbers)) // 6
```

3. **DOM 操作**

```javascript
// 添加多个子元素
const div = document.createElement('div')
const children = [
  document.createElement('p'),
  document.createElement('span'),
  document.createElement('a'),
]
div.append(...children)
```

## Rest 参数

Rest 参数语法允许将不定数量的参数表示为一个数组，与扩展运算符相反，它是将多个元素收集为一个整体。

### 1. 函数参数中的应用

```javascript
// 收集剩余参数
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0)
}
console.log(sum(1, 2, 3, 4)) // 10

// 结合普通参数
function printInfo(name, age, ...hobbies) {
  console.log(`${name} is ${age} years old`)
  console.log(`Hobbies: ${hobbies.join(', ')}`)
}
printInfo('John', 30, 'reading', 'gaming', 'swimming')
```

### 2. 与解构赋值结合

```javascript
// 数组解构中的rest
const [first, second, ...rest] = [1, 2, 3, 4, 5]
console.log(first) // 1
console.log(second) // 2
console.log(rest) // [3, 4, 5]

// 对象解构中的rest
const { name, age, ...others } = {
  name: 'John',
  age: 30,
  city: 'New York',
  country: 'USA',
}
console.log(others) // { city: 'New York', country: 'USA' }
```

### 3. 实际开发中的使用场景

1. **函数参数处理**

```javascript
// React组件属性传递
function Button({ children, ...props }) {
  return <button {...props}>{children}</button>
}

// 事件处理器
function handleEvent(...args) {
  // 所有参数都会被收集到args数组中
  console.log(args)
}
```

2. **对象操作**

```javascript
// 排除特定属性
const { password, token, ...safeUser } = user
// 发送到客户端的安全数据
console.log(safeUser)
```

3. **数组操作**

```javascript
// 取数组的头部和尾部
const [head, ...tail] = [1, 2, 3, 4]
console.log(head) // 1
console.log(tail) // [2, 3, 4]

// 递归处理数组
function processItems([first, ...rest]) {
  if (!first) return
  console.log(first)
  if (rest.length) processItems(rest)
}
```

## 扩展运算符与 Rest 参数的区别

虽然它们使用相同的语法 `...`，但作用完全相反：

- **扩展运算符**：将一个整体展开为多个元素 (`[1,2,3]` → `1,2,3`)
- **Rest 参数**：将多个元素收集为一个整体 (`1,2,3` → `[1,2,3]`)

## 最佳实践

1. **扩展运算符使用建议**

   - 优先用于浅拷贝，但需注意它只是一级深拷贝
   - 考虑性能开销，特别是大型数组或对象时
   - 避免过度嵌套使用，可能导致代码难以理解
   - 合理使用对象属性覆盖顺序

2. **Rest 参数使用建议**
   - 始终将 Rest 参数放在参数列表最后
   - 优先使用 Rest 参数而非 arguments 对象
   - 在解构赋值中使用 Rest 提高代码可读性
   - 在函数设计中合理使用，增强函数的灵活性

## 面试常见问题

1. **扩展运算符和 Rest 参数的区别是什么？**

   - 扩展运算符将数组/对象展开，Rest 参数将多个元素收集为数组

2. **如何实现对象的深拷贝？**

   - 扩展运算符只能实现浅拷贝，深拷贝可使用`JSON.parse(JSON.stringify())`或 lodash 的`_.cloneDeep()`

3. **Rest 参数和 arguments 对象的区别？**

   - Rest 是真正的数组，而 arguments 是类数组对象
   - Rest 参数只包含未命名的参数，arguments 包含所有参数
   - 箭头函数没有 arguments，但可以使用 Rest 参数

4. **扩展运算符的性能考虑？**

   - 对大型数据结构使用时可能影响性能
   - 多层嵌套使用时会增加内存消耗

5. **什么情况下不应该使用扩展运算符？**

   - 处理非常大的数组时
   - 需要深拷贝复杂嵌套对象时
   - 性能关键的循环内部

6. **如何使用扩展运算符合并对象并处理重复属性？**

   - 后面的对象属性会覆盖前面的同名属性：`{ ...obj1, ...obj2 }`
   - 可以通过排序来控制属性优先级：`{ ...defaults, ...userConfig }`

7. **Rest 参数在箭头函数中的使用注意事项？**
   - 箭头函数没有 arguments 对象，使用 Rest 参数是唯一选择
   - 结合解构使用可提高代码可读性：`const sum = (...nums) => nums.reduce((a, b) => a + b, 0)`
