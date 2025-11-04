<!--
 * @Author: lvdengming@foxmail.com
 * @Date: 2025-11-04 23:48:46
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-11-04 23:58:25
-->

# 实现 TaskPro 类

典型的洋葱模型实现（koa 框架原理）

```js
class TaskPro {
    __taskList = [];

    addTask(task) {
        this.__taskList.push(task);
    }

    run() {
        const task = this.__taskList.shift();

        return task(() => {
            if (this.__taskList.length === 0) {
                return;
            }

            return this.run();
        });
    }
}

const t = new TaskPro();

t.addTask(async (next) => {
    console.log(1, 'start');
    await next();
    console.log(1, 'end');
});

t.addTask((next) => {
    console.log(2);
    next();
});

t.addTask((next) => {
    console.log(3);
    next();
});

t.run();

// 打印如下结果
// 1 start
// 2
// 3
// 1 end
```
