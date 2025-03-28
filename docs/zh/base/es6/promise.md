# Promise 与异步编程

## 背景介绍

Promise 是 JavaScript 中处理异步操作的标准方式，它在 ES6(ECMAScript 2015)中被正式引入。在 Promise 出现之前，JavaScript 主要依靠回调函数处理异步操作，这常常导致"回调地狱"(callback hell)的问题，使代码难以维护和理解。Promise 提供了一种更优雅的方式来处理异步操作的结果和错误，使异步代码更加清晰和可维护。

## Promise 基础

### 1. 基本概念

```javascript
// Promise的基本结构
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (/* 操作成功 */) {
    resolve(value);
  } else {
    reject(error);
  }
});

// Promise的使用
promise
  .then(value => console.log(value))
  .catch(error => console.error(error));
```

### 2. Promise 状态

```javascript
// pending（进行中）
const pending = new Promise(() => {})

// fulfilled（已成功）
const fulfilled = Promise.resolve('success')

// rejected（已失败）
const rejected = Promise.reject('error')

// 状态一旦改变，就不会再变
const promise = new Promise((resolve, reject) => {
  resolve('first')
  resolve('second') // 无效
  reject('error') // 无效
})
```

## 链式调用

### 1. 基本链式调用

```javascript
// 链式处理
Promise.resolve(1)
  .then(value => value * 2)
  .then(value => value * 2)
  .then(value => console.log(value)) // 4

// 返回Promise
function asyncOperation(value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value * 2), 1000)
  })
}

Promise.resolve(1)
  .then(asyncOperation)
  .then(asyncOperation)
  .then(value => console.log(value)) // 4 (2秒后)
```

### 2. 错误处理

```javascript
// catch的使用
Promise.reject('error')
  .then(value => console.log(value))
  .catch(error => console.error(error))
  .finally(() => console.log('完成'))

// 错误传递
Promise.resolve(1)
  .then(() => {
    throw new Error('出错了')
  })
  .then(() => console.log('不会执行'))
  .catch(error => console.error(error))
```

## Promise 静态方法

### 1. Promise.all()

```javascript
// 所有Promise都成功
const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

Promise.all(promises)
  .then(values => console.log(values)) // [1, 2, 3]
  .catch(error => console.error(error))

// 有一个Promise失败
const promises = [Promise.resolve(1), Promise.reject('error'), Promise.resolve(3)]

Promise.all(promises)
  .then(values => console.log(values))
  .catch(error => console.error(error)) // 'error'
```

### 2. Promise.race()

```javascript
// 竞速
const promise1 = new Promise(resolve => setTimeout(() => resolve('one'), 1000))
const promise2 = new Promise(resolve => setTimeout(() => resolve('two'), 2000))

Promise.race([promise1, promise2]).then(value => console.log(value)) // 'one'
```

### 3. Promise.allSettled()

```javascript
const promises = [Promise.resolve(1), Promise.reject('error'), Promise.resolve(3)]

Promise.allSettled(promises).then(results => {
  console.log(results)
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: 'error' },
  //   { status: 'fulfilled', value: 3 }
  // ]
})
```

### 4. Promise.any()

```javascript
const promises = [Promise.reject('error1'), Promise.resolve('success'), Promise.reject('error2')]

Promise.any(promises)
  .then(value => console.log(value)) // 'success'
  .catch(error => console.error(error))
```

## async/await

### 1. 基本用法

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}

// 使用async函数
fetchData().then(data => console.log(data))
```

### 2. 错误处理

```javascript
// try/catch
async function example() {
  try {
    await Promise.reject('error')
  } catch (error) {
    console.error(error)
  }
}

