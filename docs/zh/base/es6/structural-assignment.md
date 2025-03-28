# 解构赋值

## 概述

解构赋值是 ES6 引入的一种语法，允许我们从数组或对象中提取值并赋给变量，简化代码并提高可读性。

## 数组解构

### 基本用法

```javascript
// 基本语法
const [a, b, c] = [1, 2, 3]
console.log(a, b, c) // 1 2 3

// 跳过元素
const [a, , c] = [1, 2, 3]
console.log(a, c) // 1 3

// 设置默认值
const [a = 1, b = 2] = []
console.log(a, b) // 1 2

// 默认值生效条件
const [a = 1] = [undefined] // a = 1
const [b = 1] = [null] // b = null
```

### 嵌套数组解构

```javascript
// 多维数组解构
const [[a, b], [c, d]] = [
  [1, 2],
  [3, 4],
]
console.log(a, b, c, d) // 1 2 3 4

// 混合解构
const [a, [b, c]] = [1, [2, 3]]
console.log(a, b, c) // 1 2 3
```

## 对象解构

### 基本语法

```javascript
// 基本用法
const { name, age } = { name: 'John', age: 30 }
console.log(name, age) // 'John' 30

// 变量重命名
const { name: userName, age: userAge } = { name: 'John', age: 30 }
console.log(userName, userAge) // 'John' 30

// 设置默认值
const { a = 10, b = 20 } = { a: 3 }
console.log(a, b) // 3 20

// 重命名并设置默认值
const { x: a = 1, y: b = 2 } = {}
console.log(a, b) // 1 2
```

### 深层解构

```javascript
// 嵌套对象解构
const user = {
  name: 'John',
  address: {
    city: 'New York',
    street: '5th Avenue',
  },
}

const {
  address: { city, street },
} = user
console.log(city, street) // 'New York' '5th Avenue'

// 安全的深层解构
const deepObj = { a: { b: { c: 1 } } }

// 使用默认值防止报错
const { a: { b: { c } = {} } = {} } = deepObj
console.log(c) // 1

// 使用可选链操作符
const c = deepObj?.a?.b?.c
```

## 实际应用场景

### 函数参数解构

```javascript
// 对象参数解构
function printUserInfo({ name, age, address: { city } = {} } = {}) {
  console.log(`${name}, ${age}, ${city}`)
}

printUserInfo({
  name: 'John',
  age: 30,
  address: { city: 'New York' },
})

// 设置参数默认值
function fetchData({ url, method = 'GET', headers = {} } = {}) {
  // ...
}
```

### 交换变量

```javascript
let x = 1,
  y = 2
;[x, y] = [y, x]
console.log(x, y) // 2 1
```

### 模块导入与返回值处理

```javascript
// 模块导入
import { useState, useEffect } from 'react'

// 处理函数返回值
function getCoordinates() {
  return { x: 100, y: 200 }
}
const { x, y } = getCoordinates()
```

## 注意事项与最佳实践

1. **使用默认值防止 undefined 错误**

   ```javascript
   const { data = [] } = response
   ```

2. **处理可能的空值**

   ```javascript
   const { user: { settings } = {} } = data
   ```

3. **使用 rest 操作符收集剩余元素**

   ```javascript
   const [first, ...rest] = [1, 2, 3, 4]
   console.log(first, rest) // 1 [2, 3, 4]

   const { name, ...others } = { name: 'John', age: 30, city: 'New York' }
   console.log(name, others) // 'John' { age: 30, city: 'New York' }
   ```

4. **避免过度解构和嵌套过深**

## 面试常见问题

1. **数组解构和对象解构的区别是什么？**

   - 数组解构基于位置，对象解构基于属性名
   - 数组解构使用方括号语法，对象解构使用花括号语法

2. **如何处理解构时的默认值？**

   - 默认值使用`=`符号设置，只有在解构值为`undefined`时才会生效

3. **如何安全地解构深层嵌套的对象？**

   - 使用默认空对象：`const { a: { b } = {} } = obj;`
   - 使用可选链操作符：`const b = obj?.a?.b;`

4. **解构赋值支持哪些数据类型？**
   - 主要支持数组和对象
   - 也支持字符串、数字和布尔值，但应用较少
