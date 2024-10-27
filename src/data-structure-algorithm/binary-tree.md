# 二叉树

## 简介

二叉树是一种非线性数据结构，代表“祖先”与“后代”之间的派生关系，体现了“一分为二”的分治逻辑。与链表类似，二叉树的基本单元是节点，每个节点包含值、左子节点引用和右子节点引用

常见二叉树：

-   二叉搜索树：每个节点的值大于其左子树中所有节点的值，并且小于其右子树中所有节点的值

> 树的构建过与输入值的过程有关，极端情况下会降级成单链表，树的插入、删除、查找操作时间降为 O(n)，所以才有 AVL 树、红黑树的先后出现，就是为了保证树的插入、删除、查找操作时间复杂度为 O(log n)

-   AVL 树：平衡二叉搜索树，左右子树高度差（平衡因子）最多为 1，插入、删除、查找操作时间复杂度为 O(log n)
-   红黑树：平衡二叉搜索树，根据红黑树特性，插入、删除、查找操作时间复杂度为 O(log n)

> 红黑树也是一种常见的平衡二叉搜索树。相较于 AVL 树，红黑树的平衡条件更宽松，插入与删除节点所需的旋转操作更少，节点增删操作的平均效率更高，故而 AVL 树更适合查找密集型场景，红黑树更适合频繁插入和删除的场景

-   堆：一种特殊的完全二叉树，分为最大堆和最小堆。插入和删除操作的时间复杂度为 O(log n)，查找最大值或最小值的时间复杂度为 O(1)，常用于实现优先队列，支持快速的最大值或最小值获取
-   B 树：一种自平衡的多路搜索树，通常用于数据库和文件系统

## 二叉树遍历

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
