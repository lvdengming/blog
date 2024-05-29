# 系统常用命令

## 概述

本文介绍了操作系统（主要是 Linux）常用系统命令

```sh
# 递归方式创建所有目录
mkdir -p /root/a/b/c

# 查看系统版本
lsb_release -a
uname -a

# 查看端口号占用进程
netstat -tunlp | grep 80

# 查看所有进程，可搭配 grep 进行使用
ps -ef

# 关闭进程
kill -9 PID

# 查看所有用户
cat /etc/passwd

# 查看用户组及其组内成员
groups nginx

# 查看当前登录用户
whoami

# 给文件添加可执行权限，更多：https://www.runoob.com/linux/linux-comm-chmod.html
chmod +x deploy.sh

# 改变文件拥有权限，更多：https://www.runoob.com/linux/linux-comm-chown.html
chown -R zhangsan:person imgs

# 添加用户并创建用户目录，更多：https://www.runoob.com/linux/linux-comm-useradd.html
useradd -m zhangsan
# 删除用户并删除用户目录，更多：https://www.runoob.com/linux/linux-comm-userdel.html
userdel -r zhangsan

# 切换用户
su zhangsan

#
visudo

#
whereis nginx

# 编辑定时任务
crontab -e
# 查看定时任务
crontab -l
# 删除定时任务
crontab -r

# 使用 for 循环模拟，末尾 & 表示在后台执行
# sleep 3600 秒
for i in {1..100}; do echo 'hello'; sleep 3600; done &

# 查看邮件（输入编号即可查看，输入 q 退出查看状态）
mail
```
