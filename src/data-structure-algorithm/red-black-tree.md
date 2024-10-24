# 红黑树

## 简介

红黑树（Red-Black Tree）是一种自平衡二叉搜索树。每个节点除了包含普通的二叉树信息（值、左右子节点）外，还带有颜色信息，通常是红色或黑色。红黑树通过一些规则，确保树的大致平衡，从而使得插入、删除、查找的时间复杂度为 O(log n)

特性：

1. 每个节点是红色或黑色
2. 根节点是黑色
3. 每个叶子节点（NIL 节点）是黑色
4. 红色节点的子节点必须是黑色（即不能有两个连续的红色节点）
5. 从任何节点到其所有后代叶子节点的路径上，黑色节点的数量必须相同

关键步骤

-   旋转操作：包括左旋和右旋，保持红黑树平衡
-   插入调整：插入后通过重新着色和旋转保持树的性质

通过这种实现，红黑树可以有效地保证树的平衡性，并在**最坏情况**下仍能保持 O(log n) 的操作复杂度

> 参考文档：https://cloud.tencent.com/developer/article/1794165

## 代码实现

```ts
enum Color {
    RED,
    BLACK
}

class RBTreeNode<T> {
    public value: T;
    public color: Color;
    public left: RBTreeNode<T> | null = null;
    public right: RBTreeNode<T> | null = null;
    public parent: RBTreeNode<T> | null = null;

    constructor(value: T, color: Color = Color.RED) {
        this.value = value;
        this.color = color;
    }
}

class RedBlackTree<T> {
    public root: RBTreeNode<T> | null = null;

    public insert(value: T): void {
        const newNode = new RBTreeNode(value);
        this.root = this.__insertNodeRecursive(this.root, newNode);
        this.__fixInsert(newNode);
    }

    public inOrderTraversal(node: RBTreeNode<T> | null = this.root): void {
        if (node !== null) {
            this.inOrderTraversal(node.left);
            console.log(`${node.value} (${node.color === Color.RED ? 'RED' : 'BLACK'})`);
            this.inOrderTraversal(node.right);
        }
    }

    private __insertNodeRecursive(
        current: RBTreeNode<T> | null,
        newNode: RBTreeNode<T>
    ): RBTreeNode<T> {
        if (current === null) {
            return newNode;
        }

        if (newNode.value < current.value) {
            current.left = this.__insertNodeRecursive(current.left, newNode);
            current.left.parent = current;
        } else {
            current.right = this.__insertNodeRecursive(current.right, newNode);
            current.right.parent = current;
        }

        return current;
    }

    private __rotateLeft(node: RBTreeNode<T>): void {
        const rightChild = node.right!;
        node.right = rightChild.left;

        if (rightChild.left) rightChild.left.parent = node;
        rightChild.parent = node.parent;

        if (!node.parent) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;
    }

    private __rotateRight(node: RBTreeNode<T>): void {
        const leftChild = node.left!;
        node.left = leftChild.right;

        if (leftChild.right) leftChild.right.parent = node;
        leftChild.parent = node.parent;

        if (!node.parent) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;
    }

    private __fixInsert(node: RBTreeNode<T>): void {
        while (node.parent && node.parent.color === Color.RED) {
            if (node.parent === node.parent.parent!.left) {
                const uncle = node.parent.parent!.right;
                if (uncle && uncle.color === Color.RED) {
                    node.parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    node.parent.parent!.color = Color.RED;
                    node = node.parent.parent!;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.__rotateLeft(node);
                    }
                    node.parent!.color = Color.BLACK;
                    node.parent!.parent!.color = Color.RED;
                    this.__rotateRight(node.parent!.parent!);
                }
            } else {
                const uncle = node.parent.parent!.left;
                if (uncle && uncle.color === Color.RED) {
                    node.parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    node.parent.parent!.color = Color.RED;
                    node = node.parent.parent!;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.__rotateRight(node);
                    }
                    node.parent!.color = Color.BLACK;
                    node.parent!.parent!.color = Color.RED;
                    this.__rotateLeft(node.parent!.parent!);
                }
            }
        }
        this.root!.color = Color.BLACK;
    }
}

// 测试红黑树
const rbt = new RedBlackTree<number>();
rbt.insert(10);
rbt.insert(18);
rbt.insert(7);
rbt.insert(15);
rbt.insert(16);
rbt.insert(30);
rbt.insert(25);
rbt.insert(40);
rbt.insert(60);
rbt.insert(2);
rbt.insert(1);

rbt.inOrderTraversal();
```
