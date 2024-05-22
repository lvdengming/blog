---
title: docker 常用命令
date: 2023-03-05
sidebar: auto
categories:
    - 操作系统
tags:
    - 命令行
---

## 概述

本文介绍了 docker 常用命令

## 安装

请参考：[搭建服务器环境 - 安装 Docker](/operation-system/initialize.html#安装-docker)

## 常用命令

```sh
# 启动 docker
systemctl start docker

# 重启 docker
systemctl restart docker

# 关闭 docker
systemctl stop docker

# systemctl 命令是 Systemd 中最重要的一个命令，用于对服务进行启动，停止等操作

# 查看所有已下载的镜像
docker images

# 查看所有容器
docker ps -a

# 启动容器
docker start container_id

# 重启容器
docker restart container_id

# 关闭容器
docker stop container_id

# 查看软件可用版本
docker search software_name

# 登录 docker
# 需在 https://hub.docker.com 注册账号
docker login

# 获取软件最新镜像
docker pull software_name:latest
```
