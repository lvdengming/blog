# CSS

## 样式表优先级

内联样式 > ID 选择器 > 类选择器、伪类选择器、属性选择器 > 元素选择器、伪元素选择器 > 通配符选择器、关系选择器、组合器 > 浏览器默认样式

> 除此之外 `!important` 标记的样式会覆盖其它样式

优先级计算：

-   ID 选择器：`100`
-   类选择器、伪类选择器、属性选择器：`010`
-   元素选择器、伪元素选择器：`001`
-   通配符选择器和组合器没有实际的权重

:::details
CSS 样式表的优先级是指当多个样式规则应用到同一个元素时，浏览器如何确定哪个规则最终生效。CSS 的优先级由以下几个方面决定，从高到低排列如下：

1. **内联样式（Inline Styles）**

    - 写在 HTML 标签中的 `style` 属性中的样式。优先级最高。例如：`<div style="color: red;">`

2. **ID 选择器**

    - 使用 `#` 符号指定的选择器。例如：`#myId { color: blue; }`

3. **类选择器（Class Selectors）、伪类选择器（Pseudo-classes）、属性选择器（Attribute Selectors）**

    - 类选择器使用 `.` 符号，例如：`.myClass { color: green; }`
    - 伪类选择器，例如：`:hover { color: yellow; }`
    - 属性选择器，例如：`[type="text"] { color: purple; }`

4. **元素选择器（Type Selectors）、伪元素选择器（Pseudo-elements）**

    - 例如：`div { color: black; }` 或 `::before { content: ''; }`

5. **通配符选择器（Universal Selector）、组合器（Combinators）、关系选择器**

    - 例如：`* { color: gray; }` 或 `div > p { color: orange; }`

6. **浏览器默认样式**
    - 当开发者没有为元素定义样式时，浏览器会应用其默认样式。

### 优先级的计算

CSS 优先级的计算遵循以下规则：

-   内联样式的优先级最高。
-   ID 选择器的权重是 100。
-   类选择器、伪类选择器和属性选择器的权重是 10。
-   元素选择器和伪元素选择器的权重是 1。
-   通配符选择器和组合器没有实际的权重。

例如，假设有以下样式：

```css
#header {
    color: blue; /* 权重为 100 */
}

.header-title {
    color: green; /* 权重为 10 */
}

h1 {
    color: red; /* 权重为 1 */
}
```

在一个 `h1` 元素上同时应用上述样式时，`#header` 的颜色会优先显示，因为它的权重最高。

### 重要性声明（!important）

除了以上的规则，还有一个特殊的声明可以提升样式的优先级：`!important`。任何带有 `!important` 标记的样式都会覆盖其他的样式规则，即使它们的优先级更高。

例如：

```css
p {
    color: black !important;
}

#myId {
    color: red;
}
```

在这个例子中，`p` 的颜色会被设置为黑色，即使 `#myId` 的优先级更高，因为 `!important` 优先。

通过理解这些规则，开发者可以更好地控制 CSS 样式的应用顺序和效果。
:::

## 布局方式

MDN 介绍：[https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Introduction](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Introduction)

css 布局方式有：

1. 常规流布局
2. 浮动（float）
3. 定位（position）
4. flex 布局
5. grid 布局
6. 表格布局（传统的通过 `table` 元素来进行的布局）
7. 多列布局（column-count）

## 前端主题切换方案

### CSS 变量做法

最简单、最实用、问题最少的方法

```css
/* 定义几套主题颜色方案 */
/* 默认主题 */
:root {
    --common-bg-color-1: #c7ffdd;
    --common-bg-color-2: #fbd988;
    --common-text-color: #333;
}

/* 暗色主题 */
html[data-theme='dark'] {
    --common-bg-color-1: #102128;
    --common-bg-color-2: #2d5567;
    --common-text-color: #fff;
}

/* 其它主题... */
html[data-theme='xxx'] {
}
```

```js
// 在 html 上设置 data-theme 属性值为 'dark'，'xxx'
// 设置元素的 dataset.xxx 属性等价于设置元素 data-xxx 属性值
// document.documentElement 返回文档的根元素（`<html>`）
document.documentElement.dataset.theme = 'dark';
```

切换主题的本质就是切换主题变量的值

### 使用 CSS 文件切换

另一种简单的方法是根据主题选择不同的 CSS 文件

步骤：

1. 创建多个 CSS 文件，每个文件代表一个主题
2. 根据用户选择，动态加载不同的 CSS 文件

示例：

```html
<!-- 默认主题 -->
<link id="theme-style" rel="stylesheet" href="light-theme.css" />
```

JS 切换主题：

```javascript
function switchTheme(theme) {
    const themeStyle = document.getElementById('theme-style');
    if (theme === 'dark') {
        themeStyle.href = 'dark-theme.css';
    } else {
        themeStyle.href = 'light-theme.css';
    }
}
```

## CSS 块级元素、行内块元素、行内元素

### 块级元素

块级元素独占一行，占据父元素的全部宽度，并且可以设置宽度、高度、内边距和外边距

常见的块级元素有：`div`, `h1`, `h2`, ...

### 行内块元素

行内块元素和块级元素类似，但是不会独占一行

常见的行内块元素有：`img`, `input`, `button`, `select`, `textarea`, `iframe`, `object`

### 行内元素

行内元素不会独占一行，它们只占据自身内容的宽度，无法设置宽度和高度

**行内元素可以设置 `margin`、`padding`，但纵向的设置不会有效果**

常见的行内元素有：`span`, `a`, `strong`, `label`, ...
