---
layout: "/src/layouts/BlogPostLayout.astro"
title: "astro 架构博客搭建"
subtitle: " freeCodeCamp 前端学习阶段练习"
date: "2024-09-19"
author: "Rorschach"
category: "技术学习"
tags: ["Front end", "Astro"]
---

# 个人博客搭建

## 背景

这个项目是我在 freeCodeCamp 学习完前三个篇章后的阶段性学习成果。此博客基于 astro 网站搭建，主要学习内容包括 `html`、 `css`、`js`、 `React` 以及一些其他的前端库。本博客记录该项目的经验。


## 1 概述

### 1.1 需求

初步阶段需求为静态网页展示 MarkDown 文章，要能实现高阶 MD 需求如流程图、音乐谱，后续有其他需求

1. 前端设计 如 Valorant 界面
2. 项目搭建，动态网页接数据库，了解项目过程
3. 网页上直接添加修改文章，而不是本地



### 1.2 技术栈

使用 astro 框架，是一个现代的前端框架，旨在构建快速、优化的网站，特别适合构建内容丰富的网站如博客、文档网站等，后续扩展性强



### 1.3 设计

主页风格简介大方，其他页面后续设计

- 技术学习，时间排序？置顶，可以包括一个项目总结以及导航

- 心得感悟，目标




## 2 astro 技巧

### 2.1 环境准备

- git bash
- node.js
- vscode



### 2.2 创建与运行项目

终端中

```bash
npm create astro@latest
```



vscode 终端

```bash
npm run dev
```



目录结构

```
/
├── public/                # 静态文件目录，不经过Astro处理，直接部署到最终站点
│   └── favicon.ico        # 示例：站点图标
├── src/                   # 主要的源码目录，包含页面、组件、布局等
│   ├── components/        # 存放可复用的组件（如React、Vue或Svelte等）
│   │   └── Header.astro   # 示例组件
│   ├── layouts/           # 存放页面布局文件，定义不同页面的布局模板
│   │   └── BaseLayout.astro  # 示例布局文件
│   ├── pages/             # 页面目录，里面的文件会生成对应的路由（URL）
│   │   ├── index.astro    # 网站首页
│   │   ├── about.astro    # 关于页面
│   │   └── blog/          # 子目录，生成 /blog 路径
│   │       └── post1.md   # 示例博客文章，支持 Markdown
│   └── styles/            # 全局或模块化样式文件
│       └── global.css     # 示例：全局样式文件
├── astro.config.mjs       # Astro 的配置文件
├── package.json           # 项目依赖文件
└── tsconfig.json          # TypeScript 配置文件（如果你使用 TypeScript）

```



### 2.3 .astro 文件

```
---
// 前导脚本部分，JavaScript/TypeScript
import MyComponent from '../components/MyComponent.astro';
import '../styles/global.css';
import ReactButton from '../components/Button.jsx';
const title = 'Hello, Astro!';
---

<!-- 模板部分，HTML、组件、变量绑定等 -->
<html>
  <head>
    <title>{title}</title>
  </head>
  
  <style>
  h1 {
    color: blue;
  }
  </style>
  
  <body>
    <h1>{title}</h1>
    <MyComponent />
    <ReactButton label="Click me" />
  </body>
  
  <script>
  console.log('This runs on the client side');
  </script>
</html>

```



## 3 astro.config.mjs

此文件是 astro 项目的配置文件，用于各种包的导入，使 astro 项目支持各种库。

本项目安装的库包括：

- react 用于 React 库，编写 React 代码
- remark-math，rehype-katex 用于支持数学公式
- remark-mermaid 用于支持 mermaid 语言，流程图绘制
- shiki 代码高亮库，astro 项目自带

```
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkMermaid from 'remark-mermaid';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkMermaid],
    rehypePlugins: [rehypeKatex, ],
    shikiConfig: {
      
      theme: 'github-light',
    }
  
  }
});

```



## 4 其他注意点

### 4.1 CSS 级联顺序

Astro CSS 规则的评估顺序如下：

- **`<link>` 标签在 head 中**（最低优先级）
- **导入的样式**
- **scoped 样式**（最高优先级）

这个在我修改 markdown 样式时折磨我很久，导入的样式也有顺序，后导入的可以覆盖先导入的。

```
import "../styles/github-markdown.css";
import "../styles/markdown-code.css"; // 优先使用后导入
```



### 4.2 Mermaid 生成额外图片导致 posts 文件夹混乱

因为 Astro 项目的博文都存储在 posts 文件夹下，安装 mermaid 流程图语言后，虽然可以正确出图，但是会在其 .md 文件同级目录生成一个 .svg 文件，如果后期多个文件都生成，会导致文件管理混乱，因此采取每篇博文都存在一个额外的文件夹，存储图片。该方法主要原因是 Astro 项目更改 mermaid 生成文件目录需要额外的脚本，按理来说该 .svg 文件应该存在 public 文件夹下。



### 4.3 项目部署

项目最好还是部署在 netlify 上，尝试 Github Pages 丢失了部分 css 样式，毕竟官方教程是部署在 netlify 上。

### 4.4 待补充



## 5 心得

本次项目是一次推到又重来的项目，主要是开发初期并没有设计开发的流程，虽然提前定好了需求，但是需求是模糊的，主要是前端开发过程中的定位问题，一开始我是单独写每个组件然后并入文件，但是合在一起后发现组件位置很混乱，当页面缩放时文件更是难以定位，最后只能全部推倒，先使用 grid 进行组件定位，然后进行开发，吃一堑长一智。

前端并没有我想象的那么容易，风格设计、开发，各种前端库的用法都很复杂，学习的周期不比后端短，主要是开发过程中很难发现问题在哪里，组件之间都是嵌套的，很难知道是哪个组件有问题，甚至有时是因为组件之间的问题，加上视觉定位等问题一般都不会报错，更难发现。学习前端需要足够的耐心，细心。

无论如何，这次项目是顺利完成了我设想的基础功能，后续扩展性也还凑合。


