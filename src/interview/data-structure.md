# 数据结构知识点

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

### 中序遍历（In-order Traversal）

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

### 后序遍历（Post-order Traversal）

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

### 层序遍历（Level-order Traversal）

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
