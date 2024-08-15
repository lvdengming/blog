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

## 解法一，`while` 同步等待

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
