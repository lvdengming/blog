<!--
 * @Author: lvdengming@foxmail.com
 * @Date: 2024-09-10 23:11:06
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-09-16 08:09:52
-->

# 实现 add 方法

## 题目描述

实现一个 add，满足以下内容

```js
const r1 = add[1][2][3] + 4; // 期望结果 10
const r2 = add[10][20] + 30; // 期望结果 60
const r3 = add[100][200][300] + 400; // 期望结果 1000

console.log(r1);
console.log(r2);
console.log(r3);
```

## 解决方案

基于 `Proxy` 和 `Symbol.toPrimitive` 进行实现：

```js
function createAdd(value = 0) {
    return new Proxy(
        {},
        {
            get(target, prop) {
                if (prop === Symbol.toPrimitive) {
                    return () => value;
                }

                return createAdd(value + Number(prop));
            }
        }
    );
}

const add = createAdd();

const r1 = add[1][2][3] + 4; // 期望结果 10
const r2 = add[10][20] + 30; // 期望结果 60
const r3 = add[100][200][300] + 400; // 期望结果 1000

console.log(r1);
console.log(r2);
console.log(r3);
```

> 通过代理劫持对象的访问，通过 `Symbol.toPrimitive` 设置对象转换为原始值的结果
