# VSCode 使用技巧

## 快速生成 html 元素

VSCode 可通过输入类似 CSS 选择器的文本 + `Tab` 键快速生成 html 元素，具体如下：

> 以下规则可以组合使用

### 生成一个标签

通过输入标签元素快速生成，例如 `div`

```html
<div></div>
```

### 生成一个标签并设置文本内容

通过输入标签元素、`{content}` 快速生成，例如 `div{content}`

```html
<div>content</div>
```

### 生成一个标签并设置属性内容

通过输入标签元素、`>[属性名="属性值"]` 快速生成，例如 `button[type="primary"]`

```html
<button type="primary"></button>
```

### 生成带类选择器的标签

通过输入标签元素、选择器快速生成，例如 `div.wrapper`

```html
<div class="wrapper"></div>
```

### 生成带 id 选择器的标签

通过输入标签元素、选择器快速生成，例如 `section#list`

```html
<section id="list"></section>
```

> 可直接输入类、id 选择器进行生成，例如 `.wrapper`、`#app`，默认标签是 `div`

### 生成多个相同的标签

通过输入标签元素（、选择器）、`*`、数量，例如 `.item*5`

```html
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
```

内容带编号：`.item*5>{order: $}`

```html
<div class="item">order: 1</div>
<div class="item">order: 2</div>
<div class="item">order: 3</div>
<div class="item">order: 4</div>
<div class="item">order: 5</div>
```

### 生成两个或多个特定标签

通过输入标签元素（、选择器）、“+”、标签元素（、选择器），例如 `section.a+.b`

```html
<section class="a"></section>
<div class="b"></div>
```

### 生成父子层级的标签

通过输入标签元素（、选择器）、“>”、标签元素（、选择器），例如 `.a>.b`

```html
<div class="a">
    <div class="b"></div>
</div>
```
