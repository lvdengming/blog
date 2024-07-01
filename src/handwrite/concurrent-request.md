# 控制并发请求

参考：[如果有 100 个请求，如何控制并发？](https://juejin.cn/post/7350261439913951284)

> 以下内容全来自参考博客，笔者收集该内容并巩固练习

题目：现有 100 个请求需要发送，请设计一个算法，使用 Promise 来控制并发（并发数量最大为 10），来完成 100 个请求

首先，模拟 100 个并发请求

```js
const requestList = [];

for (let i = 1; i <= 100; i++) {
    requestList.push(
        () =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('done', i);
                    resolve(i);
                }, Math.random() * 1000);
            })
    );
}
```
