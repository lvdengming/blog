# linux 常用命令

# ln - 软连接

```sh
# 创建文件软连接（在当前目录下创建一个软连接文件）
# 示例：将 sites-available 目录下的 web-apps 软连接到当前目录 web-apps 文件
ln -s /etc/nginx/sites-available/web-apps web-apps
```
