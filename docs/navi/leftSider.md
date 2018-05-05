# 介绍

## 这里是一块代码

```js
/**
 * 用户输入地址 ---> 解析地址下的md文件
 *                       |
 *                       |
 *                       v
 *                  生成顶部导航栏
 *                       |
 *                       |
 *                  是否渲染首页
 *                       |
 *        yes            |
 * render index page  <--|
 *                       |no
 *                       v
 *                  渲染导航栏第一个
 *                       |
 *                       |     导航栏按钮是个文件夹
 *                    生成Sider -------> 依照 .md 名字渲染 SubMenu
 *                       |
 *                       |
 *                       v
 *     根据用户设定 level 提取 .md 中的 header，渲染到sider
 *
 */
```

```js
export default {
  navi: ['2', '3', '4', '5']
}
```

## Why JSX?

React embraces the fact that `rendering` logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.

Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called “components” that contain both. We will come back to components in a further section, but if you’re not yet comfortable putting markup in JS, this talk might convince you otherwise.

React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.

With that out of the way, let’s get started!

# React-Story

## Features

* 😄 Suuuupppper easy to build. Do not need any shiz to build.(such as webpack)
* 👍 Simple and powerful, pure React application
* 😈 Manage your documentation like a president
* 📄 code-block styles

## Quick start

[Quick start](https://215566435.github.io/TrumpDoc/)

## Contributing

1.  Fork it!
2.  Create your feature branch: git checkout -b my-new-feature
3.  Commit your changes: git commit -am 'Add some feature'
4.  Push to the branch: git push origin my-new-feature
5.  Submit a pull request :D

## Author

@[Zhengfang](https://github.com/215566435)

Under@MIT

# 协议

# 着是什么