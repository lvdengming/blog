# 网络知识点

## nginx 跨域请求原理

NGINX 实现跨域的原理是通过在响应头中添加 CORS（跨域资源共享） 相关的 HTTP 头来允许浏览器访问不同源的资源

跨域的核心是 CORS 头，以下是几个常用的 HTTP 头：

-   `Access-Control-Allow-Origin`：允许访问的源，通常可以设置为特定的域名（例如：`http://example.com`、），或者设置为 `*`，表示允许所有源跨域访问
-   `Access-Control-Allow-Methods`：指定允许使用的 HTTP 方法，例如 `GET, POST, PUT, DELETE` 等
-   `Access-Control-Allow-Headers`：指定允许的自定义请求头
-   `Access-Control-Allow-Credentials`：如果需要发送包含身份验证信息的请求，如 Cookie，设置为 true
-   `Access-Control-Max-Age`：指明预检请求的结果可以被缓存多长时间

> 注意：`Access-Control-Allow-Origin` 设置为 `http://example.com` 表示当前域及其子域（`http://a.example.com`, `http://b.example.com`）都是被允许的

配置案例：

```nginx
server {
    listen 80;
    server_name example.com;

    location /api/ {
        # 允许所有来源
        add_header 'Access-Control-Allow-Origin' '*';

        # 指定允许的 HTTP 方法
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';

        # 允许的请求头
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';

        # 如果是 OPTIONS 请求，立即返回 204（无内容），通常用于处理预检请求
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
            return 204;
        }

        proxy_pass http://backend;
    }
}
```

解析：

-   `Access-Control-Allow-Origin`：这里设置为 _，表示允许所有域访问。如果只允许特定域名访问，则可以将 _ 替换为具体的域名（如 http://example.com）。
-   `Access-Control-Allow-Methods`：指定前端可以使用的 HTTP 方法。
-   `Access-Control-Allow-Headers`：指定前端请求可以携带的自定义头，比如 Authorization、Content-Type 等。
-   `OPTIONS` 请求：浏览器在发送非简单请求时，会先发送一个 OPTIONS 请求来预检服务端是否允许该请求。这里直接返回 204，无需处理实际的业务逻辑。

请求类型分为两种：

1. 简单请求：常规的请求，例如 GET
2. 非简单请求：浏览器在发送非简单请求时，会先发送一个 OPTIONS 请求来预检服务端是否允许该请求，接口返回 204 后再发送实际请求

## 网页渲染过程（浏览器的工作原理）

分为以下几个阶段：

1. 导航
2. 响应
3. 解析
4. 渲染
5. 交互

MDN：[https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
