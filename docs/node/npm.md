---
title: npm 相关
date: 2023-02-17
sidebar: 'auto'
categories:
- node
tags:
- 配置
---

## 命令

官方文档：[https://docs.npmjs.com/cli/v9/commands](https://docs.npmjs.com/cli/v9/commands)

```sh
# 查看模块安装来源
npm get registry
```

## 配置

官方文档：[https://docs.npmjs.com/cli/v9/using-npm/config](https://docs.npmjs.com/cli/v9/using-npm/config)

配置方式：

1. 通过命令行进行配置
2. 通过修改文件进行配置

### 命令行配置

```sh
# 设置模块安装来源
npm set registry https://registry.npmmirror.com
```

### 文件配置

配置文件默认存放位置：`~/.npmrc`

配置项：

+ registry：设置模块安装来源，在国内使用 npm 来源速度较慢或不能使用，需要设置国内镜像，常见镜像有：
  - [npm](https://www.npmjs.com/)：`https://registry.npmjs.org/`
  - [淘宝镜像](https://npmmirror.com/)：`https://registry.npmmirror.com/`
  - ……
