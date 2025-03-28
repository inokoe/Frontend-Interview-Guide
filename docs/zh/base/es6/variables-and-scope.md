# 变量声明与作用域

::: tip let 和 const 是在 ECMAScript 2015（ES6）版本中引入的。
:::

## 一、变量声明方式

### 1. var 声明

#### 特性

1. **函数作用域**

   ```javascript
   function test() {
     var a = 1
     if (true) {
       var a = 2
     }
     console.log(a) // 2
   }
   ```

2. **变量提升**

   ```javascript
   console.log(a) // undefined
   var a = 1
   ```

3. **允许重复声明**

   ```javascript
   var a = 1
   var a = 2 // 允许
   ```

4. **全局对象属性**

   ```javascript
   var a = 1
   console.log(window.a) // 1
   ```

### 2. let 声明

#### 特性

1. **块级作用域**

   ```javascript
   {
     let a = 10
     var b = 20
   }
   console.log(b) // 20
   console.log(a) // ReferenceError: a is not defined
   ```

2. **暂时性死区（TDZ）**

   ```javascript
   console.log(a) // undefined
   console.log(b) // ReferenceError: Cannot access 'b' before initialization
   var a = 1
   let b = 2
   ```

3. **不允许重复声明**

   ```javascript
   let b = 1
   let b = 2 // SyntaxError: Identifier 'b' has already been declared
   ```

4. **不会成为全局对象属性**

   ```javascript
   let b = 2
   console.log(window.b) // undefined
   ```

### 3. const 声明

#### 特性

1. **声明常量**

   ```javascript
   const PI = 3.14159
   PI = 3.14 // TypeError: Assignment to constant variable
   ```

2. **块级作用域**（与 let 相同）

3. **不允许重复声明**（与 let 相同）

4. **必须初始化**

   ```javascript
   const a; // SyntaxError: Missing initializer in const declaration
   const b = 1; // 正确
   ```

5. **对象属性可修改**

   ```javascript
   const obj = {
     name: 'John',
   }

   obj.name = 'Mike' // 允许
   obj = {} // TypeError: Assignment to constant variable
   ```

## 二、变量提升详解

1. **函数声明提升**

   ```javascript
   sayHello() // 'Hello!'

   function sayHello() {
     console.log('Hello!')
   }
   ```

2. **变量声明提升**

   ```javascript
   console.log(a) // undefined
   var a = 1
   console.log(a) // 1
   ```

3. **函数表达式不会提升**

   ```javascript
   sayHi() // TypeError: sayHi is not a function

   var sayHi = function () {
     console.log('Hi!')
   }
   ```

4. **let/const 的暂时性死区**

   ```javascript
   console.log(a) // undefined
   console.log(b) // ReferenceError: Cannot access 'b' before initialization

   var a = 1
   let b = 2
   ```

5. **函数声明和变量声明的优先级**

   ```javascript
   console.log(foo) // ƒ foo() { console.log('function') }

   var foo = 'bar'

   function foo() {
     console.log('function')
   }
   ```

## 三、作用域

### 1. 作用域类型

1. **全局作用域**
2. **函数作用域**
3. **块级作用域**（ES6 引入）

### 2. 作用域链

1. **作用域链的概念**

   ```javascript
   var globalVar = 'global'

   function outer() {
     var outerVar = 'outer'

     function inner() {
       var innerVar = 'inner'
       console.log(innerVar) // 'inner'
       console.log(outerVar) // 'outer'
       console.log(globalVar) // 'global'
     }

     inner()
   }
   ```

2. **作用域链的查找机制**

   ```javascript
   var a = 1

   function test() {
     console.log(a) // undefined (而非1，因为存在变量提升和函数作用域内的遮蔽)
     var a = 2
     console.log(a) // 2
   }

   test()
   console.log(a) // 1
   ```

## 四、实际应用场景

1. **循环中的块级作用域**

   ```javascript
   for (let i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 1000)
   }
   // 输出：0, 1, 2

   for (var i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 1000)
   }
   // 输出：3, 3, 3
   ```

