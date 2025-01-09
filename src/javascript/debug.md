# Chrome 调试指南

阅读本文，你将了解到：

-   如何使用 Chrome 浏览器（或 Microsoft Edge）在本地或现网环境进行 Debug 调试
-   使用浏览器调试过程中可能用到的快捷键

## 流程介绍

1. 通过各种方式定位到代码块（console 打印、快捷键搜索等）
2. 在合适的位置打断点
3. 查看代码运行情况，排查原因
4. 完成调试

## 在调试过程中修改变量值

结论：程序运行到断点位置时，通过 console 终端直接修改

示例：

![image.png](https://s2.loli.net/2024/01/03/KvYq8BflSALWir9.png)

在 console 中直接输入 `l` 变量进行修改：

![image.png](https://s2.loli.net/2024/01/03/MGtjgwdyazWnNke.png)

回到断点位置，再次查看：

![image.png](https://s2.loli.net/2024/01/03/lg5NqbvVUHfJYRk.png)

## 替换资源文件内容

背景：对于某些代码片段，当不方便对其进行变量赋值进行调试时，就可以替换资源文件内容再重新加载页面进行调试

> 直接修改资源文件内容是不起效果的

示例：在资源文件中添加 `console.log`

1. 打开 NetWork 找到要替换的资源文件

![image.png](https://s2.loli.net/2025/01/09/dxDb4wCRIgp3vsH.png)

2. 右键 Override Content

![image.png](https://s2.loli.net/2025/01/09/K8t7YZbolgqHUMP.png)

3. 选择保存的文件夹、修改文件内容

![image.png](https://s2.loli.net/2025/01/09/EJqbiWtjxzrD1wk.png)

4. 刷新页面，查看结果

![image.png](https://s2.loli.net/2025/01/09/eqjECKTwlBtiFZz.png)

::: tip

如果不再需要替换文件内容，取消勾选 `Enable Local Overrides` 即可

![image.png](https://s2.loli.net/2025/01/09/vnhVHxsaCDN7KzO.png)

:::

## 快捷键

### 搜索文件

前置步骤：F12

说明：比较适合本地调试（现网项目打包后文件名是无规律的）

快捷键：`Ctrl` + `P`

> 使用效果和 VSCode 保持一致

示例：

![image.png](https://s2.loli.net/2024/01/02/czC6dPe12k9agvK.png)

### 搜索文件内容

前置步骤：打开 Chrome 浏览器（或 Microsoft Edge），F12 -> Source

说明：

-   本地调试时，搜索内容无限制
-   在现网调试时，代码基本上已被压缩，难以阅读，例外情况：字符串、方法名（欢迎补充）

快捷键：`Ctrl` + `Shift` + `F`

示例：

![image.png](https://s2.loli.net/2024/01/02/QMowc6ZzBdt9O5g.png)

### 执行 Chrome 命令

前置步骤：F12

快捷键：`Ctrl` + `Shift` + `P`

示例：

![image.png](https://s2.loli.net/2024/01/02/EsbnZc8L3AJpmH9.png)
