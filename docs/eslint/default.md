---
order: 170
icon: /static/eslint.svg
label: ESLint
expanded: true
---

# ESLint

!!!warning Foundry CLI

The prefered way for using these [ESLint](https://eslint.org/) configurations is by scaffolding your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).
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

## By project type configurations

Typically, [ESLint](https://eslint.org/) shareable configuration libraries are architectured around the idea that [shared configurations](https://eslint.org/docs/latest/extend/shareable-configs) should be small and composable in an attempt to accomodate any potential use cases that a development team might encounter.

While composability provide flexibility, it also increase the complexity on the consumer side as they must understand how [ESLint cascading and hierarchy](https://eslint.org/docs/latest/use/configure/configuration-files#cascading-and-hierarchy) works and how to compose the provided shared configurations correctly. **It can be frustrating at times** when you want to get something up and running quickly.

==- @shopify/web-configs example
Have a look at Shopify [ESLint usage section](https://github.com/Shopify/web-configs/tree/main/packages/eslint-plugin#usage). To configure ESLint with `@shopify/web-configs`, a consumer must choose whether he want rules for `es5`, `esnext`, `typescript` or `node`, then decide if he should use `@babel/eslint-parser` or `@typescript-eslint/parser`.

A consumer must have advanced front-end skills to use those shared configurations.
===

To improve the experience, rather than delegating the composition of the shared configurations to the consumer, we compose them internally and offer configurations **by project type** instead.

This way, it's pretty straightforward to configure ESLint as it only involves **extending a single shared configuration** per project. For advanced users in need of flexibility, the underlying configuration pieces are [also available](advanced-composition.md).

### Available configurations

| Name | Description |
| ---  | --- |
| :icon-mark-github: [web-application](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/by-project-type/web-application.ts) | For web applications developed with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/){ target="_blank" }. |
| :icon-mark-github: [react-library](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/by-project-type/react-library.ts){ target="_blank" } | For TypeScript libraries developed **with** React. |
| :icon-mark-github: [typescript-library](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/by-project-type/typescript-library.ts){ target="_blank" } | For TypeScript libraries developed **without** React. |
| :icon-mark-github: [monorepo-workspace](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/by-project-type/typescript-library.ts){ target="_blank" } | For the workspace configuration of a monorepo solution. |

## Prettier

For a great explanation about why we choosed to stick with [ESLint](https://eslint.org/) for stylistic rules rather than migrating to [Prettier](https://prettier.io/), read the following [article](https://antfu.me/posts/why-not-prettier).

## Getting started

To get started, choose one of the following scenarios :point_down:

### Setup a new project

If your are looking to setup a **new** polyrepo solution (single project per repository), follow the guide to [setup a polyrepo](setup-polyrepo.md), otherwise, follow the guide to [setup a monorepo](setup-monorepo.md).

### Setup an existing project

If you are migrating an **existing** polyrepo solution (single project per repository) to `@workleap/web-configs`, follow the guide to [setup a polyrepo](setup-polyrepo.md), otherwise, follow the guide to [setup a monorepo](setup-monorepo.md).

Once configured, to understand how to adapt this library default configurations to your codebase while you are completing the migration, have a look at the [custom configuration](custom-configuration.md) page.

### Advanced use cases

If you are encountering a challenging use case making impractical the _per project type_ configurations offered by this library, have a look at the [advanced composition](advanced-composition.md) page for documentation about how tocompose the underlying configuration pieces of this library.
