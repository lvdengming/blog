---
title: npm
date: 2023-02-17
sidebar: 'auto'
categories:
- node
tags:
- 配置
---

## npm 命令

官方文档：[https://docs.npmjs.com/cli/v9/commands](https://docs.npmjs.com/cli/v9/commands)

## npm 配置

官方文档：[https://docs.npmjs.com/cli/v9/using-npm/config](https://docs.npmjs.com/cli/v9/using-npm/config)

查看所有配置选项：

```sh
npm config ls -l
```

配置方式：

1. 通过命令行方式进行配置，例如：

```sh
# 查看模块安装来源
npm get registry

# 设置模块安装来源
npm set registry https://registry.npmmirror.com
```

2. 通过修改文件方式进行配置，配置文件默认存放位置：`~/.npmrc`

> 两者效果相同

### registry

设置模块安装来源，在国内使用 npm 来源速度较慢或不能使用，需要设置国内镜像，常见镜像有：

1. [npm](https://www.npmjs.com/)：`https://registry.npmjs.org/`，默认
2. [淘宝镜像](https://npmmirror.com/)：`https://registry.npmmirror.com/`
3. ……

### prefix

npm 全局模块默认安装位置，默认位置如下：

+ windows：`C:\Users\admin\AppData\Roaming\npm`

更改后，重新安装全局模块很有可能不会生效，这时候需要修改环境变量：

1. Windows，以 win11 为例通过 `打开文本资源管理器 -> 右键此电脑 -> 选择属性 -> 系统高级设置 -> 环境变量 -> 用户变量` 路径，找到 Path，更改默认路径并重启命令行工具
2. shell 命令行环境：

```sh
# 查看环境变量
echo $PATH

# 在 ~/.bashrc or ~/.zshrc 文件中将新的安装位置添加到环境变量中
export PATH=$PATH:your_new_path

# 通过 source 命令或重新打开命令行工具让环境变量生效，source 命令方式如下
source ~/.bashrc
```

> Windows 也可以使用 shell 命令行终端，可以参考 [https://lvdengming.com/windows/use-shell.html](https://lvdengming.com/windows/use-shell.html) 进行配置

### cache

npm 缓存目录存放位置，默认位置如下：

+ windows：`C:\Users\admin\AppData\Roaming\npm-cache`
