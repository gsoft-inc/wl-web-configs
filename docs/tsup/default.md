---
order: 130
icon: /static/tsup.svg
label: tsup
expanded: true
---

# tsup

!!!warning Before you continue...

The prefered way for using these [tsup](https://tsup.egoist.dev/) shared configurations is **not** by installing them manually, but rather by **scaffolding** your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).

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

## TypeScript CLI

Out of the box, `tsc`, the native [TypeScript CLI](https://www.typescriptlang.org/docs/handbook/compiler-options.html), offers pretty much everything that we need to compile and bundle our [TypeScript](https://www.typescriptlang.org/) libraries. We opted for [tsup](https://tsup.egoist.dev/) due to `tsc` lacks of support for CSS imports, a requirement for enabling Chromatic's [TurboSnap](https://www.chromatic.com/docs/turbosnap) feature.

Given that either TurboSnap requirements or `tsx` CSS imports support change, we will reevaluate this decision.

## Features

The shared configurations offered by this library includes the following features 👇

### TypeScript

- Emits declaration files

### Development

- Watch mode
- Sourcemaps

### Production

- Output to `/dist`

### Target environment

- Web (browser platform)
- ES6 modules (ESM)
- ESNext

## Getting started

To get started, follow the quick start guide to configure tsup for either a [development environment](configure-dev.md) or a [production environment](configure-build.md).
