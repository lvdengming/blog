# JS 知识点

## 数据类型

### 基本数据类型

number、string、boolean、null、undefined、symbol、bigint、object

### NaN 是什么，用`typeof`执行结果

**全局属性** NaN 是一个表示非数字的值

> 浏览器环境中 `window.NaN`

```js
typeof NaN; // 'number'
```

判断方式：

```js
Object.is(NaN, NaN); // true
window.isNaN(NaN); // true, 可将传入的值自动转换为数字
Number.isNan(NaN); // true, 传入的值必须是 NaN，不进行转换
```

MDN：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
