# VSCode 使用技巧

## 快速生成 html 元素

VSCode 可通过输入类似 CSS 选择器的文本 + `Tab` 键快速生成 html 元素，具体如下：

> 以下规则可以组合使用

**生成一个标签**

通过输入标签元素快速生成，例如 `div`

```html
<div></div>
```

**生成一个标签并设置文本内容**

通过输入标签元素、`{content}` 快速生成，例如 `div{content}`

```html
<div>content</div>
```

**生成一个标签并设置属性内容**

通过输入标签元素、`>[属性名="属性值"]` 快速生成，例如 `button[type="primary"]`

```html
<button type="primary"></button>
```

**生成带类选择器的标签**

通过输入标签元素、选择器快速生成，例如 `div.wrapper`

```html
<div class="wrapper"></div>
```

**生成带 id 选择器的标签**

通过输入标签元素、选择器快速生成，例如 `section#list`

```html
<section id="list"></section>
```

> 可直接输入类、id 选择器进行生成，例如 `.wrapper`、`#app`，默认标签是 `div`

**生成多个相同的标签**

通过输入标签元素（、选择器）、`*`、数量，例如 `.item*5`

```html
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
```

**内容带编号：`.item*5>{order: $}`**

```html
<div class="item">order: 1</div>
<div class="item">order: 2</div>
<div class="item">order: 3</div>
<div class="item">order: 4</div>
<div class="item">order: 5</div>
```

**生成两个或多个特定标签**

通过输入标签元素（、选择器）、“+”、标签元素（、选择器），例如 `section.a+.b`

```html
<section class="a"></section>
<div class="b"></div>
```

**生成父子层级的标签**

通过输入标签元素（、选择器）、“>”、标签元素（、选择器），例如 `.a>.b`

```html
<div class="a">
    <div class="b"></div>
</div>
```

## 文件保存时自动格式化代码

基于 [Prettier](https://prettier.io/) + VSCode 项目配置进行实现，过程如下：

1. 安装 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 扩展程序
2. 在 settings.json 文件添加以下内容：

```json
{
    "editor.formatOnSave": true
}
```

**Q & A：**

1. 如何打开 `settings.json`？

可通过“用户”、“工作区”、“文件夹”三个层次进行设置，其中“用户”优先级最高

![image.png](https://s2.loli.net/2024/08/25/7fYErO8jDQvcUeH.png)

2. 如何修改 Prettier 的默认规则？

在 `settings.json` 文件添加 `prettier.xxx` 方式进行修改

```json
{
    "prettier.printWidth": 100,
    "prettier.tabWidth": 4,
    "prettier.semi": true,
    "prettier.singleQuote": true,
    "prettier.trailingComma": "none"
}
```
