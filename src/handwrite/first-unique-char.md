# 实现 firstUniqueChar 方法

## 题目描述

输入一个字符串，找到第一个不重复字符的下标

例如：输入 `'abcabcde'`，输出 `6`

说一下时间复杂度和空间复杂度

## 解决方案

```js
function firstUniqueChar(s) {
    const charCount = {};

    // 统计每个字符出现的次数
    for (let char of s) {
        if (charCount[char]) {
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }
    }

    // 找到第一个不重复的字符
    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) {
            return i;
        }
    }

    // 如果没有不重复的字符，返回 -1
    return -1;
}
```
