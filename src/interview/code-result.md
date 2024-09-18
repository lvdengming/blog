# 代码执行结果

## 原型链

### 题目-1

```js
function Foo() {
    this.a = 1;
    return {
        a: 4,
        b: 5
    };
}

Foo.prototype.a = 5;
Foo.prototype.b = 7;
Foo.prototype.c = 8;

const o = new Foo();
console.log(o.a); // 4
console.log(o.b); // 5
console.log(o.c); // undefined
```

## 函数作用域链

### 题目-1

```js
var count = 10;
function a() {
    return count + 10;
}
function b() {
    var count = 20;
    return a() + 10;
}

console.log(b()); // 30
```
