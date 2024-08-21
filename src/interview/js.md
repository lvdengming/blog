# JS 知识点

## 数据类型

### 基本数据类型

number、string、boolean、null、undefined、symbol、bigint、object

### NaN 是什么，用`typeof`执行结果

**全局属性** NaN 是一个表示非数字的值

> 浏览器环境中 `window.NaN`

```js
typeof NaN; // 'number'
```

判断方式：

```js
Object.is(NaN, NaN); // true
window.isNaN(NaN); // true, 可将传入的值自动转换为数字
Number.isNan(NaN); // true, 传入的值必须是 NaN，不进行转换
```

MDN：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

## 事件循环机制

理解：

-   宏任务：一些大粒度的操作，例如 `setTimeout`、`setInterval`
-   微任务：一些小粒度的操作，例如 `Promise.then`、`MutationObserver`

执行顺序：

**每次**事件循环都会执行一个宏任务，执行完毕后立即执行微任务队列中**所有**微任务

关键字：主线程、执行栈、宏任务队列、微任务队列

> 注意：
>
> 1. 当 JavaScript 引擎开始执行代码时，它首先会执行全局代码，这部分代码本质上也是一个宏任务
> 2. 异步任务一旦完成，相关的回调函数会被放入任务队列（宏任务队列或微任务队列）

:::details
ME: 执行异步任务的是主线程吗?

GPT:是的，在 JavaScript 中，执行异步任务的确是由主线程完成的。

1. **JavaScript 的单线程模型**

    - JavaScript 是单线程语言，这意味着它只有一个主线程负责执行所有的代码，包括同步任务和异步任务。
    - 主线程是浏览器或 Node.js 运行 JavaScript 代码的唯一线程，它负责执行所有的 JavaScript 代码，包括全局代码、函数调用、事件处理等。

2. **异步任务的处理过程**

    - 当遇到异步任务时，例如 `setTimeout`、`Promise`、`AJAX` 请求等，JavaScript 并不会阻塞主线程去等待任务完成。
    - 相反，这些异步操作会被交给浏览器或 Node.js 的某些“后台线程”或“外部环境”来处理。例如：
        - `setTimeout` 是由浏览器的计时器机制来处理。
        - I/O 操作通常是由操作系统的线程来处理。

3. **事件循环的作用**

    - 异步任务一旦完成，相关的回调函数会被放入任务队列（宏任务队列或微任务队列）。
    - 主线程的事件循环（Event Loop）负责不断检查这些队列。当主线程的执行栈为空时，事件循环会将任务队列中的任务取出，并将其放入主线程的执行栈中执行。

4. **主线程最终执行异步任务的回调**

    - 虽然某些异步操作（如计时器或 I/O）是由浏览器或 Node.js 的后台线程处理的，但异步操作的回调函数最终仍然是在主线程上执行的。
    - 一旦主线程空闲下来，事件循环会将异步任务的回调函数放入执行栈，然后由主线程执行。

5. **示例**

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout');
}, 1000);

console.log('End');
```

执行过程：

1. 主线程首先执行同步代码，输出 `'Start'`。
2. `setTimeout` 被调用时，计时器由浏览器后台处理，`setTimeout` 的回调被放入宏任务队列。
3. 主线程继续执行同步代码，输出 `'End'`。
4. 主线程空闲后，事件循环将宏任务队列中的回调函数放入执行栈，最终由主线程执行 `'Timeout'`。

输出结果：

```
Start
End
Timeout
```

6. **总结**

虽然异步任务的具体操作（如计时、I/O 等）可能在浏览器或 Node.js 的后台线程中处理，但这些任务的回调函数最终仍然是在主线程上执行的。因此，主线程既负责执行同步任务，也负责在合适的时机执行异步任务的回调函数。这是 JavaScript 单线程模型的一部分。

:::
