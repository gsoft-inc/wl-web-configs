---
order: 140
icon: /static/swc.svg
label: SWC
expanded: true
toc:
    depth: 2-3
---

# SWC

<!-- !!!warning Before you continue...

The preferred way for using `@workleap/swc-configs` is **not** by installing the library manually, but rather by **scaffolding** your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).

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

## Main features

The shared configurations offered by `@workleap/swc-configs` includes the following features 👇

### Language support

- JavaScript
- TypeScript

### Framework support

- React

### Development features

- Fast Refresh

### Production features

- Minification

### Target environment

- ESM
- ECMAScript features matching the provided `browsers`

## Getting started

To get started, follow the quick start guide to configure SWC for either a [development environment](configure-dev.md), a [production environment](configure-build.md) or to run [Jest tests](configure-jest.md).
