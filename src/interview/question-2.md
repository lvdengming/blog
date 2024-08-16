# 面试知识点（二）

## JS

### 浏览器跨标签页通信

1. `localStorage` 和 `storage` 事件，同源情况下（`sessionStorage` 在不同标签页是独立的）
2. 广播 `BroadcastChannel`，通过相同的通道名称
3. SharedWorker
4. ServiceWorker
5. `window.postMessage()`
6. 通过 `cookie` 和服务端
7. `IndexedDB`
8. 通过 WebSocket、Ajax 配合服务端

参考：[https://cloud.tencent.com/developer/article/2332521](https://cloud.tencent.com/developer/article/2332521)

### 检测页面首屏加载性能

检测前端页面的首屏性能是前端性能优化中的一个关键部分。首屏性能指的是用户在访问页面时，页面内容首次显示到用户屏幕上的时间。有效的首屏性能检测可以帮助前端开发者了解用户首次看到内容的时间，从而进行性能优化。以下是几种常用的方法来检测和分析首屏性能。

#### 1. 使用 `Performance` API

`Performance` API 是浏览器内置的性能测量工具，提供了许多用于捕获和分析性能指标的接口。常用的相关指标包括：

-   **`DOMContentLoaded`**: 当初始的 HTML 文档被完全加载和解析时触发，不包括样式表、图片和子框架。
-   **`load`**: 当页面的所有资源（如图像、CSS 等）都被完全加载时触发。
-   **`First Contentful Paint (FCP)`**: 第一个文本、图像、非白色画布或 SVG 被绘制到屏幕上的时间。
-   **`Largest Contentful Paint (LCP)`**: 可视区域内最大的内容元素（如图像、视频，或大块文本）被绘制到屏幕上的时间。

示例代码：

```javascript
window.addEventListener('load', () => {
    const timing = performance.timing;
    const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log('DOM Content Loaded:', domContentLoaded);
    console.log('Page Load Time:', loadTime);
});

// 获取 FCP 和 LCP
new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    for (const entry of entries) {
        if (entry.name === 'first-contentful-paint') {
            console.log('First Contentful Paint:', entry.startTime);
        } else if (entry.name === 'largest-contentful-paint') {
            console.log('Largest Contentful Paint:', entry.startTime);
        }
    }
}).observe({ type: 'paint', buffered: true });
```

#### 2. 使用 `Navigation Timing` API

`Navigation Timing API` 提供了详细的导航时间指标，帮助分析从用户发出请求到页面完全加载的各个时间点。常用的几个指标包括：

-   **`domInteractive`**: 用户可以开始与页面进行交互的时间。
-   **`domComplete`**: 整个页面加载完成的时间。
-   **`first-paint`**: 首次渲染的时间。

示例代码：

```javascript
window.addEventListener('load', () => {
    const timing = performance.getEntriesByType('navigation')[0];
    console.log('DOM Interactive:', timing.domInteractive);
    console.log('DOM Complete:', timing.domComplete);
});
```

#### 3. 使用 `Resource Timing` API

`Resource Timing API` 提供了页面中所有资源加载的详细时间信息，帮助分析哪些资源影响了首屏加载时间。

示例代码：

```javascript
window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource');
    resources.forEach((resource) => {
        console.log(`${resource.name}: ${resource.duration}ms`);
    });
});
```

#### 4. 使用 `Chrome DevTools`

Chrome DevTools 是一个强大的性能调试工具，可以帮助检测和分析首屏性能。可以通过以下步骤来分析首屏性能：

1. 打开 Chrome DevTools (`F12` 或 `Cmd + Option + I`)。
2. 选择 "Performance" 面板。
3. 点击 "Record" 按钮，加载页面。
4. 停止记录后，可以看到页面加载的各项性能指标，特别是 `FCP` 和 `LCP`。

#### 5. 使用 Lighthouse 进行自动化检测

Lighthouse 是 Google 提供的开源工具，用于自动化检查页面性能、可访问性、SEO 等。可以集成到 CI/CD 流水线中，也可以在 Chrome DevTools 中使用。

-   打开 Chrome DevTools。
-   选择 "Lighthouse" 面板。
-   选择你要分析的页面，然后点击 "Generate report"。
-   报告中会显示首屏性能的相关指标。

#### 6. 自定义首屏渲染时间

你还可以通过自定义事件来记录页面上关键元素（如主内容区域）的加载时间。这种方法通常通过在关键元素加载完成后执行以下操作来实现：

```javascript
window.addEventListener('load', () => {
    const firstScreenLoadTime = performance.now(); // 或者使用 Date.now()
    console.log('First Screen Load Time:', firstScreenLoadTime);
});
```

在 `React` 或 `Vue` 等框架中，你可以在根组件的 `componentDidMount` 或 `mounted` 生命周期钩子中记录时间。

#### 7. 实时监控和用户数据收集

为了获得更准确的首屏性能数据，可以通过在页面中嵌入代码，实时监控和收集用户的首屏加载数据，并将其发送到服务器进行分析。例如，可以使用 Google Analytics 或其他 APM 工具来收集这些性能指标。

#### 总结

通过以上方法，可以有效地检测和分析前端页面的首屏性能，并根据结果进行相应的优化。通常情况下，结合使用多个方法可以获得更全面的性能数据，帮助更好地提升用户体验。

### DOM 事件的冒泡和捕获

过程：`捕获 -> 目标 -> 冒泡`

参考：[https://zh.javascript.info/bubbling-and-capturing](https://zh.javascript.info/bubbling-and-capturing)

## 前端工程化

### 如何优化 webpack 打包速度

参考链接：[https://juejin.cn/post/6844904071736852487](https://juejin.cn/post/6844904071736852487)

1. 开启多进程打包优化
2. 合理利用缓存
3. 优化压缩时间
4. 优化检索时间

## NodeJS

### express 的中间件是如何实现的？

Express 的中间件机制是其核心功能之一，它允许你在处理 HTTP 请求和响应的过程中执行一系列的函数。中间件可以执行诸如请求处理、响应处理、日志记录、权限验证等任务。

下面，我将通过简化的代码来解释 Express 中间件是如何实现和运作的。

#### 1. 中间件的基本概念

在 Express 中，中间件就是一个函数，它接收 `req`（请求对象）、`res`（响应对象）和 `next`（调用下一个中间件的函数）作为参数。一个简单的中间件函数看起来像这样：

```javascript
function middleware(req, res, next) {
    // 处理请求或响应
    console.log('Middleware function');

    // 调用下一个中间件
    next();
}
```

#### 2. Express 中间件的注册

Express 应用程序可以通过 `app.use()` 或其他 HTTP 方法（如 `app.get()`、`app.post()`）注册中间件。

```javascript
const express = require('express');
const app = express();

// 注册一个全局中间件
app.use((req, res, next) => {
    console.log('Request received');
    next(); // 继续下一个中间件或路由处理函数
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

#### 3. 中间件的执行机制

Express 中间件的执行遵循一个简单的顺序：

-   当一个请求到达服务器时，Express 会按照注册的顺序执行中间件。
-   如果中间件调用 `next()`，则 Express 会继续执行下一个中间件。
-   如果中间件没有调用 `next()`，请求-响应循环将被终止，并且请求将不会传递给下一个中间件。

#### 4. Express 中间件实现原理

内部来说，Express 通过一个类似“洋葱模型”的机制来处理中间件链。下面是简化的实现过程：

```javascript
// 模拟的 Express 实现
class Express {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn);
    }

    handle(req, res) {
        const dispatch = (index) => {
            if (index >= this.middlewares.length) return;

            const middleware = this.middlewares[index];
            middleware(req, res, () => dispatch(index + 1));
        };

        dispatch(0); // 从第一个中间件开始执行
    }

    listen(port, callback) {
        // 这里应该是启动一个 HTTP 服务器，但我们简化为直接执行请求处理逻辑
        const req = {}; // 模拟请求对象
        const res = {
            send: (content) => console.log('Response:', content)
        }; // 模拟响应对象

        this.handle(req, res);
        callback();
    }
}

// 使用模拟的 Express
const app = new Express();

app.use((req, res, next) => {
    console.log('First middleware');
    next(); // 继续下一个中间件
});

app.use((req, res, next) => {
    console.log('Second middleware');
    next(); // 继续下一个中间件
});

app.use((req, res) => {
    res.send('Hello from the last middleware');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

#### 5. 总结

-   **中间件链**：中间件被注册到 Express 应用的一个队列中。当请求到来时，Express 会顺序调用中间件链中的每一个函数。
-   **`next` 函数**：`next` 函数是 Express 中间件链的关键，它允许中间件函数控制执行流。如果 `next()` 没有被调用，后续的中间件将不会执行。
-   **灵活性**：通过这种方式，Express 提供了高度的灵活性，可以方便地在请求处理过程中插入各种自定义逻辑。

这种设计使得 Express 非常适合构建模块化的应用程序，可以轻松地添加、移除或重用中间件。

### Node BFF 服务

Node BFF（Backend for Frontend）服务是一种设计模式和架构理念，通常用于前端与后端的通信架构中。BFF 是专门为前端应用程序（如 Web 应用、移动应用等）创建的后端服务，旨在满足特定用户界面需求的 API 或数据处理逻辑。

#### 什么是 BFF（Backend for Frontend）？

BFF 是一种架构模式，主要思想是在不同的前端（如 Web 应用、iOS 应用、Android 应用）和后端服务之间引入一个专门的后端服务层。这一层根据不同的前端需求，提供定制化的 API 接口和数据处理。BFF 服务能够优化前端与后端的交互，减少前端的复杂性，并提高系统的灵活性和性能。

#### 为什么要使用 BFF？

1. **前端需求的差异化**：不同的前端应用（如 Web、iOS、Android）可能需要不同的 API 接口和数据格式。通过 BFF，可以为每个前端提供定制化的 API，避免冗余和不必要的数据传输。

2. **简化前端开发**：BFF 层可以处理复杂的数据聚合、业务逻辑或多接口的调用，简化前端应用的开发，使其专注于视图层的渲染和用户交互。

3. **提高性能**：BFF 可以在服务端进行数据的处理、缓存和优化，减少前端的处理时间，提升整体性能。

4. **增强安全性**：BFF 层可以作为前端与后端服务之间的安全屏障，处理认证、授权等安全问题。

#### Node.js 作为 BFF 的优势

Node.js 因其异步 I/O、事件驱动、轻量高效等特点，非常适合作为 BFF 服务的实现技术。以下是 Node.js 作为 BFF 服务的一些优势：

-   **异步处理能力强**：Node.js 非常适合处理大量并发请求和异步数据处理，能够高效地聚合多个后端服务的数据。
-   **轻量快速**：Node.js 运行在单线程模型上，启动速度快，适合用作中间层服务。
-   **JavaScript 全栈**：前端开发者通常熟悉 JavaScript，使用 Node.js 开发 BFF 服务可以降低学习成本，并且容易共享代码（如表单验证逻辑）。
-   **丰富的生态系统**：Node.js 拥有庞大的 npm 包管理生态系统，能够快速集成各种功能和库。

#### Node.js BFF 服务的典型架构

一个典型的 Node.js BFF 服务架构如下：

1. **API 网关（可选）**：位于所有 BFF 服务的前面，管理路由、认证和负载均衡。
2. **BFF 层**：为每个前端应用（如 Web、iOS、Android）设计一个独立的 BFF 服务。每个 BFF 服务处理该特定前端应用的需求。
3. **后端服务层**：BFF 层向后端服务（如微服务、数据库、第三方 API）发出请求，并将结果进行聚合或处理后返回给前端。
4. **缓存和优化**：BFF 层可能会引入缓存机制，减少对后端服务的直接请求，提高响应速度。
5. **日志和监控**：BFF 层负责记录日志、监控服务性能，及时发现问题。

#### 示例

假设一个电商平台有两个前端：Web 应用和移动应用。它们可能有不同的数据需求和交互方式。我们可以为它们分别创建两个 BFF 服务：

```plaintext
Web BFF Service  --------\
                         \
                          >  Backend Services (e.g., Product Service, Order Service)
Mobile BFF Service -------/
```

```javascript
const express = require('express');
const app = express();

// Web BFF 服务示例
app.get('/web/products', async (req, res) => {
    const products = await getProducts(); // 从后端服务获取产品数据
    const recommendations = await getRecommendations(); // 获取推荐产品
    res.json({ products, recommendations }); // 返回 Web 应用需要的数据
});

// Mobile BFF 服务示例
app.get('/mobile/products', async (req, res) => {
    const products = await getProducts(); // 从后端服务获取产品数据
    res.json({ products }); // 只返回产品数据
});

function getProducts() {
    // 调用后端产品服务
    return fetch('http://backend-service/products').then((res) => res.json());
}

function getRecommendations() {
    // 调用后端推荐服务
    return fetch('http://backend-service/recommendations').then((res) => res.json());
}

app.listen(3000, () => {
    console.log('BFF Service is running on port 3000');
});
```

#### 总结

Node.js BFF 服务是一种前后端分离架构中的重要模式，它通过提供定制化的 API 层，优化了前端与后端的交互，提高了系统的灵活性和性能。Node.js 由于其高效、轻量和 JavaScript 全栈的特点，成为了实现 BFF 服务的理想选择。

## 计算机网络

### 网页渲染过程

参考：[https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)

### https 如何保证可靠性传输

参考：[https://cloud.tencent.com/developer/article/1854086](https://cloud.tencent.com/developer/article/1854086)

## 操作系统

### 进程和线程的区别？

类比：火车和车厢

进程和线程是操作系统中两个基本的执行单元，理解它们的区别对于编写高效并发程序非常重要。以下是它们的主要区别：

**1. 定义**

-   **进程（Process）**：进程是一个独立的程序在其自己的内存空间中运行的实例。操作系统通过进程来分配资源和管理程序的执行。
-   **线程（Thread）**：线程是进程内部的一个执行单元，一个进程可以包含多个线程，它们共享进程的内存空间和资源，但独立执行。

**2. 内存和资源**

-   **进程**：每个进程拥有独立的内存空间（包括堆、栈、全局变量等）和资源。进程之间的内存是隔离的，一个进程无法直接访问另一个进程的内存。
-   **线程**：线程是共享进程的内存空间和资源的。线程之间可以直接访问同一块内存，因此线程之间的通信比进程之间的通信更容易和高效，但也带来了数据同步的复杂性。

**3. 创建开销**

-   **进程**：创建或销毁进程的开销较大，因为操作系统需要分配独立的内存空间和资源。
-   **线程**：创建或销毁线程的开销相对较小，因为线程是共享进程的内存和资源的，只需分配一个新的栈和寄存器等少量资源。

**4. 执行**

-   **进程**：进程是相互独立的，进程之间的切换（上下文切换）开销较大，因为需要保存和恢复独立的内存和寄存器状态。
-   **线程**：同一进程内的线程是相互独立的，但它们共享进程的内存。线程之间的切换开销较小，因为它们共享进程的上下文。

**5. 通信**

-   **进程**：进程之间的通信需要使用进程间通信（IPC）机制，如管道、信号、共享内存、消息队列等。这些通信机制通常比线程间通信要复杂和慢。
-   **线程**：线程之间的通信非常简单，因为它们共享同一进程的地址空间，直接通过共享变量进行通信，但需要注意同步问题，避免竞态条件。

**6. 并发性**

-   **进程**：进程可以在多核处理器上并行执行，每个进程都可以独立地在不同的 CPU 上运行。
-   **线程**：同一进程内的多个线程也可以并行执行，但它们共享同一个内存空间，所以需要额外的机制来防止资源冲突。

**7. 崩溃影响**

-   **进程**：一个进程的崩溃不会影响其他进程，因为它们是独立的。
-   **线程**：如果一个线程崩溃，它可能会影响到整个进程，因为它们共享相同的内存空间。

**总结**

-   **进程**是操作系统分配资源的基本单位，每个进程都有独立的内存空间。进程间相互隔离，通信复杂，但更稳定。
-   **线程**是 CPU 调度的基本单位，多个线程共享同一进程的内存和资源。线程间通信简单，但需要处理同步问题。
