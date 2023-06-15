# @workleap/eslint-plugin

Workleap’s ESLint configs.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/eslint-plugin)](https://www.npmjs.com/package/@workleap/eslint-plugin)

## Installation

### Polyrepo

Install the following packages:

**With pnpm**

```shell
pnpm add -D @workleap/eslint-plugin eslint @typescript-eslint/parser
```

**With yarn**

```shell
yarn add -D @workleap/eslint-plugin eslint @typescript-eslint/parser
```

**With npm**

```shell
npm install -D @workleap/eslint-plugin eslint @typescript-eslint/parser
```

### Monorepo

Install the following packages at the root of the project:

```shell
pnpm add -D @workleap/eslint-plugin eslint typescript @typescript-eslint/parser
```

**With yarn**

```shell
yarn add -D @workleap/eslint-plugin eslint typescript @typescript-eslint/parser
```

**With npm**

```shell
npm install -D @workleap/eslint-plugin eslint typescript @typescript-eslint/parser
```

Install the following packages in every workspace project:

```shell
pnpm add -D @workleap/eslint-plugin
```

**With yarn**

```shell
yarn add -D @workleap/eslint-plugin
```

**With npm**

```shell
npm install -D @workleap/eslint-plugin
```

## Usage

This package provides ESLint configurations by project type. By providing configurations by project type, the burden of composing ESLint configurations is shifted from the consumer to the package maintainers. This approach allows for more accurate defaults and assumptions about the target environment. Additionally, it simplifies the process for consumers who only need to configure a single ESLint plugin.

The following configurations are available:

### web-application

The `web-application` configuration is suitable for a web application developed in React with TypeScript.

To use this configuration, add the following to your `.eslintrc.json` file:

```json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/web-application"
}
```

### react-library

The `react-library` configuration is suitable for a React component library developed with TypeScript.

To use this configuration, add the following to your `.eslintrc.json` file:

```json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/react-library"
}
```

### typescript-library

The `typescript-library` configuration is suitable for a TypeScript library developed without React.

To use this configuration, add the following to your `.eslintrc.json` file:

```json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/typescript-library"
}
```

### monorepo-root

The `monorepo-root` configuration is suitable for the root `tsconfig` file of a monorepo project.

To use this configuration, add the following to your `.eslintrc.json` file:

```json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/monorepo-root"
}
```

### Package.json script

Optionally add the following script to your `package.json` file:

```json
{
    "lint:eslint:": "eslint . --max-warnings=1 --cache --cache-location node_modules/.cache/eslint"
}
```

> The script definition may vary depending of your needs and your application configuration. For example, you might want to specify specific file extensions such as `--ext .js,.ts,.tsx`.

### VSCode integration

To integrate with VSCode, install the [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) VSCode extension for ESLint and add the following settings to your `./vscode/settings.json` file:

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll": true, // this makes sure ESLint is run on save
    },
    "editor.formatOnSave": true,
    "typescript.format.enable": false, // disables the default formatter, we use ESLint instead
    "javascript.format.enable": false, // disables the default formatter, we use ESLint instead
    "json.format.enable": false, // disables the default formatter, we use ESLint instead
}
```

## ESLint ignore

You can configure ESLint to ignore certain files and directories while linting by specifying one or more glob patterns.
Heres the ESLint ignore file we usually use at Workleap:

```
// .eslintignore

**/dist/*
node_modules
*.md
pnpm-lock.yaml
```

## Advanced Usage

If the default configuration doesn’t fit your needs, please read the [advanced usage documentation](./ADVANCED_USAGE.md).

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
