# 基础手撕题

## 函数

### 防抖

防抖（Debounce）是一种优化技术，用于限制函数的执行频率。当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次。

```javascript
function debounce(fn, delay) {
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 使用示例
const handleInput = debounce(e => {
  console.log('输入内容：', e.target.value)
}, 500)
```

### 节流

节流（Throttle）也是一种优化技术，用于限制函数的执行频率。当持续触发事件时，保证一定时间段内只调用一次事件处理函数。

```javascript
function throttle(fn, delay) {
  let last = 0

  return function (...args) {
    const now = Date.now()

    if (now - last >= delay) {
      fn.apply(this, args)
      last = now
    }
  }
}

// 使用示例
const handleScroll = throttle(() => {
  console.log('滚动事件触发')
}, 200)
```

### 闭包

闭包（Closure）是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式是在一个函数内部创建另一个函数。

```javascript
function createCounter() {
  let count = 0

  return {
    increment() {
      count++
      return count
    },
    decrement() {
      count--
      return count
    },
    getCount() {
      return count
    },
  }
}

// 使用示例
const counter = createCounter()
console.log(counter.increment()) // 1
console.log(counter.increment()) // 2
console.log(counter.decrement()) // 1
```

### 函数柯里化

函数柯里化（Currying）是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs))
    }
  }
}

// 使用示例
function add(a, b, c) {
  return a + b + c
}

const curriedAdd = curry(add)
console.log(curriedAdd(1)(2)(3)) // 6
console.log(curriedAdd(1, 2)(3)) // 6
```

## 继承类型

### 原型链继承

原型链继承是 JavaScript 中最基本的继承方式，通过将子类的原型指向父类的实例来实现继承。

特点：

1. 子类可以访问父类的所有属性和方法
2. 父类原型上的属性和方法会被所有子类实例共享
3. 子类可以重写父类的方法

缺点：

1. 父类的引用类型属性会被所有子类实例共享
2. 子类无法向父类构造函数传参
3. 无法实现多继承

```javascript
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

// 使用示例
const child1 = new Child('小明', 18)
const child2 = new Child('小红', 20)
child1.colors.push('black')
console.log(child2.colors) // ['red', 'blue', 'green', 'black']
```

### 构造函数继承

构造函数继承通过在子类构造函数中调用父类构造函数来实现继承。

特点：

1. 子类可以向父类构造函数传参
2. 父类的引用类型属性不会被共享
3. 可以实现多继承

缺点：

1. 无法继承父类原型上的属性和方法
2. 每个子类实例都会创建父类方法的副本，造成内存浪费
3. 子类实例不是父类的实例

```javascript
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

// 使用示例
const child1 = new Child('小明', 18)
const child2 = new Child('小红', 20)
child1.colors.push('black')
console.log(child2.colors) // ['red', 'blue', 'green']
console.log(child1.sayName) // undefined
```

### 组合继承

组合继承结合了原型链继承和构造函数继承的优点，是最常用的继承方式。

特点：

1. 子类可以继承父类的实例属性和原型属性
2. 子类可以向父类构造函数传参
3. 父类的引用类型属性不会被共享
4. 子类实例是父类的实例

缺点：

1. 父类构造函数被调用了两次，造成性能浪费
2. 子类原型上会包含父类的所有实例属性，造成内存浪费

```javascript
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

