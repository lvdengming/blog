# 服务器初始化

## 概述

本文介绍了如何在云服务器中搭建服务运行环境

> 以下基于 `CentOS 7.9` 环境

## 安装 Node.js

官方文档：[https://github.com/nodejs/help/wiki/Installation](https://github.com/nodejs/help/wiki/Installation)

### 下载源码

[Node.js](https://nodejs.org/zh-cn/) `v16.15.0` 下载地址：[https://nodejs.org/download/release/v16.15.0/](https://nodejs.org/download/release/v16.15.0/)

在 linux 指定目录下执行 `wget https://nodejs.org/download/release/v16.15.0/node-v16.15.0-linux-x64.tar.xz` 命令下载源码

### 解压

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

> 系统环境变量是在 `/etc/profile` 中定义的

## 安装 Git

### 通过 `yum` 安装

```sh
# 安装
yum install git

# 卸载
yum remove git
```

> 此方式安装 git 版本比较老

### 通过源码安装

linux 镜像：[https://mirrors.edge.kernel.org/pub/software/scm/git/](https://mirrors.edge.kernel.org/pub/software/scm/git/)

windows 镜像：[https://registry.npmmirror.com/binary.html?path=git-for-windows/](https://registry.npmmirror.com/binary.html?path=git-for-windows/)

通过以下脚本安装 git：

```sh
# 下载源码
wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.36.1.tar.xz

# 解压（可在末尾添加 -C path，解压到指定目录）
sudo tar -xJvf git-2.36.1.tar.xz

cd git-2.36.1

# 编译
make configure
# 指定编译产物存放路径
./configure --prefix=/usr/local/lib/git-2.36.1
make prefix=/usr/local/lib/git-2.36.1
make install
```

遇到的问题 & 解决方案：

```sh
# make /bin/sh: autoconf: command not found
yum install autoconf

# git-compat-util.h:1427:18: fatal error: zlib.h: No such file or directory
yum install zlib-devel
```

在 `.bashrc` 中添加环境变量配置（内容紧接安装 Node.js）：

```sh
# Config environment variables
PATH=/usr/local/lib/nodejs/node-v16.15.0-linux-x64/bin:$PATH
PATH=/usr/local/lib/git-2.36.1/bin:$PATH
export PATH
```

验证：

```sh
# 使修改立即生效
source ~/.bashrc

# 验证
git --version
```

## 安装 Docker

官方文档：[https://docs.docker.com/engine/install/centos/](https://docs.docker.com/engine/install/centos/)

### 卸载旧版本

老版本的 Docker 命名为 docker 或 docker-engine，安装新版本的 Docker 之前需要卸载老版本及其依赖项，卸载命令如下：

```sh
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

注意：存储在 `/var/lib/docker/` 目录下的镜像不会在卸载老版本 Docker 时自动删除

### 通过代码仓安装（推荐）

通过 Docker 代码仓进行安装，后续升级也通过代码仓，官方推荐

**1. 在下载代码仓之前，需要安装 `yum-utils`，它提供了 `yum-config-manager` 工具**

```sh
sudo yum install -y yum-utils
```

通过 `yum-config-manager` 下载代码仓：

```sh
sudo yum-config-manager \
  --add-repo \
  https://download.docker.com/linux/centos/docker-ce.repo
```

国内镜像：

-   阿里云：http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
-   清华大学：https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo

> 代码仓配置文件存放位置：`/etc/yum.repos.d/docker-ce.repo`

**2. 安装最新版本 Docker**

```sh
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

安装过程中如果提示是否需要接受 GPG key，验证 `Fingerprint` 如果为 `060a 61c5 1b55 8a7f 742b 77aa c52f eb6b 621e 9f35`时，选择接受，如下：

![image.png](https://s2.loli.net/2023/03/05/cBeHlgGZjyUpJ9Y.png)

> 安装完成后，Docker 默认是没有启动的，安装过程中自动创建了 `docker` 用户组但没有添加用户

**3. 启动 Docker**

```sh
sudo systemctl start docker
```

> `systemctl` 命令是 Systemd 中最重要的一个命令，用于对服务进行启动，停止等操作

**4. 验证安装结果**

```sh
sudo docker run hello-world
```

该命令下载了一个测试镜像并在容器中运行，当测试镜像在容器中运行时，会打印确认成功的信息，如下：

![image.png](https://s2.loli.net/2023/03/05/DgWHKuYUABJsxTI.png)

### 通过 rpm 包安装

此方式需要下载 rpm 包后手动进行安装，后续升级仍需要重复前面操作，适用于无法联网的机器

安装教程参考：[https://docs.docker.com/engine/install/centos/#install-from-a-package](https://docs.docker.com/engine/install/centos/#install-from-a-package)

### 通过脚本安装

参考链接：[https://docs.docker.com/engine/install/centos/#install-using-the-convenience-script](https://docs.docker.com/engine/install/centos/#install-using-the-convenience-script)

## 安装 nginx

官方开源版下载源：[https://nginx.org/en/download.html](https://nginx.org/en/download.html)

Linux 安装文档：[https://nginx.org/en/linux_packages.html](https://nginx.org/en/linux_packages.html)

### 创建 yum nginx 仓库配置文件

```sh
touch /etc/yum.repos.d/nginx.repo
```

### 修改配置文件

在配置文件中添加以下内容：

```sh
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

默认会使用稳定版 nginx 包，如果要使用开发版（mainline）包，需要运行以下命令：

```sh
sudo yum-config-manager --enable nginx-mainline
```

### 安装 nginx

```sh
sudo yum install nginx
```

安装过程中如果提示是否需要接受 GPG key，验证 `Fingerprint` 如果为 `573b fd6b 3d8f bc64 1079 a6ab abf5 bd82 7bd9 bf62`时，选择接受

### 验证

```sh
nginx -v
# nginx version: nginx/1.22.1
```

## 扩展（一）自定义终端命令

1. 本质上 `.bashrc` 是一个 shell 脚本，会在打开终端时就执行
2. 只要给文件添加可执行权限：`chmod +x filename`，不管该文件是否有 `.sh` 后缀，该文件就是一个 shell 脚本，例如 `.bashrc`、`.zshrc`
3. 环境变量是一系列目录的组合，每个目录包含的 shell 脚本在命令行中可以直接执行，例如 Node.js 目录：

![image.png](https://s2.loli.net/2023/03/04/tJceUbjQ2fRG6TO.png)

> `npm -> ../lib/node_modules/npm/bin/npm-cli.js` 表示文件重定向（JS 只要有 Node.js 环境也可以像 `/bin/bash` 一样作为一种终端类型）

在[连接远程服务器](/dev-ops/create-connect-script#设置命令别名)章节提到的 `alias` 方式可以进一步升级，将连接脚本的目录在配置文件（`.bashrc`、`.zshrc` 等）中添加到环境变量中：

```sh
PATH=directory_path:$PATH
export PATH
```

注意：需要通过 `chmod +x filename` 命令给目录下脚本文件添加可执行权限、删除文件后缀，最后重启终端

输入脚本名称即可和 `node`、`npm`、`npx` 等一样，拥有自己的自定义命令!!!

## 扩展（二）查看 yum install 后文件存放位置

参考博客：[如何查看 yum 安装的软件路径（不要再忘了）](https://blog.csdn.net/wd2014610/article/details/79659073)

以 nginx 为例

### 查找安装包

```sh
rpm -qa | grep nginx
# nginx-filesystem-1.20.1-10.el7.noarch
# nginx-1.22.1-1.el7.ngx.x86_64
```

> rpm：redhat package manager，用于管理套件，更多请参考 [https://www.runoob.com/linux/linux-comm-rpm.html](https://www.runoob.com/linux/linux-comm-rpm.html)

### 查找安装路径

```sh
rpm -ql nginx-1.22.1-1.el7.ngx.x86_64
# /etc/logrotate.d/nginx
# /etc/nginx
# /etc/nginx/conf.d
# /etc/nginx/conf.d/default.conf
# /etc/nginx/fastcgi_params
# /etc/nginx/mime.types
# /etc/nginx/modules
# /etc/nginx/nginx.conf
# /etc/nginx/scgi_params
# /etc/nginx/uwsgi_params
# /usr/lib/systemd/system/nginx-debug.service
# /usr/lib/systemd/system/nginx.service
# /usr/lib64/nginx
# /usr/lib64/nginx/modules
# /usr/libexec/initscripts/legacy-actions/nginx
# /usr/libexec/initscripts/legacy-actions/nginx/check-reload
# /usr/libexec/initscripts/legacy-actions/nginx/upgrade
# /usr/sbin/nginx
# /usr/sbin/nginx-debug
# /usr/share/doc/nginx-1.22.1
# /usr/share/doc/nginx-1.22.1/COPYRIGHT
# /usr/share/man/man8/nginx.8.gz
# /usr/share/nginx
# /usr/share/nginx/html
# /usr/share/nginx/html/50x.html
# /usr/share/nginx/html/index.html
# /var/cache/nginx
# /var/log/nginx
```

### 查看 `nginx` 命令脚本位置

```sh
# 查看环境变量
echo $PATH
# /usr/local/lib/git-2.36.1/bin:/usr/local/lib/nodejs/node-v16.15.0-linux-x64/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

# 对比 rpm 查询的安装路径，不难发现，nginx 命令脚本位于 /usr/sbin/nginx
/usr/sbin/nginx -v
# nginx version: nginx/1.22.1
```
