<!--
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-03-05 05:11:10
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-03-10 01:53:33
-->

# nginx 相关

## 概述

本文介绍了 nginx 的一些常用命令和配置

## 常用命令

```sh
# 启动 nginx
sudo systemctl start nginx

# 验证配置是否正确
nginx -t

# 重启 nginx
nginx -s reload

# 退出 nginx
nginx -s quit

# 关闭 nginx
nginx -s stop
```

## 常用配置

> [!TIP]
> 以下内容是 nginx 配置的一部分

### 反向代理、负载均衡、接口重写

```nginx
# 定义负载均衡上游服务器组
upstream backend_nodes {
  # 默认轮询策略
  server server1_ip:port;
  server server1_ip:port;
}

server {
  listen 80;
  # 设置 ip 或者域名
  server_name your_ip_or_domain_name;

  # 开启 gzip 压缩，提升前端性能
  gzip on;

  # 反向代理 & 负载均衡
  location /api {
    # 接口重写（将前端 /api/xxx 形式的接口请求转发到后端 /xxx）
    rewrite ^/api/(.*) /$1 break;
    # 将请求转发到上游服务器组
    proxy_pass http://backend_nodes;

    # 传递必要的头部信息
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # 超时设置
    proxy_connect_timeout 5s;
    proxy_send_timeout 10s;
    proxy_read_timeout 10s;

    # 禁用缓存
    proxy_buffering off;
  }

  # 日志配置
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;
}
```

### SPA 页面配置

> [!TIP]
> nginx 默认会开启协商缓存

```nginx
location / {
  # 打包产物存放路径
  root dist_path;
  # 默认访问目录下的 index.html
  index index.html;
  # 尝试访问路径下的资源文件、资源目录，如果都不存在则返回 index.html
  # index.html 兜底是为了使页面打开页面时，SPA 能正确获取入口，后续页面路由变化不会发起请求
  try_files $uri $uri/ /index.html;

  # 开启 gzip
  gzip on;

  # 缓存配置
  add_header Cache-Control "no-cache, no-store, must-revalidate";
  # http 1.0 兼容的 Cache-Control
  add_header Pragma "no-cache";
  # expires 指令可以同时设置 Cache-Control 和 Expires
  expires 0;
}

# 为资源文件配置缓存，优先级更高
location ~* \.(?:css|js|jpg|jpeg|png|svg|gif|ico|gif|woff|woff2|ttf|eot)$ {
  # 打包产物存放路径（必须配置），资源文件只能命中一个 location 进行处理
  root dist_path;

  # 设置缓存一年（因为打包产物有 hash 后缀，不用担心新改动不生效）
  expires 1y;
  add_header Cache-Control "public, immutable";
  access_log off;
}
```

### 微前端配置

> [!TIP]
> 主应用会加载微应用资源，所以微应用部署需要配置跨域 Header

```nginx
location xxx {
  // others...

  # 设置跨域
  add_header Access-Control-Allow-Origin "main_app_origin";
  add_header Access-Control-Allow-Methods "GET";
  add_header Access-Control-Allow-Headers "*";
}
```

## 参考链接

-   Nginx 官网：[https://nginx.org/](https://nginx.org/)
-   Nginx 配置详解 - 张龙豪：[https://www.cnblogs.com/knowledgesea/p/5175711.html](https://www.cnblogs.com/knowledgesea/p/5175711.html)
-   Nginx 的安装及配置详解 - 大江狗：[https://pythondjango.cn/python/tools/5-nginx-configuration/](https://pythondjango.cn/python/tools/5-nginx-configuration/)
-   缓存（二）——浏览器缓存机制：强缓存、协商缓存：[https://github.com/amandakelake/blog/issues/41](https://github.com/amandakelake/blog/issues/41)
