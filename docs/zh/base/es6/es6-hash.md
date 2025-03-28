# ES6 哈希数据结构

## 背景介绍

ECMAScript 6（简称 ES6）引入了新的集合类型数据结构，包括 Set、Map 和 WeakMap 等。这些数据结构为 JavaScript 带来了更强大的数据处理能力，使得代码更加简洁高效。本文将详细介绍这些哈希数据结构的特性和使用方法。

## Set

Set 是 ES6 引入的新的数据结构，类似于数组，但成员的值都是唯一的，没有重复的值。Set 对象允许你存储任何类型的唯一值，无论是原始值还是对象引用。Set 的主要特点是：

1. 成员值唯一，不会重复
2. 没有索引，不能通过索引访问
3. 提供了高效的添加、删除和查找操作
4. 可以存储任何类型的值
5. 支持迭代操作

### 1. 基本使用

```javascript
// 创建 Set 实例
const set = new Set()

// 添加元素：add() 方法返回 Set 对象本身，所以可以链式调用
set.add(1)
set.add(2)
set.add(3)
set.add(2) // 重复元素不会被添加，Set 会自动去重

// 打印 Set 内容
console.log(set) // Set { 1, 2, 3 }

// 链式添加元素
set.add(4).add(5).add(6)
console.log('链式添加后的 Set:', set)
// 输出: Set { 1, 2, 3, 4, 5, 6 }
```

### 2. 数组与对象转换

```javascript
// 数组转换为 Set：自动去重
let arr = [1, 2, 3, 2, 4, 1]
let setFromArr = new Set(arr)
console.log('数组转换为 Set', setFromArr)
// 输出: Set { 1, 2, 3, 4 }

// 对象转换为 Set：使用 Object.values() 获取对象的值数组
let obj = { a: 'b', b: 'c' }
let setFromObj = new Set(Object.values(obj))
console.log('对象转换为 Set', setFromObj)
// 输出: Set { 'b', 'c' }

// Set 转换为数组：使用展开运算符
let arrFromSet = [...setFromArr]
console.log('Set 转换为数组', arrFromSet)
// 输出: [ 1, 2, 3, 4 ]

// 将数组转换为对象：使用 map 创建键值对数组，然后用 Object.fromEntries 转换
let objFromArr = Object.fromEntries(arrFromSet.map(item => [item, item]))
console.log('数组转换为对象', objFromArr)
// 输出: { '1': 1, '2': 2, '3': 3, '4': 4 }
```

### 3. 遍历方法

```javascript
// 使用 for...of 遍历 Set 的值：最常用的遍历方式
for (const value of setFromArr) {
  console.log(value)
}
// 输出: 1, 2, 3, 4

// 使用 forEach 遍历 Set 的值：可以同时获取值和 Set 本身
setFromArr.forEach((value, key, set) => {
  console.log(`值: ${value}, 键: ${key}, Set: ${set}`)
})
// 输出: 值: 1, 键: 1, Set: [object Set]
//      值: 2, 键: 2, Set: [object Set]
//      值: 3, 键: 3, Set: [object Set]
//      值: 4, 键: 4, Set: [object Set]
```

### 4. 常用方法

```javascript
// 创建示例 Set
let setExample = new Set()

// 添加元素：add() 方法
setExample.add(5)
setExample.add(10)
setExample.add(15)
console.log('Set 示例', setExample)
// 输出: Set { 5, 10, 15 }

// 删除元素：delete() 方法，返回布尔值表示是否删除成功
setExample.delete(10)
console.log('删除元素后', setExample)
// 输出: Set { 5, 15 }

// 检查是否包含元素：has() 方法，返回布尔值
console.log('Set 是否包含 5?', setExample.has(5))
// 输出: true

// 获取 Set 大小：size 属性
console.log('Set 大小:', setExample.size)
// 输出: 2

// 清空 Set：clear() 方法
setExample.clear()
console.log('清空后的 Set', setExample)
// 输出: Set {}
```

## Map

