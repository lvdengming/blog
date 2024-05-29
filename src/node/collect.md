# 第三方模块收藏

## dotenv

一个从 .env 文件加载环境变量到 `process.env` 的零依赖模块

npm 地址：[https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

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

支持多种环境导入/导出 excel 文件

npm 地址：[https://www.npmjs.com/package/xlsx](https://www.npmjs.com/package/xlsx)

## serve

运行一个静态网页，和 Live Server 类似

npm 地址：[https://www.npmjs.com/package/serve](https://www.npmjs.com/package/serve)

使用方式：将命令行切到需要运行的 html 文件所在目录，运行 serve 命令即可

## pm2

基于 Node.js 的后台任务管理工具

官网：[https://pm2.keymetrics.io/](https://pm2.keymetrics.io/)

## moment

一个处理时间的第三方模块

官网：[https://momentjs.com/](https://momentjs.com/)

## npm-run-all

A CLI tool to run multiple npm-scripts in parallel or sequential.

一个提供并行、串行运行多个 npm 脚本的第三方模块

官网：[npm-run-all](https://github.com/mysticatea/npm-run-all)

## ngx-charts

适用于 angular 的 echarts 版本，做了很多处理

官网：[https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical](https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical)

## ng-swagger-gen

通过配置文件动态生成 angular 网络请求的 service

官网：[https://github.com/cyclosproject/ng-swagger-gen](https://github.com/cyclosproject/ng-swagger-gen)

## rxjs

RxJS 是一个使用可观察序列编写异步和基于事件的程序的库

官网：[https://rxjs.tech/](https://rxjs.tech/)
