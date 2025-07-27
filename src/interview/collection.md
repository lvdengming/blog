<!--
 * @Author: lvdengming@foxmail.com
 * @Date: 2025-04-07 23:16:40
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-05-08 07:51:38
-->

# 问题收藏

## 手撕代码

### 前端倒计时误差

`setTimeout` 是宏任务，并不能实现毫秒级准确执行，通常可以接受；但如果切换标签页、最小化浏览器窗口，浏览器（例如 Chrome）会降低定时器的执行效率以节省资源，会导致定时器延迟增加

目标：解决因浏览器切换标签页、最小化窗口导致定时器延迟增加的问题

思路：

1. 监听 `document` 的 `visibilitychange` 事件，在切回标签页时修正定时器
2. 修改定时器回调函数，每次执行函数时修正定时器
3. 使用 `web worker`(worker 中的定时器不受切换标签、最小化窗口影响)

手撕代码：[interview/setTimeout](https://github.com/lvdengming/case-collection/tree/master/src/interview/setTimeout)

参考：[https://juejin.cn/post/7478687361737768986](https://juejin.cn/post/7478687361737768986)

## 八股文

### 什么时候使用 WebWorker？

1. 大量的 CPU 密集型任务（大文件上传、图表计算）
2. 任务可被独立拆分

### XHR 和 Fetch 的区别

![image.png](https://s2.loli.net/2025/05/08/98rSeqPn5obzHU7.png)

### 上传文件时如何展示上传速率？

XHR：`xhr.upload.addEventListener('progress', e => {})`

Fetch 不支持

浏览器端：XHR Fetch

### 页面加载后发生大量 ajax 请求，如何优化？

1. BFF
2. 请求延时：请求队列（优先级）、懒加载
3. 缓存、幂等性
4. 压缩（GZIP）
5. CDN
6. 多域名并发
7. HTTP 2.0

### 以下代码各有什么效果？

```html
<script src="..." defer></script>
<script src="..." async></script>
<link rel="prefetch" href="..." />
<link rel="preload" href="..." />
```

-   defer：不阻塞 dom 解析，dom 解析完成之后按顺序执行
-   async：不阻塞 dom 解析，下载完成后立即执行（不一定按照顺序）
-   prefetch：空闲时加载
-   preload：立即加载

### 如何实现精确的 setInterval

setInterval 为什么不精确？

1. 事件循环
2. 嵌套 5 层，4ms 最低延迟
3. 页面失活的问题（最少 1 秒延迟）

如何实现？

1. 页面切换回来时去计算时间，找到下一次运行
2. 每次运行时进行计算
3. web worker 中进行，不受页面失活影响
