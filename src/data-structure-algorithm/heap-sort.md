# 堆排序

## 简介

堆排序是一种基于堆（通常是最大堆或最小堆）的排序算法。它的时间复杂度为 O(nlogn) 是一个原地排序算法

> 原地排序算法：排序过程只需要 O(1) 复杂度的空间

## 代码实现

升序：

```ts
function heapSort(nums: number[]): number[] {
    const n = nums.length;

    // 构建最大堆
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(nums, n, i);
    }

    // 利用最大堆的特性，每次将最大元素移到最后，从而实现升序排序
    for (let i = n - 1; i > 0; i--) {
        [nums[0], nums[i]] = [nums[i], nums[0]];
        heapify(nums, i, 0);
    }

    return nums;
}

function heapify(nums: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && nums[left] > nums[largest]) {
        largest = left;
    }

    if (right < n && nums[right] > nums[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [nums[largest], nums[i]] = [nums[i], nums[largest]];
        heapify(nums, n, largest);
    }
}

// 测试
const nums = [12, 11, 13, 5, 6, 7];
console.log('排序前:', nums);
heapSort(nums);
console.log('排序后:', nums);
```

降序：

```ts
function heapSort(nums: number[]): number[] {
    const n = nums.length;

    // 构建最小堆
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(nums, n, i);
    }

    // 利用最小堆的特性，每次将最小元素移到最后，从而实现降序排序
    for (let i = n - 1; i > 0; i--) {
        [nums[0], nums[i]] = [nums[i], nums[0]];
        heapify(nums, i, 0);
    }

    return nums;
}

function heapify(nums: number[], n: number, i: number): void {
    let least = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && nums[left] < nums[least]) {
        least = left;
    }

    if (right < n && nums[right] < nums[least]) {
        least = right;
    }

    if (least !== i) {
        [nums[least], nums[i]] = [nums[i], nums[least]];
        heapify(nums, n, least);
    }
}

// 测试
const nums = [12, 11, 13, 5, 6, 7];
console.log('排序前:', nums);
heapSort(nums);
console.log('排序后:', nums);
```
