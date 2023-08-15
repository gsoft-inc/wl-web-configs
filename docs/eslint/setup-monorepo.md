---
order: 90
label: Setup a monorepo
meta:
    title: Configure a monorepo - ESLint
---

# Setup a monorepo

To lint a monorepo solution (**multiple projects** per repository), [ESLint](https://eslint.org/) must be setuped to lint the files at the root of the solution (the monorepo **workspace**) and the files of every project of the monorepo.

Execute the following steps to setup ESLint for a monorepo solution.

## 1. Install the workspace packages

Open a terminal at the root of the solution workspace (the **root** of the repository) and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/eslint-plugin eslint typescript @typescript-eslint/parser
```
+++ yarn
```bash
yarn add -D @workleap/eslint-plugin eslint typescript @typescript-eslint/parser
```
+++ npm
```bash
npm install -D @workleap/eslint-plugin eslint typescript @typescript-eslint/parser
```
+++

## 2. Configure ESLint for the workspace

First, create a configuration file named `.eslintrc.json` at the root of the solution workspace:

``` !#8
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├── package.json
├── .eslintrc.json
```

Then, open the newly created file and extend the default configuration with the `monorepo-workspace` shared configurations provided by this library:

```json !#4 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/monorepo-workspace"
}
```

## 3. Ignore files

[ESLint](https://eslint.org/) can be configured to [ignore](https://eslint.org/docs/latest/use/configure/ignore) certain files and directories while linting by specifying one or more glob patterns.

To do so, first, create an `.eslintignore` file at the root of the solution workspace:

``` !#9
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├── package.json
├── .eslintrc.json
├── .eslintignore
```

Then, open the newly created file and paste the following ignore rules:

```bash .eslintignore
**/dist/*
node_modules
pnpm-lock.yaml
*.md
```

## 4. Configure indent style

[ESLint](https://eslint.org/) offers [built-in rules](https://eslint.org/docs/latest/rules/indent) for configuring the indentation style of a codebase. However, there's a catch: when [VS Code auto-formatting](https://code.visualstudio.com/docs/editor/codebasics#_formatting) feature is enabled, it might conflict with the configured indentation rules if they are set  differently.

To garantee a consistent indentation, by default, this library's shared configurations disable ESLint indent rules in favor of using [EditorConfig](https://editorconfig.org/) on the consumer side. With EditorConfig, the indent style can be configured in a single file and be applied consistently accross various formatting tools, including ESlint and [VS Code](https://code.visualstudio.com/).

First, create a `.editorconfig` file at the root of the solution workspace:

``` !#10
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├── package.json
├── .eslintrc.json
├── .eslintignore
├── .editorconfig
```

Then, open the newly created file and paste the following configuration:

```bash .editorconfig
# editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
indent_style = space
indent_size = 4

[*.md]
trim_trailing_whitespace = false
```

## 5. Add a CLI script

At times, especially when running the CI build, it's useful to lint the entire solution using a single command. To do so, add the following script to your solution's workspace `package.json` file:

```json package.json
{
    "lint:eslint:": "eslint . --max-warnings=1 --cache --cache-location node_modules/.cache/eslint"
}
```

> The script definition may vary depending of your needs and your application configuration. For example, you might want to specify specific file extensions such as `--ext .js,.ts,.tsx`.

## 6. Install the project package

Open a terminal at the root of the project (`packages/app` for this example) and install the following package:

+++ pnpm
```bash
pnpm add -D @workleap/eslint-plugin
```
+++ yarn
```bash
yarn add -D @workleap/eslint-plugin
```
+++ npm
```bashss
npm install -D @workleap/eslint-plugin
```
+++

## 7. Configure ESLint for the project

First, create a configuration file named `.eslintrc.json` at the root of the project:

``` !#7
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├────── .eslintrc.json
├── package.json
├── .eslintrc.json
├── .eslintignore
├── .editorconfig
```
Then, open the newly created file and extend the default configuration with one of the [shared configurations](/eslint/#available-configurations) provided by this library :point_down:

### Available configurations

#### web-application

For an application developed with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/), use the following configuration:

```json !#4 packages/app/.eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/web-application"
}
```

#### react-library

For a [TypeScript](https://www.typescriptlang.org/) library developed **with** [React](https://react.dev/), use the following configuration:

```json !#4 packages/app/.eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/react-library"
}
```

#### typescript-library

For a [TypeScript](https://www.typescriptlang.org/) library developed **without** [React](https://react.dev/), use the following configuration:

```json !#4 packages/app/.eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/typescript-library"
}
```

## 8. Repeat for every project

If you already have multiple projects in your monorepo solution, repeat the steps [6](#6-install-the-project-package) and [7](#7-configure-eslint-for-the-project) for every project.

## 9. Custom configuration

New projects shouldn't have to customize the default configurations offered by this library. However, if you are in the process of **migrating** an existing project to use this library or encountering a challenging situation, refer to the [custom configuration](custom-configuration.md) page to understand how to override or extend the default configurations. Remember, **no locked in** :heart::v:

## 10. Try it :rocket:

Open a JavaScript file, type invalid code (e.g. `var x = 0;`) then save. Open a terminal at the root of the solution and execute the CLI script added earlier:

+++ pnpm
```bash
pnpm lint:eslint
```
+++ yarn
```bash
yarn lint:eslint
```
+++ npm
```bash
npm run lint:eslint
```
+++

The terminal should output a linting error.
