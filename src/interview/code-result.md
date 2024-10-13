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

函数作用域链是在函数定义时确定的

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

### 题目-2

```js
function foo() {
    console.log(a);
}

function bar() {
    var a = 3;
    console.log(this.a);
    foo();
}

var a = 2;
bar();

// 2
// 2
```

## this 指向

### 题目-1

```js
window.color = 'red';
var o = { color: 'blue' };
function sayColor() {
    console.log(this.color);
}

sayColor(); // red
sayColor.call(this); // red
sayColor.apply(window); // red
sayColor.call(o); // blue
```

## 赋值运算

赋值运算操作步骤：

1. 定位：定位等号左边的内存地址
2. 运算：运算等号右边的表达式
3. 赋值：将等号右边表达式的值赋值给等号左边变量

### 题目-1

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);

// undefined
// {n: 2}
```

## 事件循环

### 题目-1

```js
var pro = new Promise((res, rej) => {
    res(1);
});
pro.then((res) => {
    console.log(res);
});
console.log(2);
pro.then((res) => {
    console.log(res);
}).then((res) => {
    console.log(res);
});

// 2
// 1
// 1
// undefined
```
