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

#### MaterialApp

封装了应用程序实现 Material Design 所需要的一些 Widget，一般作为顶层 widget 使用，常用的属性：

- home（主页）
- title（标题）
- color（颜色）
- theme（主题）
- routes（路由）
  ……

设置 AppBar 主题色

```dart
void main(List<String> args) {
  runApp(MaterialApp(
    theme: ThemeData(primarySwatch: Colors.purple),
    home: Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: const Center(
        child: Text('Text'),
      ),
    ),
  ));
}
```

#### Scaffold

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

#### Container

类似 `div`，主要有以下属性：

- alignment：对其方式，topCenter 顶部居中对齐，topLeft 顶部左对齐……
- decoration：设置背景颜色、圆角、边框、阴影等
- margin：外边距
- padding：内边距
- transform：类似 css transform
- height：容器高度
- width：容器宽度
- child：容器子元素

示例：

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Container(
      alignment: Alignment.center,
      width: 200,
      height: 200,
      decoration: BoxDecoration(
          color: Colors.yellow,
          border: Border.all(color: Colors.red, width: 2),
          borderRadius: BorderRadius.circular(5),
          boxShadow: const [BoxShadow(color: Colors.blue, blurRadius: 20)],
          gradient: const LinearGradient(colors: [Colors.red, Colors.yellow])),
      child: const Text(
        'hello, flutter',
        style: TextStyle(color: Colors.white),
      ),
    ));
  }
}
```

按钮示例：

```dart
class MyButton extends StatelessWidget {
  const MyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 50,
      decoration: BoxDecoration(
          color: Colors.blue, borderRadius: BorderRadius.circular(10)),
      margin: const EdgeInsets.fromLTRB(0, 20, 0, 0),
      alignment: Alignment.center,
      child: const Text(
        '确定',
        style: TextStyle(color: Colors.white, fontSize: 18),
      ),
    );
  }
}
```

#### Text

- textAlign：文本对齐方式
- textDirection：文本方向
- overflow：文本超出屏幕之后的处理方式
- textScaleFactor：字体显示倍率
- maxLines：文字显示最大行数
- style：字体的样式设置

TextStyle 属性：

- decoration：文本装饰线（删除、下划线等）
- decorationColor：文本装饰线颜色
- decorationStyle：文本装饰线风格（虚线、实线……）
- wordSpacing：单词间隙
- letterSpacing：字母间隙
- fontStyle：文本样式（斜体、正常体）
- fontSize：文本大小
- color：文本颜色
- fontWeight：字体粗细

示例：

```dart
class MyText extends StatelessWidget {
  const MyText({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 200,
      decoration: const BoxDecoration(color: Colors.black),
      margin: const EdgeInsets.fromLTRB(0, 30, 0, 0),
      child: const Text(
        '你好你好你好你好你好你好你好你好你好你好你好你好',
        style: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
            letterSpacing: 2),
        textAlign: TextAlign.left,
        overflow: TextOverflow.ellipsis,
      ),
    );
  }
}
```

#### Image

类似 img 标签

- Image.network 从网络加载图片
- Image.asset 从本地加载图片

属性：

- fit：BoxFit，类似背景图片的几种方式，fill、cover、contain……
- repeat：ImageRepeat，平铺
- width：宽度高度结合 ClipOval 才有效
- height

背景图片实现方式

```dart
decoration: BoxDecoration(
  image: const DecorationImage(
    image: NetworkImage(url),
    fix: BoxFit.cover
  )
)
```

**ClipOval**

圆角图片

```dart
class MyClipOval extends StatelessWidget {
  const MyClipOval({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipOval(
      child: Image.network(
          'https://i1.hdslb.com/bfs/face/0cd621a535d99cc5eed5bd9243355c21d64a0e39.jpg@240w_240h_1c_1s_!web-avatar-space-header.avif',
          width: 150,
          height: 150,
          fit: BoxFit.cover),
    );
  }
}
```

本地加载图片，首先要到 pubspec.yaml 文件 flutter 属性下添加图片资源

```yaml
flutter:
  assets:
    - imgs/a.jpg
    - imgs/1.0x/a.jpg
    - imgs/2.0x/a.jpg
```

> Flutter 会自动根据设备屏幕分辨率加载对应尺寸图片

```dart
class LocalImage extends StatelessWidget {
  const LocalImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 200,
      child: Image.asset('imgs/a.jpg'),
    );
  }
}
```

#### ListView

列表布局是项目开发中最常见的一种布局方式，在 Flutter 中通过 ListView 来定义列表项

列表组件常用参数：

- scrollDirection
- padding
- resolve，组件反向排序
- children，列表元素

简单的 ListView

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        // 列表项
        ListTile(
          leading: Icon(Icons.home, color: Colors.blue,),
          title: Text('这是一个列表项'),
          trailing: Icon(Icons.chevron_right_sharp),
        ),
        // 分割线
        Divider(),
        ListTile(
          leading: Icon(Icons.propane, color: Colors.purple,),
          title: Text('这是一个列表项'),
          trailing: Icon(Icons.chevron_right_sharp),
        ),
        Divider(),
        ListTile(
          leading: Icon(Icons.unarchive_rounded, color: Colors.pink,),
          title: Text('这是一个列表项'),
          trailing: Icon(Icons.chevron_right_sharp),
        ),
        Divider(),
      ],
    );
  }
}
```

