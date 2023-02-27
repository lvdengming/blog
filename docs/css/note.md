---
title: CSS 笔记
date: 2023-02-25
sidebar: 'auto'
categories:
- 前端
- css
tags:
- 学习笔记
---

## 概要

记录未接触到的、易忘的 CSS 知识点

## [pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)

给元素样式添加 `pointer-events: none;` 可以屏蔽鼠标点击事件

> 对 SVG 元素支持属性值会很多

常用值：

+ `auto`：默认
+ `none`：屏蔽鼠标点击事件

## [clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)

用裁剪方式创建元素的可显示区域，区域内的部分显示，区域外的隐藏

常用值：
+ `clip-source`：用 `url()` 引用 SVG 的 `<clipPath>` 元素
+ [basic-shape](https://developer.mozilla.org/zh-CN/docs/Web/CSS/basic-shape)
  + [inset(span round border-raidus)](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset)：通过设置离四边的间距、圆角大小来 “矩形” 裁剪元素
  + [circle(r at o)](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/circle)：通过设置圆的半径和圆心（可省略）来 “圆形” 裁剪元素内容，默认圆心在中间
  + [ellipse(r1 r2 at 0)](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/ellipse)：通过设置圆的x半轴长、y半轴长来 “椭圆形” 裁剪元素内容，默认圆心在中间
  + [polygon(pointX1 pointY1, pointX2 pointY2, ...)](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/polygon)：通过设置一组顶点来 “多边形” 裁剪元素
  + [path()](https://developer.mozilla.org/en-US/docs/Web/CSS/path)：通过设置 SVG path 路径来 “任意形状” 裁剪元素
+ geometry-box：如果同 `<basic-shape> 一起声明`，它将为基本形状提供相应的参考框盒
  + `margin-box`：使用 margin box 作为引用框
  + `border-box`：使用 border box 作为引用框
  + `padding-box`：使用 padding box 作为引用框
  + `content-box`：使用 content box 作为引用框
  + `fill-box`：利用对象边界框（object bounding box）作为引用框
  + `stroke-box`：使用笔触边界框（stroke bounding box）作为引用框
  + `view-box`：使用最近的 SVG 视口（viewport）作为引用框
+ `none`：不创建裁剪路径

## [inset](https://developer.mozilla.org/en-US/docs/Web/CSS/inset)

`top`、`right`、`bottom`、`left` 属性的简写，写法和 `margin` 类似

## [display: grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)

网格布局

## [place-items](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items)

是 `align-items`、`justify-items` 属性的简写，可以在 grid、flex 布局中使用
