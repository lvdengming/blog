# 函数方法

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

```