// 使用示例
const child1 = new Child('小明', 18)
const child2 = new Child('小红', 20)
child1.colors.push('black')
console.log(child2.colors) // ['red', 'blue', 'green']
child1.sayName() // 小明
```

### 寄生继承

寄生继承是基于原型式继承的一种继承方式，通过创建一个仅用于封装继承过程的函数来实现。

特点：

1. 可以基于一个对象创建新对象，而不必创建自定义类型
2. 可以复用父类的所有属性和方法
3. 避免了创建不必要的构造函数

缺点：

1. 父类的引用类型属性会被所有子类实例共享
2. 无法实现函数复用
3. 子类实例不是父类的实例

```javascript
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function inheritPrototype(child, parent) {
  const prototype = createObject(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

inheritPrototype(Child, Parent)

// 使用示例
const child1 = new Child('小明', 18)
const child2 = new Child('小红', 20)
child1.colors.push('black')
console.log(child2.colors) // ['red', 'blue', 'green']
child1.sayName() // 小明
```

### 类继承

ES6 引入了 class 语法，使得继承的实现更加简洁和直观。

特点：

1. 语法简洁，易于理解
2. 支持静态方法和静态属性
3. 支持私有字段和方法（使用 # 前缀）
4. 支持 super 关键字调用父类方法
5. 支持 extends 关键字实现继承

缺点：

1. 不支持多继承
2. 类声明不会被提升
3. 类的方法都是不可枚举的
4. 类的构造函数必须使用 new 调用

```javascript
class Parent {
  constructor(name) {
    this.name = name
    this.colors = ['red', 'blue', 'green']
  }

  sayName() {
    console.log(this.name)
  }

  static create(name) {
    return new Parent(name)
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name)
    this.age = age
  }

  sayAge() {
    console.log(this.age)
  }
}

// 使用示例
const child = new Child('小明', 18)
child.sayName() // 小明
child.sayAge() // 18
console.log(child instanceof Parent) // true
```

## 拷贝

### 浅拷贝

浅拷贝只复制对象的第一层属性，对于引用类型的属性，仍然共享同一个引用。

```javascript
// 方法1：Object.assign
const obj1 = { a: 1, b: { c: 2 } }
const obj2 = Object.assign({}, obj1)

// 方法2：展开运算符
const obj3 = { ...obj1 }

// 方法3：手动实现
function shallowClone(obj) {
  const newObj = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 使用示例
const original = { a: 1, b: { c: 2 } }
const cloned = shallowClone(original)
console.log(cloned) // { a: 1, b: { c: 2 } }
cloned.b.c = 3
console.log(original.b.c) // 3
```

### 深拷贝

深拷贝会复制对象的所有层级，包括引用类型的属性，创建一个完全独立的副本。

```javascript
// 方法1：JSON.parse(JSON.stringify())
// 优点：简单快速
// 缺点：
// 1. 无法处理函数
// 2. 无法处理 undefined
// 3. 无法处理循环引用
// 4. 无法处理 Date、RegExp、Map、Set 等特殊对象
const obj1 = { a: 1, b: { c: 2 } }
const obj2 = JSON.parse(JSON.stringify(obj1))

// 方法2：手动实现（完整版）
function deepClone(obj) {
  // 使用 WeakMap 存储已拷贝的对象，解决循环引用问题
  const weakMap = new WeakMap()

  // 判断是否为基本类型
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理日期对象
  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  // 处理正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags)
  }

  // 处理 Map 对象
  if (obj instanceof Map) {
    const newMap = new Map()
    obj.forEach((value, key) => {
      newMap.set(key, deepClone(value))
    })
    return newMap
  }

  // 处理 Set 对象
  if (obj instanceof Set) {
    const newSet = new Set()
    obj.forEach(value => {
      newSet.add(deepClone(value))
    })
    return newSet
  }

  // 处理函数
  if (typeof obj === 'function') {
    // 返回一个新函数，保持原函数的参数和函数体
    return function (...args) {
      return obj.apply(this, args)
    }
  }

  // 检查是否已经拷贝过该对象
  if (weakMap.has(obj)) {
    return weakMap.get(obj)
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const newArr = []
    weakMap.set(obj, newArr)
    for (let item of obj) {
      newArr.push(deepClone(item))
    }
    return newArr
  }

  // 处理普通对象
  const newObj = {}
  weakMap.set(obj, newObj)

  // 获取对象的所有属性（包括 Symbol 属性）
  const keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]

  for (let key of keys) {
    // 获取属性描述符
    const descriptor = Object.getOwnPropertyDescriptor(obj, key)

    // 如果属性是访问器属性（getter/setter）
    if (descriptor.get || descriptor.set) {
      Object.defineProperty(newObj, key, {
        get: descriptor.get
          ? function () {
              return deepClone(descriptor.get.call(this))
            }
          : undefined,
        set: descriptor.set
          ? function (value) {
              descriptor.set.call(this, deepClone(value))
            }
          : undefined,
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
      })
    } else {
      // 普通属性直接复制
      newObj[key] = deepClone(obj[key])
    }
  }

  return newObj
}

