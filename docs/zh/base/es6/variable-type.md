# JavaScript 数据类型

JavaScript 有七种基本数据类型：Number、String、Boolean、Null、Undefined、Symbol 和 BigInt。

## 原始数据类型 (Primitive Types)

### Number 类型

#### 1. 基本概念

```javascript
// 整数和浮点数
const int = 42
const float = 42.42
const scientific = 3e8 // 科学计数法: 3 * 10^8

// 特殊值
const infinity = Infinity
const negInfinity = -Infinity
const notANumber = NaN

// 数值范围
console.log(Number.MAX_VALUE) // 最大值
console.log(Number.MIN_VALUE) // 最小正值
```

#### 2. 数值方法

```javascript
// 转换方法
const num = 42.567
console.log(num.toString()) // "42.567"
console.log(num.toFixed(2)) // "42.57" - 保留两位小数

// 判断方法
console.log(Number.isInteger(42)) // true
console.log(Number.isNaN(NaN)) // true
console.log(Number.isFinite(Infinity)) // false
```

#### 3. 常见问题

```javascript
// 精度问题
console.log(0.1 + 0.2) // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3) // false

// 解决方法
console.log(Math.round((0.1 + 0.2) * 1000) / 1000) // 0.3
console.log(Number((0.1 + 0.2).toFixed(10)) === 0.3) // true
```

### String 类型

#### 1. 基本概念

```javascript
// 字符串创建
const str1 = 'Hello'
const str2 = 'World'
const str3 = `Template String`

// 字符串拼接
const greeting = str1 + ' ' + str2 // "Hello World"
const template = `${str1} ${str2}` // "Hello World"
```

#### 2. 常用方法

```javascript
const str = 'JavaScript'

// 获取信息
console.log(str.length) // 10
console.log(str.charAt(0)) // "J"
console.log(str[0]) // "J"

// 检索方法
console.log(str.indexOf('Script')) // 4
console.log(str.includes('Java')) // true

// 操作方法
console.log(str.substring(0, 4)) // "Java"
console.log(str.slice(4)) // "Script"
console.log(str.replace('Java', 'Type')) // "TypeScript"
console.log(str.split('a')) // ["J", "v", "Script"]
```

#### 3. 实用技巧

```javascript
// 去除空白
const text = '  trim me  '
console.log(text.trim()) // "trim me"

// 大小写转换
console.log('hello'.toUpperCase()) // "HELLO"
console.log('WORLD'.toLowerCase()) // "world"

// 模板字符串换行
const multiLine = `line 1
line 2`
console.log(multiLine) // 包含换行的字符串
```

### Boolean 类型

#### 1. 基本概念

```javascript
// 创建布尔值
const isTrue = true
const isFalse = false

// 布尔运算
console.log(true && false) // false
console.log(true || false) // true
console.log(!true) // false
```

#### 2. 类型转换

```javascript
// truthy 值和 falsy 值
console.log(Boolean(0)) // false
console.log(Boolean('')) // false
console.log(Boolean(null)) // false
console.log(Boolean(undefined)) // false
console.log(Boolean(NaN)) // false

console.log(Boolean(1)) // true
console.log(Boolean('hello')) // true
console.log(Boolean({})) // true
console.log(Boolean([])) // true
```

#### 3. 条件判断

```javascript
// 短路求值
const a = undefined
const b = a || 'default' // "default"

// 条件表达式
const result = isTrue ? 'Yes' : 'No' // "Yes"

// 空值合并运算符 (??)
const value = null
const defaultValue = value ?? 'default' // "default"
```

### Null 和 Undefined 类型

#### 1. 基本概念

```javascript
// undefined - 变量未赋值
let unassigned
console.log(unassigned) // undefined

// null - 明确的空值
const empty = null
```

#### 2. 区别与应用

```javascript
// 类型比较
console.log(typeof undefined) // "undefined"
console.log(typeof null) // "object" (这是JavaScript的一个历史遗留bug)

// 相等性比较
console.log(null == undefined) // true (宽松相等)
console.log(null === undefined) // false (严格相等)

// 实际应用
function getUser(id) {
  // 用户不存在返回null，表示明确的"没有"
  return id === 1 ? { name: 'John' } : null
}

function getAttribute(obj, key) {
  // 属性不存在返回undefined
  return obj ? obj[key] : undefined
}
```

### BigInt 类型

#### 1. 基本概念

