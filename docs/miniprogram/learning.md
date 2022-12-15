---
title: '小程序学习笔记'
date: 2022-12-11
sidebar: 'auto'
categories:
- 前端
tags:
- 小程序
- 学习笔记
---

## 1.初识小程序

### 1.1 相关链接

+ 学习链接：https://www.bilibili.com/video/BV1834y1676P?spm_id_from=333.337.search-card.all.click&vd_source=52ed5c88dcd416be49cb6d916d2ad164
+ 微信公众平台：https://mp.weixin.qq.com/
+ 微信开发者工具：https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html
+ 开发者文档：https://developers.weixin.qq.com/miniprogram/dev/framework/

### 1.2 目录介绍

> 在app.json中pages选项中添加页面，例如`pages/list/list`，微信开发者工具就会自动帮我们在pages目录下创建页面

默认目录结构如下：

```sh
├── app.js -> 小程序项目的入口文件
├── app.json -> 小程序项目的全局配置文件
├── app.wxss -> 小程序项目的全局样式文件
├── pages -> 用来存放所有小程序页面
│   ├── index
│   │   ├── index.js -> 页面的脚本文件，存放页面的数据、事件处理函数等
│   │   ├── index.json -> 页面的配置文件，配置窗口的外观、表现等（可覆盖app.json中的全局配置）
│   │   ├── index.wxml -> 页面的模板结构文件
│   │   └── index.wxss -> 页面的样式表文件
│   └── logs
│       ├── logs.js
│       ├── logs.json
│       ├── logs.wxml
│       └── logs.wxss
├── project.config.json -> 记录小程序开发工具所做的个性化配置
├── project.private.config.json
├── sitemap.json -> 用来配置小程序及其页面是否允许被微信索引
└── utils -> 用来存放工具性质的模块（例如：格式化时间的自定义模块）
    └── util.js
```

**app.json：**

+ pages: 记录小程序所有页面的路径（第一项为首页）
+ window: 定义小程序所有页面的背景色、文字颜色等
+ style: 定义小程序组件所使用的样式版本
+ sitemapLocation: 指明sitemap.json的位置

### 1.3 小程序开发与网页开发的区别

小程序中不能使用BOM、DOM

#### WXML模板

WXML（WeiXin Markup Language）使用小程序框架设计的一套标签语言，用来构建小程序页面的结构，其作用类似于网页开发中的HTML

WXML和HTML的区别：

1. 标签名称不同

  + HTML（div, span, img, a)
  + WXML（view, text, image, navigator)

2. 属性节点不同

  + `<a href="#">超链接</a>`
  + `<navigator url="/pages/home/home">超链接</navigator>`

3. 提供了类似于Vue中的模板语法

  + 数据绑定
  + 列表渲染
  + 条件渲染

#### WXSS样式

WXSS（WeiXin Style Sheets）是一套样式语言，用于描述WXML的组件样式，类似于网页开发中的CSS

WXSS和CSS的区别：

1. 新增了rpx尺寸单位

  + CSS中需要手动进行像素单位换算，例如rem
  + WXSS在底层支持新的尺寸单位rpx，在不同大小的屏幕上小程序会自动进行换算

2. 提供了全局样式和局部样式

  + 项目根目录中的app.wxss会作用于所有小程序页面
  + 局部页面的.wxss样式仅对当前页面生效

3. WXSS仅支持部分CSS选择器

  + .class和#id
  + element
  + 并集选择器、后代选择器
  + ::after和::before等伪类选择器

#### 小程序中的JS文件

小程序中的JS文件分为三大类，分别是：

1. app.js：是整个小程序项目的入口文件，通过调用`App()`函数来启动整个小程序
2. 页面的.js文件：通过调用`Page()`函数来创建并运行页面
3. 普通的.js文件：是普通的功能模块文件，用来封装公共的函数或属性，供页面使用

### 1.4 小程序的宿主环境

宿主环境（host environment）指的是程序运行所必须依赖的环境

手机微信是小程序的宿主环境，小程序可以借助宿主环境提供的能力，完成普通网页无法完成的功能，例如微信扫码、微信支付、微信登录等

小程序宿主环境包含的内容：通信模型、运行机制、组件、API

小程序中的通信模型分为两部分：

1. 渲染层和逻辑层之间的通信（由微信客户端进行转发）
2. 逻辑层和第三方服务器之间的通信（由客户端进行转发）

