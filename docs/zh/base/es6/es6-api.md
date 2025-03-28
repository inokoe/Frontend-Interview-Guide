# ES6 新增 API 方法

## 背景介绍

ECMAScript 6（简称 ES6）于 2015 年发布，带来了 JavaScript 语言的重大更新。ES6 引入了众多新特性和 API 方法，使 JavaScript 代码更加简洁、高效和易于维护。这些新增 API 极大地简化了开发流程，提高了代码质量，成为现代 JavaScript 开发的基础。

## 数组方法

### 1. Array.from()

```javascript
// 类数组转数组
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
const arr = Array.from(arrayLike)
console.log(arr) // ['a', 'b', 'c']

// 带映射功能
const numbers = Array.from([1, 2, 3], x => x * 2)
console.log(numbers) // [2, 4, 6]

// Set转数组
const set = new Set(['a', 'b', 'c'])
const arrFromSet = Array.from(set)
console.log(arrFromSet) // ['a', 'b', 'c']
```

### 2. Array.of()

```javascript
// 创建数组
const arr1 = Array.of(7)
console.log(arr1) // [7]

const arr2 = Array.of(1, 2, 3)
console.log(arr2) // [1, 2, 3]

// 对比Array构造函数
const arr3 = new Array(7)
console.log(arr3) // [empty × 7]
```

### 3. find/findIndex

```javascript
const numbers = [1, 2, 3, 4, 5]

// find
const found = numbers.find(num => num > 3)
console.log(found) // 4

// findIndex
const foundIndex = numbers.findIndex(num => num > 3)
console.log(foundIndex) // 3

// 找不到时的返回值
const notFound = numbers.find(num => num > 10)
console.log(notFound) // undefined

const notFoundIndex = numbers.findIndex(num => num > 10)
console.log(notFoundIndex) // -1
```

### 4. includes

```javascript
const array = [1, 2, 3, NaN]

// 基本使用
console.log(array.includes(2)) // true
console.log(array.includes(4)) // false

// 从指定位置开始查找
console.log(array.includes(1, 1)) // false

// 可以查找NaN
console.log(array.includes(NaN)) // true
```

### 5. flat/flatMap

```javascript
// flat
const nested = [1, [2, 3], [4, [5, 6]]]
console.log(nested.flat()) // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2)) // [1, 2, 3, 4, 5, 6]

// flatMap
const sentences = ['Hello world', 'Good morning']
const words = sentences.flatMap(s => s.split(' '))
console.log(words) // ['Hello', 'world', 'Good', 'morning']
```

## 对象方法

### 1. Object.assign()

```javascript
// 对象合并
const target = { a: 1 }
const source1 = { b: 2 }
const source2 = { c: 3 }
const result = Object.assign(target, source1, source2)
console.log(result) // { a: 1, b: 2, c: 3 }

// 浅拷贝
const original = { a: 1, b: { c: 2 } }
const copy = Object.assign({}, original)
console.log(copy) // { a: 1, b: { c: 2 } }
```

### 2. Object.keys/values/entries

```javascript
const obj = { a: 1, b: 2, c: 3 }

// Object.keys()
console.log(Object.keys(obj)) // ['a', 'b', 'c']

// Object.values()
console.log(Object.values(obj)) // [1, 2, 3]

// Object.entries()
console.log(Object.entries(obj)) // [['a', 1], ['b', 2], ['c', 3]]

// 实际应用
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`)
})
```

### 3. Object.getOwnPropertyDescriptors()

```javascript
const obj = {
  get foo() {
    return 'foo'
  },
}

// 获取完整的属性描述符
console.log(Object.getOwnPropertyDescriptors(obj))
// {
//   foo: {
//     get: [Function: get foo],
//     set: undefined,
//     enumerable: true,
//     configurable: true
//   }
// }

// 创建带有getter/setter的对象副本
const clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))
```

## 字符串方法

### 1. includes/startsWith/endsWith

```javascript
const str = 'Hello world'

// includes
console.log(str.includes('world')) // true
console.log(str.includes('World')) // false

// startsWith
console.log(str.startsWith('Hello')) // true
console.log(str.startsWith('hello')) // false

// endsWith
console.log(str.endsWith('world')) // true
console.log(str.endsWith('World')) // false
```

### 2. padStart/padEnd

```javascript
// 补全字符串长度
console.log('1'.padStart(3, '0')) // '001'
console.log('1'.padEnd(3, '0')) // '100'

// 常见应用：格式化日期
const month = '5'
const day = '3'
const formattedDate = `${month.padStart(2, '0')}/${day.padStart(2, '0')}` // "05/03"
```

### 3. repeat

```javascript
// 重复字符串
console.log('ha'.repeat(3)) // 'hahaha'

