# 函数方法

## new 构造函数

参考：[https://juejin.cn/post/6844903937405878280](https://juejin.cn/post/6844903937405878280)

```js
function myNew(Obj, ...args) {
    const obj = Object.create(Obj.prototype);
    const res = Obj.apply(obj, args);
    return typeof res === 'object' ? res : obj;
}
```

> 构造函数如果存在返回值（`return`）：
>
> 1. 返回值为对象：则`new`出来的值就是返回的对象
> 2. 返回值为非对象：没有影响

## call

```js
Function.prototype.myCall = function (context, ...args) {
    context = typeof context === 'object' ? context : window;

    const key = Symbol();
    context[key] = this;
    const res = context[key](...args);
    Reflect.deleteProperty(context, key);

    return res;
};
```

## apply

```js
Function.prototype.myApply = function (context, args) {
    context = typeof context === 'object' ? context : window;
    if (!Array.isArray(args)) {
        throw new TypeError('args must be an array.');
    }

    const key = Symbol();
    context[key] = this;
    const res = context[key](...args);
    Reflect.deleteProperty(context, key);

    return res;
};
```

## bind

```js
Function.prototype.myBind = function (context, ...innerArgs) {
    context = typeof context === 'object' ? context : window;
    return (...outerArgs) => this.call(context, ...innerArgs, ...outerArgs);
};
```
