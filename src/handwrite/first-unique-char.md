# 找到字符串中第一个不重复字符的下标

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