// 实际应用：生成缩进
function indent(level) {
  return ' '.repeat(level * 2)
}
```

## 实际应用场景

### 1. 数据处理

```javascript
// 数组去重
const unique = Array.from(new Set([1, 1, 2, 2, 3]))

// 数据转换
const prices = Object.entries(data).map(([key, value]) => ({
  item: key,
  price: value,
}))
```

### 2. 字符串处理

```javascript
// 格式化显示
function formatNumber(num) {
  return String(num).padStart(6, '0')
}

// 检查文件类型
function isImageFile(filename) {
  return filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.png')
}
```

### 3. 对象操作

```javascript
// 配置合并
const defaultConfig = { timeout: 1000, retry: 3 }
const userConfig = { timeout: 2000 }
const config = Object.assign({}, defaultConfig, userConfig)
```

## 最佳实践

1. **数组方法使用建议**

   - 优先使用新方法代替传统实现
   - 注意方法的返回值和副作用
   - 合理使用链式调用

2. **对象方法使用建议**

   - 使用 Object.assign 进行浅拷贝
   - 使用 entries 进行对象遍历
   - 注意属性描述符的处理

3. **字符串方法使用建议**
   - 使用新方法提高代码可读性
   - 注意大小写敏感性
   - 合理使用字符串填充功能

## 面试常见问题及参考答案

1. **Array.from 和扩展运算符的区别是什么？**

   参考答案：Array.from 和扩展运算符（...）都可以将类数组对象或可迭代对象转换为数组，但有以下区别：

   - Array.from 可以接受第二个参数(映射函数)，类似于 map 功能
   - Array.from 能处理的范围更广，可以处理有 length 属性的普通对象
   - 扩展运算符只能处理可迭代对象(实现了 Iterator 接口)
   - 性能上，一般来说扩展运算符在处理可迭代对象时略快

2. **Object.assign 实现深拷贝需要注意什么？**

   参考答案：Object.assign 本身只实现浅拷贝，要实现深拷贝需注意：

   - Object.assign 只会复制属性值，如果属性是对象引用，只会复制引用而非对象本身
   - 要实现深拷贝，可以递归处理嵌套对象
   - 可以使用 JSON.parse(JSON.stringify(obj)) 简单实现深拷贝，但这种方法不能处理函数、循环引用、特殊对象(如 Date、RegExp)等
   - 更复杂场景应使用专门的深拷贝库，如 lodash 的\_.cloneDeep()方法

3. **如何判断一个值在数组中的存在？includes 和 indexOf 的区别？**

   参考答案：判断值是否在数组中存在的方法有：

   - includes：返回布尔值，能正确处理 NaN
   - indexOf：返回索引或-1，不能处理 NaN
   - some：可以用自定义条件判断

   主要区别：

   - includes 语义更清晰，直接返回 true/false
   - includes 可以查找 NaN，而 indexOf 不能
   - indexOf 可以精确知道元素位置，includes 不能
   - 对于大型数组，性能基本相当

4. **flat 和 flatMap 的使用场景是什么？**

   参考答案：

   - flat 适用于：

     - 扁平化嵌套数组结构
     - 清理数组中的空项(holes)
     - 可以指定扁平化深度

   - flatMap 适用于：
     - 处理需要先映射（map）再扁平化的场景
     - 文本处理，如分词、过滤空值
     - 替代常见的 map 后 flat 的链式调用，提高性能
     - 生成一对多的数据映射

5. **Object.entries 的实际应用有哪些？**

   参考答案：Object.entries 的实际应用包括：

   - 遍历对象键值，比 Object.keys 更直接
   - 将对象转换为 Map: `new Map(Object.entries(obj))`
   - 对象的序列化和转换
   - 实现对象的过滤和转换，如创建新对象时筛选特定属性
   - 对象排序：先转 entries，排序后再转回对象

6. **新增的字符串方法有什么优势？**

   参考答案：ES6 新增字符串方法的优势：

   - 语义化更强：如 includes 比 indexOf 返回-1 更直观
   - 功能更专一：startsWith/endsWith 替代 indexOf+复杂判断
   - 简化常见操作：padStart/padEnd 处理格式化，repeat 处理重复
   - 提高代码可读性：减少了冗长的条件判断和手动实现
   - 性能优化：原生方法通常比自定义实现更高效

7. **如何选择合适的 API 方法？**

   参考答案：选择合适的 API 方法应考虑：

   - 功能需求：优先选择专为特定功能设计的 API
   - 语义清晰度：选择能表达代码意图的方法
   - 浏览器兼容性：考虑目标环境是否支持，是否需要 polyfill
   - 性能因素：在性能关键场景，选择最优性能的方法
   - 代码一致性：保持项目中 API 使用的一致风格
   - 团队熟悉度：考虑团队对 API 的理解程度
