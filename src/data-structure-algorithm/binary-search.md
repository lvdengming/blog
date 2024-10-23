# 二分查找

## 基础版本

```ts
function binarySearch(nums: number[], target: number): number {
    let left = 0,
        right = nums.length - 1;
    while (left <= right) {
        const mid = (left + right) >> 1;
        if (nums[mid] > target) right = mid - 1;
        else if (nums[mid] < target) left = mid + 1;
        else return mid;
    }
    return -1;
}
```

## 有重复项（变种）

```ts
function searchRange(nums: number[], target: number): number[] {
    if (nums.length === 0) return [-1, -1];
    const first = searchFirst(nums, target);
    if (first === -1) return [-1, -1];
    const last = searchLast(nums, target);
    return [first, last];
}

function searchFirst(nums: number[], target: number): number {
    let left = 0,
        right = nums.length - 1;
    while (left < right) {
        const mid = (left + right) >> 1;
        if (nums[mid] < target) left = mid + 1;
        else if (nums[mid] === target) right = mid;
        else right = mid - 1;
    }
    return nums[left] === target ? left : -1;
}

function searchLast(nums: number[], target: number): number {
    let left = 0,
        right = nums.length - 1;
    while (left < right) {
        const mid = (left + right + 1) >> 1;
        if (nums[mid] < target) left = mid + 1;
        else if (nums[mid] === target) left = mid;
        else right = mid - 1;
    }
    return nums[left] === target ? left : -1;
}
```
