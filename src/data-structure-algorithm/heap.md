# 堆

## 简介

堆是一种特殊的完全二叉树，分为最大堆和最小堆，因为完全二叉树的特性，通常用数组表示

时间复杂度：

-   插入：O(log n)
-   删除最大或最小元素：O(log n)
-   获取最大或最小元素（peek）：O(1)

用途：优先队列、堆排序、Dijkstra 最短路径算法和 Prim 最小生成树算法（图算法）

:::info

-   完全二叉树：树节点的填充是从上层到下层依次完成的，在每一层，节点会从左到右按顺序填满
-   最大堆：每个父节点的值**大于或等于**其任何子节点的值
-   最小堆：每个父节点的值**小于或等于**其任何子节点的值
-   优先队列：总是优先出队优先级最高的元素，而不是最早进入队列的元素（应用场景：任务调度、路径搜索、事件处理）

:::

:::warning

<u>数据结构中的堆</u>和<u>内存管理中的堆</u>是两个概念，不能混为一谈！

:::

## 最大堆

```ts
class MaxHeap<T> {
    private readonly __heap: Array<T> = [];

    public insert(value: T): void {
        this.__heap.push(value);
        this.__bubbleUp();
    }

    public extractMax(): T | null {
        if (this.__heap.length === 0) {
            return null;
        }

        const max = this.__heap[0];
        const last = this.__heap.pop()!;
        if (this.__heap.length > 0) {
            this.__heap[0] = last;
            this.__bubbleDown();
        }

        return max;
    }

    public peek(): T | null {
        return this.__heap[0] ?? null;
    }

    private __bubbleUp(): void {
        let index = this.__heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.__heap[index] <= this.__heap[parentIndex]) {
                break;
            }

            [this.__heap[index], this.__heap[parentIndex]] = [
                this.__heap[parentIndex],
                this.__heap[index]
            ];
            index = parentIndex;
        }
    }

    private __bubbleDown(): void {
        let index = 0;
        const length = this.__heap.length;
        while (index < length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let max = index;

            if (leftChildIndex < length && this.__heap[leftChildIndex] > this.__heap[max]) {
                max = leftChildIndex;
            }

            if (rightChildIndex < length && this.__heap[rightChildIndex] > this.__heap[max]) {
                max = rightChildIndex;
            }

            if (max === index) {
                break;
            }

            [this.__heap[max], this.__heap[index]] = [this.__heap[index], this.__heap[max]];
            index = max;
        }
    }
}

const maxHeap = new MaxHeap<number>();
maxHeap.insert(10);
maxHeap.insert(20);
maxHeap.insert(5);
maxHeap.insert(15);

console.log(maxHeap.peek());
console.log(maxHeap.extractMax());
console.log(maxHeap.peek());
```

## 最小堆

```ts
class MinHeap<T> {
    private readonly __heap: Array<T> = [];

    public insert(value: T): void {
        this.__heap.push(value);
        this.__bubbleUp();
    }

    public extractMin(): T | null {
        if (this.__heap.length === 0) {
            return null;
        }

        const min = this.__heap[0];
        const last = this.__heap.pop()!;
        if (this.__heap.length > 0) {
            this.__heap[0] = last;
            this.__bubbleDown();
        }

        return min;
    }

    public peek(): T | null {
        return this.__heap[0] ?? null;
    }

    private __bubbleUp(): void {
        let index = this.__heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.__heap[index] >= this.__heap[parentIndex]) {
                break;
            }

            [this.__heap[index], this.__heap[parentIndex]] = [
                this.__heap[parentIndex],
                this.__heap[index]
            ];
            index = parentIndex;
        }
    }

    private __bubbleDown(): void {
        let index = 0;
        const length = this.__heap.length;
        while (index < length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let min = index;

            if (leftChildIndex < length && this.__heap[leftChildIndex] < this.__heap[min]) {
                min = leftChildIndex;
            }

            if (rightChildIndex < length && this.__heap[rightChildIndex] < this.__heap[min]) {
                min = rightChildIndex;
            }

            if (min === index) {
                break;
            }

            [this.__heap[min], this.__heap[index]] = [this.__heap[index], this.__heap[min]];
            index = min;
        }
    }
}

const minHeap = new MinHeap<number>();
minHeap.insert(10);
minHeap.insert(20);
minHeap.insert(5);
minHeap.insert(15);

console.log(minHeap.peek());
console.log(minHeap.extractMin());
console.log(minHeap.peek());
```
