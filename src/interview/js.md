# JS

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

## 事件循环机制-场景题

场景题一：

:::details

```js
for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
        console.log(i);
    });
}
setTimeout(() => console.log('a'));
console.log(100);
new Promise(() => {
    console.log(200);
    setTimeout(() => console.log('b'));
    throw new Error();
})
    .then(() => {
        console.log(300);
    })
    .catch(() => {
        console.log(400);
    })
    .then(() => {
        console.log(600);
    });

// 打印结果（按照事件循环机制进行分组）：
// 100
// 200
// 400
// 600

// 6

// 6

// 6

// 6

// 6

// a

// b
```

> 需要注意的是`Promise.prototype.then()、Promise.prototype.catch()`返回的都是`Promise`对象，故在`catch()`后面还可以使用`then()`
> promise 所有实例方法在同一个微任务队列中

:::

**async/await** 存在时：await 之前的部分可以看成 new Promise 中的主体部分，属于主线程，await 之后的部分可以看成 then 的部分，属于微任务

场景题二：

:::details

```js{3}
async function async1() {
    console.log('async1 start');
    await async2(); // 这里值得注意，async2 中 await 之前仍然是主线程
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(() => console.log('setTimeout'), 0);
async1();
new Promise((resolve) => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('promise2');
});
console.log('script end');

// 打印结果（按照事件循环机制进行分组）：
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2

// setTimeout
```

:::

场景题三：

:::details

```js
async1();
setTimeout(() => {
    console.log('1');
    new Promise((resolve) => {
        console.log('2');
        resolve();
    }).then(() => {
        console.log('3');
    });
});
new Promise((resolve) => {
    console.log('4');
    resolve();
}).then(() => {
    console.log('5');
});
async function async1() {
    console.log('6');
    await async2();
    console.log('7');
}
async function async2() {
    console.log('8');
}
setTimeout(() => {
    console.log('9');
    new Promise((resolve) => {
        console.log('10');
        resolve();
    }).then(() => {
        console.log('11');
    });
});
console.log('12');

// 打印结果（按照事件循环机制进行分组）：
// 6
// 8
// 4
// 12
// 7
// 5

// 1
// 2
// 3

// 9
// 10
// 11
```

:::

Promise 回调函数内部 `resolve(xxx)` 之后，还会继续执行后续代码并且是主线程执行的同步任务，除非使用 `return resolve(xxx)`。promise 的所有实例方法都是微任务，会按照顺序一次性放到微任务队列中

场景题四：

:::details

```js
setTimeout(() => {
    console.log(1);
});
new Promise((resolve) => {
    console.log(2);
    resolve();
    console.log(3);
})
    .then(() => {
        console.log(4);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });
console.log(7);

// 打印结果（按照事件循环机制进行分组）：
// 2
// 3
// 7
// 4
// 5
// 6

// 1
```

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

## 栈溢出场景判断及原因

如下代码会导致栈溢出：

```js
function foo() {
    foo();
}

foo();
```

这样处理则不会导致栈溢出：

```js
function foo() {
    setTimeout(foo);
}

foo();
```

分析如下：

在同步执行情况下，函数会等待内部执行结束才会出栈，因为递归不断调用自身，则会导致栈溢出

在异步执行情况下，函数不会等待异步执行结束而直接结束自身，此时栈中一直只有一个函数上下文，不会导致栈溢出

## DocumentFragment

文档片段接口，表示一个没有父对象的最小文档对象。本身就和 document 对象一样，不过它不是真实 DOM，它的变化不会触发 DOM 树的重新渲染，且不会对性能产生影响

> 这是一个性能优化特性，可用来批量操作 DOM

基本使用：

```js
const list = document.querySelector('#list');
const fruits = ['Apple', 'Orange', 'Banana', 'Melon'];

const fragment = new DocumentFragment();

fruits.forEach((fruit) => {
    const li = document.createElement('li');
    li.textContent = fruit;
    fragment.appendChild(li);
});

list.appendChild(fragment);
```

