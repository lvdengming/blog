# AVL 树

## 简介

最早被发明的平衡二叉搜索树，左右子树高度差（平衡因子）最多为 1，为了维护这个性质通常会进行左旋、右旋、先左旋再右旋、先右旋再左旋这四种操作，插入、删除、查找的时间复杂度为 O(log n)

节点高度定义：从该节点到其最远叶子节点的边的数量，其中空节点（NiL）高度为 -1，叶子节点高度为 0

与红黑树对比：

AVL 树更适合查找密集型场景，红黑树更适合频繁插入和删除的场景

> 红黑树也是一种常见的平衡二叉搜索树。相较于 AVL 树，红黑树的平衡条件更宽松，插入与删除节点所需的旋转操作更少，节点增删操作的平均效率更高

参考：[https://www.hello-algo.com/chapter_tree/avl_tree/#754-avl](https://www.hello-algo.com/chapter_tree/avl_tree/#754-avl)

## 代码实现

```ts
class AVLTreeNode<T> {
    public value: T;
    public height: number = 0;
    public left: AVLTreeNode<T> | null = null;
    public right: AVLTreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class AVLTree<T> {
    private __root: AVLTreeNode<T> | null = null;

    public insert(value: T): void {
        this.__root = this.__insertNode(this.__root, value);
    }

    public find(value: T): boolean {
        return this.__findNode(this.__root, value) !== null;
    }

    public delete(value: T): void {
        this.__root = this.__deleteNode(this.__root, value);
    }

    public inOrderTraversal(node: AVLTreeNode<T> | null = this.__root): void {
        if (!node) {
            return;
        }

        this.inOrderTraversal(node.left);
        console.log(`${node.value} - (height ${node.height})`);
        this.inOrderTraversal(node.right);
    }

    private __insertNode(currentNode: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> {
        if (currentNode === null) {
            return new AVLTreeNode(value);
        }

        if (value < currentNode.value) {
            currentNode.left = this.__insertNode(currentNode.left, value);
        } else if (value > currentNode.value) {
            currentNode.right = this.__insertNode(currentNode.right, value);
        } else {
            // 不允许重复节点
            return currentNode;
        }

        this.__updateHeight(currentNode);

        return this.__balance(currentNode);
    }

    private __getHeight(node: AVLTreeNode<T> | null): number {
        return node?.height ?? -1;
    }

    private __updateHeight(node: AVLTreeNode<T>): void {
        node.height = Math.max(this.__getHeight(node.left), this.__getHeight(node.right)) + 1;
    }

    // 获取平衡因子
    private __getBalanceFactor(node: AVLTreeNode<T> | null): number {
        return node ? this.__getHeight(node.left) - this.__getHeight(node.right) : 0;
    }

    // 执行这个方法的前提是符合逻辑的，ts校验具有滞后性，故用断言
    private __rotateLeft(node: AVLTreeNode<T>): AVLTreeNode<T> {
        const rightChild = node.right!;
        node.right = rightChild.left;
        rightChild.left = node;

        // 此时 node、rightChild 父子关系改变了
        // 故更新高度操作需要先 node，再 rightChild，下同
        this.__updateHeight(node);
        this.__updateHeight(rightChild);

        return rightChild;
    }

    private __rotateRight(node: AVLTreeNode<T>): AVLTreeNode<T> {
        const leftChild = node.left!;
        node.left = leftChild.right;
        leftChild.right = node;

        this.__updateHeight(node);
        this.__updateHeight(leftChild);

        return leftChild;
    }

    private __balance(node: AVLTreeNode<T>): AVLTreeNode<T> {
        const balanceFactor = this.__getBalanceFactor(node);

        // 左子树高的情况
        if (balanceFactor > 1) {
            // 左右情况
            if (this.__getBalanceFactor(node.left) < 0) {
                node.left = this.__rotateLeft(node.left!);
            }

            return this.__rotateRight(node);
        }

        // 右子树高的情况
        if (balanceFactor < -1) {
            // 右左情况
            if (this.__getBalanceFactor(node.right) > 0) {
                node.right = this.__rotateRight(node.right!);
            }

            return this.__rotateLeft(node);
        }

        return node;
    }

    private __findNode(currentNode: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> | null {
        if (currentNode === null) return null;
        if (value === currentNode.value) return currentNode;
        return value < currentNode.value
            ? this.__findNode(currentNode.left, value)
            : this.__findNode(currentNode.right, value);
    }

    private __deleteNode(currentNode: AVLTreeNode<T> | null, value: T): AVLTreeNode<T> | null {
        if (currentNode === null) return null;

        if (value < currentNode.value) {
            currentNode.left = this.__deleteNode(currentNode.left, value);
        } else if (value > currentNode.value) {
            currentNode.right = this.__deleteNode(currentNode.right, value);
        } else {
            // 找到要删除的节点
            if (!currentNode.left || !currentNode.right) {
                currentNode = currentNode.left || currentNode.right;
            } else {
                const minValueNode = this.__getMinValueNode(currentNode.right!);
                currentNode.value = minValueNode.value;
                currentNode.right = this.__deleteNode(currentNode.right, minValueNode.value);
            }
        }

        if (currentNode === null) return null;

        // 更新高度并平衡
        this.__updateHeight(currentNode);
        return this.__balance(currentNode);
    }

    // 获取最小值节点
    private __getMinValueNode(node: AVLTreeNode<T>): AVLTreeNode<T> {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}

const avl = new AVLTree<number>();
avl.insert(10);
avl.insert(18);
avl.insert(7);
avl.insert(15);
avl.insert(16);
avl.insert(30);
avl.insert(25);
avl.insert(40);
avl.insert(60);
avl.insert(2);
avl.insert(1);

avl.inOrderTraversal();
```
