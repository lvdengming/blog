# LazyMan

## 题目描述

```txt
实现一个LazyMan，可以按照以下方式调用：

LazyMan("Hank")
输出：Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner")
输出：Hi! This is Hank! //等待10秒 Eat dinner

LazyMan ("Hank").sleepFirst(5).eat("supper")
输出 // 等待5秒 Hi This is Hank! Eat supper
```

## 解法一（`while` 同步等待、轮询）

```js
function LazyMan(name) {
    let sleeping = false;
    const me = {
        name,
        sayHello() {
            Promise.resolve().then(() => {
                console.log(`Hi! This is ${name}`);
            });

            return this;
        },
        sleep(seconds) {
            sleeping = true;
            setTimeout(() => {
                sleeping = false;
            }, seconds * 1000);

            return this;
        },
        sleepFirst(seconds) {
            sleeping = true;

            const timeStart = Date.now();
            // 减少同步等待计算量
            const waitTime = seconds * 1000;
            while (Date.now() - timeStart < waitTime) {}

            sleeping = false;
            return this;
        },
        eat(meal) {
            if (sleeping) {
                setTimeout(() => {
                    this.eat(meal);
                }, 0);
            } else {
                setTimeout(() => {
                    console.log(`Eat ${meal}`);
                }, 0);
            }

            return this;
        }
    };

    setTimeout(() => {
        me.sayHello();
    }, 0);

    return me;
}

// LazyMan('Hank');

// LazyMan('Hank').sleep(10).eat('dinner');

LazyMan('Hank').sleepFirst(5).eat('supper');

console.log('// 同步代码');
```

## 解法二（任务队列）

```js
class LazyManClass {
    constructor(name) {
        this.name = name;
        this.tasks = [];

        // 每次创建 LazyMan 实例时，首先注册一个任务用来输出初始的问候语
        this.tasks.push(() => {
            console.log(`Hi! This is ${this.name}!`);
            this.next();
        });

        // 开始执行任务队列
        setTimeout(() => {
            this.next();
        }, 0);
    }

    // 用来执行下一个任务
    next() {
        const task = this.tasks.shift();
        if (task) {
            task();
        }
    }

    sleep(seconds) {
        // 注册一个 sleep 任务
        this.tasks.push(() => {
            setTimeout(() => {
                this.next();
            }, seconds * 1000);
        });
        return this; // 返回 this 以支持链式调用
    }

    sleepFirst(seconds) {
        // 注册一个优先执行的 sleepFirst 任务
        this.tasks.unshift(() => {
            setTimeout(() => {
                this.next();
            }, seconds * 1000);
        });
        return this; // 返回 this 以支持链式调用
    }

    eat(meal) {
        // 注册一个 eat 任务
        this.tasks.push(() => {
            console.log(`Eat ${meal}`);
            this.next();
        });
        return this; // 返回 this 以支持链式调用
    }
}

// 外部调用的接口
function LazyMan(name) {
    return new LazyManClass(name);
}

// 示例调用
LazyMan('Hank'); // 输出：Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner'); // 输出：Hi! This is Hank! // 等待10秒 Eat dinner

LazyMan('Hank').sleepFirst(5).eat('supper'); // 等待5秒 输出：Hi! This is Hank! Eat supper
```
