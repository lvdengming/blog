---
title: hosts 文件 —— 在本地实现主机名与域名映射
date: 2023-2-19
sidebar: auto
categories:
  - 操作系统
tags:
  - 配置
---

## 概述

本文介绍了通过修改系统 hosts 文件，在本地实现主机名与域名映射，优先级比查询 DNS 结果更高

## 使用

文件存放位置：`C:\Windows\System32\drivers\etc\hosts`

> Mac 位于 `/etc/hosts`

```sh
# 前者为 IP 地址，后者为域名
127.0.0.1 baidu.com
```

实现效果：

![image.png](https://s2.loli.net/2023/02/19/da8bW4UmBtqHxe1.png)

> 我在本地启动了静态网页，是不是以假乱真？

## 更多

维基百科：[https://zh.wikipedia.org/zh-cn/Hosts%E6%96%87%E4%BB%B6](https://zh.wikipedia.org/zh-cn/Hosts%E6%96%87%E4%BB%B6)
