# 知识点

## **查看页面性能**

```js
console.table(performance.timing);
```

## **查看变量的数据类型**

-   `typeof`：适用于基本数据类型（注意：`typeof null -> object`，`typeof [funtion] -> function`，其它引用类型都是`object`）
-   `instanceof`：适用于引用类型

## mongodb 和 mysql 的区别

-   NoSQL：[https://aws.amazon.com/cn/nosql/](https://aws.amazon.com/cn/nosql/)

-   MongoDB 和 MySQL 的区别：[https://aws.amazon.com/cn/compare/the-difference-between-mongodb-vs-mysql/](https://aws.amazon.com/cn/compare/the-difference-between-mongodb-vs-mysql/)

## TS as const 类型用法

```ts
export const keys = ['a', 'b', 'c'] as const;

// Key 类型为 'a' | 'b' | 'c'
export type Key = (typeof keys)[number];
```

## JS 手动触发 window 事件

该方式使用了 DOM 实例的 dispatchEvent 方法（和 addEventListener 方法类似的通用的 API），参考链接：

-   MDN Event：[https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)
-   MDN dispatchEvent：[https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)

示例：

```js
const event = new Event('resize');
window.dispatchEvent(event);
```

## .gitkeep 文件作用

其作用是为了使 Git 保留空目录。.gitkeep 文件本质上就是一个普通文件，文件名是社区的一个约定，起到一个统一的目的，让开发者一眼就知道这个文件的作用

## HTML rel 属性

**`rel`** 属性定义了所链接的资源与当前文档的关系，仅在 a、area 和 link 标签有效

> a 标签常用：`rel="noopener noreferer"`

参考：

-   [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)
-   [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel)

## data-\* 属性使用

元素的 `data-*` 属性值可以通过只读属性 dataset 获取，例如[掘金](https://juejin.cn/) `body` 元素上的 `data-theme="light"`，可通过 `document.body.dataset` 获取

示例：

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body data-theme="light"></body>
</html>
```

```js
console.log(document.body.dataset);
// DOMStringMap {theme: 'light'}
```

范围：所有元素

参考：[https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)

## iframe 通信

前置条件：a.html 里面嵌套一个 `iframe#iframeB`，iframe 里面打开 b.html

同源情况：

a.html 向 b.html 通信

```js
// a.html
const iframeB = document.getElementById('iframeB');
iframeB.onload = () => {
    const message = 'A message from a.html.';
    // 通过 iframeB.contentWindow 获取 b.html 的全局上下文
    iframeB.contentWindow.xxx(message);
};
```

b.html 向 a.html 通信

```js
// b.html
const message = 'A message from b.html.';
// iframe 可通过 window.parent 获取父级上下文
window.parent.xxx(message);
// iframe 可通过 window.top 获取顶级上下文
window.top.xxx(message);
```

跨域情况：

跨域情况比较灵活，不用区分父子页面，此处仍以以 a.html 向 b.html 发消息举例

```js
// 发送消息
const iframeB = document.getElementById('iframeB');
iframeB.onload = () => {
    const message = 'A message from a.html.';
    // 通过 iframeB.contentWindow 获取 b.html 的全局上下文
    // 第二个参数具体使用时，请结合 b.html 域实际情况，例如 https://www.baidu.com
    iframeB.contentWindow.postMessage(message, 'https://www.example.com');
};

// b.html 接收消息
window.addEventListener('message', (e) => {
    // 通过 origin 属性对消息进行过滤，避免遭受 XSS 攻击
    if (e.origin === 'https://www.example.com') {
        // 发送消息所在域
        console.log(e.origin);
        // 发送的消息
        console.log(e.data);
    }
});
```

补充 window.postMessage 信息

> 语法：
>
> ```
> otherWindow.postMessage(message, targetOrigin, [transfer]);
> ```
>
> otherWindow：
>
> 其他窗口的一个引用，比如 iframe 的 contentWindow 属性、执行 window.open 返回的窗口对象、或者是命名过或数值索引的 window.frames

> 重点：通过 window.open 打开的网页与原网页之间能够通过此方式进行通信

参考：

-   [https://mdnice.com/writing/c5345a08a81740f797f5239a73f34d4b](https://mdnice.com/writing/c5345a08a81740f797f5239a73f34d4b)
-   [https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

## CDN 回源是什么？

CDN 回源就是当有用户访问某一个 URL 的时候，若是被解析到的那个 CDN 节点没有缓存响应的内容，或者是缓存已经到期，就会回源站去获取

参考：[https://www.huaweicloud.com/zhishi/edit-cdn157.html](https://www.huaweicloud.com/zhishi/edit-cdn157.html)

## HTML meta 元素

HTML `<meta>` 元素表示那些不能由其他 HTML 元相关（meta-related）元素表示的元数据信息。如：`<base>`、`<link>`、`<script>`、`<style>` 或 `<title>`

> 此处仅作概述，建议去 MDN 文档查看更多详细信息

参考：[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

## ?. 和 ??

MDN 链接：

-   [可选链运算符（?.）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
-   [空值合并运算符（??）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

可选链运算符（?.）：在**读取对象属性**时，当引用为 `null` 或 `undefined` 时不会引起错误，返回 `undefined`；与**函数调用**一起使用时，若给定的函数不存在不会引起错误，返回 `undefined`

```js
const foo = {};

// 报错
console.log(foo.a.b);
// 返回 undefined
console.log(foo.a?.b);

// 报错
console.log(foo?.a());
// 返回 undefined
console.log(foo?.a?.());
```

空值合并运算符（??）：当左侧的操作数为 `null` 或者 `undefined` 时，返回其右侧操作数，否则返回左侧操作数

> 注意与 `||` 运算符区别，`||` 当左边的操作数“值”为 `false` 时返回右侧操作数