Map 是一种键值对的集合，类似于对象，但是"键"的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map 的主要特点是：

1. 可以使用任何类型作为键
2. 保持键的插入顺序
3. 提供了 size 属性获取键值对数量
4. 提供了完整的迭代方法
5. 没有原型链上的键
6. 性能优于普通对象

### 1. 基本使用

```javascript
// 创建 Map 实例
const map = new Map()

// 添加键值对：set() 方法返回 Map 对象本身，支持链式调用
map.set('name', '张三')
map.set('age', 25)

// 打印 Map 内容
console.log(map)
// 输出: Map(2) { 'name' => '张三', 'age' => 25 }

// 链式添加键值对
map.set('job', '程序员').set('city', '北京')
console.log('链式添加后的 Map:', map)
// 输出: Map(4) { 'name' => '张三', 'age' => 25, 'job' => '程序员', 'city' => '北京' }
```

### 2. 对象和数组转换

```javascript
// 对象转换为 Map：使用 Object.entries() 获取键值对数组
let obj = { a: 'b', b: 'c' }
obj = Object.entries(obj)
console.log('obj 转换后的二维数组', obj)
// 输出: [ [ 'a', 'b' ], [ 'b', 'c' ] ]

// 使用二维数组创建 Map
let map = new Map(obj)
console.log('对象转换 map', map)
// 输出: Map(2) { 'a' => 'b', 'b' => 'c' }

// 数组转换为 Map：数组必须是二维数组，每个子数组包含键和值
let arr = [
  [1, 2],
  [2, 3],
]
let map_2 = new Map(arr)
console.log('数组转换的 map', map_2)
// 输出: Map(2) { 1 => 2, 2 => 3 }

// 二维数组转换回对象：使用 Object.fromEntries()
obj = Object.fromEntries(obj)
console.log('二维数组转换回对象', obj)
// 输出: { a: 'b', b: 'c' }
```

### 3. 遍历方法

```javascript
// 使用 for...of 遍历键值对：最常用的遍历方式
for (const [key, value] of map_2) {
  console.log(`${key}: ${value}`)
}
// 输出: 1: 2 2: 3

// 使用 for...of 遍历键：keys() 方法返回键的迭代器
for (const key of map_2.keys()) {
  console.log('键:', key)
}
// 输出: 键: 1 键: 2

// 使用 forEach 遍历键值对：可以同时获取值、键和 Map 本身
map.forEach((value, key, map) => {
  console.log(`值: ${value}, 键: ${key}, Map: ${map}`)
})
// 输出: 值: b, 键: a, Map: [object Map]
//      值: c, 键: b, Map: [object Map]
```

### 4. 基本操作方法

```javascript
// 创建示例 Map
const userMap = new Map()

// 添加元素：set() 方法
userMap.set('name', '张三')
userMap.set('age', 25)
userMap.set('job', '程序员')

// 获取元素：get() 方法
console.log('name:', userMap.get('name'))
// 输出: name: 张三

// 检查键是否存在：has() 方法
console.log('是否存在 age:', userMap.has('age'))
// 输出: 是否存在 age: true
console.log('是否存在 salary:', userMap.has('salary'))
// 输出: 是否存在 salary: false

// 获取 Map 大小：size 属性
console.log('Map 大小:', userMap.size)
// 输出: Map 大小: 3

// 删除元素：delete() 方法，返回布尔值表示是否删除成功
userMap.delete('job')
console.log('删除后的 Map:', userMap)
// 输出: 删除后的 Map: Map(2) { 'name' => '张三', 'age' => 25 }
```

### 5. 链式操作

```javascript
// Map 的 set() 方法返回 Map 对象本身，支持链式调用
const chainMap = new Map().set(1, 'one').set(2, 'two').set(3, 'three')
console.log('链式操作创建的 Map:', chainMap)
// 输出: 链式操作创建的 Map: Map(3) { 1 => 'one', 2 => 'two', 3 => 'three' }
```

### 6. Map 与数组的转换

