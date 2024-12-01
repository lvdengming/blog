# 题库

## [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

思路：变量存储前后节点，一遍过

```ts
function swapPairs(head: ListNode | null): ListNode | null {
    let prev: ListNode | null, curr: ListNode | null;
    (prev = new ListNode()), (prev.next = head), (curr = head), (head = prev);
    while (curr && curr.next !== null) {
        const next = curr.next;
        // 重整
        curr.next = next.next;
        next.next = curr;
        prev.next = next;
        // 移动
        prev = curr;
        curr = curr.next;
    }
    return head.next;
}
```

## [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

思路：通过变量，一遍过

```ts
function reverseList(head: ListNode | null): ListNode | null {
    let curr = head,
        prev = null;
    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

## [494.目标和](https://leetcode.cn/problems/target-sum/description/)

思路一：暴力解法（自己想的，耗时太长了）

```ts
function findTargetSumWays(nums: number[], target: number): number {
    let res: number[] = [0];
    for (let i = 0; i < nums.length; i++) {
        const arr1 = res.map((n) => n + nums[i]);
        const arr2 = res.map((n) => n - nums[i]);
        res = [...arr1, ...arr2];
    }

    return res.filter((n) => n === target).length;
}
```

思路二：回溯算法

```ts
function findTargetSumWays(nums: number[], target: number): number {
    let count = 0;
    const backtrack = (nums: number[], target: number, index: number, sum: number) => {
        if (index === nums.length) {
            if (sum === target) {
                count++;
            }
        } else {
            backtrack(nums, target, index + 1, sum - nums[index]);
            backtrack(nums, target, index + 1, sum + nums[index]);
        }
    };

    backtrack(nums, target, 0, 0);
    return count;
}
```

思路三：动态规划（思路太复杂），略

## [904. 水果成篮](https://leetcode-cn.com/problems/fruit-into-baskets/)

思路：滑动窗口

关键点：counter 记录篮子中存放水果的种类，records 数组记录每种水果的数量

```js
function totalFruit(fruits: number[]): number {
    const length = fruits.length;
    if (length <= 2) return length;
    let left = 0,
        right = 0,
        max = 2,
        counter = 0;
    // 记录每种水果的数目（下标->水果种类，值->水果数量）
    const records = new Array(length).fill(0);
    while (right < length) {
        records[fruits[right]]++;
        if (records[fruits[right]] === 1) counter++;
        while (counter > 2) {
            records[fruits[left]]--;
            if (records[fruits[left]] === 0) counter--;
            left++;
        }

        right++;
        max = Math.max(max, right - left);
    }

    return max;
}
```