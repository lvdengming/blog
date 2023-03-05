---
title: 文件传输
date: 2023-03-04
sidebar: 'auto'
categories:
  - 操作系统
  - 服务搭建
tags:
  - 配置
---

## 概述

本文介绍了本地如何与远程服务器进行文件传输

## scp

```sh
# 上传文件
scp local_directory_path user@server_ip:file_path
# 上传目录
scp -r local_directory_path user@server_ip:directory_path

# 下载文件
scp user@server_ip:file_path local_directory_path
# 下载目录
scp -r user@server_ip:directory_path local_directory_path
```

> 以上命令均需在“本地”执行

## ftp/sftp

```sh
# 通过 ftp/sftp 连接远程服务器
sftp user@server_ip

# 连接成功后光标前处会变成 ftp>、sftp>
# 上传文件
put local_file_path remote_directory_path
# 上传目录
put -r local_directory_path remote_directory_path

# 下载文件
get remote_file_path local_directory_path
# 下载目录
get -r remote_directory_path local_directory_path
```
