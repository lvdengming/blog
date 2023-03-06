---
title: 连接远程仓库
date: 2023-03-05
sidebar: auto
categories:
  - git
tags:
  - 项目配置
---

## 概述

本文介绍了如何配置本地通过 SSH 连接远程仓库

## 生成 SSH key

在本地通过以下命令进行创建：

```sh
ssh-keygen -t rsa -C "your_email"
```

在创建过程中，会提示秘钥文件存放位置、密码等，可以一直回车使用默认配置，如图：

![image.png](https://s2.loli.net/2023/03/05/7nsRYLuhXoU4GSf.png)

## 复制公钥内容

生成的公钥、私钥文件默认存放于 `~/.ssh` 目录，分别为 `id_rsa.pub`、`id_rsa`

## 将公钥内容添加到远程仓库中

以 GitHub 为例，设置路径：`Settings -> SSH and GPG keys`，如图：

![image.png](https://s2.loli.net/2023/03/05/YhTwUVrL875Rsgp.png)