```javascript
// 创建BigInt
const bigInt1 = 9007199254740991n // 使用n后缀
const bigInt2 = BigInt(9007199254740991)

// 超出Number.MAX_SAFE_INTEGER的安全计算
console.log(9007199254740991n + 1n) // 9007199254740992n
```

#### 2. 操作和限制

```javascript
// 运算
console.log(10n + 20n) // 30n
console.log(10n * 20n) // 200n

// 与Number的区别
console.log(typeof 10n) // "bigint"
console.log(10n === 10) // false
console.log(10n == 10) // true

// 限制
// 不能与Number混合运算
// console.log(10n + 10) // TypeError
console.log(10n + BigInt(10)) // 20n

// 不能用于Math对象方法
// Math.max(10n, 5n) // TypeError
```

### Symbol 类型

#### 1. 基本语法

```javascript
// 创建Symbol
const s1 = Symbol()
const s2 = Symbol('description')
console.log(s1 === s2) // false

// Symbol是唯一的
const sym1 = Symbol('foo')
const sym2 = Symbol('foo')
console.log(sym1 === sym2) // false
```

#### 2. 主要用途

1. **防止属性名冲突**

```javascript
const name = Symbol('name')
const person = {
  [name]: 'John',
  age: 30,
}
console.log(person[name]) // 'John'
```

2. **私有属性模拟**

```javascript
const privateField = Symbol('private')
class MyClass {
  constructor() {
    this[privateField] = 'secret'
  }

  getPrivate() {
    return this[privateField]
  }
}
```

#### 3. Symbol 作为对象属性的特点

```javascript
const mySymbol = Symbol('mySymbol')
const obj = {
  [mySymbol]: 'value',
}

// Symbol属性不会出现在常规的属性枚举中
console.log(Object.keys(obj)) // []
console.log(Object.getOwnPropertyNames(obj)) // []

// 获取Symbol属性
console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(mySymbol)]
```

#### 4. Symbol.for() 和 Symbol.keyFor()

```javascript
// 使用Symbol.for()创建共享的Symbol
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2) // true

// 获取Symbol的key
const globalSymbol = Symbol.for('foo')
console.log(Symbol.keyFor(globalSymbol)) // 'foo'

const localSymbol = Symbol('foo')
console.log(Symbol.keyFor(localSymbol)) // undefined
```

#### 5. 内置 Symbol 值

```javascript
// Symbol.iterator
const myArray = [1, 2, 3]
const iterator = myArray[Symbol.iterator]()
console.log(iterator.next()) // { value: 1, done: false }

// Symbol.hasInstance
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance)
  }
}
console.log([] instanceof MyArray) // true

// Symbol.toPrimitive
const obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 42
      case 'string':
        return 'hello'
      default:
        return 'default'
    }
  },
}
console.log(+obj) // 42
console.log(`${obj}`) // 'hello'
```

## 数据类型检测与转换

### 1. 类型检测方法

```javascript
// typeof 操作符
console.log(typeof 42) // "number"
console.log(typeof 'hello') // "string"
console.log(typeof true) // "boolean"
console.log(typeof undefined) // "undefined"
console.log(typeof Symbol()) // "symbol"
console.log(typeof 42n) // "bigint"

// typeof 的问题
console.log(typeof null) // "object" - 历史遗留bug
console.log(typeof []) // "object" - 无法区分数组和普通对象

// instanceof 操作符
console.log([] instanceof Array) // true
console.log({} instanceof Object) // true

// Object.prototype.toString
console.log(Object.prototype.toString.call(42)) // "[object Number]"
console.log(Object.prototype.toString.call([])) // "[object Array]"
console.log(Object.prototype.toString.call(null)) // "[object Null]"
```

### 2. 类型转换

```javascript
// 字符串转换
console.log(String(42)) // "42"
console.log(String(true)) // "true"
console.log(String(null)) // "null"
console.log(String(undefined)) // "undefined"
console.log(String(Symbol('sym'))) // "Symbol(sym)"

// 数值转换
console.log(Number('42')) // 42
console.log(Number('42px')) // NaN
console.log(Number(true)) // 1
console.log(Number(false)) // 0
console.log(Number(null)) // 0
console.log(Number(undefined)) // NaN

// 布尔转换
console.log(Boolean(42)) // true
console.log(Boolean(0)) // false
console.log(Boolean('hello')) // true
console.log(Boolean('')) // false
console.log(Boolean(null)) // false
```

## 数据类型的最佳实践

### 1. 类型安全

