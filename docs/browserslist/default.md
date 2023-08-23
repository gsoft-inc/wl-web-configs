---
order: 180
icon: /static/browserslist.svg
label: Browserslist
expanded: true
---

# Browserslist

!!!warning Before you continue...

The preferred way for using this [Browserslist](https://browsersl.ist/) shared configuration is **not** by installing it manually, but rather by **scaffolding** your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).

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

## Supported browsers

You can find an exhaustive list of the browser versions included with this shared configuration on [https://browsersl.ist](https://browsersl.ist/#q=%3E+0.2%25%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead). 

Alternatively, to list the browser versions supported by a specific configuration file, you can open a terminal at the root of any project including a `.browserslistrc` file and execute the following command:

```bash
npx browserslist
```

## Getting started

To get started, follow the [quick start](configure-project.md) guide to configure your first project.