// 使用示例
const original = {
  a: 1,
  b: {
    c: 2,
    d: [1, 2, 3],
    e: new Date(),
    f: new RegExp('test'),
    g: new Map([['key', 'value']]),
    h: new Set([1, 2, 3]),
  },
  i: function (x) {
    return x * 2
  },
  j: undefined,
  k: Symbol('test'),
  // 添加 getter/setter
  get doubleA() {
    return this.a * 2
  },
  set doubleA(value) {
    this.a = value / 2
  },
}

// 添加循环引用
original.self = original

const cloned = deepClone(original)
console.log(cloned) // 完全独立的副本
console.log(cloned.self === cloned) // true，循环引用被正确处理
console.log(cloned.doubleA) // 2
cloned.doubleA = 6
console.log(cloned.a) // 3
console.log(original.a) // 1
```

## 排序

### 排序算法的稳定性

排序算法的稳定性是指：如果待排序的序列中存在值相等的元素，经过排序之后，相等元素之间原有的先后顺序不变。

#### 常见排序算法的稳定性对比

| 排序算法 | 时间复杂度 | 空间复杂度 | 稳定性 | 原地排序 | 适用场景                 |
| -------- | ---------- | ---------- | ------ | -------- | ------------------------ |
| 冒泡排序 | O(n²)      | O(1)       | 稳定   | 是       | 数据量小，基本有序       |
| 选择排序 | O(n²)      | O(1)       | 不稳定 | 是       | 数据量小，对稳定性无要求 |
| 插入排序 | O(n²)      | O(1)       | 稳定   | 是       | 数据量小，基本有序       |
| 快速排序 | O(nlogn)   | O(logn)    | 不稳定 | 是       | 大数据量，要求高性能     |
| 归并排序 | O(nlogn)   | O(n)       | 稳定   | 否       | 大数据量，要求稳定性     |
| 堆排序   | O(nlogn)   | O(1)       | 不稳定 | 是       | 大数据量，对稳定性无要求 |
| 计数排序 | O(n+k)     | O(k)       | 稳定   | 否       | 数据范围小，整数         |
| 基数排序 | O(d(n+k))  | O(n+k)     | 稳定   | 否       | 整数或字符串，位数有限   |

#### 稳定性示例

```javascript
// 原始数据
const data = [
  { name: '张三', age: 20, score: 85 },
  { name: '李四', age: 20, score: 90 },
  { name: '王五', age: 18, score: 95 },
][
  // 按年龄排序后（稳定排序）
  // 结果：保持相同年龄的原有顺序
  ({ name: '王五', age: 18, score: 95 },
  { name: '张三', age: 20, score: 85 },
  { name: '李四', age: 20, score: 90 })
][
  // 按年龄排序后（不稳定排序）
  // 结果：相同年龄的顺序可能改变
  ({ name: '王五', age: 18, score: 95 },
  { name: '李四', age: 20, score: 90 },
  { name: '张三', age: 20, score: 85 })
]
```

#### 稳定性应用场景

1. **多级排序**：当需要按照多个条件进行排序时，稳定性很重要

   ```javascript
   // 先按年龄排序，再按分数排序
   data.sort((a, b) => {
     if (a.age !== b.age) {
       return a.age - b.age
     }
     return b.score - a.score
   })
   ```

2. **数据展示**：在展示数据时，保持原有的顺序可能对用户体验很重要

   ```javascript
   // 例如：商品列表先按价格排序，相同价格的保持原有顺序
   products.sort((a, b) => a.price - b.price)
   ```

3. **业务逻辑**：某些业务场景需要保持数据的相对顺序
   ```javascript
   // 例如：订单列表按状态排序，相同状态的订单保持下单时间顺序
   orders.sort((a, b) => {
     if (a.status !== b.status) {
       return a.status - b.status
     }
     return a.createTime - b.createTime
   })
   ```

### 快速排序

快速排序是一种高效的排序算法，采用分治策略。

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr

  const pivot = arr[Math.floor(arr.length / 2)]
  const left = []
  const middle = []
  const right = []

  for (let item of arr) {
    if (item < pivot) {
      left.push(item)
    } else if (item > pivot) {
      right.push(item)
    } else {
      middle.push(item)
    }
  }

  return [...quickSort(left), ...middle, ...quickSort(right)]
}

// 使用示例
const arr = [64, 34, 25, 12, 22, 11, 90]
console.log(quickSort(arr)) // [11, 12, 22, 25, 34, 64, 90]
```

### 归并排序

归并排序是一种稳定的排序算法，采用分治策略。

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr

  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = []
  let i = 0,
    j = 0

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j))
}

