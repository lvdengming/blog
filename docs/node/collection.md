---
title: 第三方模块收藏
date: 2023-02-15
sidebar: 'auto'
categories:
- node
tags:
- 收藏
---

## dotenv

一个从 .env 文件加载环境变量到 `process.env` 的零依赖模块

npm 链接：[https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

### 安装

```sh
npm i dotenv -S
```

### 使用

1. 创建一个 .env 文件，添加内容，例如：

```sh
VERSION=1.0.11.1
```

2. CommonJS 规范下使用

```js
require('dotenv').config();

console.log(process.env.VERSION); // 1.0.11.1
```

3. ESModule 规范下使用

```js
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.VERSION); // 1.0.11.1
```

## xlsx

支持多种环境解析 excel 表格的模块