2. **const 用于引用类型**

   ```javascript
   const config = {
     api: 'https://api.example.com',
     timeout: 3000,
   }

   // 对象属性可以修改
   config.timeout = 5000

   // 但不能重新赋值
   config = {} // Error
   ```

3. **模块作用域**
   ```javascript
   // module.js
   let count = 0
   export function increment() {
     count++
     return count
   }
   ```

## 五、最佳实践

1. **优先使用 const**

   - 如果一个值不需要改变，就使用 const
   - 可以提高代码的可读性和可维护性
   - 可以避免意外的赋值错误

2. **其次使用 let**

   - 在需要改变值的场景使用 let
   - 避免使用 var

3. **合理使用块级作用域**
   - 利用块级作用域隔离变量
   - 避免变量名冲突
   - 及时释放内存

## 六、面试常见问题解答

1. **let、const、var 的区别是什么？**

   var 是函数作用域，会变量提升，可重复声明；let/const 是块级作用域，有暂时性死区，不可重复声明；const 声明的变量不可重新赋值。

2. **什么是暂时性死区？**

   暂时性死区是指变量在作用域内已经存在但不可访问的状态，从作用域开始到声明语句之前的区域。let/const 声明的变量不会提升，在声明前访问会报错。

3. **const 定义的对象属性是否可以改变？为什么？**

   可以。const 保证的是变量指向的内存地址不变，而对象是引用类型，const 只是保证引用不变，但对象内部的属性仍可修改。

4. **块级作用域解决了什么问题？**

   解决了循环变量泄漏、变量覆盖、内存泄漏等问题，提高了代码的可维护性和可预测性。

5. **使用 const 声明对象时需要注意什么？**

   const 只保证对象的引用不变，不保证对象内部属性不变。如需完全不可变，应使用 Object.freeze()。

6. **let 和 const 是否会变量提升？**

   从规范上讲，let 和 const 声明的变量会在作用域顶部被创建，但因暂时性死区的存在，在声明前不能访问，所以表现上看起来没有提升。

7. **在实际开发中如何选择使用 let、const 和 var？**

   优先使用 const，其次是 let，尽量避免使用 var，以增强代码的可维护性和避免常见错误。

8. **什么是作用域链？它是如何工作的？**

   作用域链是 JavaScript 引擎查找变量的机制，先在当前作用域查找，未找到则继续向上级作用域查找，直到全局作用域。这种层级链接形成作用域链。

9. **函数声明和变量声明的提升有什么区别？**

   函数声明会整体提升，包括函数体；变量声明只有声明部分提升，赋值不提升。当同名时，函数声明优先级高于变量声明。

10. **为什么 let 和 const 没有变量提升？**

    从实现上来说，let 和 const 确实有"提升"，但因暂时性死区的设计，它们在声明前不能被访问，因此表现得像没有提升。这是为了避免 var 提升带来的问题。

11. **如何避免全局作用域污染？**

    使用立即执行函数表达式(IIFE)、模块化开发、使用 let/const 代替 var、严格模式等方式可以避免全局作用域污染。

12. **闭包和作用域链有什么关系？**

    闭包是基于作用域链实现的。当内部函数引用外部函数的变量时，即使外部函数执行完毕，其作用域仍会保留在作用域链上，形成闭包，使内部函数可以继续访问这些变量。

## 七、练习题

通过以下练习题来测试你对变量声明与作用域的理解：

### 练习 1：变量声明与提升

```javascript
// 问题：以下代码会输出什么？为什么？
console.log(a) // 输出：undefined，因为var声明会提升，但赋值不会提升
console.log(b) // 报错：ReferenceError: Cannot access 'b' before initialization
// 因为let声明存在暂时性死区，在声明前不能访问
console.log(c) // 报错：ReferenceError: Cannot access 'c' before initialization
// 同样，const也存在暂时性死区

var a = 1
let b = 2
const c = 3
```

### 练习 2：块级作用域