横向的 ListView

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.all(10),
        children: <Widget>[
          Container(
            width: 200,
            // 高度是自适应，设置没有效果
            height: 100,
            decoration: const BoxDecoration(color: Colors.red),
          ),
          Container(
            width: 200,
            decoration: const BoxDecoration(color: Colors.green),
          ),
          Container(
            width: 200,
            decoration: const BoxDecoration(color: Colors.blue),
          )
        ],
      ),
    );
  }
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

### 自带图标组件

Icon 组件，可以使用 Icons 来引用内置图标，并且可以设置图标尺寸、颜色等

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(children: const [
      // 该组件可用来设置间距
      SizedBox(
        height: 20,
      ),
      Icon(
        Icons.home,
        size: 30,
      ),
      Icon(
        Icons.settings,
        size: 40,
        color: Colors.purple,
      )
    ]);
  }
}
```

支持的图标列表：[https://fonts.google.com/icons](https://fonts.google.com/icons)

### 自定义图标

除了 Material 的图标外，我们也可以使用自定义图标，在 Flutter 中使用 ttf 格式实现：

1、下载字体图标，在项目配置文件（pubspec.yaml）中声明：

> iconfont 中选择好图标后，点击【下载代码】，即可获得相应的 ttf 文件

```yml
flutter:
  fonts:
    - family: myFont # 指定字体名
      fonts:
        - asset: fonts/iconfont.ttf
    - family: Trajan Pro
      fonts:
        - asset: fonts/TrajanPro.ttf
        - asset: fonts/TrajanPro_Bold.ttf
          weight: 700
          style: italic
```

2、创建字体组件

```dart
class MyFont {
  // 微信图标
  static const IconData wechat = IconData(
    // iconfont 下载代码解压 json 文件 中的 unicode 编码
    0xe658,
    // 在 pubspec.yaml 文件中定义的字体名
    fontFamily: 'myFont',
    matchTextDirection: true
  );

  // 鲜花图标
  static const IconData flower = IconData(
    0xe63d,
    fontFamily: 'myFont',
    matchTextDirection: true
  );
}
```

3、使用字体组件

```dart
import './font.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(children: const [
      // 该组件可用来设置间距
      SizedBox(
        height: 20,
      ),
      Icon(
        Icons.home,
        size: 30,
        color: Colors.purple,
      ),
      SizedBox(
        height: 20,
      ),
      Icon(
        MyFont.wechat,
        size: 40,
        color: Colors.blue,
      ),
      SizedBox(
        height: 20,
      ),
      Icon(
        MyFont.flower,
        size: 50,
        color: Colors.red,
      )
    ]);
  }
}
```
