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

使用 `ListView.builder` 创建 ListView

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 5,
      itemBuilder: (context, index) {
        return ListTile(title: Text('这是第$index条数据'));
      },
    );
  }
}
```

#### GridView

GridView 创建网格列表主要有以下三种方式：

1. `GridView.count`
2. `GridView.extent`
3. `GridView.builder`

常用属性：

- scrollDirection，滚动方法
- padding，内边距
- resolve：组件反向排序
- crossAxisSpacing，水平子 Widget 之间的间距
- mainAxisSpacing，垂直子 Widget 之间的间距
- crossAxisCount，一行 Widget 数量（int 用在 GridView.count）
- maxCrossAxisExtend，横轴子元素的最大长度（double 用在 GridView.extent）
- childAspectRatio：子 Widget 宽高比例
- children
- gridDelegate：控制布局，主要用在 GridView.builder

示例：

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  List<Container> _createBoxs(int count) {
    List<Container> list = [];
    for (var i = 0; i < count; i++) {
      list.add(Container(
        alignment: Alignment.center,
        decoration: const BoxDecoration(color: Colors.blue),
        child: Text(
          '第$i个元素',
          style: const TextStyle(fontSize: 20),
        ),
      ));
    }

    return list;
  }

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2,
      padding: const EdgeInsets.all(10),
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      childAspectRatio: 2,
      children: _createBoxs(8),
    );
  }
}
```

通过 builder 进行构造：

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  Widget _createBoxs(context, index) {
    return Container(
      alignment: Alignment.center,
      decoration: const BoxDecoration(color: Colors.blue),
      child: Text(
        '第$index个元素',
        style: const TextStyle(fontSize: 20),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
        padding: const EdgeInsets.all(10),
        itemCount: 8,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          childAspectRatio: 2,
        ),
        itemBuilder: _createBoxs);
  }
}
```

#### Padding

给 child 添加 padding，功能单一

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      child: const Text('home'),
    );
  }
}

// 如果只添加 padding 效果，使用 pdding 组件
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(padding: EdgeInsets.all(10), child: Text('home'));
  }
}
```

#### Row

控制一行元素显示方式，类似 flex 布局，常用属性：

- mainAxisAlignment：主轴的排序方式
- crossAxisAlignment：次轴的排序方式
- children：组件子元素

> crossAxisAlignment 相对于父容器的位置
> 外部没有 Container，行是自适应的

示例：

```dart
void main(List<String> args) {
  runApp(MaterialApp(
    theme: ThemeData(primarySwatch: Colors.blue),
    home: Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Container(
        width: 400,
        height: 600,
        padding: const EdgeInsets.all(10),
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              MyIcon(Icons.home, Colors.blue),
              MyIcon(Icons.search, Colors.pink)
            ]),
      ),
    ),
  ));
}

class MyIcon extends StatelessWidget {
  Color color;
  IconData icon;

  MyIcon(this.icon, this.color, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      width: 120,
      height: 120,
      color: color,
      child: Icon(icon, color: Colors.white, size: 28),
    );
  }
}
```

扩展：`double.infinity` 和 `double.maxFinite` 可以让当前元素的 width 或 height 达到父元素的尺寸

#### Column

控制一列的显示方式，类似 flex 布局，`flex-direction: column`，常用属性

- mainAxisAlignment：主轴的排序方式
- crossAxisAlignment：次轴的排序方式
- children：组件子元素

#### Flex Expanded

Flex 组件可以沿着水平方向或垂直方向排列子组件，如果知道主轴方向，使用 Row、Column 更方便，因为 Row 和 Column 都继承自 Flex，参数基本相同

可以结合 Flex、Expanded 实现弹性布局

宽度比 2:1

```dart
// 直接使用 Row
void main(List<String> args) {
  runApp(MaterialApp(
    theme: ThemeData(primarySwatch: Colors.blue),
    home: Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(10),
        child: Row(children: [
          Expanded(flex: 2, child: MyIcon(Icons.home, Colors.blue)),
          Expanded(flex: 1, child: MyIcon(Icons.search, Colors.pink))
        ]),
      ),
    ),
  ));
}

// 使用 Flex
void main(List<String> args) {
  runApp(MaterialApp(
    theme: ThemeData(primarySwatch: Colors.blue),
    home: Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(10),
        child: Flex(direction: Axis.horizontal, children: [
          Expanded(flex: 2, child: MyIcon(Icons.home, Colors.blue)),
          Expanded(flex: 1, child: MyIcon(Icons.search, Colors.pink))
        ]),
      ),
    ),
  ));
}
```

左边宽度自适应，右侧固定

