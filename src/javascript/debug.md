# Chrome 调试指南

阅读本文，你将了解到：

-   如何使用 Chrome 浏览器（或 Microsoft Edge）在本地或现网环境进行 Debug 调试
-   使用浏览器调试过程中可能用到的快捷键

## 调试

基本流程：

1. 通过各种方式定位到代码块（console 打印、快捷键搜索等）
2. 在合适的位置打断点
3. 查看代码运行情况，排查原因
4. 完成调试

### 如何在调试过程中修改变量值？

结论：程序运行到断点位置时，通过 console 终端直接修改

示例：

![image.png](https://s2.loli.net/2024/01/03/KvYq8BflSALWir9.png)

在 console 中直接输入 `l` 变量进行修改：

![image.png](https://s2.loli.net/2024/01/03/MGtjgwdyazWnNke.png)

回到断点位置，再次查看：

![image.png](https://s2.loli.net/2024/01/03/lg5NqbvVUHfJYRk.png)

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
