---
title: Node 模块加载
date: 2023-02-19
sidebar: auto
categories:
    - node
---

## 介绍

在我们使用 Node 运行 js 文件时，文件模块规范默认只能使用 CommonJS，但也可以进行修改，修改模块规范途径如下：

1. 将 JS 文件后缀改为 `.cjs`，告诉 Node 以 CoommonJS 规范运行
2. 将 JS 文件后缀改为 `.mjs`，告诉 Node 以 ESModule 规范运行
3. 不修改 JS 文件后缀，在 package.json 文件中设置 `type` 字段告诉 Node 模块规范，可选值 `commonjs`、`module`

> Node 遇到 .mjs 文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"

## 更多

1. 官方文档：[https://nodejs.org/api/modules.html#enabling](https://nodejs.org/api/modules.html#enabling)
2. 阮一峰的文章：[https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html](https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)
