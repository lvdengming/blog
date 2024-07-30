# 防抖和节流

## 介绍

参考：[https://segmentfault.com/a/1190000018428170](https://segmentfault.com/a/1190000018428170)

测试案例：在有 100 个`h1`情况下，分别用防抖、节流处理滚动条监听

默认效果：

![image.png](https://s2.loli.net/2024/07/30/Pzw1DujeBGd7XnK.png)

## 防抖（debounce）

```js
function debounce(fn, delay) {
    let timer;

    return () => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(fn, delay);
    };
}
```

测试代码：

```js
function showScrollTop() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    console.log(`滚动条位置 -> ${scrollTop}`);
}

window.onscroll = debounce(showScrollTop, 1000);
```

优化效果：

![image.png](https://s2.loli.net/2024/07/30/U1Q9aAuJnRqsmBC.png)

## 节流（throttle）

```js
function throttle(fn, delay) {
    let active = true;

    return () => {
        if (!active) {
            return;
        }

        active = false;
        setTimeout(() => {
            fn();
            active = true;
        }, delay);
    };
}
```

测试代码：

```js
function showScrollTop() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    console.log(`滚动条位置 -> ${scrollTop}`);
}

window.onscroll = throttle(showScrollTop, 1000);
```

优化效果：

![image.png](https://s2.loli.net/2024/07/30/oe2fWsRXtV7nkSJ.png)
