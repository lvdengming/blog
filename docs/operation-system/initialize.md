---
title: 搭建服务器环境
date: 2023-03-04
sidebar: 'auto'
categories:
  - 操作系统
  - 服务搭建
tags:
  - 配置
---

## 安装 Node.js

官方文档：[https://github.com/nodejs/help/wiki/Installation](https://github.com/nodejs/help/wiki/Installation)

### 下载包

[Node.js](https://nodejs.org/zh-cn/) `v16.15.0` 下载地址：[https://nodejs.org/download/release/v16.15.0/](https://nodejs.org/download/release/v16.15.0/)

在 linux 指定目录下执行 `wget https://nodejs.org/download/release/v16.15.0/node-v16.15.0-linux-x64.tar.xz` 命令下载包

### 解压包

解压安装脚本：

```sh
# node 版本
VERSION=v16.15.0
# 系统版本
DISTRO=linux-x64
# 安装位置
LOCATION=/usr/local/lib/nodejs

# 以递归方式创建目录
sudo mkdir -p $LOCATION
# 安装 node（实际上就是解压文件到指定目录）
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C $LOCATION
```

> 需要注意 Node.js 安装包位置与脚本位置

### 配置环境变量

通过 `echo $SHELL` 查看服务器当前命令终端类型是什么，到对应的文件进行配置

例如终端类型为 `/bin/bash`，则需要到 `~/.bashrc` 文件中进行配置（添加如下内容）：

```sh
# config environment variables
export PATH=/usr/local/lib/nodejs/node-v16.15.0-linux-x64/bin/:$PATH
```

### 扩展

1. 本质上 `.bashrc` 也是一个 shell 脚本，会在打开终端时就执行
2. 只要给文件添加可执行权限：`chmod +x filename`，不管该文件是否有 `.sh` 后缀，该文件就是一个 shell 脚本，例如 `.bashrc`、`.zshrc`
3. 环境变量是一系列目录的组合，每个目录包含的 shell 脚本在命令行中可以直接执行，例如 Node.js 目录：

![image.png](https://s2.loli.net/2023/03/04/tJceUbjQ2fRG6TO.png)

> `npm -> ../lib/node_modules/npm/bin/npm-cli.js` 表示文件重定向（JS 只要有 Node.js 环境也可以像 `/bin/bash` 一样作为一种终端类型）

在[连接远程服务器](/operation-system/connect.html#设置命令别名)章节提到的 `alias` 方式可以进一步升级，将连接脚本的目录在配置文件（`.bashrc`、`.zshrc` 等）中添加到环境变量中：

```sh
PATH=directory_path:$PATH
export PATH
```

注意：需要通过 `chmod +x filename` 命令给目录下脚本文件添加可执行权限、删除文件后缀，最后重启终端

输入脚本名称即可和 `node`、`npm`、`npx` 等一样，拥有自己的自定义命令!!!
