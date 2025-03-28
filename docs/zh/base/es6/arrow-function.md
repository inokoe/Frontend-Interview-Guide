# 箭头函数

## 概述

箭头函数是在 ECMAScript 6 (ES6/ES2015)中引入的特性。

## 基本特性

### 1. 简洁的语法

```javascript
// 传统函数
function add(a, b) {
  return a + b
}

// 箭头函数
const add = (a, b) => a + b

// 单参数可省略括号
const square = x => x * x

// 无参数需要括号
const getTime = () => new Date().getTime()

// 函数体多于一行需要大括号和return
const sum = (a, b) => {
  const result = a + b
  return result
}
```

### 2. this 指向特点

1. **继承上下文的 this**

```javascript
const obj = {
  data: [],
  init() {
    // 箭头函数继承外层this
    fetch('/api/data').then(data => {
      this.data = data // this 指向 obj
    })
  },
}

// 对比传统函数
const obj2 = {
  data: [],
  init() {
    fetch('/api/data').then(function (data) {
      this.data = data // this 指向 window
    })
  },
}
```

2. **不能改变 this 指向**

```javascript
const arrowFn = () => {
  console.log(this)
}

// 以下方法都无法改变箭头函数的this指向
arrowFn.call({}) // window
arrowFn.apply({}) // window
arrowFn.bind({})() // window
```

### 3. 实际应用场景

1. **回调函数**

```javascript
// React组件中的事件处理
class Counter extends React.Component {
  state = { count: 0 }

  increment = () => {
    this.setState(state => ({
      count: state.count + 1,
    }))
  }

  render() {
    return <button onClick={this.increment}>+1</button>
  }
}
```

2. **数组方法链式调用**

```javascript
const numbers = [1, 2, 3, 4, 5]
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((acc, curr) => acc + curr, 0)
```

## 使用限制

### 1. 不能作为构造函数

```javascript
const Person = name => {
  this.name = name
}

// TypeError: Person is not a constructor
const person = new Person('John')
```

### 2. 没有 arguments 对象

```javascript
const fn = () => {
  console.log(arguments) // ReferenceError
}

// 使用rest参数代替
const fn2 = (...args) => {
  console.log(args)
}
```

### 3. 不能用作 Generator 函数

```javascript
// 语法错误
const generator = *() => {
  yield 1;
  yield 2;
};
```

## 箭头函数的底层原理

### 1. 为什么不能使用 new 关键字

箭头函数不能作为构造函数使用的根本原因在于其内部实现：

1. **没有[[Construct]]内部方法**：

   - JavaScript 中的函数对象通常同时具有[[Call]]和[[Construct]]两个内部方法
   - 普通函数可以通过 new 调用是因为它们实现了[[Construct]]方法
   - 箭头函数仅实现了[[Call]]方法，完全没有[[Construct]]方法

2. **没有自己的 prototype 属性**：

```javascript
const regularFn = function () {}
const arrowFn = () => {}

console.log(regularFn.prototype) // 存在，是一个对象
console.log(arrowFn.prototype) // undefined
```

3. **无法绑定 this**：
   - 构造函数的核心机制是在实例化时将 this 绑定到新创建的对象
   - 箭头函数的 this 值在函数创建时就已固定，无法在调用时修改

### 2. 为什么没有 arguments 对象

箭头函数没有自己的 arguments 对象的原理：

1. **作用域链查找**：

   - 箭头函数内部不创建自己的 arguments 对象
   - 当在箭头函数内引用 arguments 时，会沿着作用域链向上查找
   - 如果外层是普通函数，则会使用该函数的 arguments
   - 如果没有找到，则抛出 ReferenceError

2. **设计意图**：
   - ES6 设计者为了强化箭头函数的轻量特性，有意省略了许多传统函数特性
   - 推荐使用更现代的 rest 参数语法代替 arguments

```javascript
// 演示作用域链查找arguments
function outer() {
  const arrow = () => {
    console.log(arguments) // 这里的arguments是outer函数的
  }
  arrow()
}

outer(1, 2, 3) // 输出: [1, 2, 3]

// 替代方案
const modernFn = (...args) => {
  console.log(args) // 使用命名的rest参数
}
```

## 最佳实践

1. **适合使用箭头函数的场景**

   - 简短的回调函数
   - 需要绑定 this 的场景
   - 链式调用方法

2. **不适合使用箭头函数的场景**
   - 对象方法
   - 原型方法
   - 构造函数
   - 需要动态 this 的场景

## 面试常见问题

1. 箭头函数与普通函数的主要区别是什么？
2. 为什么箭头函数不能作为构造函数？
3. 箭头函数的 this 指向规则是什么？
4. 什么场景下不应该使用箭头函数？
5. 箭头函数如何访问参数列表？
6. 如何在 React 类组件中正确使用箭头函数？
7. 箭头函数能否使用 arguments 对象？为什么？
