# 数据结构与算法

## 二叉树

遍历方式有：

1. 前序遍历：根节点 -> 左子树 -> 右子树
2. 中序遍历：左子树 -> 根节点 -> 右子树
3. 后序遍历：左子树 -> 右子树 -> 根节点
4. 层序遍历：按照层次，从左到右，从上到下

> 前、中、后序遍历通常是通过递归实现，层序遍历通常是通过队列实现

树的定义：

```ts
class TreeNode {
    public value: number;
    public left?: TreeNode;
    public right?: TreeNode;

    constructor(value: number) {
        this.value = value;
    }
}
```

构建一个二叉树用于遍历：

```ts
const root = new TreeNode(1);
const nodeA = new TreeNode(2);
const nodeB = new TreeNode(3);
const nodeC = new TreeNode(4);
const nodeD = new TreeNode(5);

root.left = nodeA;
root.right = nodeB;
nodeA.left = nodeC;
nodeA.right = nodeD;
```

### 前序遍历（Pre-order Traversal）

递归实现：

```ts
function preOrderTraversal(root?: TreeNode): void {
    if (!root) {
        return;
    }

    console.log(root.value);
    preOrderTraversal(root.left);
    preOrderTraversal(root.right);
}
```

非递归实现：

```ts
function preOrderTraversal(root?: TreeNode): void {
    if (!root) {
        return;
    }

    const stack: Array<TreeNode> = [root];
    while (stack.length) {
        const node = stack.pop();
        if (!node) {
            continue;
        }

        console.log(node.value);
        // 确保先遍历左节点
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }
}
```

### 中序遍历（In-order Traversal）

递归实现：

```ts
function inOrderTraversal(root?: TreeNode): void {
    if (!root) {
        return;
    }

    inOrderTraversal(root.left);
    console.log(root.value);
    inOrderTraversal(root.right);
}
```

非递归实现：

```ts
function inOrderTraversal(root?: TreeNode): void {
    if (!root) {
        return;
    }

    const stack: Array<TreeNode> = [];
    let current: TreeNode | undefined = root;
    while (current || stack.length) {
        while (current) {
            stack.push(current);
            current = current.left;
        }

        // current 遍历到底部了
        current = stack.pop();
        console.log(current?.value);
        current = current?.right;
    }
}
```

### 后序遍历（Post-order Traversal）

递归实现：

```ts
function postOrderTraversal(root?: TreeNode): void {
    if (!root) {
        return;
    }

    postOrderTraversal(root.left);
    postOrderTraversal(root.right);
    console.log(root.value);
}
```

非递归实现：

```ts
function postOrderTraversal(root?: TreeNode): void {
    if (!root) {
        return;
    }

    const stack1: Array<TreeNode> = [root];
    const stack2: Array<TreeNode> = [];
    while (stack1.length) {
        const node = stack1.pop();
        stack2.push(node as TreeNode);

        // 先左后右，确保右子树先处理
        if (node?.left) {
            stack1.push(node.left);
        }
        if (node?.right) {
            stack1.push(node.right);
        }
    }

    while (stack2.length) {
        const node = stack2.pop();
        console.log(node?.value);
    }
}
```

### 层序遍历（Level-order Traversal）

非递归实现：

```ts
function levelOrderTraversal(root?: TreeNode): void {
    if (!root) {
        return;
    }

    const queue: Array<TreeNode> = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (!node) {
            continue;
        }

        console.log(node.value);
        if (node?.left) {
            queue.push(node.left);
        }
        if (node?.right) {
            queue.push(node.right);
        }
    }
}
```

### 特别说明

二叉树的深度优先遍历指：前序遍历、中序遍历、后序遍历

二叉树的广度优先遍历指：层序遍历

## 二分查找

基础：

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

有重复项，变种：

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