MDN: [https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)

## Map 和 Object 的区别

1. 键的类型不同：`Map` 的键可以是**任意**类型；`Object` 的键只能是字符串或 `Symbol` 类型，其它类型的键会被自动转换为字符串
2. 键的顺序不同：`Map` 保留了元素的插入顺序；`Object` 没有明确的键顺序，自 ES6 开始按照<u>整数键（按照升序）、字符串键（按照插入顺序）、Symbol 键（按照插入顺序）</u>
3. 内置属性和方法不同：`Map` 有更多 api 方便操作，例如 `size`、`set()`、`get()` 等
4. 属性变更的性能不同：`Map` 频繁添加、删除属性时更加高效

总的来说：`Object` 适用于结构化的数据，`Map` 适用于需要频繁增删键值对、保持键值对插入顺序的场景

> JS Map 是一种专为键值对存储设计的数据结构，底层基于哈希表（hash table）实现，在频繁增删键值对时性能更高
> Object 由于键自动转换（非字符串、Symbol）、键的自动排序等原因，在频繁增删键值对时性能更低

### 箭头函数与普通函数的区别

1. 箭头函数语法更加简洁、清晰
2. 箭头函数不会创建自己的`this`，它只会从自己的作用域链的上一层继承`this`
3. 箭头函数继承而来的`this`指向永远不变
4. `call`/`apply`/`bind`无法改变箭头函数中`this`的指向
5. 箭头函数不能作为构造函数使用
6. 箭头函数没有自己的`arguments`
7. 箭头函数没有原型
8. 箭头函数不能用作`Generator`函数，不能使用`yield`关键字

## `for` 和 `forEach` 的区别

1. 用途：`for` 可以遍历数组、字符串、对象，`forEach` 只能遍历数组
2. 灵活性：`for` 可使用 `break`、`continue`， 非常灵活，可以中途退出；`forEach` 更加简洁，无法中途退出，**但可以抛出异常退出**
3. 性能：`for` 通常更快，`forEach` 因为**回调函数的调用形式**可能较慢，尤其在大型数组
4. 上下文：`for` 不支持，`forEach` 可通过第二个参数传递上下文
5. 返回值：`for` 没有返回值，`forEach` 总是返回 `undefined`

**选择建议**: 若需更灵活的控制或在遍历中使用 `break`、`continue`，选 `for`；若想要简洁代码且**只遍历**数组，选 `forEach`

## `==` 和 `===` 的区别

`==` 和 `===` 都是用于比较的操作符，但是有关键的区别：

1. `==`（宽松相等）：进行比较时**会执行类型转换**，也就是说，如果两个值的类型不同，JS 会尝试将它们转换为相同的类型，然后再进行比较
2. `===`（严格相等）：进行比较时**不会执行类型转换**，只有在值和类型都相同的情况下，才会返回 `true`

补充 `==` 类型转换，当等号两端类型不一致时：

-   `null` 和 `undefined` 相等，只等于彼此
-   其它原始值类型，转数字
-   对象，转原始值

## `null` 和 `undefined` 的区别

`undefined` 表示一个变量已经声明但还没有被赋值，或者对象中访问不存在的属性时的默认值

`null` 表示一个“空”的值，通常用于显式地表明某个变量目前没有值，或者想要将其设置为空

## 对象的原始值运算

```js
(![] + [])[+!![] + !![] + !![]] + ([] + {})[+!![] + !![]]; // 打印 sb
```

其中：

-   `![]` 转换为 `boolean` 是 `false`，`[]` 转换为原始值是空字符串
-   `!![]` 是将数组转换为 `boolean` 是 `true`，三个相加进行运算会转换为数字 `1 + 1 + 1`
-   `{}` 转换为原始值是 `'[object Object]'`
