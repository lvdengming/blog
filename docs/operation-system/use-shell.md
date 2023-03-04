---
title: 在 VSCode 中使用 Shell 终端（Git-Bash）
date: 2023-2-14
sidebar: 'auto'
categories:
  - 操作系统
tags:
  - 配置
---

## 前置条件

电脑需要安装 Git、VSCode，下载地址如下：

1. Git：[https://git-scm.com/download/win](https://git-scm.com/download/win)
2. VSCode：[https://code.visualstudio.com/download](https://code.visualstudio.com/download)

## 配置 VSCode

1. 打开 VSCode 设置（点击左下角 or 其它方式）：

![image.png](https://s2.loli.net/2023/02/14/kvWt7TzDOq4iewb.png)

2. 点击右上角按钮，进入用户配置 JSON：

![image.png](https://s2.loli.net/2023/02/14/91fEOALR5DelwKM.png)

3. 添加如下内容：

```json
"terminal.integrated.profiles.windows": {
    "Git-Bash": {
        "path": "D:\\Apps\\Git\\bin\\bash.exe",
        "args": []
    }
},
"terminal.integrated.defaultProfile.windows": "Git-Bash"
```

> 注意：path 处填写电脑上 Git 对应的安装位置，对应的 `.exe` 是 bin 目录下的 `bash.exe`

4. 重启 VSCode

更多 VSCode 配置，请参考：[https://code.visualstudio.com/docs/terminal/basics](https://code.visualstudio.com/docs/terminal/basics)

我的配置如下：

```json
{
  "workbench.colorTheme": "Atom One Dark",
  "editor.fontSize": 18,
  "editor.tabSize": 2,
  "window.zoomLevel": 1,
  "terminal.integrated.fontSize": 16,
  "terminal.integrated.profiles.windows": {
    "Git-Bash": {
      "path": "D:\\Apps\\Git\\bin\\bash.exe",
      "args": []
    }
  },
  "terminal.integrated.defaultProfile.windows": "Git-Bash"
}
```

5. 实现效果

![image.png](https://s2.loli.net/2023/02/19/51C9W6muUcasqfS.png)

## 修改用户名和计算机名

从**实现效果**中可以看到 `ming@REN7000K-261AB` 这样一个字符串，这是由用户名和计算机名称组成的，如果其中存在中文显示会乱码，修改方式如下：

1. 修改用户名（使用本地账户登录）

以 win11 为例，通过 `设置 -> 账户 -> 使用本地账号登录` 路径进行修改，如图：

![image.png](https://s2.loli.net/2023/02/19/dAJHtOTG8Ig5Vyc.png)

> 此处我已进行修改，所以看不到 “使用本地账户登录” 的选项

2. 修改计算机名

以 win11 为例，通过 `设置 -> 系统 -> 重命名进行设置` 路径进行修改，如图：

![image.png](https://s2.loli.net/2023/02/19/VkUxpb85QDTymEi.png)
