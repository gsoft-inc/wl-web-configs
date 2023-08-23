---
order: 120
icon: /static/typescript.svg
label: Typescript
expanded: true
---

# Typescript

!!!warning Before you continue...

The preferred way for using these [TypeScript](https://www.typescriptlang.org/) shared configurations is **not** by installing them manually, but rather by **scaffolding** your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).

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

Typically, [TypeScript](https://www.typescriptlang.org/) shareable configuration libraries are architectured around the idea that shared configurations should be small and composable to accomodate any potential use cases that a development team might encounter.

While composability provides flexibility, it also increases the complexity on the consumer side as they must understand how [TypeScript configuration inheritance](https://www.typescriptlang.org/tsconfig#extends) works and how to compose the provided shared configurations correctly. **It can be frustrating at times** when you want to get something up and running quickly.

To improve the experience, rather than delegating the composition of the shared configuration pieces to the consumer, **we compose them internally** and offer configurations by project type instead.

This way, it's pretty straightforward for the consumer to configure TypeScript, as it only involves **extending** a **single** shared **configuration** per project and it allows for more **accurate defaults** and **assumptions** about the target environment. For advanced users in need of flexibility, the underlying configuration pieces are [also available](advanced-composition.md).

### Linting only

The shared configurations offered by `@workleap/typescript-configs` exclusively focus on code linting, as [tsup](../tsup/default.md) is handling the transpilation process.

### Available configurations

| Name | Description |
| ---  | --- |
| :icon-mark-github: [web-application](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/typescript-configs/web-application.json){ target="_blank" } | For web applications developed with [React](https://react.dev/). |
| :icon-mark-github: [library](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/typescript-configs/library.json){ target="_blank" } | For library project developed with or without [React](https://react.dev/). |
| :icon-mark-github: [monorepo-workspace](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/typescript-configs/monorepo-workspace.json){ target="_blank" } | For the workspace configuration of a monorepo solution. |

## Target environment

- ESM
- ESNext

## Getting started

To get started, choose one of the following scenarios :point_down:

### Setup a new project

If you are looking to setup a **new** polyrepo solution (single project per repository), follow the guide to [setup a polyrepo](setup-polyrepo.md), otherwise, follow the guide to [setup a monorepo](setup-monorepo.md).

### Setup an existing project

If you are migrating an **existing** polyrepo solution (single project per repository) to `workleap/web-configs`, follow the guide to [setup a polyrepo](setup-polyrepo.md), otherwise, follow the guide to [setup a monorepo](setup-monorepo.md).

Once configured, to understand how to adapt `@workleap/typescript-configs` default configurations to your codebase while you are completing the migration, have a look at the [custom configuration](custom-configuration.md) page.

### Advanced use cases

If you are encountering a challenging use case making impractical the _per project type_ configurations offered by `@workleap/typescript-configs`, have a look at the [advanced composition](advanced-composition.md) page for documentation about how to compose the underlying configuration pieces of this library.
