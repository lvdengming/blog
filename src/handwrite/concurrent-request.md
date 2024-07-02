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

## 基于 `Promise.all()` 实现

```js
const parallelRun = async (max) => {
    const requestSliceList = [];
    for (let i = 0; i < requestList.length; i += max) {
        requestSliceList.push(requestList.slice(i, i + max));
    }

    for (let i = 0; i < requestSliceList.length; i++) {
        const group = requestSliceList[i];
        try {
            const res = await Promise.all(group.map((fn) => fn()));
            console.log(`接口返回值为：${res}\n`);
        } catch (error) {
            console.error(error);
        }
    }
};
```

结论：一旦某个 `Promise` 失败，那么整个 `Promise.all()` 没有返回值

注入异常的请求：

```js
const requestList = [];

for (let i = 1; i <= 100; i++) {
    requestList.push(
        () =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (i === 92) {
                        reject(new Error(`出错了，出错请求：${i}`));
                    } else {
                        console.log('done', i);
                        resolve(i);
                    }
                }, Math.random() * 1000);
            })
    );
}
```

运行结果部分截图：

![image.png](https://s2.loli.net/2024/07/02/mSJnWQ3VKg94Ukr.png)

## 基于 `Promise.allSettled()` 实现

```js
const parallelRun = async (max) => {
    const requestSliceList = [];
    for (let i = 0; i < requestList.length; i += max) {
        requestSliceList.push(requestList.slice(i, i + max));
    }

    for (let i = 0; i < requestSliceList.length; i++) {
        const group = requestSliceList[i];
        try {
            // 使用 allSettled 替换 all
            const res = await Promise.allSettled(group.map((fn) => fn()));
            console.log(`接口返回值为：`, res, '\n');
        } catch (error) {
            console.error(error);
        }
    }
};
```

运行结果部门截图：

![image.png](https://s2.loli.net/2024/07/02/mSJnWQ3VKg94Ukr.png)

结论：

1. 能够处理 `Promise` 失败情况
2. 每次都是等一组请求完毕后进行下一组请求，存在优化空间

## 运行池 + 等待队列（最优解）

**问题分析：**

使用 Promise.all()或是 Promise.allSettled()，每次并发 10 个请求，确实可以满足并发要求，但是效率较低：如果存在一个或多个慢接口，那么会出现以下两个问题：

-   有慢接口的并发组返回会很慢，一个慢接口拖慢了其他 9 个接口，得不偿失
-   本来我们是可以并发 10 个请求的，但是一个慢接口导致该组的其他 9 个并发位置都被浪费了，这会导致这 100 个接口的并发时间被无情拉长
-   慢接口组后续的并发组都被阻塞了，更慢了

**解决方法：**

维护一个运行池和一个等待队列，运行池始终保持 10 个请求并发。当运行池中有一个请求完成时，就从等待队列中拿出一个新请求放到运行池中运行，这样就可以保持运行池始终是满负荷运行，即使有一个慢接口，也不会阻塞后续的接口入池

注入超时请求：

```js
const requestList = [];

for (let i = 1; i <= 100; i++) {
    requestList.push(
        () =>
            new Promise((resolve, reject) => {
                const waitTime = i % 10 === 6 ? 2_000 : Math.random() * 1000;

                setTimeout(() => {
                    if (i === 92) {
                        reject(new Error(`出错了，出错请求：${i}`));
                    } else {
                        console.log('done', i);
                        resolve(i);
                    }
                }, waitTime);
            })
    );
}
```

可以看到，每组运行打印输出都会有明显的“卡顿”：

![image.png](https://s2.loli.net/2024/07/02/mSJnWQ3VKg94Ukr.png)

运行池 + 等待队列方案：

```js
// 运行池
const pool = new Set();
// 等待队列
const waitQueue = [];

const request = (reqFn, max) => {
    return new Promise((resolve, reject) => {
        // 判断运行池是否已满
        const isFull = pool.size >= max;

        // 包装的请求
        const newReqFn = () => {
            reqFn()
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
                .finally(() => {
                    // 请求完成后，将该请求从运行池中删除
                    pool.delete(newReqFn);

                    // 从等待队列中取出一个新请求放入运行池执行
                    const next = waitQueue.shift();
                    if (next) {
                        pool.add(next);
                        next();
                    }
                });
        };

        if (isFull) {
            // 如果运行池已满，则将新的请求放到等待队列中
            waitQueue.push(newReqFn);
        } else {
            // 如果运行池未满，则向运行池中添加一个新请求并执行该请求
            pool.add(newReqFn);
            newReqFn();
        }
    });
};

// 数组的 forEach 方法会同步执行每个回调函数，不管回调函数是否是异步
requestList.forEach(async (item) => {
    const res = await request(item, 10);
    console.log(res);
});
```

运行结果：

![image.png](https://s2.loli.net/2024/07/02/2YlqhUI3RVbHCDg.png)

> 记一个遗留问题：在 MacOS node v16.15.0 环境下会被中断
> ![image.png](https://s2.loli.net/2024/07/02/NUeYAXKgly3tSkP.png)

完整代码：

```js
const requestList = [];

for (let i = 1; i <= 100; i++) {
    requestList.push(
        () =>
            new Promise((resolve, reject) => {
                const waitTime = i % 10 === 6 ? 2_000 : Math.random() * 1000;

                setTimeout(() => {
                    if (i === 92) {
                        reject(new Error(`出错了，出错请求：${i}`));
                    } else {
                        console.log('done', i);
                        resolve(i);
                    }
                }, waitTime);
            })
    );
}

// 运行池
const pool = new Set();
// 等待队列
const waitQueue = [];

const request = (reqFn, max) => {
    return new Promise((resolve, reject) => {
        // 判断运行池是否已满
        const isFull = pool.size >= max;

        // 包装的请求
        const newReqFn = () => {
            reqFn()
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
                .finally(() => {
                    // 请求完成后，将该请求从运行池中删除
                    pool.delete(newReqFn);

                    // 从等待队列中取出一个新请求放入运行池执行
                    const next = waitQueue.shift();
                    if (next) {
                        pool.add(next);
                        next();
                    }
                });
        };

        if (isFull) {
            // 如果运行池已满，则将新的请求放到等待队列中
            waitQueue.push(newReqFn);
        } else {
            // 如果运行池未满，则向运行池中添加一个新请求并执行该请求
            pool.add(newReqFn);
            newReqFn();
        }
    });
};

// 数组的 forEach 方法会同步执行每个回调函数，不管回调函数是否是异步
requestList.forEach(async (item) => {
    const res = await request(item, 10);
    console.log(res);
});
```
