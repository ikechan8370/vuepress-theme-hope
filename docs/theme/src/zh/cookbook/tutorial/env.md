---
title: 准备运行环境
icon: leaf
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 准备运行环境
---

本教程将指导你如何搭建 VuePress 的运行环境。

<!-- more -->

## Node.js

[Node.js®](https://nodejs.org/zh-cn/) 是一个基于 [Chrome V8 引擎](https://v8.dev/) 的 JavaScript 运行时环境。

你需要下载并在你的电脑上安装最新的长期维护版。

### 下载 Node.js LTS

[下载地址](https://nodejs.org/zh-cn/)。

::: note

请在打开的页面中，点击左侧的绿色按钮，即可完成下载。

:::

### 安装 Node.js LTS

在安装过程中，保持所有的默认设置，一路下一步即可。

::: warning

如果你真的是个小白，请不要改默认安装目录，以免你在出现问题时找不到对应的文件夹。

Node.js 本身只会占据几十 M 的空间!

:::

## 安装编辑器

一个趁手的编辑器是必要的，我们推荐你使用 VSCode 来编写和运行你的 VuePress 项目。

### 下载 VSCode

[下载地址](https://code.visualstudio.com/)

::: tip

请点击左侧的蓝色按钮完成下载。

:::

### 安装 VSCode

1. 双击安装包打开

1. 同意用户协议。

1. 安装选项中，请务必 **全选** 以下选项:

   ![安装 VS Code](./assets/vscode-install.png)

   勾选 **添加到目录上下文菜单**、**添加到文件上下文菜单**、**将 code 注册为受支持的文件编辑器**、**添加到 path**。

1. 在 VS Code 初次启动后，若未提前安装 Git 可能会提示未找到 Git 软件，忽略即可。

1. 推荐立即执行简体中文扩展安装以保证界面语言为简体中文。

   ::: tip

   当您安装 VS Code 并第一次打开的时候，VS Code 会自动检测当前系统语言并在右下角推荐您安装对应语言的扩展，点击按钮即可自动安装。

   :::

## Yarn

在你安装 Node.js 之后，请安装 Yarn V1 版本。

::: tip

我们推荐你使用 Yarn 管理你的项目，因为 VuePress 和 VuePress Theme Hope 都是通过 Yarn 来管理依赖的。

Yarn 的一些功能可以保证你拥有正确的依赖。

:::

### 安装 Yarn

在终端中输入下列命令安装 Yarn:

```sh
npm i -g yarn
```

::: tip 在 Windows 上打开终端

请使用文件管理器打开对应文件夹，之后在上方的地址栏中输入 `cmd` 之后按下回车。

:::
