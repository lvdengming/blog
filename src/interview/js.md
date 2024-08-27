# JS 知识点

## 数据类型

### 基本数据类型

number、string、boolean、null、undefined、symbol、bigint

存放位置：

-   函数的**参数和局部变量**是放在**栈**中的
-   **对象**是放在**堆**中的

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

## 闭包是什么？有什么用？

红宝书：闭包是引用了另一个函数作用域中变量的函数

特点：

-   **嵌套函数**：闭包涉及到函数的嵌套，即在一个函数内部定义另一个函数
-   **访问外部变量**：内层函数可以访问外层函数中的变量，即使外层函数已经执行完毕
-   **持久化的环境**：闭包能够记住外层函数中的变量并持续持有它们，即使外层函数已经返回

作用：

-   **数据封装**：闭包可以用来创建私有变量和函数，从而避免数据被外部代码直接修改
-   **模块化封装**：函数柯里化

:::details

闭包（Closure）是编程中的一种技术概念，特别常见于函数式编程语言中，如 JavaScript、Python 等。闭包指的是一个函数与其外部环境（通常是函数外部的变量）的一种结合。换句话说，闭包允许一个函数在定义时记住它所处的作用域，即使这个函数在其定义作用域之外被调用。

### 闭包的特点：

1. **嵌套函数**：闭包涉及到函数的嵌套，即在一个函数内部定义另一个函数。
2. **访问外部变量**：内层函数可以访问外层函数中的变量，即使外层函数已经执行完毕。
3. **持久化的环境**：闭包能够记住外层函数中的变量并持续持有它们，即使外层函数已经返回。

### 闭包的用途：

1. **数据封装**：闭包可以用来创建私有变量和函数，从而避免数据被外部代码直接修改。通过闭包可以实现类似于类的私有属性和方法的效果。

    例子（JavaScript）：

    ```javascript
    function createCounter() {
        let count = 0;
        return function () {
            count++;
            return count;
        };
    }

    const counter = createCounter();
    console.log(counter()); // 输出 1
    console.log(counter()); // 输出 2
    ```

2. **回调函数和异步编程**：闭包广泛应用于回调函数中，特别是在异步编程中。闭包使得回调函数可以访问到它被创建时的上下文数据。

    例子（JavaScript）：

    ```javascript
    function fetchData(url, callback) {
        let data = '从' + url + '获取的数据'; // 模拟从 URL 获取数据
        setTimeout(function () {
            callback(data);
        }, 1000);
    }

    fetchData('https://example.com', function (result) {
        console.log(result); // 输出 从https://example.com获取的数据
    });
    ```

3. **模块化编程**：通过闭包，可以创建模块化的代码结构，在不污染全局命名空间的情况下，封装功能和数据。

    例子（JavaScript）：

    ```javascript
    const module = (function () {
        let privateVariable = '我是私有的';
        function privateFunction() {
            console.log(privateVariable);
        }
        return {
            publicFunction: function () {
                privateFunction();
            }
        };
    })();

    module.publicFunction(); // 输出 我是私有的
    ```

闭包的这种能力使得它在很多高级编程模式中非常有用，尤其是在需要持久化状态或封装数据的情况下。

:::

## 内存泄露场景有哪些？

内存泄露发生在程序使用了不再需要的内存而没有释放它，导致内存占用不断增加

常见场景如下：

-   **事件监听**：监听器引用的外部变量或对象将无法被垃圾回收
-   **闭包**：闭包变量引用的 DOM 元素、大型对象将无法回收
-   **全局变量**：全局变量在整个应用周期都会存在
-   **定时器和回调函数**：setTimeout、setInterval、回调函数

> **DOM 元素未及时清理的引用**：即使页面看不到，内存仍然被占用
> 可使用 `Chrome DevTools -> Memory` 进行定位
