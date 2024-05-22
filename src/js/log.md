---
title: 前端埋点方案
date: 2023-07-26
sidebar: auto
categories:
    - 前端
    - js
---

## 概要

通常使用 `navigator.sendBeacon` 方式发送埋点数据，使用 `Image` 方式进行兜底，简单操作如下：

```js
const log = {
    uuid: 'a',
    pid: 'b'
};

if (navigator.sendBeacon) {
    // 通过 Blob 设置 sendBeacon POST Content-Type
    const blob = new Blob([log], { type: 'application/json' });
    navigator.sendBeacon(url, blob);
} else {
    const img = new Image(1, 1);
    img.src = 'url?uuid=a&pid=b';
}
```

## 参考

-   navigator.sendBeacon: [https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)
-   Blob: [https://developer.mozilla.org/zh-CN/docs/Web/API/Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
