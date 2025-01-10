---
order: 110
icon: /static/rslib.svg
label: Rslib
expanded: true
toc:
    depth: 2-3
---

# Rslib

<!-- !!!warning Before you continue...

The preferred way for using `@workleap/webpack-configs` is **not** by installing the library manually, but rather by **scaffolding** your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).

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
!!! -->

[Rslib](https://lib.rsbuild.dev/) is a high-performance build tool powered by [Rsbuild](https://rsbuild.dev/) and [Rspack](https://rspack.dev/), Rust-based ports of webpack designed for efficiency and speed. Those new Rslib shared configurations are a modern replacement for previous Workleap's shared [tsup configurations](../tsup/default.md).
