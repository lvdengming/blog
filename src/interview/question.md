# 面试知识点（一）

## 1. JS

### 1.2 [Promise](https://es6.ruanyifeng.com/#docs/promise)

1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected

> 若在回调函数中不调用 resolve、reject 方法，那么 Promise 状态就会一直处于 pending，不会进入后续的 then、catch 方法

有如下方法：

1. [Promise.prototype.then()](https://es6.ruanyifeng.com/#docs/promise#Promise-prototype-then)
    1. then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数，它们都是可选的
    2. then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）
2. [Promise.prototype.catch()](https://es6.ruanyifeng.com/#docs/promise#Promise-prototype-catch)
    1. Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数
    2. catch 方法返回的是一个新的 Promise 实例
3. [Promise.prototype.finally()](https://es6.ruanyifeng.com/#docs/promise#Promise-prototype-finally)
    1. finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的
    2. finally 方法没有返回值（undefined）
4. [Promise.all()](https://es6.ruanyifeng.com/#docs/promise#Promise-all)
    1. Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
    2. 以这段代码为例：`const p = Promise.all([p1, p2, p3])`，p 的状态由 p1、p2、p3 决定，分成两种情况：
        1. 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数
        2. 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数
5. [Promise.allSettled()](https://es6.ruanyifeng.com/#docs/promise#Promise-allSettled)
    1. ES2020 引入了 Promise.allSettled()方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况
    2. 以这段代码为例：`const p = Promise.allSettled([p1, p2, p3])`，等所有异步操作完成后，会返回一个 Promise 对象，该对象携带一个结果数组，每个元素内容如下：
        1. 成功：`{ status: 'fulfilled', value: 'zhangsan' }`
        2. 失败：`{ status: 'rejected', reason: 'wangwu' }`
6. [Promise.race()](https://es6.ruanyifeng.com/#docs/promise#Promise-race)
    1. Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例
    2. 以这段代码为例：`const p = Promise.race([p1, p2, p3]);`：
        1. 只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数
        2. Promise.race()方法的参数与 Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的 Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理
7. [Promise.any()](https://es6.ruanyifeng.com/#docs/promise#Promise-any)
    1. ES2021 引入了 Promise.any()方法。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回
    2. 只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态
    3. Promise.any()跟 Promise.race()方法很像，只有一点不同，就是 Promise.any()不会因为某个 Promise 变成 rejected 状态而结束，必须等到所有参数 Promise 变成 rejected 状态才会结束
8. [Promise.resolve()](https://es6.ruanyifeng.com/#docs/promise#Promise-resolve)
    1. 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用
    2. Promise.resolve()方法的参数分成四种情况：详情请点击标题跳转查看
9. [Promise.reject()](https://es6.ruanyifeng.com/#docs/promise#Promise-reject)
    1. Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected

### 1.3 宏任务、微任务事件轮询

参考链接：https://juejin.cn/post/6844903657264136200

执行顺序：主线程 > 微任务 > 宏任务

属于微任务（micro task）的有：Promise.prototype.(then, catch, finally)、process.nextTick、MutationObserver

属于宏任务（macro task）的有：setTimeout、setInterval、setImmediate、I/O

> 注：Promise 回调函数中的部分属于主线程，**简单理解**，添加的宏任务、微任务都存在于任务（消息）队列中

案例：

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

// 输出：
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

**async/await**简单理解：await 之前的部分可以看成 new Promise 中的主体部分，属于主线程，await 之后的部分可以看成 then 的部分，属于微任务

案例：

```js
async function async1() {
    console.log('async1 start');
    await async2(); // 这里值得注意，async2中await之前仍然是主线程
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

// 输出：
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

### 1.4 防抖节流

参考链接：https://segmentfault.com/a/1190000018428170

**防抖（debounce）：**

短时间内大量触发同一事件，**只会执行最后一次**。代码如下：

```js
function debounce(fn, delay) {
    let timer = null; // 借助了闭包
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
}
```

> 闭包指的是那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的（来自红宝书），可以用来创建私有变量

**节流（throttle）：**

短时间内大量触发同一事件，**在函数执行一次之后，该函数在指定的时间期限内不再工作**，直至过了这段时间才重新生效

```js
function throttle(fn, delay) {
    let valid = true; // 是否处于工作状态
    return function () {
        if (!valid) return false; // 休息时间，暂不工作
        valid = false; // 工作时间，在间隔期状态设为无效
        setTimeout(() => {
            fn();
            valid = true;
        }, delay);
    };
}
```

> 请注意，节流函数并不止上面这种实现方案。例如可以完全不借助 setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。也可以直接将 setTimeout 的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行 fn 之后消除定时器表示激活，原理都一样

使用时间戳作为判断条件：

```js
function throttle(fn, delay) {
    let timestamp = 0;
    return function () {
        const now = Date.now();
        if (now - timestamp <= delay) return false;
        timestamp = now;
        setTimeout(fn, delay);
    };
}
```

使用 setTimeout 的返回的标记当做判断条件：

```js
function throttle(fn, delay) {
    let timer = null;
    return function () {
        if (timer) return false;
        timer = setTimeout(() => {
            fn();
            timer = null;
        }, delay);
    };
}
```

应用场景：

1. 搜索框 input 事件，例如要支持输入实时搜索可以使用节流方案
2. 页面 resize 事件，常见于需要做页面适配的时候。需要根据最终呈现的页面情况进行 dom 渲染（这种情形一般是使用防抖，因为只需判断最后一次的变化情况）

### 1.5 [XSS 和 CSRF](https://www.cnblogs.com/zhiying/p/11018331.html)【安全】

参考链接：

-   https://juejin.cn/post/6844903942036389895
-   简单讲解了伪造过程：https://www.cnblogs.com/54chensongxia/p/11693666.html

**1.XSS（Cross Site Scripting）跨站脚本攻击：页面渲染的数据中包含可运行的脚本**

**2.CSRF（Cross Site Request Forgy）跨站请求伪造：在第三方网站向本网站发起请求**

预防方案：1.验证请求头中的`Referer`字段，2.使用`token`(不能放到 Cookie 中存储)，3.使用手机验证码等

### 1.6 箭头函数与普通函数的区别

1. 箭头函数语法更加简洁、清晰
2. 箭头函数不会创建自己的`this`，它只会从自己的作用域链的上一层继承`this`
3. 箭头函数继承而来的`this`指向永远不变
4. `call`/`apply`/`bind`无法改变箭头函数中`this`的指向
5. 箭头函数不能作为构造函数使用
6. 箭头函数没有自己的`arguments`
7. 箭头函数没有原型
8. 箭头函数不能用作`Generator`函数，不能使用`yeild`关键字

### 1.7 手写系列

**1.call：**

```js
Function.prototype.myCall = function (context) {
    context = typeof context === 'object' ? context : window;
    // 声明一个独有的Symbol属性，防止覆盖已有属性
    const fn = Symbol('function');
    // 获取传入的参数
    const args = [...arguments].slice(1);
    // 将函数挂载到传入的对象
    context[fn] = this;
    // 执行方法
    const res = context[fn](...args);
    // 移除对象的方法
    Reflect.deleteProperty(context, fn);
    return res;
};
```

**2.apply：**

```js
Function.prototype.myApply = function (context) {
    context = typeof context === 'object' ? context : window;
    // 声明一个独有的Symbol属性，防止覆盖已有属性
    const fn = Symbol('function');
    // 获取传入的参数
    const args = arguments[1];
    // 限制参数类型
    if (!Array.isArray(args)) {
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    // 将函数挂载到传入的对象
    context[fn] = this;
    // 执行方法
    const res = context[fn](...args);
    // 移除对象的方法
    Reflect.deleteProperty(context, fn);
    return res;
};
```

**3.bind：**

```js
Function.prototype.myBind = function (context) {
    context = typeof context === 'object' ? context : window;
    // 获取创建时传入的参数
    const innerArgs = [...arguments].slice(1);
    return (...outerArgs) => this.call(context, ...innerArgs, ...outerArgs);
};
```

**4.new：**

参考链接：https://juejin.cn/post/6844903937405878280

```js
function _new(Obj, ...args) {
    // 基于Obj的原型创建一个对象
    const obj = Object.create(Obj.prototype);
    // 添加属性到obj上，并获取构造函数的执行结果
    const res = Obj.apply(obj, args);
    // 如果执行结果有返回值，并且是一个对象，则返回执行的结果；否则返回新创建的对象
    return typeof res === 'object' ? res : obj;
}
```

> 构造函数如果存在返回值（`return`）：
>
> 1. 返回值为对象：则`new`出来的值就是返回的对象
> 2. 返回值为非对象：没有影响

**5.发布订阅（eventBus）**

参考链接：https://blog.51cto.com/u_15060510/3464172

发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知

```js
// 发布-订阅
class EventEmitter {
    // 用来存放注册的事件与回调
    constructor() {
        this._events = {};
    }

    // 订阅事件
    on(eventName, callback) {
        // 由于一个事件可能注册多个回调函数，所以使用数组来存储事件队列
        const callbacks = this._events[eventName] || [];
        callbacks.push(callback);
        this._events[eventName] = callbacks;
    }

    // 发布事件
    emit(eventName, ...args) {
        const callbacks = this._events[eventName] || [];
        callbacks.forEach((cb) => cb(...args));
    }

    // 取消订阅
    off(eventName, callback) {
        const callbacks = this._events[eventName] || [];
        // cb !== initialCallback用于取消once订阅
        const newCallbacks = callbacks.filter(
            (cb) => cb !== callback && cb.initialCallback !== callback
        );
        this._events[eventName] = newCallbacks;
    }

    // 单次订阅，发布后取消订阅
    once(eventName, callback) {
        // 由于：需要在回调函数执行后，取消订阅当前事件
        // 所以：需要对传入的回调函数做一层包装，然后绑定包装后的函数
        const one = (...args) => {
            callback(...args);
            this.off(eventName, one);
        };
        // 需要考虑订阅未发布情况下，取消订阅
        // 由于：订阅事件的时候，修改了原回调函数的引用，用户取消订阅时不能找到对应的回调函数
        // 所以：需要在当前函数与用户传入的回调函数做一个绑定，添加自定义属性来实现
        one.initialCallback = callback;
        this.on(eventName, one);
    }
}
```

**6.`Promise.all()`**

```js
Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
        const result = [];
        let count = 0;
        for (const p of promises) {
            // p可能不是promise，需要通过Promise.resolve进行转换
            Promise.resolve(p)
                .then((res) => {
                    result.push(res);
                    if (++count === promises.length) {
                        resolve(result);
                    }
                })
                .catch((err) => reject(err));
        }
    });
};
```

**7.`Promise.race()`**

```js
Promise.myRace = function (promises) {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            Promise.resolve(promise)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        }
    });
};
```

**8.循环打印红绿灯**（校招高途面试）

效果：红灯亮 3s，黄灯亮 1s，绿灯亮 3s，如此往复

```js
function show(light) {
    console.log(light);
}

// 1.通过回调函数
const task1 = (light, time, callback) => {
    show(light);
    setTimeout(() => callback(), time);
};

const step1 = () => {
    task1('红灯', 3000, () => {
        task1('黄灯', 1000, () => {
            task1('绿灯', 3000, step);
        });
    });
};

// 2.通过Promise
const task2 = (light, time) => {
    return new Promise((resolve, reject) => {
        show(light);
        setTimeout(() => resolve(), time);
    });
};

const step2 = () => {
    task2('红灯', 3000)
        .then(() => task('黄灯', 1000))
        .then(() => task('绿灯', 3000))
        .then(() => step());
};

// 3.通过async/await
const step3 = async () => {
    await task2('红灯', 3000);
    await task2('黄灯', 1000);
    await task2('绿灯', 3000);
    step3();
};

// 查看效果
// step1()/step2()/step3();
```

**9.用 CSS 实现如下效果（align-self）**

<img src="https://img2022.cnblogs.com/blog/1622292/202208/1622292-20220803133100201-1156664669.png" width="400"/>

```html
<div class="wrapper">
    <div></div>
    <div></div>
    <div></div>
</div>
```

```css
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    height: 350px;
    border: 1px solid #ccc;
    margin: 100px auto;
    padding: 5px;
}

.wrapper div {
    width: 150px;
    height: 100px;
    background-color: cadetblue;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 100px;
}

.wrapper div:first-child {
    align-self: flex-start;
}

.wrapper div:last-child {
    align-self: flex-end;
}
```

**10.控制并发请求**

描述：

```js
function handleRequest(urls, count);
urls: 请求数组列表
count：并发数控制
```

参考链接：https://juejin.cn/post/6976028030770610213

若请求 count 个链接，请求完再进行下一批请求，实现如下：

```js
async function handleRequest(urls, count) {
    const result = [];
    for (let i = 0; i < urls.length; i += count) {
        const promises = urls.slice(i, i + count).map((url) => request(url));
        const res = await Promise.all(promises);
        result.push(...res);
    }
    return result;
}

function request(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('data->' + url), 1000);
    });
}
```

题目的含义更倾向于**同时请求并发数控制**，当一个请求完成后，使用其它 ulr 继续进行请求

```js
async function handleRequest(urls, count) {
    // 存储所有的异步任务
    const ret = [];
    // 存储正在执行的异步任务
    const executing = [];
    for (const url of urls) {
        // 创建异步任务
        const p = Promise.resolve().then(() => request(url));
        ret.push(p);
        // 并发控制
        if (count < urls.length) {
            // 异步任务执行完成后，退出执行列表
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            // 达到并发数，需要进行等待
            if (executing.length >= count) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
}

function request(url) {
    return new Promise((resolve, reject) => {
        console.log(`url: ${url}, is requesting...`);
        setTimeout(() => resolve('data->' + url), url);
    });
}
```

### 1.8 深度克隆

参考链接：https://segmentfault.com/a/1190000019887233

**方法一：递归**

```js
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}
```

循环引用：

```js
const obj = { name: 'zhangsan', age: 22 };
obj.circular = obj;
```

通过`WeakMap`解决：

```js
const wm = new WeakMap();
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (wm.has(obj)) return wm.get(obj);
    let newObj = Array.isArray(obj) ? [] : {};
    wm.set(obj, newObj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}
```

> 补充：`WeakSet`**只能**存储对象，`WeakMap`的 key**只能**是对象，value 可以是其它类型的值。两者都是对对象的**弱引用**，即不影响该对象的垃圾回收，`WeakMap`的 value 对引用类型是强引用。在循环案例中使用`WeakMap`是为了避免被克隆对象不能及时回收，导致内存泄露

**方法二：`JSON.stringify()`**

```js
const newObj = JSON.parse(JSON.stringify(obj));
```

> -   如果 obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果，时间将只是字符串的形式。而不是时间对象；
> -   如果 obj 里有 RegExp、Error 对象，则序列化的结果将只得到空对象；
> -   如果 obj 里有 function，Symbol 类型，undefined，则序列化的结果会把函数或 undefined 丢失；
> -   如果 obj 里有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null
> -   JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果 obj 中的对象是有构造函数生成的， 则使用 JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的 constructor；

**方法三：`MessageChannel`**

参考链接：https://juejin.cn/post/6995449206085255175

Channel Messaging API 的**`MessageChannel`** 接口允许我们创建一个新的消息通道，并通过它的两个[`MessagePort`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort) 属性发送数据

```js
const obj = { name: 'zhangsan', age: 22 };
const { port1, port2 } = new MessageChannel();
// 发消息
port1.postMessage(obj);
// 收消息
port2.onmessage = (e) => {
    console.log(e.data); // {name: 'zhangsan', age: 22}
    console.log(e.data === obj); // false
};
```

> API 和 Web Worker 类似，用 postMessage 发消息，onmessage 收消息

### 1.9 原型链

ECMA-262 把原型链定义为 ECMAScript 的主要继承方式。

其基本思想就是通过原型继承多个引用类型的属性和方法。

重温一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。

如果原型是另一个类型的实例呢？那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。这就是原型链的基本构想。

**原型：**

```js
function Person() {}
const zhangsan = new Person();
console.log(zhangsan.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true
// 构造函数的原型对象是通过Object构造函数生成的
console.log(Person.prototype.__proto__ === Object.prototype); // true
// Object.prototype.__proto__为null
console.log(Object.prototype.__proto__); // null
```

**原型链：**

```js
function Animal() {}
function Person() {}
Person.prototype = new Animal();
const zhangsan = new Person();
console.log(zhangsan.__proto__.__proto__ === Animal.prototype); // true
```

> 只有原型为`Object`创建的对象或者`Object.prototype`默认才有`constructor`属性

### 1.10 性能优化

参考链接：https://segmentfault.com/a/1190000022205291

-   防抖、节流
-   精灵图
-   静态资源使用 CDN
-   打包压缩
-   路由组件按需加载

……

### 1.11 `0.1 + 0.2 !== 0.3`

参考链接：https://juejin.cn/post/6844903680362151950

因为计算机不能精确表示 0.1， 0.2 这样的浮点数（IEEE 754），计算时使用的是带有舍入误差的数

> **精度损失可能出现在进制转化和对阶运算过程中**

### 1.12 打点

参考链接：http://blog.yunishare.cn/2021/01/web-report-methods-compare.html

-   接口请求：通过 AJAX/Fetch 方式请求后端接口，不会阻塞页面，支持 GET/POST，跨域需要进行特殊处理，开销较大
-   图片打点：通过`img.src=xxx`形式进行打点，通常是 1\*1px 大小的 GIF 图片，不会阻塞页面，只能使用 GET 方式，支持跨域，开销很小
-   navigator.sendBeacon：比较新的 API，不会阻塞页面，通过 POST 方式将打点数据发送到服务端，即使页面关闭，也不会影响其数据的发送，开销较小，IE 浏览器不支持

> 通常使用`navigator.sendBean`方式进行上报，若浏览器不支持该方式再用图片打点（兜底）进行上报

### 1.13 JS 判断是否是数组

参考链接：https://www.cnblogs.com/echolun/p/10287616.html

**1.`通过instanceof`判断**==可能出问题==

```js
console.log([] instanceof Array); // true
```

> `instanceof`**运算符**用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上

**2.通过 constructor 判断**==可能出问题==

```js
const nums = [1, 2, 3];
console.log(nums.constructor === Array); // true
```

**3.通过`Object.prototype.toString.call()`判断**

```js
const nums = []1, 2, 3];
Object.prototype.toString.call(nums) === '[object Array]'; //true
```

> -   `Object.prototype.toString().call()`可以获取到对象的不同类型
> -   它强大的地方在于不仅仅可以检验是否为数组，比如是否是一个函数，是否是数字等等

**4.通过`Array.isArray()`判断**==ES5==

```js
const nums = [1, 2, 3];
console.log(Array.isArray(a)); //true
```

**综合方案：**

```js
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
```

**1、2 会出错的案例**

```js
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
const arr = new xArray(1, 2, 3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr); // true
// Considered harmful, because doesn't work through iframes
arr instanceof Array; // false
```

> 由于`instanceof`是检测`Array.prototype`是否出现在实例的原型链上，又`iframe`全局对象中的`Array`对象和当前全局中的`Array`不同，所以`instanceof`检测会“出错”

### 1.14 Web Worker

参考链接：

-   https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
-   https://www.ruanyifeng.com/blog/2018/07/web-worker.html

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰，以下以**专用 Worker**举例：

主线程：

```js
const worker = new Worker('worker.js');
// 发消息
worker.postMessage(data);
// 收消息
worker.onmessage = function (e) {
    console.log(e.data);
};
```

worker.js：

```js
// 发消息
postMessage(data);
// 收消息
onmessage = function (e) {
    console.log(e.data);
};
```

### 1.15 内存管理

**1.解除引用与垃圾回收**

对于全局变量和全局对象的属性，将其值赋值为`null`，解除引用

```js
function createPerson(name) {
    let localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}

let globalPerson = createPerson('Nicholas');
// 解除 globalPerson 对值的引用
globalPerson = null;
```

> -   不过要注意，解除对一个值的引用并不会自动导致相关内存被回收
>
> -   解除引用的关键在于确保相关的值已经不在上下文里了，因此它在下次垃圾回收时会被回收
> -   局部变量在超出作用域后会被自动解除引用

垃圾回收是周期性的。垃圾回收会跟踪变量是否还会被使用，主要有两种标记策略：**标记清理**（最常用）和**引用计数**（不怎么使用，两个对象相互引用存在 bug）

**2.内存泄露**

-   意外声明全局变量

```js
function setName() {
    name = 'Jack';
}
```

-   闭包

```js
// 只要定时器一直运行，回调函数中引用的name就会一直占用内存
// 垃圾回收程序当然知道这一点，因而就不会清理外部变量
let name = 'Jake';
setInterval(() => {
    console.log(name);
}, 100);

// 调用outer()会导致分配给name的内存被泄漏
// 只要返回的函数存在就不能清理name，因为闭包一直在引用着它
let outer = function () {
    let name = 'Jake';
    return function () {
        return name;
    };
};
```

### 1.16 作用域链

参考红宝书：**4.2 执行上下文与作用域**

```js
var a = 100;
function create() {
    var a = 200;
    return function () {
        console.log(a);
    };
}
var fn = create();
fn(); // 200
```

```js
var a = 100;
function invoke(fn) {
    var a = 200;
    fn();
}
function fn() {
    console.log(a);
}
invoke(fn); // 100
```

> 函数作用域链针对的是**函数定义时**的状态

> 以上两个题目来自滴滴面试

### 1.17 let（const）和 var 区别

-   不存在变量提升（`var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为`undefined`）
-   暂时性死区：声明变量之前，该变量都是不可用的
-   不允许重复声明
-   块级作用域（`var`声明的变量是函数作用域）
-   全局环境下声明的变量不会挂载到全局对象中（浏览器 -> `window`，`var`声明的变量会）

块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了

```js
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

> 补充 ES6 声明变量的方式：var、function、let、const、import、class

### 1.18 异步

参考链接：https://es6.ruanyifeng.com/#docs/generator-async

所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段

-   回调函数
-   事件监听
-   发布/订阅
-   Promise 对象
-   async/await
-   Generator（生成器）

## 2. CSS

### 2.1 盒模型

参考链接：https://www.runoob.com/css/css-boxmodel.html

**所有 HTML 元素可以看作盒子**，在 CSS 中，"box model"这一术语是用来设计和布局时使用

CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它**包括：边距，边框，填充，和实际内容**

### 2.2 BFC

https://zhuanlan.zhihu.com/p/25321647

**BFC** 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的**普通流**

具有 BFC 特性的元素可以看作是隔离了的**独立容器**，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性

**触发 BFC：**

-   body 根元素
-   浮动元素：float 除 none 以外的值
-   绝对定位元素：position (absolute、fixed)
-   display 为 inline-block、table-cells、flex
-   overflow 除了 visible 以外的值 (hidden、auto、scroll)

**效果：**

-   同一个 BFC 中的元素之间下外边距会发生折叠，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中（避免元素外边距合并）
-   BFC 可以包含浮动的元素（清除浮动）
-   BFC 可以阻止元素被浮动元素覆盖（这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度）

### 2.3 常见属性

1.[float](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)

none（默认）、left、right、inline-start、inline-end

2.[position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

static（默认）、relative、absolute、fixed、sticky

3.[overflow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)

visible（默认）、hidden、scroll、auto

### 2.4 常见操作

参考链接：https://segmentfault.com/a/1190000022474073

文本一行显示，超出部分显示省略号

```css
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
```

文本多行显示，超出部分显示省略号

```css
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
overflow: hidden;
```

### 2.5 为什么要使用 flex 布局？

参考链接：https://juejin.cn/post/7063823914136256543

### 2.6 清除浮动

> `::before`同`:before`，`::after`同`:after`，参考：
>
> -   https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before
>
> -   https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after

**1.额外标签法**==不推荐使用==

在父元素内容添加一个空白标签`div`，设置样式`clear: both;`

优点：通俗易懂，书写方便

缺点：添加许多无意义的标签，结构化比较差

**2.BFC**

给父元素添加一些属性，例如`overflow: hidden;`，触发 BFC

优点：简单、代码少、浏览器支持好

缺点：某些特定场景下，会受限于添加的属性

**3.给`::after`伪元素清除浮动**==较常用==

```css
.clearfix::after {
    content: '';
    display: block;
    clear: both;
}
```

优点：符合闭合浮动思想，结构语义化正确，不容易出现怪问题

缺点：由于 IE6-7 不支持`：after`，使用`zoom：1`

**4.双伪元素清除浮动**==较常用==

```css
.clearfix::before,
.clearfix::after {
    content: '';
    display: block;
    clear: both;
}
```

优点：同方案 3

缺点：同方案 3

### 2.7 选择器解析过程

遵循的原则是从选择器的**右边到左边**读取

看个示例

```css
#block .text p {
    color: red;
}
```

1. 查找所有 P 元素。
2. 查找结果 1 中的元素是否有类名为 text 的父元素
3. 查找结果 2 中的元素是否有 id 为 block 的父元素

### 2.8 预处理语言（Less）

参考文档：

-   Less 学习笔记
-   官方文档：https://less.bootcss.com/#%E6%A6%82%E8%A7%88

特性：

-   变量（Variables）：可以使用`@xxx`形式声明变量，可以替换属性值、属性名（`@{xxx}`）、属性值（`@xxx`），具有延迟加载、块级作用域的特性

-   混合（Mixins）：混合就是将一系列的属性从一个规则集引入到另一个规则集的方式。定义方式类似于`"类选择器"`的定义，也可像定义函数一样；
    -   普通混合：就是一个 class
    -   不带输出的混合：添加了一个括号
    -   带参数的混合（可设默认值）
    -   匹配模式
    -   `arguments`变量

```less
// triangle.less
// 定义默认混合
.triangle(@color, @width, @_) {
    width: 0;
    height: 0;
    margin: 50px auto;
    border-style: solid;
    border-width: @width;
}