```javascript
// 转换为键值对数组：entries() 方法返回键值对迭代器
const entriesArray = Array.from(chainMap)
console.log('转换为数组:', entriesArray)
// 输出: 转换为数组: [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

// 仅获取键数组：keys() 方法返回键的迭代器
const keysArray = Array.from(chainMap.keys())
console.log('键数组:', keysArray)
// 输出: 键数组: [ 1, 2, 3 ]

// 仅获取值数组：values() 方法返回值的迭代器
const valuesArray = Array.from(chainMap.values())
console.log('值数组:', valuesArray)
// 输出: 值数组: [ 'one', 'two', 'three' ]
```

### 7. Map 的合并

```javascript
// 创建两个 Map
const firstMap = new Map([
  ['a', 1],
  ['b', 2],
])
const secondMap = new Map([
  ['c', 3],
  ['d', 4],
])

// 使用展开运算符合并 Map
const mergedMap = new Map([...firstMap, ...secondMap])
console.log('合并后的 Map:', mergedMap)
// 输出: 合并后的 Map: Map(4) { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }
```

### 8. Map 与对象的区别

```javascript
// 创建示例 Map
const complexMap = new Map()

// Map 可以使用任何类型作为键，包括对象、函数等
complexMap.set({}, 'empty object')
complexMap.set(() => {}, 'function')
complexMap.set(NaN, 'not a number')
console.log('使用特殊值作为键的 Map:', complexMap)
// 输出: Map(3) { {...} => 'empty object', [Function] => 'function', NaN => 'not a number' }
```

### 9. 清空 Map

```javascript
// 使用 clear() 方法清空 Map
complexMap.clear()
console.log('清空后的 Map 大小:', complexMap.size)
// 输出: 清空后的 Map 大小: 0
```

## WeakMap

WeakMap 是 ES6 新增的集合类型，与 Map 类似，但有一些重要的区别。WeakMap 的主要特点是：

1. 键必须是对象，不能是原始值
2. 键是弱引用，不会阻止垃圾回收
3. 没有 size 属性和迭代方法
4. 适合存储对象的私有数据
5. 可以避免内存泄漏

### 1. 基本使用

```javascript
// 创建 WeakMap 实例
const wm = new WeakMap()

// 使用对象作为键
const key1 = {}
const key2 = {}

// 设置键值对：set() 方法
wm.set(key1, '值1')
wm.set(key2, '值2')

// 获取值：get() 方法
console.log(wm.get(key1)) // 输出: 值1
```

### 2. 特性与限制

```javascript
// WeakMap 只能使用对象作为键
// 以下代码会抛出错误
try {
  const invalidWM = new WeakMap()
  invalidWM.set(1, '不能使用原始值作为键')
} catch (e) {
  console.log('错误:', e.message)
  // 输出: 错误: Invalid value used as weak map key
}

// 键是弱引用的，当键对象没有其他引用时会被垃圾回收
let obj = {}
const weakMap = new WeakMap()
weakMap.set(obj, '数据')

// 当 obj 被垃圾回收时，weakMap 中对应的键值对也会被自动移除
obj = null // 现在 obj 可以被垃圾回收
```

### 3. 可用的方法

```javascript
// 创建示例对象和 WeakMap
const user1 = { id: 1 }
const user2 = { id: 2 }
const userWeakMap = new WeakMap()

// 设置键值对：set() 方法
userWeakMap.set(user1, { name: '张三', age: 30 })
userWeakMap.set(user2, { name: '李四', age: 25 })

// 检查键是否存在：has() 方法
console.log('user1 存在吗?', userWeakMap.has(user1)) // 输出: true

// 获取值：get() 方法
console.log('user1 的数据:', userWeakMap.get(user1)) // 输出: { name: '张三', age: 30 }

// 删除键值对：delete() 方法
userWeakMap.delete(user1)
console.log('删除后 user1 存在吗?', userWeakMap.has(user1)) // 输出: false
```

### 4. WeakMap 的应用场景