```dart
void main(List<String> args) {
  runApp(MaterialApp(
    theme: ThemeData(primarySwatch: Colors.blue),
    home: Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(10),
        child: Flex(direction: Axis.horizontal, children: [
          Expanded(flex: 1, child: MyIcon(Icons.home, Colors.blue)),
          MyIcon(Icons.search, Colors.pink)
        ]),
      ),
    ),
  ));
}
```

#### Stack

可以使用 Stack 或者 Stack 结合 Align、Positioned 来实现页面的定位

- alignment：配置所有子元素的显示位置
- children：子组件

案例一：让所有子组件居中显示

```dart
class MyStack extends StatelessWidget {
  const MyStack({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        Container(
          width: 200,
          height: 200,
          color: Colors.blue
        ),
        Container(
          width: 100,
          height: 100,
          color: Colors.orange,
        ),
        const Text('Hello')
      ],
    );
  }
}
```

Positioned 组件的属性：

- top：子元素距离顶部的距离
- bottom：子元素距离底部的距离
- left：子元素距离左侧距离
- right：子元素距离右侧距离
- child：子组件
- width：子组件的宽度（该组件宽度、高度必须是固定值，没法使用 double.infinity）
- height：子组件的高度

案例二：红色盒子元素左下角显示，文本靠右 top 100 显示

```dart
class MyStack extends StatelessWidget {
  const MyStack({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      height: 300,
      color: Colors.blue,
      child: Stack(
        children: [
          Positioned(
            bottom: 0,
            left: 0,
            child: Container(
              width: 100,
              height: 100,
              color: Colors.red
            ),
          ),
          const Positioned(
            top: 100,
            right: 0,
            child: Text('hello')
          )
        ],
      ),
    );
  }
}
```

> Stack 组件是相对于外部容器进行定位，如果没有外部容器就相对于整个屏幕进行定位

案例三：带导航栏的列表

```dart
class MyStack extends StatelessWidget {
  const MyStack({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Stack(
      children: [
        ListView(
          padding: const EdgeInsets.only(top: 50),
          children: const [
            // 此处有 100 个列表项
            // ...
            ListTile(title: Text('这是一个列表项')),
          ],
        ),
        Positioned(
            top: 0,
            left: 0,
            child: Container(
              width: size.width,
              height: 50,
              color: Colors.black,
              alignment: Alignment.center,
              child: const Text(
                '二级菜单',
                style: TextStyle(color: Colors.white),
                textAlign: TextAlign.center,
              ),
            ))
      ],
    );
  }
}
```

> Flutter 查询设备宽高 API：`MediaQuery.of(context).size;`

#### Align

Center 组件是 Align 组件的子组件，只控制子元素在父元素中的显示位置

案例：控制文本在 Container 右中显示

```dart
class MyStack extends StatelessWidget {
  const MyStack({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      height: 300,
      color: Colors.red,
      child: const Align(
        alignment: Alignment.centerRight,
        child: Text('hello'),
      ),
    );
  }
}
```

#### AspectRatio

控制元素的宽高比

示例：设置高度为宽度的一半：

```dart
class MyStack extends StatelessWidget {
  const MyStack({super.key});

  @override
  Widget build(BuildContext context) {
    return AspectRatio(aspectRatio: 2 / 1, child: Container(color: Colors.red));
  }
}
```

#### Card

Card 是卡片组件块，常用属性：

- margin
- child
- elevation：阴影的深度
- color：背景颜色
- shadowColorl：阴影颜色
- margin：外边距
- clipBehavior：内容溢出裁剪方式（值为 Clip 类型）
- Shape：阴影效果，默认为长方形边

示例：名片

```dart
class MyStack extends StatelessWidget {
  const MyStack({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Card(
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          elevation: 10,
          margin: const EdgeInsets.all(10),
          child: Column(children: const [
            ListTile(
              title: Text(
                'zhangsan',
                style: TextStyle(fontSize: 24),
              ),
              subtitle: Text('高级软件开发工程师'),
            ),
            Divider(),
            ListTile(title: Text('Tel: 183xxxxxxxx'))
          ]),
        ),
        Card(
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          elevation: 10,
          margin: const EdgeInsets.all(10),
          child: Column(children: const [
            ListTile(
              title: Text(
                'zhangsan',
                style: TextStyle(fontSize: 24),
              ),
              subtitle: Text('高级软件开发工程师'),
            ),
            Divider(),
            ListTile(title: Text('Tel: 183xxxxxxxx'))
          ]),
        )
      ],
    );
  }
}
```

#### CircleAvatar

```dart
class MyStack extends StatelessWidget {
  const MyStack({super.key});

  @override
  Widget build(BuildContext context) {
    return const CircleAvatar(
        backgroundImage: NetworkImage(
            'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'));
  }
}
```

#### Button

按钮组件如下：

- ElevatedButton：普通按钮
- TextButton：文本按钮
- OutlinedButton：边框按钮
- IconButton：图标按钮

