# CSS 手写

## 布局场景题-1

实现如下布局：

![image.png](https://s2.loli.net/2024/09/13/yuI9Dl2MJOg5HSt.png)

要求：外层盒子宽度不定，确保每个子项宽度 `100px`，列之间间距跟随变化

flex 布局：

```css{13}
/* html结构：div#app>div.item*8 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 40px;
    column-gap: calc((100% - 340px) / 2);
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    margin: 50px auto;
}

#app .item {
    width: 100px;
    height: 40px;
    background-color: red;
}
```

grid 布局：

```css{11,13}
/* html结构：div#app>div.item*9 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    display: grid;
    grid-template-rows: repeat(3, 40px);
    grid-template-columns: repeat(3, 1fr);
    row-gap: 40px;
    column-gap: calc((100% - 300px) / 2);
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    margin: 50px auto;
}

#app .item {
    width: 100px;
    height: 40px;
    background-color: red;
}

#app .item:nth-child(8) {
    background-color: transparent;
}
```

注意：

grid 布局有**容器宽度**、**grid 布局宽度**两个概念，`column-gap` 中的百分比是基于 grid 布局宽度计算的

此处 `grid-template-columns` 属性值单位必须设置为 `fr`，使 grid 布局宽度和容器可用空间宽度保持一致，这样`column-gap` 属性值中的百分比才符合常识

> 设置 grid 布局后，每个格子都有自己的宽度，而不是格子内容元素的宽度