```javascript
// 私有数据存储：使用 WeakMap 存储对象的私有数据
const privateData = new WeakMap()

class Person {
  constructor(name, age) {
    // 将私有数据存储在 WeakMap 中
    privateData.set(this, { name, age })
  }

  // 通过方法访问私有数据
  getName() {
    return privateData.get(this).name
  }

  getAge() {
    return privateData.get(this).age
  }
}

// 创建实例并访问私有数据
const person = new Person('王五', 28)
console.log(person.getName()) // 输出: 王五
console.log(person.getAge()) // 输出: 28
```

## 实际应用场景

### 1. 数据去重

```javascript
// 使用 Set 对数组去重
function removeDuplicates(array) {
  return [...new Set(array)]
}

const numbers = [1, 2, 3, 3, 4, 4, 5]
console.log('去重后的数组:', removeDuplicates(numbers))
// 输出: [1, 2, 3, 4, 5]
```

### 2. 缓存与记忆化

```javascript
// 使用 Map 实现函数记忆化
function memoize(fn) {
  const cache = new Map()
  return function (...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

// 使用记忆化的斐波那契函数
const fib = memoize(n => {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
})

console.log(fib(40)) // 快速计算，不会重复计算已计算过的值
```

### 3. 关联数据存储

```javascript
// 使用 WeakMap 存储 DOM 元素关联数据
const domData = new WeakMap()

// 假设我们有一些 DOM 元素
const elements = document.querySelectorAll('.item')

// 为元素存储关联数据
elements.forEach(element => {
  domData.set(element, {
    clickCount: 0,
    lastClicked: null,
  })

  // 添加点击事件处理
  element.addEventListener('click', () => {
    const data = domData.get(element)
    data.clickCount++
    data.lastClicked = new Date()
    console.log(`元素被点击了 ${data.clickCount} 次`)
  })
})

// 当元素从 DOM 中移除时，相关数据会被自动垃圾回收
```

## 最佳实践

1. **Set 使用建议**

   - 使用 Set 进行数组去重，而不是传统的循环和条件检查
   - 检查元素存在性时，优先使用 Set 的 has() 方法，它的性能比数组的 includes() 更好
   - 当需要频繁添加和删除元素时，Set 比数组更高效

2. **Map 使用建议**

   - 当键不是简单字符串时，优先使用 Map 而不是对象
   - 利用 Map 的键可以是任何类型的特性，解决复杂键值存储问题
   - 需要键值对有序存储时，使用 Map（Map 会保持插入顺序）
   - 频繁添加/删除键值对时，Map 性能优于对象

3. **WeakMap 使用建议**
   - 存储对象的私有数据时使用 WeakMap
   - 避免内存泄漏的场景优先考虑 WeakMap
   - 记住 WeakMap 的键必须是对象
   - 不要依赖 WeakMap 进行迭代，因为它不提供迭代方法

## 面试常见问题及参考答案

1. **Set 和数组有什么区别？**

   参考答案：Set 和数组的主要区别在于：

   - Set 中的元素唯一，不允许重复，而数组可以包含重复元素
   - Set 提供了 has() 方法，可以快速检查元素是否存在，时间复杂度为 O(1)，而数组的 includes() 时间复杂度为 O(n)
   - Set 没有索引，不能像数组一样通过索引访问元素
   - Set 提供了简单的添加(add)和删除(delete)方法，而数组需要使用 push/splice 等方法
   - 在频繁添加和删除元素的场景下，Set 的性能通常优于数组

2. **Map 和普通对象（Object）的区别是什么？**

   参考答案：Map 和普通对象的主要区别包括：

   - 键的类型：Map 可以使用任何类型作为键（包括对象、函数等），而对象的键只能是字符串或 Symbol
   - 键的顺序：Map 保持键的插入顺序，而普通对象不保证键的顺序
   - 键的数量：Map 的 size 属性直接获取键值对数量，对象需要用 Object.keys(obj).length
   - 性能：在频繁增删键值对的场景下，Map 的性能更好
   - 迭代：Map 可以直接迭代，而对象需要通过 Object.keys/values/entries 方法
   - 原型链：Map 没有原型链上的键，而对象有（如 toString）

