# 防抖和节流

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