// 定义三角形混合[匹配模式]
// 箭头向上
.triangle(@color, @width, top) {
    border-color: transparent transparent @color transparent;
}
// 箭头向右
.triangle(@color, @width, right) {
    border-color: transparent transparent transparent @color;
}
// 箭头向下
.triangle(@color, @width, bottom) {
    border-color: @color transparent transparent transparent;
}
// 箭头向左
.triangle(@color, @width, left) {
    border-color: transparent @color transparent transparent;
}

// 使用时
// 导入其它less文件
@import './triangle.less';

#app {
    .triangle(#a01b02, 75px, left);
}

// arguments变量
.common_border(@arg1, @arg2, @arg3) {
    border: @arguments;
}

#app {
    .common_border(1px, solid, #ccc);
}
```

-   嵌套（Nesting）：提供了层级嵌套的书写方式，代码更加简洁

```less
.clearfix {
    display: block;
    zoom: 1;

    &:after {
        content: ' ';
        display: block;
        font-size: 0;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
```

-   继承

```less
// 待继承的类
.center {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}

.inner {
    &:extend(.center);
}
.box {
    &:extend(.center);
}

// 生成的css
.center,
#wrap .inner,
#wrap .box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```

-   运算：支持加减乘除

-   内置函数：https://less.bootcss.com/functions/，比如`if`、`sin`等

### 2.9 CSS 实现三角形

参考链接：https://www.cnblogs.com/chengxs/p/11406278.html

要素：

-   width、height 设置为 0
-   水平方向边框设置属性（取决于最终效果）
-   垂直方向边框设置属性（取决于最终效果）

### 2.10 flex 布局

参考：CSS3 学习笔记.xmimd

父元素上的属性：

-   `display: flex`：设置 flex 布局
-   `justify-content`：主轴方向富裕空间管理，属性值：flex-start（默认）、flex-end、center、space-between、space-around
-   `align-items`：单行情况下（flex-wrap: nowrap），副轴方向富裕空间管理，属性值：flex-start（默认）、flex-end、center、baseline、stretch
-   `flex-direction`：设置主副轴（默认值为 row）以及排列方向，属性值：row、column、row-reverse，column-reverse
-   `flex-wrap`：设置容器是否多行显示，以及副轴的排列方向，属性值：nowrap（默认）、wrap、wrap-reverse
-   `align-content`：多行情况下（flex-wrap: wrap)，副轴方向富裕空间管理，属性值：stretch（默认），flex-start、flex-end、center、space-between、space-around
-   `flex-flow`：flex-direction 和 flex-wrap 属性的简写，专门用于控制主轴和侧轴，默认值是 row nowrap

子元素上的属性：

-   `order`：元素按照 order 属性的值的增序进行布局，拥有相同 order 值得元素按照它们在源代码中出现的顺序进行布局，默认值为 0，order 值越大越往后
-   `align-self`：align-self 会对齐当前 flex 行中的元素，并覆盖 align-items 的值，如果任何 flex 元素的侧轴方向的 margin 值设置为 auto，则会忽略 align-self，属性值：auto（默认）、flex-start、flex-end、center
-   `flex-grow`：拉伸因子，将主轴上的富裕空间按比例分配到各个子元素上，默认为 1
-   `flex-shrink`：收缩因子，默认值为 1
-   `flex-basis`：flex-basis 指定了 flex 元素在主轴方向上的初始大小，默认值为 auto，计算方式参考**CSS3 学习笔记.xmind**
-   `flex`：语法糖，flex: 1 等价于 flex-grow: 1 & flex-shrink: 1 & flex-basis: 0

### 2.11 PC、移动端适配问题

**为什么要使用 rem、vw/vh？**

rem、vw/vh 是相对单位，在移动端各个机型适配，使用媒体查询时，只需要修改一处，而 px 则需要修改很多处

## 3. HTML

### 3.1 网页渲染过程

参考链接：https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work

1. 输入一个 URL/点击链接
2. 导航
    1. DNS 查询
    2. TCP 三次握手
    3. TLS 协商
3. 响应
    1. HTML 文件
    2. TCP 慢启动 / 14KB 规则
    3. 拥塞控制
4. 解析
    1. 构建 DOM 树
    2. 预加载扫描器
    3. 构建 CSSOM 树
5. 渲染
    1. Style：第三步是将 DOM 和 CSSOM 组合成一个 Render 树，计算样式树或渲染树从 DOM 树的根开始构建，遍历每个可见节点
    2. Layout：第四步是在渲染树上运行布局以计算每个节点的几何体。布局是确定呈现树中所有节点的宽度、高度和位置，以及确定页面上每个对象的大小和位置的过程
    3. 绘制
6. 交互：一旦主线程绘制页面完成，你会认为我们已经“准备好了”，但事实并非如此。如果加载包含 JavaScript（并且延迟到 [`onload`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onload) 事件激发后执行），则主线程可能很忙，无法用于滚动、触摸和其他交互

### 3.2 回流和重绘

参考链接：https://segmentfault.com/a/1190000017329980

回流对应**3.1 5-2**，需要根据 Render 树重新确定节点的宽度、高度等

重绘对应**3.1 5-3**

### 3.3 判断元素是否进入可视区域

参考链接：https://juejin.cn/post/6844903725249609741

1. `el.offsetTop - document.documentElement.scrollTop <= viewPortHeight`
2. `el.getBoundingClientReact().top <= viewPortHeight`

```js
const viewPortHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
```

## 4. 计算机基础

### 4.1 计算机网络体系结构

OSI(**O**pen **S**ystem **I**nterconnection Model，**开放式系统互联模型**) 的七层协议、TCP/IP 的四层协议、五层协议。

学习计算机网络时我们一般采用折中的办法，也就是中和 OSI 和 TCP/IP 的优点，采用一种只有五层协议的体系结构。

https://javaguide.cn/cs-basics/network/osi&tcp-ip-model.html#tcp-ip-%E5%9B%9B%E5%B1%82%E6%A8%A1%E5%9E%8B

### 4.2 应用层有哪些协议

常见的：HTTP、DNS、FTP、SMTP(**S**imple **M**ail **T**ransfer **P**rotocol，**简单邮件传输协议**) 等。

### 4.3 HTTP 1.X

根据 HTTP 标准，HTTP 请求可以使用多种请求方法。

==HTTP1.0== 定义了三种请求方法： GET, POST 和 HEAD 方法。

==HTTP1.1== 新增了六种请求方法：OPTIONS、PUT、PATCH、DELETE、TRACE 和 CONNECT 方法。

| 序号 | 方法    | 描述                                                                                                                                     |
| :--- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | GET     | 请求指定的页面信息，并返回实体主体。                                                                                                     |
| 2    | HEAD    | 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头                                                                          |
| 3    | POST    | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。 |
| 4    | PUT     | 从客户端向服务器传送的数据取代指定的文档的内容。                                                                                         |
| 5    | DELETE  | 请求服务器删除指定的页面。                                                                                                               |
| 6    | CONNECT | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。                                                                                |
| 7    | OPTIONS | 允许客户端查看服务器的性能。                                                                                                             |
| 8    | TRACE   | 回显服务器收到的请求，主要用于测试或诊断。                                                                                               |
| 9    | PATCH   | 是对 PUT 方法的补充，用来对已知资源进行局部更新 。                                                                                       |

### 4.4 HTTP 2.0

HTTP2.0 大幅度的提高了 web 性能，在 HTTP1.1 完全语义兼容的基础上，进一步减少了网络的延迟：

-   **二进制分帧**：采用了二进制分帧层，将所有传输信息分割为更小的消息和帧，并对它们采用二进制格式的编码将其封装，新增的二进制分帧层同时也能够保证 http 的各种动词，方法，首部都不受影响，兼容上一代 http 标准

-   **首部压缩**：http/2 使用 encoder 来减少需要传输的 header 大小，通讯双方各自缓存一份头部字段表，既避免了重复 header 的传输，又减小了需要传输的大小
-   **多路复用**：
-   **、请求优先级、服务器推送**

### 4.5 GET 和 POST 的区别（都要遵循 HTTP 规范）

-   **数据存放位置不同**：GET 请求的数据会附在 URL 之后，而 POST 请求的数据放置在 HTTP 包的包体中
-   **安全性不同**：POST 的安全性要比 GET 的安全性高
-   **资源消耗**：GET 和 POST 还有一个重大区别，简单的说：GET 产生**一个** TCP 数据包；POST 产生**两个** TCP 数据包。对于 **GET** 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 `200`（返回数据）；而对于 **POST**，浏览器**先发送** header，服务器响应 100 continue，浏览器**再发送** data，服务器响应 200 ok（返回数据）

> **注意：**
>
> -   在 **GET** 请求中，**URL** 不存在参数上限的问题，**HTTP** 协议规范没有对 **URL** 长度进行限制。这个限制是**特定**的**浏览器**及**服务器**对它的限制。所以 **POST** 也是没有大小长度限制的，**HTTP** 协议规范也没有进行大小限制。起限制作用的是**服务器**的处理能力

### 4.6 状态码

https://www.runoob.com/http/http-status-codes.html

### 4.7 [跨域](https://segmentfault.com/a/1190000007326671/)

#### 什么是跨域？

只要协议、域名、端口有任何一个不同，都被当作是不同的域

#### [CORS](http://www.ruanyifeng.com/blog/2016/04/cors.html)

CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）

它允许浏览器向跨源服务器，发出[`XMLHttpRequest`](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)请求，从而克服了 AJAX 只能[同源](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)使用的限制

#### 同源策略

参考链接：

-   https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy
-   https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html

非同源：

-   Cookie、LocalStorage 和 IndexDB 无法读取
-   DOM 无法获得
-   AJAX 请求不能发送

若两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置`document.domain`共享 Cookie

例如：A 网页是`http://w1.example.com/a.html`，B 网页是`http://w2.example.com/b.html`，那么只要设置相同的`document.domain`，两个网页就可以共享 Cookie

```js
document.domain = 'example.com';
```

现在，A 网页通过脚本设置一个 Cookie，B 网页就可以读到这个 Cookie

```js
// A设置
document.cookie = 'test1=hello';
// B读取
var allCookie = document.cookie;
```

> 这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法，规避同源政策，而要使用下文介绍的 PostMessage API

服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如`.example.com`

> ```http
> Set-Cookie: key=value; domain=.example.com; path=/
> ```

这样的话，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie

**iframe 不同源通信**

-   片段识别符（fragment identifier）
-   window.name
-   跨文档通信 API（Cross-document messaging）

> 详细介绍，请查看https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html

跨文档通信 API：`window.postMessage`，不同源的 iframe、LocalStorage 都可以进行通信

### 4.8 浏览器缓存

各种方式：https://blog.csdn.net/z591102/article/details/104776583/

#### **强缓存和协商缓存**

参考链接：https://segmentfault.com/a/1190000021661656 ==链接内容超详细==

优点：

1. 减少重复数据请求，避免通过网络再次加载资源，节省流量
2. 降低服务器的压力，提升网站性能
3. 加快客户端加载网页的速度， 提升用户体验

设置方式：

1. index.html：通常设置`cache-control: max-age=0`，表示浏览器可以缓存资源，每次使用缓存资源前都必须重新验证其有效性，这意味着每次都会发起 HTTP 请求，但当缓存内容仍有效时可以跳过 HTTP 响应体的下载
2. 图片、js、字体等：使用强缓存和协商缓存

#### **Cookie 和 Session**

参考链接：

-   https://www.cnblogs.com/ityouknow/p/10856177.html
-   https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies

**Cookie**（位于浏览器）：是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于[无状态](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#http_is_stateless_but_not_sessionless)的 HTTP 协议记录稳定的状态信息成为了可能（常用于用户登录状态、购物车、游戏分数、用户自定义设置、主题等）

**Session**（位于服务器）：Session 代表着服务器和客户端一次会话的过程。Session 对象存储特定用户会话所需的属性及配置信息

```js
// 服务器使用 Set-Cookie 响应头部向用户代理（一般是浏览器）发送 Cookie 信息
Set-Cookie: <cookie 名>=<cookie 值>

// 例如
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
```

JS 操作 Cookie：

```js
// 添加cookie（默认是会话存放时间）
document.cookie = 'name=zhangsan';
// 添加cookie并设置过期时间、path
document.cookie = 'gender=male; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/';

// 修改cookie -> 重新添加一遍

// 删除cookie -> 只需要设置 expires 参数为以前的时间即可
document.cookie = 'name=zhangsan; expires=Thu, 01 Jan 1970 00:00:00 GMT';
```

> 可以使用**js-cookie**这个第三方模块操作 Cookie，操作更加形象

#### **localStorage 和 sessionStorage**

### 4.9 三次握手，四次挥手

参考链接：https://blog.csdn.net/qzcsu/article/details/72861891

![在这里插入图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwNjA1MTEwNDA1NjY2?x-oss-process=image/format,png)

![img](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwNjA2MDg0ODUxMjcy?x-oss-process=image/format,png)

### 4.10 TCP 如何保证可靠性传输

参考链接：https://segmentfault.com/a/1190000022944999

1. 应用数据被分割成 TCP 认为最适合发送的数据块
2. TCP 给发送的每一个包进行编号，接收方对数据包进行排序，把有序数据传送给应用层
3. **校验和**：TCP 将保持它首部和数据的检验和。这是一个端到端的检验和，目的是检测数据在传输过程中的任何变化。如果收到段的检验和有差错，TCP 将丢弃这个报文段和不确认收到此报文段
4. TCP 的接收端会丢弃重复的数据
5. **流量控制**
6. **拥塞控制**：当网络拥塞时，减少数据的发送
7. **ARQ 协议**：也是为了实现可靠传输的，它的基本原理就是每发完一个分组就停止发送，等待对方确认，在收到确认后再发下一个分组
8. **超时重传**：当 TCP 发出一个段后，它启动一个定时器，等待目的端确认收到这个报文段，如果不能及时收到一个确认，将重发这个报文段

## 5. Vue & React

### 5.1 Vue 组件传值的方式

1. 子组件向父组件传值
2. 父组件向子组件传值
3. 路由传参
4. 路由总线（$bus）
5. 本地存储：LocalStorage、SessionStorage、Vuex

### 5.2 Vue 父子组件渲染顺序

参考链接：https://juejin.cn/post/6844903717100077064

1.加载渲染过程：父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

2.子组件更新过程==有 props 属性传递==：父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

3.父组件更新过程：父 beforeUpdate->父 updated

4.销毁过程：父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

### 5.3 [虚拟 DOM 和 diff 算法](https://www.cnblogs.com/gxp69/p/11325381.html)

**1.学习过程中的视频讲解**

虚拟 DOM 就是为了**解决浏览器性能问题**而被设计出来的。**如前**，若一次操作中有 10 次更新 DOM 的动作，虚拟 DOM 不会立即操作 DOM，而是将这 10 次更新的 diff 内容保存到本地一个 JS 对象中，最终将这个 JS 对象一次性 attch 到 DOM 树上，再进行后续操作，避免大量无谓的计算量。**所以，**用 JS 对象模拟 DOM 节点的好处是，页面的更新可以先全部反映在 JS 对象(虚拟 DOM)上，操作内存中的 JS 对象的速度显然要更快，等更新完成后，再将最终的 JS 对象映射成真实的 DOM，交由浏览器去绘制

**2.博客理解**

参考链接：https://juejin.cn/post/6997579802215448606

-   **具备跨平台的优势**：由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力
-   **操作 DOM 慢，js 运行效率高，提高效率**
-   **提升渲染性能**：Virtual DOM 的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新

<img src="https://img2022.cnblogs.com/blog/1622292/202208/1622292-20220808141147926-258706981.png" width="700" style="box-shaow: 0 0 5px rgba(100, 100, 100, .3);"/>

### 5.4 Vue computed 和 watch 的区别

参考链接：https://segmentfault.com/a/1190000022740275

computed：

-   计算属性基于 data 中声明过或者父组件传递的 props 中的数据通过计算得到的一个**新值**，这个新值只会根据已知值的变化而变化，简言之：**这个属性依赖其他属性，由其他属性计算而来的**
-   **计算属性不可被重复定义和赋值**
-   **带有缓存功能**：只有当 computed 属性被使用后，才会执行 computed 的代码，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果，简言之：**只有依赖型数据发生改变，computed 才会重新计算**
-   计算属性的高级：在 computed 中的属性都有一个 **get** 和一个 **set** 方法，当数据变化时，调用 set 方法，默认的是 get 语法

watch：

-   监听属性的变化：当属性变化时，回调函数自动调用，在函数内部进行计算，其可以监听的数据来源：data，props，computed 内的数据

主要的**区别**：

-   computed 属性是返回一个值，watch 则是监听改变，进行业务操作
-   computed 属性值默认会**缓存**计算结果，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果，只有**依赖型数据**发生**改变**，computed 才会重新计算
-   **不支持缓存**，监听的数据改变，直接会触发相应的操作

### 5.5 Vue 基本知识点

**1.生命周期**

beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed

参考链接：

-   https://segmentfault.com/a/1190000011381906
-   https://juejin.cn/post/6844903894980509703

<img src="https://v2.cn.vuejs.org/images/lifecycle.png" width="600"/>

> 1. 在`beforeCreate`中，组件实例已经创建，可以获取`this`
> 2. 在`created`中，组件**已经**和数据进行了绑定，可以获取`$data`、`methods`(获取方式：this.methodName)
>     1. 在`beforeCreate`和`created`之间，向组件中的`this`注入了数据和方法
> 3. 在`mounted`中，虚拟 DOM**已经**挂载真实 DOM 进行了绑定，可以获取`$el`

**2.内置组件**

keep-alive、transition、transition-group、teleport、component、slot

> keep-alive 带来了两个生命周期函数：
>
> 1. activated：被 keep-alive 缓存的组件激活时调用
> 2. deactivated：被 keep-alive 缓存的组件失活时调用

**3.路由守卫**

全局守卫有 beforeEach、afterEach，路由独享守卫有 beforeEnter 等

**4.watch 在初始化阶段不执行，可以配置 immediate 属性，让其初始化时执行**

**5.操作数组**

-   push()
-   pop()
-   shift()
-   unshift()
-   splice()
-   sort()
-   reverse()

> 以上更新数组后都可以达到响应式
>
> **通过下标替换元素**不是响应式的

**6.Vue.nextTick([callback, context])**

参考链接：

-   https://v2.cn.vuejs.org/v2/api/#Vue-nextTick
-   https://github.com/vuejs/vue/blob/main/src/core/util/next-tick.ts

作用：在下次 DOM 更新循环结束之后执行延迟回调

原理：将回调函数添加到队列中，通过微任务/宏任务进行调用，版本兼容顺序为：Promise->MutationObserver->setImmediate->setTimeout

### 5.6 Vue 组件中 data 为什么是函数不是对象

参考链接：https://blog.csdn.net/shaleilei/article/details/78084171

我的理解：父组件引用定义的子组件，在创建子组件对象时，通过调用 data 函数来初始化子组件对象的数据，如果 data 是一个对象，那么不同实例对象之间的数据将会相互影响（在 beforeCreate 阶段可以通过`this.$options.data`拿到 data 函数）

> 场景：一个父组件引用子组件，创建多个子组件实例

```vue
<template>
    <div class="father">
        <son />
        <son />
        <son />
    </div>
</template>
```

### 5.7 Vue 响应式原理

参考链接：

-   https://www.infoq.cn/article/we3l33h5zgyyg6gc9hri
-   https://cloud.tencent.com/developer/article/1854401
-   https://blog.nowcoder.net/n/8517450fe4fd4220b4078f9c61e42ec1

<img src="https://static001.infoq.cn/resource/image/a6/75/a6054cb4746ac78184b75cd07b35fb75.png" width="650"/>

MVVM 数据驱动的思想

Vue2 通过`Object.defineProperty`来实现的，有如下缺点：

-   深度监听时，需要递归到底，一次性计算量大
-   无法监听新增属性/删除属性（所以开发中需要使用 Vue.set 和 Vue.delete 这两个 API 来增删 data 的属性）
-   无法监听原生数组，需要特殊处理（Vue2 通过其它方式监听数组）

Vue3 通过`Proxy`来实现的，缺点主要体现在**兼容性不好，且无法用 polyfill 磨平**

<img src="https://uploadfiles.nowcoder.com/images/20210401/447785786_1617244044166/C21B5ECC8B63BE4DC27B38A70C75A1CB"/>

View 的变化能实时让 Model 发生变化，而 Model 的变化也能实时更新 View。

`View` 的变化能实时让`Model`发生变化，而`Model`的变化也能实时更新`View`。

`Vue`数据双向绑定原理是通过 **数据劫持结合发布者-订阅者模式** 的方式来实现的，首先是通过 `ES5` 提供的 `Object.defineProperty()` 方法来劫持（监听）各属性的 **getter、setter**，并在当监听的属性发生变动时通知订阅者，是否需要更新，若更新就会执行对应的更新函数

-   get 用于依赖收集
-   set 用于依赖更新

### 5.8 keep-alive 原理

参考链接：https://juejin.cn/post/6844903837770203144

总结：keep-alive 也是一个组件，在组件代码中对 include、exclude 进行存储，通过其内部 cache 属性缓存虚拟 DOM 对象，keys 属性缓存对应的 key（路由跳转，页面其实不会刷新）

### 5.9 Vue SSR

参考链接：https://cn.vuejs.org/guide/scaling-up/ssr.html#what-is-ssr

相对于 CSR，SSR 的优点：

-   **更快的首屏加载**（html 内容，更快的数据库连接）

-   **统一的心智模型**：你可以使用相同的语言以及相同的声明式、面向组件的心智模型来开发整个应用，而不需要在后端模板系统和前端框架之间来回切换
-   **更好的 SEO**：搜索引擎爬虫可以直接看到完全渲染的页面

总结：Vue 在 CSR 中是将组件渲染成真实 DOM，而在 CSR 中则是渲染成字符串

```js
// 此文件运行在 Node.js 服务器上
import { createSSRApp } from 'vue';
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer';

const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
});

renderToString(app).then((html) => {
    console.log(html);
});
```

SSR 中激活 Vue

```js
// 该文件运行在浏览器中
import { createSSRApp } from 'vue';

const app = createSSRApp({
    // ...和服务端完全一致的应用实例
});

// 在客户端挂载一个 SSR 应用时会假定
// HTML 是预渲染的，然后执行激活过程，
// 而不是挂载新的 DOM 节点
app.mount('#app');
```

## 6. 综合题

### 6.1 SSO：单例登录（Single Sign-On）

### 6.2 微前端

参考链接：https://developer.51cto.com/article/705609.html

### 6.3 Chrome 性能查看

参考链接：https://juejin.cn/post/6844903556802150413

查看方式：Chrome->F12->性能(performance)，录制、查看

### 6.4 项目介绍

需求开发过程：需求评审（PM 提供需求文档），确定排期 -> FE 产出技术文档 -> （S 级项目）技术评审 -> 开发 -> 联调 -> 走查 -> 提测 -> 上线

> 开发、联调、走查、提测阶段，只要涉及代码修改都需要 CR 代码

**瞻星平台：**是减少人力开发成本，实现落地页快速配置上线的低代码配置平台

优化：代码整理（存在无用的代码、文件）、权限管理、卡片上线过程优化

### 6.5 搜索输入框

注意事项：

1. 输入搜索词，下面会出现相关的搜索词汇内容
2. 技术方案采用防抖节流处理
3. 需要考虑网络请求的延时性

例如：输入'abc'，每次间隔 50ms 输入一个字符

1. 输入过程中 100ms 之内做节流处理（用时间戳记录状态）
2. 若 500ms 之内还未进行输入，那么再通过防抖函数进行中止输入判断处理
3. 在网络延时性方面，若请求完成的数据对应的字符（input）是当前正在显示数据对应字符的子串，则不再进行显示，防止出现不对应的 bug

### 6.6 智力题

**1.有一个 500mL 的杯子，一个 300mL 的杯子，如何量出 400mL 的水**

ans：将 500mL 杯子装满水，倒入 300mL 的杯子直至装满，此时 500mL 的杯子里剩有 200mL 的水，再将 300mL 的杯子中的水倒掉，将 500mL 杯子中剩余的水倒入 300mL 的杯子中，再将 500mL 杯子用水装满，将水倒入 300mL 的杯子中直至装满，此时 500mL 杯子中的水恰好就是 400mL

**2.有 8 个金球，其中有 1 块中间是空心的，其余都是实心的，现有一个天平，请问最多量几次就可找到空心的金球**

ans：2 次，先取 6 个金球平分至天平两侧进行测量

-   若天平持平，则用天平测剩余的两个金球，找到较轻的那个就是空心金球
-   反之，取天平较轻的 3 个金球中的两个进行测量，若天平持平，则另外一个金球就是空心金球，否则天平中较轻的那个就是空心金球

**3.农民工作 7 天的报酬是一根金条，请问分两次怎么分可以让工人每天都可以拿到他的报酬**

将金条分为 1/7、2/7、4/7

-   第一天给 1/7
-   第二天给 2/7，让农民还 1/7
-   第三天给 1/7
-   第四天给 4/7，让农民还 1/7 和 2/7
-   以此类推……

### 6.7 前端工程化

**1.如何优化 webpack 打包速度？**

参考链接：https://juejin.cn/post/6844904071736852487

ans：开启多进程打包（thread-loader、happy-pack）

**2.vite 和 webpack 的比较**

参考链接：https://juejin.cn/post/6923417451333959694

ans：webpack 需要对整个项目进行编译，完成后再启动 devServer，vite 先启动 devServer，再按需编译文件（dynamic import）

**3.webpack**

参考链接：https://segmentfault.com/a/1190000021494964

## 7. 面试总结

1. 学习上要去看框架实现的源码，需要熟悉底层原理
1. 工作上要熟悉业务及其实现源码，清楚实现过程，怎样进行提升
1. 要培养技术热情，关注实际最新的技术方向、技术热点
1. 面试表达明确，少带有“应该”、“几乎”等字眼