// 使用示例
const arr = [64, 34, 25, 12, 22, 11, 90]
console.log(mergeSort(arr)) // [11, 12, 22, 25, 34, 64, 90]
```

### 冒泡排序

冒泡排序是一种简单的排序算法，通过重复遍历要排序的序列，比较相邻元素并交换它们的位置。

```javascript
function bubbleSort(arr) {
  const len = arr.length

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换元素
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }

  return arr
}

// 使用示例
const arr = [64, 34, 25, 12, 22, 11, 90]
console.log(bubbleSort(arr)) // [11, 12, 22, 25, 34, 64, 90]
```

## LRU 缓存

### 背景与用途

LRU（Least Recently Used）是一种缓存淘汰策略，其核心思想是：如果数据最近被访问过，那么将来被访问的几率也更高。当缓存空间满时，优先淘汰最久未使用的数据。

LRU 缓存常用于：

1. 浏览器缓存
2. 数据库查询缓存
3. 操作系统页面置换
4. 移动端图片缓存

### LRU 的 Map 版本

使用 Map 实现 LRU 缓存，Map 的特性可以很好地满足 LRU 的需求。

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1
    }

    // 获取值并重新插入，使其成为最近使用的项
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)

    return value
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // 如果已存在，先删除再重新插入
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      // 如果达到容量上限，删除最久未使用的项
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, value)
  }
}

// 使用示例
const cache = new LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
console.log(cache.get(1)) // 1
cache.put(3, 3)
console.log(cache.get(2)) // -1
```

### LRU 的链表版本

使用双向链表和哈希表实现 LRU 缓存，可以更直观地表示数据的访问顺序。

```javascript
class ListNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
    this.head = new ListNode(0, 0)
    this.tail = new ListNode(0, 0)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  addNode(node) {
    // 将节点添加到链表头部
    node.prev = this.head
    node.next = this.head.next
    this.head.next.prev = node
    this.head.next = node
  }

  removeNode(node) {
    // 从链表中移除节点
    node.prev.next = node.next
    node.next.prev = node.prev
  }

  moveToHead(node) {
    // 将节点移动到链表头部
    this.removeNode(node)
    this.addNode(node)
  }

  popTail() {
    // 移除链表尾部节点
    const node = this.tail.prev
    this.removeNode(node)
    return node
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1
    }

    const node = this.cache.get(key)
    this.moveToHead(node)
    return node.value
  }

  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)
      node.value = value
      this.moveToHead(node)
    } else {
      const newNode = new ListNode(key, value)
      this.cache.set(key, newNode)
      this.addNode(newNode)

      if (this.cache.size > this.capacity) {
        const tail = this.popTail()
        this.cache.delete(tail.key)
      }
    }
  }
}

// 使用示例
const cache = new LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
console.log(cache.get(1)) // 1
cache.put(3, 3)
console.log(cache.get(2)) // -1
```

## instanceof

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

### 实现原理

1. 获取实例对象的原型（`__proto__`）
2. 获取构造函数的 `prototype` 属性
3. 循环判断实例对象的原型是否等于构造函数的 `prototype`，直到原型为 `null`

### 手写实现

```javascript
function myInstanceof(instance, constructor) {
  // 基本类型直接返回 false
  if (typeof instance !== 'object' || instance === null) {
    return false
  }

  // 获取实例对象的原型
  let proto = Object.getPrototypeOf(instance)

  // 循环判断原型链
  while (proto) {
    // 如果找到构造函数的 prototype，返回 true
    if (proto === constructor.prototype) {
      return true
    }
    // 继续向上查找原型链
    proto = Object.getPrototypeOf(proto)
  }

  return false
}

// 使用示例
function Person(name) {
  this.name = name
}

const person = new Person('张三')
console.log(myInstanceof(person, Person)) // true
console.log(myInstanceof(person, Object)) // true
console.log(myInstanceof(person, Array)) // false

// 特殊情况
console.log(myInstanceof(null, Object)) // false
console.log(myInstanceof(undefined, Object)) // false
console.log(myInstanceof(1, Number)) // false
console.log(myInstanceof('string', String)) // false
```

### 注意事项

1. `instanceof` 只能用于判断对象类型，不能用于判断基本类型
2. 所有对象都是 `Object` 的实例
3. 基本类型的字面量不是对应包装类型的实例
4. `null` 和 `undefined` 不是任何类型的实例

