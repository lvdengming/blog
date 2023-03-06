---
title: 服务部署
date: 2023-03-05
sidebar: auto
categories:
  - 操作系统
  - 服务搭建
tags:
  - 配置
---

## 概述

本文介绍了如何在服务器部署前端服务

## 通过 nginx 部署服务

参考文档：

+ [nginx静态资源服务器简单配置](https://blog.csdn.net/name_is_wl/article/details/52958472)
+ [静态资源服务器](https://tsejx.github.io/devops-guidebook/server/nginx/static-resource-server/)

### 在服务器上创建网站

可通过以下方式进行创建：

1. 在服务器上直接创建一个 html 文件，编辑内容
2. 通过 `scp`、`ftp/sftp` 将本地网站上传到服务器，具体可参考 [文件传输](/operation-system/transmit.html) 章节
3. 通过 git 一个网页代码仓库到服务器，在服务器上安装 git 可参考 [搭建服务器环境 - 安装 Git](/operation-system/initialize.html#安装-git) 章节
4. ……

注意：nginx 启动用户默认不是 root，请确保该用户对网站文件具有访问权限（可在 nginx.conf 文件 user 字段处进行查看）

### 配置 nginx

配置文件位于 `nginx 安装目录/nginx.conf`，在 CentOS 7.9 版本通过 `yum` 安装 nginx，配置文件默认位于 `/etc/nginx/nginx.conf`。如何在服务器安装 nginx 可参考 [搭建服务器环境 - 安装 nginx](/operation-system/initialize.html#安装-nginx) 章节

在 `http` 中添加如下内容：

```conf
server {
  # 端口号
  listen      80;
  # 匹配请求的 host 值（localhost 表示当前主机）
  server_name localhost;

  # 监听请求路径
  location / {
    # 查找目录（网站存放目录，例如 /root/hello-world）
    root  website_path;
    # 默认查找
    index index.html index.htm;
  }
}
```

配置完成后，执行 `nginx -t` 查看参数配置是否有错误，错误、成功案例如下：

![image.png](https://s2.loli.net/2023/03/05/e2kW3r8Jlj6gwp4.png)

配置成功后，执行 `nginx -s reload` 命令更新 nginx 配置文件

### 验证

直接在浏览器中输入服务器 IP、端口号进行验证，查看网站是否能正常加载

若网站不能正常加载，可通过 nginx 日志文件查看报错原因

日志默认存放于 `/var/log/nginx/error.log`，可在 nginx.conf 文件中进行查看和配置

### 常用命令

```sh
# 验证配置正确性
nginx -t

# 退出服务
nginx -s quit

# 立即关闭服务
nginx -s stop

# 重启服务
nginx -s reload
```

## 通过 docker & nginx 部署服务

官方文档：[https://hub.docker.com/\_/nginx](https://hub.docker.com/_/nginx)