<img src="https://img2022.cnblogs.com/blog/1622292/202209/1622292-20220926203043154-1927223171.png" height="400"/>

小程序的启动过程：

1. 把小程序的代码包下载到本地
2. 解析app.json全局配置文件
3. 执行app.js小程序入口文件，调用`App()`创建小程序实例
4. 渲染小程序首页
5. 小程序启动完成

小程序页面渲染的过程：

1. 加载解析页面的.json配置文件
2. 加载页面的.wxml模板和.wxss样式
3. 执行页面的.js文件，调用Page()创建页面实例
4. 页面渲染完成

## 2.小程序基础

### 2.1 常用的视图容器类组件

+ view：普通视图区域，类似于div
+ scroll-view：可滚动的视图区域
+ swiper和swiper-item：轮播图容器组件和轮播图item组件

### 2.2 常用的基础内容组件

+ text：文本组件，类似于span（selectable属性->支持长按选中效果）
+ rich-text：富文本组件，支持吧HTML字符串渲染为WXML结构

### 2.3 其它常用组件

+ button：按钮组件，比HTML中button更丰富，通过`open-type`属性可以调用微信提供的各种功能（客服、转发、获取用户授权，获取客户信息等）
+ image：图片组件，默认宽度约为300px、高度约为200px
+ navigator：页面导航组件，类似于a

### 2.4 小程序中的API

小程序中的API是由宿主环境提供的，通过这些API，开发者可以方便调用微信提供的能力，例如获取用户信息、本地存储、支付功能等

小程序官方把API分为了如下3大类：

1. 事件监听API
   + 特点：以on开头，用来监听某些事件的触发
   + 举例：`wx.onWindowResize(function callback)`监听窗口尺寸的事件
2. 同步API
   + 特点1：以Sync结尾的API都是同步API
   + 特点2：同步API的执行结果，可以通过函数返回值直接获取，如果执行出错会抛出异常
   + 举例：`wx.setStorageSync(key, value)`向本地存储中写入内容
3. 异步API
   + 特点：类似于jQuery中的`$.ajax(options)`函数，需要通过success、fail、complete接收调用的结果
   + 举例：`wx.request()`发起网络请求，通过success回调函数接收数据

### 2.5 小程序管理

基于微信小程序开发者工具、网页可对小程序开发进行版本控制、成员管理、发布版本、查看访问数据等，具体的操作详见视频：https://www.bilibili.com/video/BV1834y1676P/?p=13

### 2.6 数据绑定

在小程序页面对应的js文件下data选项中定义数据，在wxml文件中通过Mustache语法进行使用

### 2.7 事件绑定

事件是渲染层到逻辑层的通讯方式。通过事件可以将用户在渲染层产生的行为，反馈到逻辑层进行业务处理

<img src="https://img2022.cnblogs.com/blog/1622292/202210/1622292-20221005102953130-1358794585.png"/>

常用事件：

+ tap：手指触摸后马上离开，类似于HTML中的click事件
+ input：文本框的输入事件
+ change：状态改变时触发

> 绑定方式：`bindtap`或`bind:tap`

当事件回调触发的时候，会收到一个事件对象，它的详细属性如下：

+ type==string==：事件类型
+ timeStamp==number==：页面打开到触发事件所经过的毫秒数
+ target==object==：触发事件组件的一些属性值集合
+ currentTarget==object==：当前组件的一些属性值集合
+ detail==object==：额外的信息
+ touches==array==：触摸事件，当前停留在屏幕中的触摸点信息数组
+ changedTouches==array==：触摸事件，当前变化的触摸点信息数组

### 2.8 事件与数据同步

在事件处理函数更改data中的数据方式如下：

```js
this.setData({
    count: this.data.count + 1
});
```

事件传参通过`data-*`的形式传递数据，通过`event.target.dataset.*`的形式获取数据，示例如下：

```js
// 传递数据
<button type="primary" bind:tap="add2" data-num="{{2}}">加二</button>
// 获取数据
this.setData({
    count: this.data.count + e.target.dataset.num
});
```

获取input输入信息，通过input事件：

```js
<input bind:input="inputHandler"/>

inputHandler(e) {
    console.log(e.detail.value);
}
```

"v-model"式的数据同步需要我们手动去实现：

```js
<input value="{{msg}}" bind:input="inputHandler"/>
    
Page({
    data: {
        msg: "Hello"
    },
    inputHandler(e) {
        this.setData({
            msg: e.detail.value
        });
    }
});
```
