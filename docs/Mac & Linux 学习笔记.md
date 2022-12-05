# Mac & Linux 学习笔记

## 1.命令行

### 快捷键

+ `Tab`：命令提示
+ `↑/↓`：切换历史命令
+ `control` + `C`
  + 取消当前输入的命令
  + 中止正在执行的命令
+ `control` + `U`：删除当前输入的命令
+ `control` + `L`：清屏（相当于`clear`命令）
+ `command` + `K`：清屏

### 命令

+ `open [path]`：使用Finder打开指定的目录，例如`open .`表示使用Finder打开当前目录
+ `which + [command]`：查看指令的绝对路径
+ `history`：查看输入命令的记录
+ `pbcopy`：复制，可结合`|`使用，例如：`cat index.js | pbcopy`命令表示将`index.js`文件中的内容复制，而不是打印输出
+ `pbpaste`：粘贴

### 工具

#### iTerm2 & oh my zsh

Mac Terminal的替代品，功能更加强大。在菜单处，将其设置为Mac默认的终端，这样VSCode的终端样式就是iTerm2保持一致

**1.修改皮肤**

路径：菜单 > Preference > Profiles > Colors > Color Presets

此处最下方可以查看官方皮肤（Visit Online Gallery）

**2.插件**

+ oh my zsh：修改命令行样式，官方主题（不用下载）：https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
+ zsh-autosuggestions：根据历史记录，命令行自动提示，通过`↑`应用提示的内容
+ zsh-syntax-highlighting：输入的命令高亮，必须放在`plugins`最后一项

3.配置(`~/.zshrc`)

+ 修改：`open ~/.zshrc`
+ 应用修改的内容：`source ~/.zshrc`

## 2.常用操作

> 参考链接：https://zhuanlan.zhihu.com/p/89987302

+ 鼠标右键：两指点按触控板
+ 预览文件：点按选中文件 + 空格
+ 查找文件：`command` + 空格 打开聚焦，可以查找文件、应用，还可当计算器，进行货币汇算等
+ `command`
  + Command + X: 剪切
  + Command + C: 拷贝
  + Command + V: 原格式粘贴
  + Command + Shift +Option +V: 合并格式粘贴
  + Command + Z: 撤销上一个操作（Shift + Command + Z: 反向执行撤销命令）
  + Command + W: 关闭但不退出应用
  + Command + Q: 退出应用
  + Command + Option + Esc: 强制退出应用
  + Command + Tab: 切换应用
  + Command + 空格: “聚焦”查找
  + Command + Shift + 5（MacOS Mojave系统）: 截屏或录屏（其他MacOS: Command + Shift +3: 捕捉整个屏幕；Command + Shift +4: 自选截屏区域）
  + Command + Control + 空格: 添加emoji
+ 按住`command`拖动图片，可以不改变窗口显示顺序的情况下向文档插入图片
+ 可以同时给多个文件按照一定规则重命名
+ `option` + `shift` + 音量键/屏幕亮度键，可以更加精确地设置这些参数
+ 选中单词 + 右键，可以直接查询单词的含义

## 3.iPhone使用技巧

参考链接：https://zhuanlan.zhihu.com/p/41189835

1. 长按某个应用，可以快速执行某些快捷操作，例如长按微信，可以快速打开付款码
2. 长按短信，可以执行一些骚操作
3. 长按一直按锁屏界面的「清除」可弹出「清除所有通知」
4. 长按句号会出现省略号，不用一个一个打……
5. 长按其它字符，可以实现该字符的中英文切换、九键拼音可以具体到某个字母
6. 长按在屏幕上方出现的新信息或微信消息，即可不用打开app直接回复
7. 长按手电筒即可调节光照强度
8. 长按下滑其它功能键，也可以进行一些具体操作，比如选择wifi、切换蓝牙设备
9. 长按键盘：切换输入法样式（九键、26键）、单手模式
10. 打开相册，点击右上角选择，右滑->下滑，可以快速批量处理照片
11. 之前的iPhone是必须滑到最左才可搜索，但现在一个下滑动作即可召唤Spotlight搜索栏。可用来搜索第三方软件，还可充当计算器、汇率换算、翻译，十分方便
12. 将iMessage的短信从右向左滑动，可以查看收发短信的准确时间
13. 摇一摇撤销刚输入的字，撤销后再摇晃手机可还原==or：三指向左清扫->撤销，向右清扫->重做==
14. 按住空格键，可以快速切换光标位置
15. 可以从网上（抖音）获取别人创建好的**快捷指令**，复制到浏览器或者备忘录中打开进行添加，可以实现例如：照片九宫格切图、拼长图等操作（记得查看命令具体内容，防止被钓鱼）
