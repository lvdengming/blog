# Canvas 手册

教程：[https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

## 画笔

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```

> 默认 canvas 元素宽 300px，高 150px，使用 width、height 属性进行调整，不要使用 css
> 对于不支持 canvas 的浏览器，替换信息在标签内进行设置，例如 `<canvas>your browser is not support canvas.</canvas>`
> 对于 webgl 是使用了不同的上下文 `canvas.getContext()`

## API

### 矩形

-   [fillRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect)：绘制一个填充的矩形
-   [strokeRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect)：绘制一个矩形边框
-   [clearRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)：清除指定矩形区域，让清除部分完全透明

更多请参考 MDN 教程：[https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
