# 使用 XHR 进行网络请求

```js
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', (data) => {
    console.log(data);
});
xhr.open('GET', 'http://localhost:3000');
xhr.send();
```
