---
order: 160
icon: /static/postcss.svg
label: PostCSS
expanded: true
---

# PostCSS

!!!warning Before you continue...

The prefered way for using this [PostCSS](https://postcss.org/) shared configuration is **not** by installing it manually, but rather by **scaffolding** your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).

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

## A word of caution

As we actively work on improving our build time and **minimize** the number of tools **compiling/transpiling** frontend code, we expect [PostCSS](https://postcss.org/) to be one of the first tool that we will **deprecate** from our technology stack. Therefore, before adding PostCSS to your project, make sure that you really need it.

Here's a couple of ideas to move away from PostCSS:

- Prefer native CSS to [SCSS](https://sass-lang.com/documentation/syntax/).
- Avoid CSS nesting, it usually makes code harder to read anyway. If you really need nesting, [native support](https://www.w3.org/TR/css-nesting-1/) is coming soon.
- Force developers to use `rem` by disabling the use of `px` with [Stylelint](https://stylelint.io/).
- Prefix CSS properties directly in the codebase rather than relying on [Autoprefixer](https://github.com/postcss/autoprefixer). As browser vendors are now [putting experimental features behind a flag](https://github.com/postcss/autoprefixer) rather than using prefixes, there isn't many CSS properties still requiring a prefix.

## Features

The shared configuration offered by this library includes the following features:

- [Autoprefixer](https://github.com/postcss/autoprefixer)

## Getting started

To get started, follow the [quick start](configure-project.md) guide to configure your first project.