3. **WeakMap 和 Map 的区别是什么？**

   参考答案：WeakMap 和 Map 的主要区别：

   - 键的类型：WeakMap 的键只能是对象，不能是原始类型；Map 的键可以是任何类型
   - 键的引用：WeakMap 持有键的弱引用，当键对象没有其他引用时会被垃圾回收；Map 持有键的强引用
   - 方法：WeakMap 只提供 set、get、has、delete 方法；Map 还提供 keys、values、entries、forEach 等迭代方法
   - size：WeakMap 没有 size 属性和迭代方法；Map 可以获取 size 并进行迭代
   - 应用场景：WeakMap 适合存储对象的私有数据或需要避免内存泄漏的场景；Map 适用于需要完整键值对操作的场景

4. **如何使用 Set 实现并集、交集和差集？**

   参考答案：使用 Set 可以方便地实现集合操作：

   ```javascript
   // 定义两个集合
   const setA = new Set([1, 2, 3, 4])
   const setB = new Set([3, 4, 5, 6])

   // 并集
   const union = new Set([...setA, ...setB])
   // Set {1, 2, 3, 4, 5, 6}

   // 交集
   const intersection = new Set([...setA].filter(x => setB.has(x)))
   // Set {3, 4}

   // 差集 (A - B)
   const difference = new Set([...setA].filter(x => !setB.has(x)))
   // Set {1, 2}
   ```

5. **为什么选择 WeakMap 而不是 Map？**

   参考答案：选择 WeakMap 而不是 Map 的主要原因：

   - 防止内存泄漏：WeakMap 的键是弱引用，不会阻止垃圾回收，当对象不再被程序使用时，相关的数据也会被清理
   - 隐私数据：WeakMap 非常适合存储对象的私有数据，因为这些数据会随着对象的生命周期自动管理
   - 缓存：当为对象创建临时关联数据，并且不希望这些数据影响对象生命周期时
   - DOM 关联数据：当为 DOM 元素存储额外信息时，使用 WeakMap 可以确保元素被移除后相关数据会被清理

   总之，当键是对象，且希望键对象被垃圾回收时相关数据也被回收，应该选择 WeakMap。

6. **如何判断 Map 和 Set 是否为空？**

   参考答案：判断 Map 和 Set 是否为空可以使用 size 属性：

   ```javascript
   const map = new Map()
   const set = new Set()

   // 判断 Map 是否为空
   const isMapEmpty = map.size === 0
   console.log('Map 是否为空:', isMapEmpty) // true

   // 判断 Set 是否为空
   const isSetEmpty = set.size === 0
   console.log('Set 是否为空:', isSetEmpty) // true
   ```

7. **如何高效地使用 Map 进行数据缓存？**

   参考答案：使用 Map 进行数据缓存的高效方法：

   ```javascript
   class Cache {
     constructor(maxSize = 100) {
       this.cache = new Map()
       this.maxSize = maxSize
     }

     set(key, value, ttl = 0) {
       // 如果缓存已满，删除最早添加的项
       if (this.cache.size >= this.maxSize) {
         const oldestKey = this.cache.keys().next().value
         this.cache.delete(oldestKey)
       }

       const item = {
         value,
         expiry: ttl ? Date.now() + ttl : 0,
       }

       this.cache.set(key, item)
       return this
     }

     get(key) {
       const item = this.cache.get(key)

       // 键不存在
       if (!item) return null

       // 检查是否过期
       if (item.expiry && item.expiry < Date.now()) {
         this.cache.delete(key)
         return null
       }

       return item.value
     }

     has(key) {
       return this.get(key) !== null
     }

     delete(key) {
       return this.cache.delete(key)
     }

     clear() {
       this.cache.clear()
     }
   }

   // 使用示例
   const dataCache = new Cache(10)
   dataCache.set('user:1', { name: '张三' }, 60000) // 缓存60秒
   ```