```javascript
// 使用严格相等
if (value === undefined) {
  /* ... */
}

// 避免隐式类型转换
let value = '42'
let num = Number(value) // 明确转换而不是 +value

// 空值检查
const safeDivide = (a, b) => {
  if (b === 0 || b === null || b === undefined) {
    return Infinity // 或抛出错误
  }
  return a / b
}
```

### 2. 性能考虑

```javascript
// 字符串拼接
let result = ''
// 使用数组join而不是+=操作符
const items = ['a', 'b', 'c']
result = items.join('') // 比循环+=效率高

// 数值计算
// 使用整数运算而非浮点数（如果可能）
const price = 10.0 // 存储为整数cents: 1000
```

### 3. 特定类型使用建议

```javascript
// Symbol
// 用于私有或特殊属性
const _id = Symbol('id')

// BigInt
// 处理大整数时使用
const largeNumber = BigInt(Number.MAX_SAFE_INTEGER) + 1n

// 字符串模板
// 复杂字符串拼接时使用
const html = `
  <div>
    <h1>${title}</h1>
    <p>${content}</p>
  </div>
`
```

## 面试常见问题

1. JavaScript 的基本数据类型有哪些？它们有什么特点？

JavaScript 有七种基本数据类型：Number、String、Boolean、Null、Undefined、Symbol 和 BigInt。

```javascript
// Number：表示整数和浮点数
const num = 42.5

// String：表示文本数据
const str = 'Hello'

// Boolean：表示逻辑值
const bool = true

// Null：表示空值
const empty = null

// Undefined：表示未赋值
let unassigned

// Symbol：表示唯一标识符
const sym = Symbol('description')

// BigInt：表示任意精度整数
const bigInt = 9007199254740991n
```

2. null 和 undefined 的区别是什么？

```javascript
// undefined：变量声明但未赋值
let variable
console.log(variable) // undefined

// null：明确表示"没有值"或"空值"
let emptyValue = null

// 类型比较
console.log(typeof undefined) // "undefined"
console.log(typeof null) // "object" (JavaScript的历史遗留bug)

// 相等性比较
console.log(null == undefined) // true (宽松相等)
console.log(null === undefined) // false (严格相等)

// 使用场景
// undefined：函数参数未提供、对象属性不存在
// null：表示预期有值但目前没有
```

3. 如何解决 JavaScript 中的浮点数精度问题？

```javascript
// 浮点数精度问题示例
console.log(0.1 + 0.2) // 输出 0.30000000000000004
console.log(0.1 + 0.2 === 0.3) // false

// 解决方法1：使用toFixed()并转回数字
const result1 = Number((0.1 + 0.2).toFixed(10))
console.log(result1 === 0.3) // true

// 解决方法2：使用Math.round和乘除法
const result2 = Math.round((0.1 + 0.2) * 1000) / 1000
console.log(result2) // 0.3

// 解决方法3：使用整数计算（金融场景常用）
const cents1 = 10 // 表示0.1元
const cents2 = 20 // 表示0.2元
const totalCents = cents1 + cents2 // 30
const dollars = totalCents / 100 // 0.3
```

4. 如何准确判断 JavaScript 中的数据类型？

```javascript
// typeof操作符 - 适用于基本类型
console.log(typeof 42) // "number"
console.log(typeof 'hello') // "string"
console.log(typeof true) // "boolean"
console.log(typeof undefined) // "undefined"
console.log(typeof Symbol()) // "symbol"
console.log(typeof 10n) // "bigint"

// typeof的局限性
console.log(typeof null) // "object" - 错误结果
console.log(typeof []) // "object" - 无法识别数组

// instanceof - 检查原型链
console.log([] instanceof Array) // true
console.log({} instanceof Object) // true

// Object.prototype.toString - 最可靠的方法
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
console.log(getType(42)) // "Number"
console.log(getType([])) // "Array"
console.log(getType(null)) // "Null"
console.log(getType(undefined)) // "Undefined"
```

5. Symbol 类型的主要用途是什么？

```javascript
// 1. 创建唯一标识符，防止属性名冲突
const id = Symbol('id')
const user = {
  name: 'Alice',
  [id]: 12345, // 使用Symbol作为属性键
}

// 2. 实现"私有"属性
const _password = Symbol('password')
class User {
  constructor(name, pwd) {
    this.name = name
    this[_password] = pwd // 相对"私有"
  }

  validatePassword(pwd) {
    return this[_password] === pwd
  }
}

// 3. 定义对象的特殊行为
const myObj = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  },
}
// 现在myObj可以在for...of循环中使用
for (const item of myObj) {
  console.log(item) // 依次输出1, 2, 3
}
```

