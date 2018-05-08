
# 介绍

ReactStory 是一款极其轻便、支持在 Markdown 里直接书写 React 组件的静态文档生成器。它的诞生主要是为了能够满足 React 组件和 Markdown 同时书写的需求而准备的。

## 它是如何工作的？

ReactStory 是一个由 React、React Router、Webpack、Node.js 驱动的单页应用。ReactStory 会在构建期就完成页面的渲染，能够给线上环境带来极速的浏览体验和良好的搜索引擎优化（SEO）。

## 特性

* 天生 SEO
* 为技术文档而优化的 内置 Markdown 拓展
* 为 React 技术文档而设计的 Markdown + React 组件的能力
* React 驱动的自定义主题系统
* 多语言支持
* 自动生成 Service Worker
* Google Analytics 集成

``` js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```


## License

The MIT License (MIT)

Copyright (c) ZhengFang <mailto:snakegear@163.com>
