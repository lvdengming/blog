---
title: Dart
date: 2023-08-12
sidebar: auto
categories:
    - 前端
    - flutter
---

## 初始化

安装：[https://dart.dev/get-dart](https://dart.dev/get-dart)

运行：`dart index.dart`

## 语法

### 变量

定义方式：

1. 通过 `var` 定义，例如 `var str = '123';`，程序会自动推断变量类型
2. 通过类型定义，例如 `String str = '123'`

> Dart 是强类型语言，通过 `var` 定义后的变量类型是固定的，不能变化

### 常量

定义方式：

1. 通过 `const` 定义，一开始就得赋值
2. 通过 `final` 定义，开始可以不赋值，但只能赋值一次，而且 `final` 不仅有 `const` 的编译时常量特性，最重要的是他运行时常量，即 `final` 是惰性初始化，在运行时第一次使用前才初始化

### 类型

**字符串**

定义方式：

1. 通过单引号或者双引号定义，只能定义一行字符串，例如 `String str = 'abc'`，否则会报错
2. 通过三个单引号定义，类似 JS 模板字符串，可以跨行定义字符串

字符串拼接：

1. 字符串自带模板字符串特性，例如 `'$str1 $str2'`
2. 通过 `+` 进行拼接，例如 `str1 + ' ' + str2`

**数值：分为 `int`、`double` 类型**

**布尔：`bool` 定义，值为 `true`、`false`**

**List 类型**

和 JS 数组差不多

定义方式：

1. `var list = ['zhangsan', 20, true]`，使用方式和 JS 类似
2. `var list = <String>['zhangsan']`，设置 list 类型
3. `var list = List.filled(3, 1)`，创建一个用 1 填充的固定长度的集合
4. `var list = List<int>.filled(3, 1)`，创建一个用 1 填充的固定长度的 int 集合

通过 `list[0]`、`list.length`、`list.add('zhangsan')` 操作 List

**Map 类型**

定义方式一：

```dart
var person = {
    "name": "zhangsan",
    "age": 20
};

print(person); // {name: zhangsan, age: 20}
print(person["name"]); // zhangsan
```

定义方式二：

```dart
var person = new Map();
person["name"] = "zhangsan";
person["age"] = 20;
print(person); // {name: zhangsan, age: 20}
```

**Runes 类型**

Rune 是 UTF-32 编码的字符串。它可以通过文字转换成符号表情或者代表特定的文字

**Symbols 类型**

Symbol 对象表示在 Dart 程序中声明的运算符或标识符，符号以 # 开头，入门阶段不需要了解

### 运算符

-   算术运算符：`+  -   *   /   ~/(取整)    %(取余)`
-   关系运算符：`==   !=  >   <   >=  <=`
-   逻辑运算符：`!    &&  ||`
-   赋值运算符
    -   基础赋值运算符：`=  ??=`，例如 `a ??= 1`，表示如果 a 为空的话，把 1 赋值给 a（要用 var 声明）
    -   复合赋值运算符：`+= -= *= /= %= ~/=`
-   `if-else`、`switch-case`、三目运算符、空值运算 `??`

### 类型转换

-   转换成 String：`toString()`
-   转换成 int：`int.parse()`

> 字符串判断是否为空，需要使用 `str.isEmpty`，数字通过 `num.isNaN` 判断是否为 NaN

### List、Map、Set 详解

-   [List](https://api.dart.cn/stable/2.16.1/dart-core/List-class.html)
-   [Map](https://api.dart.cn/stable/3.0.5/dart-core/Map-class.html)
-   [Set](https://api.dart.cn/stable/2.15.1/dart-core/Set-class.html)

### 函数

可选参数

```dart
void foo(String name, [var age]) {
    if (age != null) {
        // ...
    }
}
```

默认参数

```dart
void foo(String name, [String sex = 'male', var age]) {
    if (age != null) {
        // ...
    }
}
```

命名参数

```dart
void foo(String name, {String sex = 'male', var age}) {
    if (age != null) {
        // ...
    }
}

// 使用
foo('张三', age: 20);
```

> 函数也可以当做参数传入到函数调用中

箭头函数

```dart
var list = [1, 2, 3];
list.forEach((n) { print(n); });
list.forEach((n) => print(n));
```

匿名方法

```dart
var printNum = (int n) {
    print(n);
};
```

自执行方法

```dart
((int n) {
    print(n);
})(123);
```

### 类

```dart
class Person {
  String name = 'zhangsan';
  int age = 24;

  Person() {
    print('构造函数');
  }

  void printInfo() {
    print('name: $name, age: $age');
  }
}
```

类抽离，直接将类代码抽离到一个文件里即可

```dart
// lib 是同级下的目录
import 'lib/Person.dart';
```

私有属性，通过下划线声明，例如 `String _sex;`

get/set

```dart
class Person {
    var _name;

    get fullName {
        return 'Jhon David';
    }

    set testName(var name) {
        print('set name');
        this._name = name;
    }
}
```

初始化赋值，在构造函数之前执行

```dart
class Person {
  var name;
  var age;

  Person()
      : name = 'zhangsan',
        age = 24 {
    print('${this.name}--${this.age}');
  }
}
```

在属性前添加 `static` 关键字，通过类来访问静态属性、静态方法

通过 `extends` 关键字实现继承、super 进行实例化父类，例如

```dart
class Dog extends Animal {
  Dog(String name, String sex) : super(name, sex) {}
}
```

重构父类方法，建议在方法上一行添加 `@override`

通过 `abstract`、`interface` 定义抽象类、接口

### mixin

通过 `with` 关键词使用，只能 Mixin Object，不能有构造函数

```dart
class A {
  void printA();
}

class B {
  void printB();
}

class C with A,B {}
```

### 泛型

同其它高级语言

## 库管理

Dart 库一共分为三类：

1. 系统内置库，例如：
    1. `import 'dart:math'`
    2. `import 'dart:io'`
2. Pub 包管理系统中的库
    1. [https://pub.dev/pacakges](ttps://pub.dev/pacakges)
    2. [https://pub.flutter-io.cn/packages](https://pub.flutter-io.cn/packages)
    3. [https://pub.dartlang.org/flutter](https://pub.dartlang.org/flutter)
3. 自定义库，例如 `import 'util.dart'`

如何在项目中使用第三方库？

1. 在项目目录下创建一个 `pubspec.yaml` 文件

```yml
name: xxx
environment:
    sdk: '>=2.10.0 <3.0.0'
dependencies:
    http: ^0.13.5
```

2. 运行安装命令：

```sh
# with dart
dart pub add http

# with flutter
flutter pub add http
```

依赖引入：

```dart
import 'lib/Person1.dart';
import 'lib/Person2.dart' as lib;

// 获取
lib.Person()

// 只引入部分内容
import 'xxx.dart' show util;

// 不引入某些内容
import 'xxx.dart' hide abc;
```

## 新特性

-   Null safety：`int`、`double` 等基础类型不能赋值 `null`，可以通过 `?` 设置为可空类型，例如 `int? num = null;`

> 内容可能随版本更替而有所不同

-   类型断言(`!`)：相对于可空类型，断言该数据是存在的
-   `late` 关键字，用于延迟初始化

```dart
class Animal {
  late String name;
  void setName(String name) {
    this.name = name;
  }
}
```

-   `required` 关键字，表示这个是一个必须传入的命名参数

```dart
class Person {
  // 可空属性
  String? name;
  int age;

  // 表示 name 和 age 必须传入
  Person({this.name, required this.age});
}
```

-   `identical(obj1, obj2)` 判断 obj1、obj2 是否指向同一对象

```dart
// 普通创建对象方式可以不使用 new 关键字
var o1 = const Object();
var o2 = const Object();
print(identical(obj1, obj2)); // true
```

> const 关键词在多个地方创建相同对象的是个，内存中只保留一个对象

常量构造函数补充：

1. 常量构造函数需要以 `const` 关键字修饰
2. `const` 构造函数必须用于成员变量都是 `final` 的类
3. 如果实例化时不加 `const` 修饰符，即使调用的是常量构造函数，实例化的对象也不是常量实例
4. 实例化常量构造函数的时候，多个地方创建这个对象，**如果传入的值相同**，只会保留一个对象
5. Flutter 中 `const` 修饰不仅仅是节省组件构造时的内存开销，而且可以使 Flutter 在重新构建时不会重新构建 const 组件

> 总结：可以节省内存开销，提升性能

## 关键词

### is

判断变量的类型

```dart
if (a is String) {
    print('a 是 String 类型');
}
```

### as

类型转换

## 参考

-   一个 UP 主，视频地址：[https://www.bilibili.com/video/BV1UY4y1L7Pa](https://www.bilibili.com/video/BV1UY4y1L7Pa)，代码库地址：[https://gitlab.com/xy101](https://gitlab.com/xy101)
-   bilibili 视频：[https://www.bilibili.com/video/BV1S4411E7LY/?spm_id_from=333.337.search-card.all.click](https://www.bilibili.com/video/BV1S4411E7LY/?spm_id_from=333.337.search-card.all.click)