// 多个await
async function multiple() {
  try {
    const value1 = await asyncOperation1()
    const value2 = await asyncOperation2(value1)
    const value3 = await asyncOperation3(value2)
    return value3
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### 3. 与 Promise 的关系

```javascript
// async函数总是返回Promise
async function fn() {
  return 'hello'
}
// 等同于
function fn() {
  return Promise.resolve('hello')
}

// await可以等待任何值
async function example() {
  const value1 = await 123 // Promise.resolve(123)
  const value2 = await Promise.resolve(456)
  console.log(value1, value2) // 123 456
}
```

## 实际应用场景

### 1. 接口调用

```javascript
// RESTful API调用
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}
```

### 2. 并发控制

```javascript
// 并发请求
async function fetchAllData() {
  const userPromise = fetchUserData()
  const postsPromise = fetchUserPosts()
  const [user, posts] = await Promise.all([userPromise, postsPromise])
  return { user, posts }
}

// 串行请求
async function fetchSequential() {
  const user = await fetchUserData()
  const posts = await fetchUserPosts(user.id)
  return { user, posts }
}
```

### 3. 超时处理

```javascript
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms)
  })
}

async function fetchWithTimeout(url, ms) {
  try {
    const response = await Promise.race([fetch(url), timeout(ms)])
    return await response.json()
  } catch (error) {
    console.error('Error or timeout:', error)
    throw error
  }
}
```

## 最佳实践

1. **Promise 使用建议**

   - 总是添加错误处理
   - 避免嵌套 Promise
   - 合理使用 Promise.all()

2. **async/await 使用建议**
   - 使用 try/catch 处理错误
   - 注意 await 的并发影响
   - 合理处理循环中的 await

## 面试常见问题及参考答案

### 1. Promise 的三种状态是什么？状态之间如何转换？

**参考答案：**
Promise 有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。

状态转换规则：

- Promise 初始状态为 pending
- 从 pending 可以转换为 fulfilled（通过 resolve 调用）
- 从 pending 可以转换为 rejected（通过 reject 调用或抛出异常）
- 一旦状态变为 fulfilled 或 rejected，就不能再改变（状态不可逆）

### 2. Promise.all()和 Promise.race()的区别是什么？

**参考答案：**

- Promise.all()：接收一个 Promise 数组，当所有 Promise 都成功时，返回所有结果的数组；如果有任何一个 Promise 失败，则立即 reject 并返回失败的原因。适合于"全部成功才继续"的场景。
- Promise.race()：也接收一个 Promise 数组，但只要有一个 Promise 率先改变状态（无论成功或失败），就采用它的结果。适合于"竞争"或"超时控制"的场景。

### 3. async/await 的原理是什么？

**参考答案：**
async/await 本质上是 Promise 的语法糖，目的是简化 Promise 的使用，使异步代码看起来像同步代码。

- async 函数会返回一个 Promise 对象
- await 关键字只能在 async 函数内部使用
- await 会暂停 async 函数的执行，等待 Promise 解决，然后恢复 async 函数的执行并返回解决的值
- 内部实现上，可以理解为基于生成器（Generator）和 Promise 的自动执行器

### 4. 如何处理并发请求？

**参考答案：**
处理并发请求主要有两种模式：

1. **并行执行**：使用 Promise.all()同时执行多个异步操作

```javascript
async function fetchAllData() {
  const [users, posts, comments] = await Promise.all([fetchUsers(), fetchPosts(), fetchComments()])
  return { users, posts, comments }
}
```

2. **控制并发数量**：使用库如 p-limit 或自行实现并发控制

```javascript
async function fetchWithConcurrencyLimit(urls, limit = 3) {
  const results = []
  const executing = new Set()

  for (const url of urls) {
    const p = fetch(url).then(r => r.json())
    results.push(p)
    executing.add(p)

    p.then(() => executing.delete(p))
    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }

  return Promise.all(results)
}
```

### 5. Promise 链式调用如何中断？

**参考答案：**
Promise 本身无法真正"中断"，因为 Promise 一旦创建就会执行。但可以通过以下几种方式模拟中断：

1. 使用条件判断跳过后续操作：

```javascript
Promise.resolve()
  .then(() => {
    if (condition) {
      return Promise.reject(new Error('中断'))
    }
    return someValue
  })
  .then(value => {
    // 如果前面已经reject，这里不会执行
  })
  .catch(err => {
    if (err.message === '中断') {
      // 处理中断逻辑
    } else {
      // 处理其他错误
    }
  })
```

2. 利用 Symbol 创建特殊错误：

```javascript
const BreakError = Symbol('Break')

Promise.resolve()
  .then(() => {
    throw BreakError
  })
  .then(() => {
    // 不会执行
  })
  .catch(err => {
    if (err === BreakError) {
      // 正常中断，不是真正的错误
      return
    }
    // 处理真正的错误
    throw err
  })
```

### 6. 如何实现 Promise 的超时控制？

**参考答案：**
可以使用 Promise.race()实现超时控制：

```javascript
function timeoutPromise(ms, promise) {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('操作超时')), ms))
  return Promise.race([promise, timeout])
}

// 使用示例
const fetchWithTimeout = timeoutPromise(5000, fetch('https://api.example.com/data'))
fetchWithTimeout
  .then(response => response.json())
  .catch(error => {
    if (error.message === '操作超时') {
      console.log('请求超时')
    } else {
      console.error('请求失败', error)
    }
  })
```

### 7. async/await 相比 Promise 有什么优势？

**参考答案：**
async/await 相比 Promise 的主要优势：

1. **更清晰的语法**：代码结构更接近同步代码，易于阅读和理解
2. **更好的错误处理**：可以使用传统的 try/catch 捕获异常，而不是链式的.catch()
3. **更容易调试**：可以在 await 处设置断点，逐步调试
4. **避免回调地狱**：即使是链式 Promise，嵌套层级过多也会降低可读性
5. **条件语句处理更自然**：在 async 函数中可以轻松使用 if/else 等条件语句，而 Promise 链中则较为复杂

示例对比：

```javascript
// Promise链
function loadData() {
  return fetchUser().then(user => {
    return fetchProfile(user.id).then(profile => {
      return fetchPosts(profile.id).then(posts => {
        return { user, profile, posts }
      })
    })
  })
}

// async/await
async function loadData() {
  try {
    const user = await fetchUser()
    const profile = await fetchProfile(user.id)
    const posts = await fetchPosts(profile.id)
    return { user, profile, posts }
  } catch (error) {
    console.error('Error:', error)
  }
}
```
