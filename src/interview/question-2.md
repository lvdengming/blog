# 面试知识点（二）

## 网页渲染过程

参考：[https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)

## 浏览器跨标签页通信

1. `localStorage` 和 `storage` 事件，同源情况下（`sessionStorage` 在不同标签页是独立的）
2. 广播 `BroadcastChannel`，通过相同的通道名称
3. SharedWorker
4. ServiceWorker
5. `window.postMessage()`
6. 通过 `cookie` 和服务端
7. `IndexedDB`
8. 通过 WebSocket、Ajax 配合服务端

参考：[https://cloud.tencent.com/developer/article/2332521](https://cloud.tencent.com/developer/article/2332521)

## https 如何保证可靠性传输

参考：[https://cloud.tencent.com/developer/article/1854086](https://cloud.tencent.com/developer/article/1854086)