```dart
class MyPage extends StatelessWidget {
  const MyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            ElevatedButton(
                onPressed: () {
                  print('click elevated button');
                },
                child: const Text('普通按钮')),
            TextButton(
                onPressed: () {
                  print('click text button');
                },
                child: const Text('文本按钮')),
            OutlinedButton(
                onPressed: () {
                  print('click outline button');
                },
                child: const Text('边框按钮')),
            IconButton(
                onPressed: () {
                  print('click icon button');
                },
                icon: const Icon(Icons.search))
          ],
        ),
        const SizedBox(
          height: 25,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            ElevatedButton.icon(
                onPressed: () {},
                label: const Text('发送'),
                icon: const Icon(Icons.send)),
            TextButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.info),
                label: const Text('信息')),
            OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.add),
                label: const Text('增加'))
          ],
        ),
        const SizedBox(height: 25),
        // 修改按钮背景颜色
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            ElevatedButton(
                style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.red),
                    foregroundColor: MaterialStateProperty.all(Colors.white)),
                onPressed: () {},
                child: const Text('普通按钮'))
          ],
        ),
        const SizedBox(height: 25),
        // 修改按钮尺寸（可以在按钮外层添加 SizedBox 或者 Container）
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              width: 100,
              height: 40,
              child: ElevatedButton(onPressed: () {}, child: const Text('确定')),
            )
          ],
        ),
        const SizedBox(height: 25),
        // 通过 Expanded 组件实现自适应按钮
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
                flex: 1,
                child: Container(
                  margin: const EdgeInsets.all(10),
                  child: SizedBox(
                    height: 40,
                    child: ElevatedButton(
                      style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.all(Colors.red),
                          foregroundColor:
                              MaterialStateProperty.all(Colors.white)),
                      child: const Text('登录'),
                      onPressed: () {},
                    ),
                  ),
                ))
          ],
        ),
        const SizedBox(height: 25),
        // 圆角按钮
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              style: ButtonStyle(
                  shape: MaterialStateProperty.all(RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20)))),
              onPressed: () {},
              child: const Text('圆角按钮'),
            ),
            ElevatedButton(
              style: ButtonStyle(
                  shape: MaterialStateProperty.all(const CircleBorder(
                      side: BorderSide(color: Colors.yellow)))),
              onPressed: () {},
              child: const Text('圆角按钮'),
            ),
          ],
        ),
        const SizedBox(height: 25),
        // 修改边框颜色
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            OutlinedButton(
              style: ButtonStyle(
                  side: MaterialStateProperty.all(
                      const BorderSide(width: 1, color: Colors.red))),
              onPressed: () {},
              child: const Text('边框按钮'),
            )
          ],
        )
      ],
    );
  }
}
```

#### Wrap

流式布局，单行内容不足后，换行显示，常用属性：

- direction，主轴的方向
- alignment，主轴对齐方向
- spacing，主轴方向间距
- runSpacing，副轴方向间距
- ……

示例：

```dart
class Button extends StatelessWidget {
  String text;
  void Function()? onPressed;
  Button(this.text, {super.key, this.onPressed});

  @override
  Widget build(BuildContext context) {
    onPressed = onPressed ?? () {};

    return ElevatedButton(
      style: ButtonStyle(
        backgroundColor:
            MaterialStateProperty.all(Colors.black12),
        foregroundColor: MaterialStateProperty.all(Colors.black),
      ),
      onPressed: onPressed,
      child: Text(text),
    );
  }
}

class MyPage extends StatelessWidget {
  const MyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Wrap(
        alignment: WrapAlignment.start,
        // 水平间距
        spacing: 10,
        // 垂直间距
        runSpacing: 10,
        // 排列方向
        // direction: Axis.vertical,
        children: [
          Button('第一集'),
          Button('第二集'),
          Button('第三集'),
          Button('第四集'),
          Button('第五集'),
          Button('第六集'),
          Button('第七集'),
          Button('第八集'),
          Button('第九集'),
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

#### StatelessWidget

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

#### StatefulWidget

```dart
import 'package:flutter/material.dart';

void main(List<String> args) {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(
            '$_count',
            style: Theme.of(context).textTheme.headline2,
          ),
          const SizedBox(
            height: 50,
          ),
          ElevatedButton(
              onPressed: () {
                setState(() {
                  _count++;
                });
              },
              child: const Text('增加'))
        ]),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            _count++;
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

动态列表案例：

```dart
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final List<String> _list = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // 改变数据必须加上 setState()
          setState(() {
            _list.add('这是一个列表项');
          });
        },
        child: const Icon(Icons.add),
      ),
      body: ListView(
        children: _list.map(((str) {
          return ListTile(
            title: Text(str),
          );
        })).toList(),
      ),
    );
  }
}
```

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