### 常见应用场景

1. **类型检查**

```javascript
function checkType(value) {
  if (value instanceof Array) {
    return '数组'
  } else if (value instanceof Date) {
    return '日期'
  } else if (value instanceof RegExp) {
    return '正则'
  }
  return '其他类型'
}
```

2. **继承关系判断**

```javascript
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

const dog = new Dog()
const cat = new Cat()

console.log(dog instanceof Animal) // true
console.log(cat instanceof Animal) // true
console.log(dog instanceof Dog) // true
console.log(cat instanceof Dog) // false
```

3. **框架中的类型判断**

```javascript
// Vue 中的类型判断
function isVNode(node) {
  return node !== null && typeof node === 'object' && node.__v_isVNode === true
}

// React 中的类型判断
function isValidElement(object) {
  return (
    typeof object === 'object' && object !== null && object.$$typeof === Symbol.for('react.element')
  )
}
```

### 与 typeof 的区别

1. `typeof` 用于判断基本类型，`instanceof` 用于判断对象类型
2. `typeof` 返回字符串，`instanceof` 返回布尔值
3. `typeof` 可以判断 `null` 和 `undefined`，`instanceof` 不能
4. `instanceof` 可以判断继承关系，`typeof` 不能

```javascript
// typeof 示例
console.log(typeof 1) // 'number'
console.log(typeof 'string') // 'string'
console.log(typeof true) // 'boolean'
console.log(typeof undefined) // 'undefined'
console.log(typeof null) // 'object'
console.log(typeof {}) // 'object'
console.log(typeof []) // 'object'
console.log(typeof function () {}) // 'function'

// instanceof 示例
console.log(1 instanceof Number) // false
console.log(new Number(1) instanceof Number) // true
console.log([] instanceof Array) // true
console.log({} instanceof Object) // true
console.log(function () {} instanceof Function) // true
```

## 手写 Promise 静态方法实现

### 1. Promise.all 实现

```javascript
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (!Array.isArray(promises)) {
      return reject(new TypeError('promises must be an array'))
    }

    const results = []
    let completedCount = 0
    const promiseCount = promises.length

    // 处理空数组情况
    if (promiseCount === 0) {
      return resolve(results)
    }

    promises.forEach((promise, index) => {
      // 确保元素被转化为Promise
      Promise.resolve(promise).then(
        value => {
          results[index] = value
          completedCount++

          // 所有Promise都完成时，解析结果
          if (completedCount === promiseCount) {
            resolve(results)
          }
        },
        reason => {
          // 任何一个Promise失败，整个Promise.all失败
          reject(reason)
        }
      )
    })
  })
}
```

### 2. Promise.race 实现

```javascript
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (!Array.isArray(promises)) {
      return reject(new TypeError('promises must be an array'))
    }

    // 空数组情况下，Promise会永远处于pending状态
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve, reject)
    })
  })
}
```

### 3. Promise.any 实现

```javascript
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (!Array.isArray(promises)) {
      return reject(new TypeError('promises must be an array'))
    }

    const errors = []
    let rejectedCount = 0
    const promiseCount = promises.length

    // 处理空数组情况
    if (promiseCount === 0) {
      return reject(new AggregateError([], 'All promises were rejected'))
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          // 任何一个Promise成功，整个Promise.any成功
          resolve(value)
        },
        reason => {
          errors[index] = reason
          rejectedCount++

          // 所有Promise都拒绝时，返回AggregateError
          if (rejectedCount === promiseCount) {
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        }
      )
    })
  })
}
```

### 4. Promise.allSettled 实现

```javascript
Promise.myAllSettled = function (promises) {
  return new Promise(resolve => {
    // 参数校验
    if (!Array.isArray(promises)) {
      return resolve([])
    }

    const results = []
    let completedCount = 0
    const promiseCount = promises.length

    // 处理空数组情况
    if (promiseCount === 0) {
      return resolve(results)
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = { status: 'fulfilled', value }
          completedCount++

          if (completedCount === promiseCount) {
            resolve(results)
          }
        },
        reason => {
          results[index] = { status: 'rejected', reason }
          completedCount++

          if (completedCount === promiseCount) {
            resolve(results)
          }
        }
      )
    })
  })
}
```
