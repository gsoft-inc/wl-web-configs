---
order: 90
label: Setup a monorepo
meta:
    title: Setup a monorepo - TypeScript
---

# Setup a monorepo

!!!warning
This monorepo setup is intended to be used with [PNPM workspaces](https://pnpm.io/workspaces). You may need a different setup for [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) or [Yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) because by default, those package managers hoist dependencies rather than installing them in isolation like PNPM.
!!!

To lint a monorepo solution (**multiple projects** per repository), [TypeScript](https://www.typescriptlang.org/) must be setuped to lint the files at the root of the solution (the monorepo **workspace**) and the files of every project of the monorepo. Execute the following steps to setup TypeScript for a monorepo solution.

## 1. Install the workspace packages

Open a terminal at the root of the solution workspace (the **root** of the repository) and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/typescript-configs typescript
```
+++ yarn
```bash
yarn add -D @workleap/typescript-configs typescript
```
+++ npm
```bash
npm install -D @workleap/typescript-configs typescript
```
+++

## 2. Configure TypeScript for the workspace

First, create a configuration file named `tsconfig.json` at the root of the solution workspace:

``` !#8
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├── package.json
├── tsconfig.json
```

Then, open the newly created file and extend the default configuration with the `monorepo-workspace` shared configurations:

```json !#2 tsconfig.json
{
    "extends": "@workleap/typescript-configs/monorepo-workspace.json",
    "exclude": ["packages", "node_modules"]
}
```

## 3. Add a CLI script

At times, especially when running the CI build, it's useful to lint the entire solution using a single command. To do so, add the following script to your solution's workspace `package.json` file:

``` !#7
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├── package.json    <------- (this one!)
├── tsconfig.json
```

```json package.json
{
    "lint:types": "pnpm -r --parallel --include-workspace-root exec tsc"
}
```

## 4. Install the project package

Open a terminal at the root of the project (`packages/app` for this example) and install the following package:

+++ pnpm
```bash
pnpm add -D @workleap/typescript-configs typescript
```
+++ yarn
```bash
yarn add -D @workleap/typescript-configs typescript
```
+++ npm
```bash
npm install -D @workleap/typescript-configs typescript
```
+++

## 5. Configure TypeScript for the project

First, create a configuration file named `tsconfig.json` at the root of the project:

``` !#7
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├────── tsconfig.json
├── package.json
├── tsconfig.json
```

Then, open the newly created file and extend the default configuration with one of the [shared configurations](default.md/#available-configurations) provided by `@workleap/typescript-configs` :point_down:

### web-application

For an applications developed with [React](https://react.dev/), use the following configuration:

```json !#2 tsconfig.json
{
    "extends": ["@workleap/typescript-configs/web-application.json"],
    "exclude": ["dist", "node_modules"]
}
```

### library

For a library project developed with or without [React](https://react.dev/), use the following configuration:

```json !#2 tsconfig.json
{
    "extends": ["@workleap/typescript-configs/library.json"],
    "exclude": ["dist", "node_modules"]
}
```

## 6. Repeat for every project

If you already have multiple projects in your monorepo solution, repeat the steps [4](#4-install-the-project-package) and [5](#5-configure-typescript-for-the-project) for every project.

## 7. Customize configuration

New projects shouldn't have to customize the default configurations offered by `@workleap/typescript-configs`. However, if you are in the process of **migrating** an existing project to use this library or encountering a challenging situation, refer to the [custom configuration](custom-configuration.md) page to understand how to override or extend the default configurations. Remember, **no locked in** :heart::v:.

## 8. Try it :rocket:

To test your new [TypeScript](https://www.typescriptlang.org/) setup, open a TypeScript file, type invalid code (e.g. `import { App } from "./App"`), then wait for the IDE to flag the error. Fix the error (e.g. `import { App } from "./App.tsx"`), then wait for the IDE to remove the error.