6. BigInt 解决了什么问题？何时使用它？

```javascript
// BigInt解决了Number类型无法准确表示超过2^53-1的整数问题
console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991

// 大数问题示例
console.log(9007199254740991 + 1) // 9007199254740992 - 正确
console.log(9007199254740991 + 2) // 9007199254740992 - 错误!

// 使用BigInt可以准确表示任意大的整数
console.log(9007199254740991n + 1n) // 9007199254740992n
console.log(9007199254740991n + 2n) // 9007199254740993n

// 适用场景:
// 1. 处理非常大的整数(如加密、时间戳微秒级)
const timestamp = 1632405964125364789n

// 2. 高精度计算
const calculation = 9007199254740991n * 9007199254740991n

// 注意: BigInt不能与Number混合运算
// console.log(1n + 1); // TypeError
console.log(1n + BigInt(1)) // 2n
```

7. JavaScript 中的类型转换规则是什么？

```javascript
// 显式转换(强制类型转换)
console.log(String(42)) // "42"
console.log(Number('42')) // 42
console.log(Boolean(1)) // true

// 隐式转换(自动类型转换)
// 字符串转换: 当+运算符有一个操作数是字符串
console.log(42 + '1') // "421" (数字被转为字符串)

// 数值转换: 大多数数学运算符会将操作数转为数字
console.log('42' - 1) // 41 (字符串被转为数字)
console.log('42' * 2) // 84 (字符串被转为数字)

// 布尔转换: 条件上下文中会转为布尔值
console.log(!0) // true (0转为false，再取反)
console.log(!!{}) // true (对象转为true)

// 特殊情况
console.log(1 + '2' + 3) // "123" (从左到右计算)
console.log(1 + +'2' + 3) // 6 (括号内+"2"转为数字)
```

8. truthy 和 falsy 值在 JavaScript 中是什么？

```javascript
// falsy值 - 在布尔上下文中转换为false的值:
console.log(Boolean(false)) // false
console.log(Boolean(0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(0n)) // false
console.log(Boolean('')) // false
console.log(Boolean(null)) // false
console.log(Boolean(undefined)) // false
console.log(Boolean(NaN)) // false

// truthy值 - 在布尔上下文中转换为true的值:
console.log(Boolean(true)) // true
console.log(Boolean(42)) // true
console.log(Boolean('hello')) // true
console.log(Boolean({})) // true
console.log(Boolean([])) // true
console.log(Boolean(function () {})) // true

// 实际应用场景
// 1. 条件判断
const name = ''
if (name) {
  // 当name为非空字符串时执行
}

// 2. 默认值设置
const value = userInput || '默认值' // 短路求值
const safeValue = userInput ?? '默认值' // 空值合并
```

9. 如何处理字符串中的国际化和 Unicode 问题？

```javascript
// 1. Unicode转义序列
const heart = '\u2764' // ❤
console.log(heart)

// 2. 处理emoji和复合字符
const flag = '🇨🇳' // 中国国旗 (由两个代码点组成)
console.log(flag.length) // 2 (JavaScript以UTF-16编码计算长度)

// 3. 正确计算字符数量
function getStringLength(str) {
  return [...str].length // 使用扩展运算符迭代码位
}
console.log(getStringLength('🇨🇳')) // 1

// 4. 国际化API (Intl)
// 日期格式化
const date = new Date()
console.log(new Intl.DateTimeFormat('zh-CN').format(date)) // 中文日期格式

// 数字格式化
const number = 123456.789
console.log(new Intl.NumberFormat('zh-CN').format(number)) // 中文数字格式

// 字符串比较 (考虑语言规则)
const collator = new Intl.Collator('zh-CN')
console.log(collator.compare('a', 'b')) // -1 (a在b前面)
```

10. typeof null 返回什么？为什么？

```javascript
console.log(typeof null) // "object"

// 这是JavaScript的一个历史遗留bug
// 在JavaScript初始版本中，值在底层存储为32位值
// 其中前3位表示数据类型标签:
// 000: 对象
// 001: 整数
// 010: 浮点数
// 100: 字符串
// 110: 布尔值

// null的表示方式是机器码的空指针，即全是0
// 因此被错误地判定为对象类型(前3位是000)

// 正确检测null的方法
function isNull(value) {
  return value === null
}

// 或使用Object.prototype.toString
console.log(Object.prototype.toString.call(null)) // "[object Null]"
```
