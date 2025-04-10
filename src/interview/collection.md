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
