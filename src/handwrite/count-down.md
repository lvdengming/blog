# 倒计时

```js
// 组件接收的参数为秒，展示效果为“剩余：HH:MM:SS”
// 剩余：00:01:40
// 剩余：00:01:39
// 剩余：00:01:38
// ...
function printTime(n) {
    const s = n % 60;
    const m = Math.floor(n / 60) % 60;
    const h = Math.floor(n / 3600) % 24;
    const format = (a) => (a < 10 ? `0${a}` : String(a));

    console.log(`剩余：${format(h)}:${format(m)}:${format(s)}`);
}

function countDown(n) {
    let cur = n;

    const timer = setInterval(() => {
        printTime(cur--);

        if (cur < 0) {
            clearInterval(timer);
        }
    }, 1000);
}
```

> 注意：有小数的数字取余操作结果会带小数，这是不符合预期的
