# @workleap/stylelint-config

Shareable [stylelint](https://stylelint.io/) configuration for Workleap.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/stylelint-config)](https://www.npmjs.com/package/@workleap/stylelint-config)

## Installation

### Polyrepo

Install the following package:

**With pnpm**

```shell
pnpm add -D @workleap/stylelint-config stylelint prettier
```

**With yarn**

```shell
yarn add -D @workleap/stylelint-config stylelint prettier
```

**With npm**

```shell
npm install -D @workleap/stylelint-config stylelint prettier
```

### Monorepo

Install the following packages at the root of the project:

**With pnpm**

```shell
pnpm add -D @workleap/stylelint-config stylelint prettier
```

**With yarn**

```shell
yarn add -D @workleap/stylelint-config stylelint prettier
```

**With npm**

```shell
npm install -D @workleap/stylelint-config stylelint prettier
```

Install the following packages in every workspace project:

```shell
pnpm add -D @workleap/stylelint-config
```

**With yarn**

```shell
yarn add -D @workleap/stylelint-config
```

**With npm**

```shell
npm install -D @workleap/stylelint-config
```

## Usage

### Configuration

Create a `.stylelintrc.json` file at the root of your project with the following content:

```json
{
    "$schema": "https://json.schemastore.org/stylelintrc",
    "extends": "@workleap/stylelint-config"
}
```

### Package.json script

Optionally add the following script to your `package.json` file:

```json
{
    "lint:stylelint": "stylelint \"**/*.css\" --cache --cache-location node_modules/.cache/stylelint"
}
```

> The script definition may vary depending of your needs and your application configuration. For example, you might want to specify additional file extensions such as `"**/*.{css,scss,sass}"`.

### VSCode integration

To integrate with VSCode, install the [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) VSCode extension for Stylelint and add the following settings to your `./vscode/settings.json` file:

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll": true, // this makes sure Stylelint is run on save
    },
    "editor.formatOnSave": true,
    "css.validate": false, // disables the default formatter, we use Stylelint instead
    "less.validate": false, // disables the default formatter, we use Stylelint instead
    "scss.validate": false, // disables the default formatter, we use Stylelint instead
}
```

## Prettier

Since Stylelint v15.0.0, stylistic rules are deprecated. They now suggest using Prettier to format your CSS files.

With that in mind, the `@workleap/stylelint-config` includes the [stylelint-prettier plugin](https://github.com/prettier/stylelint-prettier). Using this plugin, prettier changes are exposed as stylelint rule violations.

You should therefore add either a `.editorconfig` or `.prettierrc` file at the root of your project. These rule will be run against your CSS files and will be autofixed when you run stylelint --fix **/*.css.

You need to make sure that you create a `.prettierignore` file to ignore everything but your CSS files at the root of your project. This file should contain the following content:

```
*
!**/*.css
```

Otherwise, Prettier will format your JS/TS/JSON and other type of files and you will end up with a conflict between Prettier and ESLint.

> Great explanation about why we choosed to stick with ESLint rather than migrating to Prettier: https://antfu.me/posts/why-not-prettier.

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
