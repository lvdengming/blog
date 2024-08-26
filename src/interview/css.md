# CSS 知识点

## 样式表优先级

内联样式 > ID 选择器 > 类选择器、伪类选择器、属性选择器 > 元素选择器、伪元素选择器 > 默认样式

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
