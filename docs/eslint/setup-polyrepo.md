---
order: 100
label: Setup a polyrepo
meta:
    title: Configure a polyrepo - ESLint
---

# Setup a polyrepo

Execute the following steps to setup [ESLint](https://eslint.org/) for a polyrepo solution (**single project** per repository).

## 1. Install the packages

Open a terminal at the root of the solution and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/eslint-plugin eslint @typescript-eslint/parser
```
+++ yarn
```bash
yarn add -D @workleap/eslint-plugin eslint @typescript-eslint/parser
```
+++ npm
```bash
npm install -D @workleap/eslint-plugin eslint @typescript-eslint/parser
```
+++

## 2. Configure ESLint

First, create a configuration file named `.eslintrc.json` at the root of the solution:

``` !#5
root
├── src
├──── ...
├── package.json
├── .eslintrc.json
```

Then, open the newly created file and extend the default configuration with one of the [shared configurations](default.md#available-configurations) provided by `@workleap/eslint-plugin` :point_down:

### web-application

For an application developed with [TypeScript](https://www.typescriptlang.org/) and [React](https://react.dev/), use the following configuration:

```json !#4 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/web-application"
}
```

### react-library

For a [TypeScript](https://www.typescriptlang.org/) library developed **with** [React](https://react.dev/), use the following configuration:

```json !#4 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/react-library"
}
```

### typescript-library

For a [TypeScript](https://www.typescriptlang.org/) library developed **without** [React](https://react.dev/), use the following configuration:

```json !#4 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/typescript-library"
}
```

## 3. Ignore files

[ESLint](https://eslint.org/) can be configured to [ignore](https://eslint.org/docs/latest/use/configure/ignore) certain files and directories while linting by specifying one or more glob patterns.

To do so, first, create an `.eslintignore` file at the root of the solution:

``` !#6
root
├── src
├──── ...
├── package.json
├── .eslintrc.json
├── .eslintignore
```

Then, open the newly created file and paste the following ignore rules:

```bash .eslintignore
**/dist/*
node_modules
*.md
*.yml
*.yaml
```

## 4. Configure indent style

[ESLint](https://eslint.org/) offers [built-in rules](https://eslint.org/docs/latest/rules/indent) for configuring the indentation style of a codebase. However, there's a catch: when [VS Code auto-formatting](https://code.visualstudio.com/docs/editor/codebasics#_formatting) feature is enabled, it might conflict with the configured indentation rules if they are set differently.

To guarantee a consistent indentation, we recommend using [EditorConfig](https://editorconfig.org/) on the consumer side. With EditorConfig, the indent style can be configured in a single file and be applied consistently across various formatting tools, including ESlint and [VS Code](https://code.visualstudio.com/).

First, create a `.editorconfig` file at the root of the solution:

``` !#7
root
├── src
├──── ...
├── package.json
├── .eslintrc.json
├── .eslintignore
├── .editorconfig
```

Then, open the newly created file and paste the following configuration:

```bash .editorconfig
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

Finally, install the [EditorConfig.EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) VS Code extension.

## 5. Add a CLI script

At times, especially when running the CI build, it's useful to lint the entire solution using a single command. To do so, add the following script to your solution's `package.json` file:

```json package.json
{
    "lint:eslint:": "eslint . --max-warnings=1 --cache --cache-location node_modules/.cache/eslint"
}
```

> The script definition may vary depending of your needs and your application configuration. For example, you might want to specify specific file extensions such as `--ext .js,.ts,.tsx`.

## 6. Customize configuration

New projects shouldn't have to customize the default configurations offered by `@workleap/eslint-plugin`. However, if you are in the process of **migrating** an existing project to use this library or encountering a challenging situation, refer to the [custom configuration](custom-configuration.md) page to understand how to override or extend the default configurations. Remember, **no locked in** :heart::v:.

## 7. Try it :rocket:

To test your new [ESLint](https://eslint.org/) setup, open a JavaScript file, type invalid code (e.g. `var x = 0;`), then save. Open a terminal at the root of the solution and execute the [CLI script added earlier](#5-add-a-cli-script):

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
