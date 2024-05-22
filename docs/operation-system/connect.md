---
title: 连接远程服务器
date: 2023-02-27
sidebar: auto
categories:
    - 操作系统
    - 服务搭建
tags:
    - 配置
---

## 概述

本文将介绍如何在 Mac 环境下通过 [iTerm2](https://iterm2.com/) 连接远程服务器

## 购买服务器（若已有服务器，请忽略本节）

国内通常在[阿里云](https://cn.aliyun.com/)、[腾讯云](https://cloud.tencent.com/)、[华为云](https://www.huaweicloud.com/)等服务商上购买弹性云服务器。选择需要的 CPU 核数、运行内存、硬盘、带宽、区域等参数购买即可

## 创建连接脚本

在某一路径下创建连接远程服务器的脚本，添加以下内容：

```sh
#!/usr/bin/expect

set HOST your_server_ip
set PORT 22
set USER root
set PASSWORD your_server_root_password

spawn ssh $USER@$HOST -p $PORT
expect "*password:*"
send "$PASSWORD\r"

interact
```

> 服务器密码如果遗忘，可到个人控制台页面进行重置
>
> 最基础的脚本即是如此，若有更复杂的操作，可查询 `expect` 相关知识

## 设置命令别名

1、通过 `chmod +x your_script` 命令，给创建的脚本添加可执行权限

2、在终端配置文件中添加别名，以 `zsh` 终端为例，在 `~/.zshrc` 文件中添加以下内容

```sh
alias your_alias="your_script_path"
```

> 配置文件通常存放在用户目录下（`~`），以 `.xrc` 形式命名，例如 `.bashrc`、`.zshrc`
>
> 配置文件也是一个可执行的脚本，会在启动终端（例如 iTerm2）之前自动执行

3、重启 iTerm2

## 连接远程服务器

在任意目录下，执行 `your_alias` 命令即可连接远程服务器

## 设置连接状态保持时长

参考自：[http://bluebiu.com/blog/iterm2-ssh-session-idle.html](http://bluebiu.com/blog/iterm2-ssh-session-idle.html)

Mac 设置方式如下：

在 `~/.ssh/config` 中添加以下内容：

```sh
# 让所有 SSH 会话保持连接，不自动断开
HOST *
  ServerAliveInterval 60
```

其中:

-   `HOST *` 表示通过 ssh 连接的所有主机，可以将 `*` 修改为指定 IP，并且可以设置多个
-   `ServerAliveInterval 60` 表示 ssh 客户端每隔 60 秒给远程主机发送一个 no-op 包，no-op 是无任何操作的意思，这样远程主机就不会关闭这个 SSH 会话
