# 二叉搜索树

## 简介

二叉搜索树（Binary Search Tree, BST）又叫有序二叉树

特点：每个节点的值大于其左子树中所有节点的值，并且小于其右子树中所有节点的值

操作的**平均**时间复杂度：

-   插入操作：O(log n)
-   删除操作：O(log n)
-   查询操作：O(log n)

> 中序遍历打印结果是有序的

> 因为二叉搜索树的构建与插入顺序有关，极端情况下会形成链表，导致插入、删除、搜索时间复杂度降为 O(n)，所以才有 AVL 树、红黑树等平衡二叉树概念，降低操作的复杂度

## 代码实现

```ts
class TreeNode {
    public value: number;
    public left: TreeNode | null;
    public right: TreeNode | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function inOrderTraversal(root: TreeNode | null): void {
    if (!root) {
        return;
    }

    inOrderTraversal(root.left);
    console.log(root.value);
    inOrderTraversal(root.right);
}

class BinarySearchTree {
    public root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    // 插入新节点
    public insert(value: number): void {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.__insertNode(this.root, newNode);
        }
    }

    private __insertNode(currentNode: TreeNode, newNode: TreeNode): void {
        if (newNode.value < currentNode.value) {
            if (currentNode.left === null) {
                currentNode.left = newNode;
            } else {
                this.__insertNode(currentNode.left, newNode);
            }
        } else {
            if (currentNode.right === null) {
                currentNode.right = newNode;
            } else {
                this.__insertNode(currentNode.right, newNode);
            }
        }
    }

    // 删除节点
    public delete(value: number): void {
        this.root = this.__deleteNode(this.root, value);
    }

    private __deleteNode(node: TreeNode | null, value: number): TreeNode | null {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.__deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.__deleteNode(node.right, value);
        } else {
            // 删除情况一：删除叶子节点，直接删除该节点即可
            // 删除情况二：只有一个子节点，用子节点替换当前节点
            if (node.left === null) return node.right;
            else if (node.right === null) return node.left;

            // 删除情况三：有两个子节点
            // 找到该节点中序遍历的后继节点，用后继节点的值替换删除节点的值，再删除后继节点
            // 后继节点必然是右子树的最左叶子节点
            node.value = this.__findMinValue(node.right);
            node.right = this.__deleteNode(node.right, node.value);
        }

        return node;
    }

    private __findMinValue(node: TreeNode): number {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }

        return current.value;
    }

    // 搜索节点
    public search(value: number): TreeNode | null {
        return this.__searchNode(this.root, value);
    }

    private __searchNode(node: TreeNode | null, value: number): TreeNode | null {
        if (node === null || node.value === value) {
            return node;
        }

        if (value < node.value) {
            return this.__searchNode(node.left, value);
        } else {
            return this.__searchNode(node.right, value);
        }
    }
}

// 使用示例
const bst = new BinarySearchTree();
const keys = [2, 1, 3, 5, 4, 7, 6];
keys.forEach((key) => bst.insert(key));

console.log('查看构建结果');
inOrderTraversal(bst.root);

bst.delete(3);
bst.delete(5);
console.log('\n查看删除3、5节点后的结果');
inOrderTraversal(bst.root);

console.log('\n查看搜索节点：7');
console.log(bst.search(7));
console.log('查看搜索节点：8');
console.log(bst.search(8));
```
