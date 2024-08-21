# Node 知识点

## Node 主要的流类型有哪些？

在 Node.js 中，流（Stream）是一种处理流数据的抽象接口，广泛用于处理 I/O 操作，如读取文件、发送 HTTP 请求和处理数据流。流可以分为四种主要类型：

1. **可读流（Readable Stream）**：读取数据（如文件、网络、进程等）
2. **可写流（Writable Stream）**：写入数据（如文件、网络、进程等）
3. **双工流（Duplex Stream）**：既可读又可写（不一定同时）
4. **转换流（Transform Stream）**：在读写过程中对数据进行变换

这些流类型可以组合使用，以有效处理大量数据流动的任务，例如文件操作、网络通信、数据压缩和解压缩等

:::details
在 Node.js 中，流（Stream）是一种处理流数据的抽象接口，广泛用于处理 I/O 操作，如读取文件、发送 HTTP 请求和处理数据流。流可以分为四种主要类型：

### 1. **可读流（Readable Stream）**

-   **定义**：可读流用于从数据源（如文件、网络、进程等）读取数据。
-   **常见实例**：

    -   `fs.createReadStream()`：用于从文件系统读取数据。
    -   `http.IncomingMessage`：处理 HTTP 请求或响应时，接收数据的流。
    -   `process.stdin`：从标准输入（如终端）读取数据的流。

-   **常用方法和事件**：

    -   `.read()`: 手动读取数据。
    -   `.pipe()`: 将数据从可读流直接传递到可写流。
    -   `data`: 当有数据可供读取时触发。
    -   `end`: 当没有更多数据可供读取时触发。

-   **示例**：
    ```javascript
    const fs = require('fs');
    const readable = fs.createReadStream('example.txt');
    readable.on('data', (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`);
    });
    readable.on('end', () => {
        console.log('No more data.');
    });
    ```

### 2. **可写流（Writable Stream）**

-   **定义**：可写流用于向目标（如文件、网络、进程等）写入数据。
-   **常见实例**：

    -   `fs.createWriteStream()`：用于将数据写入文件系统。
    -   `http.ServerResponse`：处理 HTTP 请求时，将数据发送到客户端的流。
    -   `process.stdout`：向标准输出（如终端）写数据的流。

-   **常用方法和事件**：

    -   `.write()`: 向流中写入数据。
    -   `.end()`: 标记流写入完成（可选地还可以写入最后一块数据）。
    -   `finish`: 当所有数据都已被写入目标时触发。

-   **示例**：
    ```javascript
    const fs = require('fs');
    const writable = fs.createWriteStream('output.txt');
    writable.write('Hello, World!\n');
    writable.end('Finished writing.');
    ```

### 3. **双工流（Duplex Stream）**

-   **定义**：双工流是既可读又可写的流，它同时实现了可读和可写接口。
-   **常见实例**：

    -   `net.Socket`：网络套接字既可从网络读取数据，也可向网络写入数据。
    -   `tls.TLSSocket`：支持 TLS 加密的双工流。
    -   `zlib`：提供压缩和解压缩功能的流。

-   **常用方法和事件**：

    -   既支持可读流的方法和事件，也支持可写流的方法和事件。

-   **示例**：

    ```javascript
    const { Duplex } = require('stream');

    const duplexStream = new Duplex({
        read(size) {
            this.push('Some data');
            this.push(null);
        },
        write(chunk, encoding, callback) {
            console.log(`Writing: ${chunk.toString()}`);
            callback();
        }
    });

    duplexStream.on('data', (chunk) => {
        console.log(`Received: ${chunk.toString()}`);
    });

    duplexStream.write('Hello Duplex Stream');
    duplexStream.end();
    ```

### 4. **转换流（Transform Stream）**

-   **定义**：转换流是双工流的一种特殊形式，允许在数据通过流的过程中修改或变换数据。与普通的双工流不同，转换流在读取数据的同时也会对数据进行某种转换后再输出。
-   **常见实例**：

    -   `zlib.createGzip()`：用于压缩数据的流。
    -   `zlib.createGunzip()`：用于解压缩数据的流。
    -   `crypto` 模块中的 `Cipher` 和 `Decipher` 对象：用于加密和解密数据。

-   **常用方法和事件**：

    -   既支持可读流和可写流的方法和事件，也可以定义 `_transform` 方法来处理数据。

-   **示例**：

    ```javascript
    const { Transform } = require('stream');

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const transformed = chunk.toString().toUpperCase();
            this.push(transformed);
            callback();
        }
    });

    process.stdin.pipe(transformStream).pipe(process.stdout);
    ```

### 总结

-   **可读流**：读取数据。
-   **可写流**：写入数据。
-   **双工流**：既可读又可写（不一定同时）。
-   **转换流**：在读写过程中对数据进行变换。

这些流类型可以组合使用，以有效处理大量数据流动的任务，例如文件操作、网络通信、数据压缩和解压缩等。
:::
