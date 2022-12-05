# Flutter

相关链接：

+ github：https://github.com/flutter/flutter
+ 首页：https://flutter.dev/
+ 中文首页：https://flutter.cn/
+ 安装 SDK 以及配置开发环境：https://flutter.cn/docs/get-started/install
+ 真机调试及打包：https://www.jianshu.com/p/58a6e272a038

写一篇配置SDK的博客

安装：`flutter create flutter_demo`

## 环境搭建

### 下载 SDK

从归档的压缩包下载 SDK，以 MacOS 为例：

+ Intel：https://storage.flutter-io.cn/flutter_infra_release/releases/stable/macos/flutter_macos_3.3.8-stable.zip

+ Apple：https://storage.flutter-io.cn/flutter_infra_release/releases/stable/macos/flutter_macos_arm64_3.3.8-stable.zip

通过 git 下载 SDK：

```sh
git clone https://github.com/flutter/flutter.git -b stable
```

### 配置环境变量

以 MacOS 为例，我使用的是 iTerm2 + oh-my-zsh，所以直接修改 ~/.zshrc 文件即可

1. 通过 `open ~/.zshrc` 命令打开文件
2. 添加以下内容：

```sh
# Path to Fultter SDK Configuration.
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
PATH=/Users/lvdengming/Flutter/bin:$PATH:.
```

> `PUB_HOSTED_URL`、`FLUTTER_STORAGE_BASE_URL` 用于配置镜像，当前中国社区镜像由[七牛云](https://sensors.qiniu.com/t/n9Q)提供服务

3. 通过 `source ~/.zshrc` 命令使添加的配置生效

此时，就可以在命令行中通过 `flutter create my_app` 创建 flutter 项目

### 配置 iOS 开发环境

在 AppStore 中安装 XCode，安装完成后执行如下命令：

```sh
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
# 运行一次 Xcode 或者通过输入命令 sudo xcodebuild -license 来确保已经同意 Xcode 的许可协议
sudo xcodebuild -license
```

配置 iOS 模拟器：

1. 通过 `open -a Simulator` 打开模拟器
2. 通过 **File > Open Simulator** 选项检查当前模拟器是否是 64 位机型

### 常用命令

MacOS 环境：

```sh
# 打开模拟器
open -a Simulator

# 创建项目
flutter create my_app

# 运行项目
flutter run
```

