# JSONP

## 简介

JSONP（JSON with Padding）是一种跨域请求的解决方案，通过 `script` 标签天然支持跨域的特性进行实现

缺点：不安全，只能使用 `GET` 请求

替换方案：CORS

## 代码实现

服务端（express）：

```js
app.get('/jsonp', (req, res) => {
    const zhangsan = {
        name: '张三',
        age: 24,
        gender: 'male',
        friends: ['李四', '王五']
    };
    const callback = req?.query?.callback ?? 'callback';
    const data = `${callback}(${JSON.stringify(zhangsan)});`;

    res.type('text/javascript').send(data);
});
```

客户端：

```html
<script>
    function handleJsonp(person) {
        console.log(person);
    }
</script>
<script src="http://localhost:3000/jsonp?callback=handleJsonp"></script>
```
