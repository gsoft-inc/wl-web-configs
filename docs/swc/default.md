---
order: 140
icon: /static/swc.svg
label: SWC
expanded: true
---

# SWC

!!!warning Before you continue...

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
!!!

## A word about Rspack

Somewhere in 2024, [we expect to migrate from webpack to Rspack](../webpack/default.md#deprecation-warning). Once the migration is completed, the SWC [development](configure-dev.md) and [production](configure-build.md) configurations will not be used anymore as [Rspack](https://www.rspack.dev/) offers out of the box support for [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/). 

Meanwhile, you can **confidently start a new project with these SWC configurations** as the migration process to Rspack is expected to be seamless.

## Features

The shared configurations offered by `@workleap/swc-configs` includes the following features 👇

### Language support

- JavaScript
- TypeScript

### Framework support

- React

### Development

- Fast Refresh

### Production

- Minification

### Target environment

- ESM
- ECMAScript features matching the provided `browsers`

## Getting started

To get started, follow the quick start guide to configure SWC for either a [development environment](configure-dev.md), a [production environment](configure-build.md) or to run [Jest tests](configure-jest.md).
