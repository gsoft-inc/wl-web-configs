---
order: 110
icon: /static/webpack.svg
label: Webpack
expanded: true
---

# Webpack

!!!warning Before you read further...

The prefered way for using these [webpack](https://webpack.js.org/) shared configurations is **not** by installing them manually, but rather by **scaffolding** your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).

+++ pnpm
```bash
pnpm create @workleap/project@latest <output-directory>
```
+++ yarn
```bash
yarn create @workleap/project@latest <output-directory>
```
+++ npm
```bash
npm create @workleap/project@latest <output-directory>
```
+++
!!!

## A note about Rspack

[Rspack](https://www.rspack.dev/) is a partial rewrite of [webpack](https://webpack.js.org/) in [Rust](https://foundation.rust-lang.org/) and will most likely be its successor once it's features complete and stable. Our goal is to migrate to Rspack somewhere in 2024 when [Module Federation](https://module-federation.io/) support will be available.

Meanwhile, you can **confidently start a new project with webpack** as the **migration** process to Rspack is expected to be **seamless**; Rspack is commited to support the full webpack API and its massive plugin ecosystem.

## Features

The shared configurations offered by this library includes the following features :point_down:

### Language support

- JavaScript
- TypeScript
- CSS (with CSS modules and PostCSS)

### Framework support

- React

### Asset support

- SVG as React components
- PNG
- JPEG
- GIF

### Development

- Development server
- File system caching
- Fast Refresh or Hot Module Reload
- Sourcemap

### Production

- Minification
- Output to `/dist`

### Target environment

- Web

## Getting started

To get started, follow the quick start guide to configure webpack for either a [development environment](configure-dev.md) or a [production environment](configure-build.md).
