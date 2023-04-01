---
title: 部署安全服务
date: 2023-04-01
sidebar: auto
categories:
  - 操作系统
  - 服务搭建
tags:
  - 配置
---

## 概述

本文将介绍如何在阿里云服务器上部署 SSL 服务

## 领取证书

1、点击[阿里云控制台](https://home.console.aliyun.com/home/dashboard/ProductAndService)右上角菜单按钮，搜索 `ssl`，点击云安全下 **SSL 证书（应用安全）** 选项，进入数字证书管理控制台页面

![image.png](https://s2.loli.net/2023/04/01/vUoixBuH6h8qdzI.png)

2、点击 SSL 证书 -> 免费证书 -> 立即购买，目前申请的证书一次性给 20 个

![image.png](https://s2.loli.net/2023/04/01/728spHzrU9WZdkn.png)

3、选择默认选项，点击**立即购买**

4、购买成功后，回到 SSL 证书 -> 免费证书页面，点击**创建证书**，填写相应表单

5、待签发成功后，回到 SSL 证书 -> 免费证书页面，在已签发证书列表项操作列，点击下载，将 xxx.pem、xxx.key 文件放到服务器某文件路径下，再点击部署，选择 ECS 服务器，填写证书路径一键部署

![image.png](https://s2.loli.net/2023/04/01/EAOvcPajxfdbS25.png)

> 通过 nginx 发布的服务发现一键部署没效果

## 修改 nginx 配置

官方配置文档：[http://nginx.org/en/docs/http/configuring_https_servers.html](http://nginx.org/en/docs/http/configuring_https_servers.html)

1、在 nginx 安装目录下新建一个 cert 目录，通过[搭建服务器环境](/blog/operation-system/initialize.html)安装的 nginx 目录位于 `/etc/nginx/` 目录

```sh
# 进入安装目录
cd /etc/nginx

# 创建 etc 目录
mkdir cert

# 将下载好的证书、私钥放置到该目录下
# 可参考文件传输一文，通过 sftp、scp 命令传输文件：http://lvdengming.com/blog/operation-system/transmit.html
```

2、修改 nginx 配置

配置文件位置：`/etc/nginx/nginx.conf`

在 server 下添加以下内容：

```conf
server {
  listen              443 ssl;
  server_name         www.lvdengming.com;
  ssl_certificate	    cert/9606710_lvdengming.com.pem;
  ssl_certificate_key	cert/9606710_lvdengming.com.key;
  ssl_protocols		    TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
  ssl_ciphers         ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;

  # 优化 ssl
  ssl_session_cache   shared:SSL:10m;
  ssl_session_timeout 10m;
  keepalive_timeout   70;
}
```

3、运行命令

```sh
# 验证配置参数是否正确
nginx -t

# 重启服务器
nginx -s stop

nginx
```
