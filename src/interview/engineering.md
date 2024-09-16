# 工程化知识点

## 微前端方案 qiankun 和 iframe 的优劣势

1. **性能**：qiankun 更好。qiankun 子应用之间切换不会导致整个页面刷新，iframe 切换会导致页面重新渲染，有明显延迟（白屏）
2. **隔离性**：iframe 更好。qiankun 通过 JS 执行上下文隔离子应用，需要手动处理样式和脚本隔离，可能存在安全风险；iframe 天然具有沙箱隔离机制，子应用间完全隔离
3. **灵活性**：qiankun 更灵活。qiankun 支持多种前端框架（React、Vue、Angular），提供了丰富的生命周期钩子；iframe 仅支持完整的页面，没有微前端框架的特性
4. **共享与通信**：qiankun 更方便。qiankun 主应用和子应用之间共享全局状态和资源，通信更方面；iframe 隔离性高，需要借助 `postMessage` 等方式，状态共享复杂
5. **开发和维护**：qiankun 难度更高。使用前端需要学习微前端架构和 qiankun 的 API，成本较高；iframe 使用简单
6. **SEO 支持**：qiankun 更有利于 SEO，子应用可以直接参与主页面渲染，但搜索引擎无法索引 iframe 的内容

总结：

-   qiankun 更适合追求高性能、流畅体验、灵活共享和通信的微前端场景
-   iframe 更适合需要强隔离、简单集成、安全性高的场景
