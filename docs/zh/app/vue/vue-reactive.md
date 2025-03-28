# Vue 响应式原理

## 背景介绍

Vue 的响应式系统是其核心特性之一，它能够自动追踪数据变化并更新视图。Vue2 使用 Object.defineProperty 实现响应式，而 Vue3 则使用 Proxy 实现，这带来了更好的性能和更完善的功能。

## Vue2 响应式原理

### 1. Object.defineProperty 实现

```javascript
// 简化的响应式实现
function defineReactive(obj, key) {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    set(newVal) {
      if (newVal === value) return
      value = newVal
      // 触发更新
      dep.notify()
    },
  })
}

// 使用示例
const data = {
  name: 'Vue',
  age: 2,
}

// 遍历对象，为每个属性添加响应式
Object.keys(data).forEach(key => {
  defineReactive(data, key)
})
```

### 2. 依赖收集与更新

```javascript
class Dep {
  constructor() {
    this.subs = []
  }

  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target)
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
  }

  get() {
    Dep.target = this
    const value = this.vm[this.exp]
    Dep.target = null
    return value
  }

  update() {
    const newVal = this.vm[this.exp]
    if (this.value !== newVal) {
      this.value = newVal
      this.cb(newVal)
    }
  }
}
```

## Vue3 响应式原理

### 1. Proxy 实现

```javascript
// 简化的响应式实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== value) {
        // 触发更新
        trigger(target, key)
      }
      return result
    },
  })
}

// 使用示例
const state = reactive({
  name: 'Vue3',
  age: 3,
})
```

### 2. ref 与 reactive 的区别

```javascript
import { ref, reactive } from 'vue'

// ref 用于基本类型
const count = ref(0)
console.log(count.value) // 0

// reactive 用于对象
const state = reactive({
  count: 0,
})
console.log(state.count) // 0
```

## 常见问题

### 1. Vue2 响应式系统的限制

```javascript
// 1. 无法检测对象属性的添加和删除
const vm = new Vue({
  data: {
    obj: {},
  },
})
vm.obj.newProp = 'value' // 非响应式

// 2. 无法检测数组索引和长度的变化
vm.items[index] = newValue // 非响应式
vm.items.length = 2 // 非响应式
```

### 2. Vue3 的优势

```javascript
// 1. 可以检测对象属性的添加和删除
const state = reactive({})
state.newProp = 'value' // 响应式

// 2. 可以检测数组索引和长度的变化
const arr = reactive([])
arr[0] = 'value' // 响应式
arr.length = 2 // 响应式
```

## 最佳实践

1. **数据声明**

   - 优先使用 `reactive` 声明对象
   - 使用 `ref` 声明基本类型
   - 避免直接修改响应式数据

2. **性能优化**

   - 合理使用 `shallowRef` 和 `shallowReactive`
   - 避免深层嵌套的响应式数据

3. **注意事项**
   - 解构响应式对象会失去响应性
   - 使用 `toRef` 保持响应性

## 面试题

1. **Vue2 和 Vue3 的响应式原理有什么区别？**

```javascript
// 答案要点：
// 1. Vue2 使用 Object.defineProperty
// 2. Vue3 使用 Proxy
// 3. Vue3 可以检测更多类型的变化
// 4. Vue3 性能更好
```

2. **为什么 Vue3 选择使用 Proxy？**

```javascript
// 答案要点：
// 1. 可以监听对象属性的添加和删除
// 2. 可以监听数组的变化
// 3. 性能更好，不需要递归遍历
// 4. 可以监听 Map、Set 等数据结构
```

3. **Vue 的响应式系统是如何工作的？**

```javascript
// 答案要点：
// 1. 依赖收集：在 get 中收集依赖
// 2. 触发更新：在 set 中触发更新
// 3. 发布订阅模式
// 4. 异步更新队列
```
