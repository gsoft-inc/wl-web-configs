---
order: 90
label: Setup a monorepo
meta:
    title: Configure a monorepo - ESLint
toc:
    depth: 2-3
---

# Setup a monorepo

!!!warning
This monorepo setup has been tested with [PNPM workspaces](https://pnpm.io/workspaces). You may need a different setup for [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) or [Yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) because by default, those package managers **hoist dependencies** rather than installing them in isolation like PNPM.
!!!

To lint a monorepo solution (**multiple projects** per repository), [ESLint](https://eslint.org/) must be set up to lint the files at the root of the solution (the monorepo **workspace**) and the files of every project of the monorepo. Execute the following steps to setup ESLint for a monorepo solution.

## Setup the workspace

### Install the packages

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

### Configure ESLint

First, create a configuration file named `eslint.config.js` at the root of the solution workspace:

``` !#8
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├── package.json
├── eslint.config.js
```

!!!info
If your `package.json` does not specify `"type": "module"`, you should create an `eslint.config.mjs` file instead.
!!!

Then, open the newly created file and import the Workleap ESLint plugin (`@workleap/eslint-plugin`). Creat an array and spread `monorepoWorkspace` shared config provided by the plugin into the array :point_down:

```javascript !#4 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.monorepoWorkspace
];

export default config;
```

### Ignoring files

ESLint can be configured to ignore certain files and directories while linting by specifying one or more glob patterns.

To do so, add a configuration object with an `ignores` key at the top of your config array.

```javascript !#4-15 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";

const config = [
    {
        ignores: [
            "**/dist/*",
            "node_modules",
            "**/__snapshots__",
            "**/storybook-static",
            "pnpm-lock.yaml",
            "package-lock.json",
            "**/*.md",
            "!**/.storybook"
        ]
    },
    ...workleapPlugin.configs.monorepoWorkspace
];

export default config;
```

!!!info
While only the `.storybook` dot folder is listed, you should include any other dot folders that need to be linted.
!!!

### Configure indent style

ESLint offers [built-in rules](https://eslint.org/docs/latest/rules/indent) for configuring the indentation style of a codebase. However, there's a catch: when [VS Code auto-formatting](https://code.visualstudio.com/docs/editor/codebasics#_formatting) feature is enabled, it might conflict with the configured indentation rules if they are set differently.

To guarantee a consistent indentation, we recommend using [EditorConfig](https://editorconfig.org/) on the consumer side. With EditorConfig, the indent style can be configured in a single file and be applied consistently across various formatting tools, including ESlint and [VS Code](https://code.visualstudio.com/).

First, create a `.editorconfig` file at the root of the solution workspace:

``` !#10
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├── package.json
├── eslint.config.js
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

### Add a CLI script

At times, especially when running the CI build, it's useful to lint the entire solution using a single command. To do so, add the following script to your solution's workspace `package.json` file:

``` !#7
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├── package.json    <------- (this one!)
├── eslint.config.js
├── .editorconfig
```

```json package.json
{
    "lint:eslint:": "eslint . --max-warnings=0 --cache --cache-location node_modules/.cache/eslint"
}
```

> The script definition may vary depending of your needs and your application configuration. For example, you might want to specify specific file extensions such as `--ext .js,.ts,.tsx`.

## Setup a project

### Install the package

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
```bash
npm install -D @workleap/eslint-plugin
```
+++

### Configure ESLint

First, create a configuration file named `eslint.config.js` at the root of the project:

``` !#7
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├────── eslint.config.js
├── package.json
├── eslint.config.js
├── .editorconfig
```

!!!info
If your `package.json` does not specify `"type": "module"`, you should create an `eslint.config.mjs` file instead.
!!!

Then, open the newly created file and import the Workleap ESLint plugin (`@workleap/eslint-plugin`). Creat an array and spread one of the [shared configurations](default.md#available-configurations) provided by the plugin into the array :point_down:

#### `web-application`

For an application developed with TypeScript and React, use the following configuration:

```javascript !#4 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.webApplication
];

export default config;
```

#### `react-library`

For a TypeScript library developed **with** React, use the following configuration:

```javascript !#4 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.reactLibrary
];

export default config;
```

#### `typescript-library`

For a TypeScript library developed **without** React, use the following configuration:

```javascript !#4 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.typescriptLibrary
];

export default config;
```

#### Add to root

!!!warning
This step is very important. If you do not add your nested config to the root config, your package may be improperly linted or not linted at all.
!!!

ESLint does not search for nested configs, so you must import your package's config into the root config. We recommend using [eslint-flat-config-utils](https://github.com/antfu/eslint-flat-config-utils) to join these configuration objects and scope the nested config to its own directory.

With `concat`, you do not need to spread the configuration array. `concat` will handle combining and flattening arrays of configuration objects.

Be sure to provide the relative path to the root of each project when you use `extends`. This will ensure that all file and ignore globs are scoped only to that package.

```javascript !#1,3,5,19 eslint.config.js
import { concat, extend } from "eslint-flat-config-utils";
import workleapPlugin from "@workleap/eslint-config";
import packageAppConfig from "./packages/app/eslint.config.js";

const config = concat(
    {
        ignores: [
            "**/dist/*",
            "node_modules",
            "**/__snapshots__",
            "**/storybook-static",
            "pnpm-lock.yaml",
            "package-lock.json",
            "**/*.md",
            "!**/.storybook"
        ]
    },
    workleapPlugin.configs.monorepoWorkspace,
    extend(packageAppConfig, "packages/app/"),
);

export default config;
```

## Custom configuration

New projects shouldn't have to customize the default configurations offered by `@workleap/eslint-plugin`. However, if you are in the process of **migrating** an existing project to use this library or encountering a challenging situation, refer to the [custom configuration](custom-configuration.md) page to understand how to override or extend the default configurations. Remember, **no locked in** :heart::v:.

## Try it :rocket:

To test your new ESLint setup, open a JavaScript file, type invalid code (e.g. `var x = 0;`), then save. Open a terminal at the root of the solution and execute the [CLI script added earlier](#add-a-cli-script):

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