```javascript
// 问题：这两个循环分别会输出什么？请解释原因。

for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0)
}
// 输出五个5
// 原因：var是函数作用域，循环结束后i变成5
// 当setTimeout回调执行时，共享同一个变量i，其值已经是5

for (let j = 0; j < 5; j++) {
  setTimeout(() => console.log(j), 0)
}
// 输出：0,1,2,3,4
// 原因：let是块级作用域，每次循环会创建新的变量j
// 每个setTimeout回调捕获的是各自循环迭代中的j值
```

### 练习 3：const 与对象

```javascript
// 问题：最终user和arr的值是什么？为什么const声明的对象内部属性可以修改？

const user = { name: '张三', age: 25 }
user.age = 26 // 可以修改对象的属性
user.city = '北京' // 可以添加新属性

const arr = [1, 2, 3]
arr.push(4) // 可以调用修改数组的方法
arr[0] = 0 // 可以修改数组元素

console.log(user) // 输出：{name: "张三", age: 26, city: "北京"}
console.log(arr) // 输出：[0, 2, 3, 4]

// 解析：const只保证变量的引用地址不变，不保证内容不变
// user和arr的引用地址没有改变，只是修改了它们内部的内容
// 要实现对象完全不可变，可以使用Object.freeze()
```

### 练习 4：闭包与作用域

```javascript
// 问题：上述代码的输出是什么？请解释闭包和作用域链的关系。

function createCounter() {
  let count = 0
  return function () {
    return ++count // 内部函数引用了外部函数的变量，形成闭包
  }
}

const counter1 = createCounter()
const counter2 = createCounter()

console.log(counter1()) // 输出：1
console.log(counter1()) // 输出：2
console.log(counter2()) // 输出：1

// 解析：
// 1. 每次调用createCounter()都会创建一个新的作用域，有自己独立的count变量
// 2. 返回的函数形成闭包，可以访问并修改createCounter作用域中的count变量
// 3. counter1和counter2是两个独立的闭包，各自维护自己的count变量
// 4. 作用域链使内部函数能够访问外部函数的变量，即使外部函数已执行完毕
```

### 练习 5：作用域链查找

```javascript
// 问题：上述代码会输出什么？请详细解释变量查找的过程。

var x = 10

function foo() {
  console.log(x) // 输出：undefined
  var x = 20 // 函数内的var声明会提升到函数作用域顶部
  console.log(x) // 输出：20
}

foo()
console.log(x) // 输出：10

// 解析：
// 1. 函数foo内部的变量声明var x会提升，相当于在函数开始处有var x;
// 2. 第一个console.log(x)时，函数作用域内已有x但未赋值，所以是undefined
// 3. x = 20赋值后，第二个console.log(x)输出的是函数作用域内的x，值为20
// 4. 函数外的console.log(x)访问的是全局作用域的x，值为10
// 5. 变量查找总是先查找当前作用域，找不到再向上级作用域查找
```

### 练习 6：let 在循环中的表现

```javascript
// 问题：上述代码的输出是什么？如果将let改为var会有什么不同？

let funcs = []

for (let i = 0; i < 3; i++) {
  funcs[i] = function () {
    console.log(i) // 每次循环创建一个新的块级作用域，每个函数捕获自己作用域中的i
  }
}

funcs[0]() // 输出：0
funcs[1]() // 输出：1
funcs[2]() // 输出：2

// 如果将let改为var：
// for (var i = 0; i < 3; i++) { ... }
// 则所有函数共享同一个i，循环结束后i为3
// 输出将是：3, 3, 3
```

### 练习 7：暂时性死区综合题

```javascript
// 问题：这段代码会报什么错？为什么？

let x = 10

function foo() {
  console.log(x) // 报错：ReferenceError: Cannot access 'x' before initialization
  let x = 20 // 这里声明的x会在整个函数作用域形成暂时性死区
}

foo()

// 解析：
// 1. 函数内部的let x声明会导致整个函数作用域形成该变量的暂时性死区
// 2. 从函数开始到x声明语句之间的区域都不能访问x
// 3. 即使外部作用域有同名变量x，也不会被访问到
// 4. JavaScript引擎会优先认为函数内部的x是未初始化的变量，而不是外部变量
```
