---
title: Flutter 开发指南
date: 2023-05-29
sidebar: auto
categories:
  - 前端
  - flutter
---

## 概述

本文紧接上文 [Flutter 环境搭建](/blog/flutter/start.html)，主要介绍了 Flutter 学习过程中的常用链接、命令

## 常用链接

- 英文文档: [https://docs.flutter.dev/ui/widgets-intro](https://docs.flutter.dev/ui/widgets-intro)
- 中文文档：[https://flutter.cn/docs/ui/widgets-intro](https://flutter.cn/docs/ui/widgets-intro)

## 常用命令

MacOS 环境：

```sh
# 打开模拟器
open -a Simulator

# 创建项目
flutter create my_app

# 运行项目
flutter run

# 热加载项目
# 在 VSCode 终端 or AndroidStudio 中按下 R 键

# 查看布局网格线
# 在 VSCode 终端 or AndroidStudio 中按下 P 键

# 更多
# Flutter run key commands.
# r Hot reload. 🔥🔥🔥
# R Hot restart.
# h List all available interactive commands.
# d Detach (terminate "flutter run" but leave application running).
# c Clear the screen
# q Quit (terminate the application on the device).
```

## 目录介绍

├── .dart_tool dart 第三方依赖
├── .idea 编译器相关
├── README.md
├── analysis_options.yaml 分析 dart 语法的文件，老项目升级成新项目有警告信息的话，可以删除此文件
├── android Android 资源目录
├── build
├── flutter01.iml
├── ios iOS 资源目录
├── lib 项目目录
│   └── main.dart
├── linux linux 平台资源目录
├── macos mac 平台资源目录
├── pubspec.lock
├── pubspec.yaml 项目依赖、版本
├── test 测试代码目录
├── web web 目录
└── windows windows 平台资源目录

> MacOS 生成方式 `tree | pbcopy`
> 前期重点关注 lib 目录和 pubspec.yaml 文件

## Hero Travel

### 组件介绍

**1、MaterialApp**

封装了应用程序实现 Material Design 所需要的一些 Widget，一般作为顶层 widget 使用，常用的属性：

- home（主页）
- title（标题）
- color（颜色）
- theme（主题）
- routes（路由）
  ……

**2、Scaffold**

Scaffold 是 Material Design 布局结构的基本实现，此类提供了用于显示 drawer、snackbar 和底部 sheet 的 API

Scaffold 有下面几个主要属性：

- appBar：显示在页面顶部的一个 AppBar
- body：当前页面所显示的主要内容 Widget
- drawer：抽屉菜单控件
  ……

示例：

```dart
void main(List<String> args) {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: const Text('首页'),
      ),
      body: const Center(
        child: Text(
          'hello, flutter',
          textDirection: TextDirection.ltr,
          style: TextStyle(color: Colors.red),
        ),
      ),
    ),
  ));
}
```

### 自定义组件

在 Flutter 中自定义组件其实就是一个类，这个类需要继承 StatelessWidget/StatefulWidget

- **StatelessWidget** 是无状态组件，状态不可变的 widget
- **StatefulWidget** 是有状态组件，持有的状态可能在 widget 生命周期改变

示例：

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'Hello, Flutter!',
        textDirection: TextDirection.ltr,
        style: TextStyle(color: Colors.red),
      ),
    );
  }
}
```

> 快速生成方式：stateW + Enter，需要安装 [Awesome Flutter Snippets](https://marketplace.visualstudio.com/items?itemName=Nash.awesome-flutter-snippets) 扩展程序
