---
order: 140
icon: /static/swc.svg
label: SWC
expanded: true
---

# SWC

!!!warning Before you read further...

The prefered way for using these [SWC](https://swc.rs/) shared configurations is **not** by installing them manually, but rather by **scaffolding** your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).

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

Somewhere in 2024, [we expect to migrate from webpack to Rspack](../webpack/default.md#a-note-about-rspack). Once the migration is completed, the SWC [development](configure-dev.md) and [production](configure-build.md) configurations will not be required anymore as [Rspack](https://www.rspack.dev/) offers out of the box support for [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/). 

Still, the [Jest configuration](configure-jest.md) will continue to be available as there is no integration between Rspack and [Jest](https://jestjs.io/).

## Features

The shared configurations offered by this library includes the following features 👇

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

- ES6 modules (ESM)
- ESNext

## Getting started

To get started, follow the quick start guide to configure SWC for either a [development environment](configure-dev.md), a [production environment](configure-build.md) or to run [Jest environment](configure-jest.md).
