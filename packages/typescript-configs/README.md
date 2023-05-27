# @workleap/typescript-configs

Workleap's reusable TypeScript configuration files

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/typescript-configs)](https://www.npmjs.com/package/@workleap/typescript-configs)

## Installation

Install the package.

**With pnpm**

```shell
pnpm add -D @workleap/typescript-configs
```

**With yarn**

```shell
yarn add -D @workleap/typescript-configs
```

**With npm**

```shell
npm install -D @workleap/typescript-configs
```

## Usage

This package provides TypeScript configurations by project type. By providing configurations by project type, the burden of composing TypeScript configurations is shifted from the consumer to the package maintainers. This approach allows for more accurate defaults and assumptions about the target environment. Additionally, it simplifies the process for consumers who only need to configure a single TypeScript config plugin.

The following configurations are available:

### Web App Project

To start, create a tsconfig.json in the root of your project.

A typical setup where the application sit in [project root]/src folder is as follow:

```json
{
  "extends": "@workleap/typescript-configs/web-application",
  "exclude": ["dist", "node_modules"]
}
```

### React or TypeScript Library Project

Before you can build your TypeScript code, you need to make sure that there are no compilation errors. This process involves running the TypeScript compiler in a "linting" mode that only checks for errors, without actually compiling the code.

Here is an example of a tsconfig.json file extending the Workleap TypeScript configuration for linting:

```json
{
  "extends": "@workleap/typescript-configs/library",
  "exclude": ["dist", "node_modules"]
}
```


### Monorepo Root

Before you can build your TypeScript code, you need to make sure that there are no compilation errors. This process involves running the TypeScript compiler in a "linting" mode that only checks for errors, without actually compiling the code.

Here is an example of a tsconfig.json file extending the Workleap TypeScript configuration for linting:

```json
{
  "extends": "@workleap/typescript-configs/monorepo-root",
  "exclude": ["packages", "node_modules"]
}
```

**Note**: If you have a tsconfig.json file in your monorepo root and you exclude all packages, you might get a TS18003 error because TypeScript can't find any files to lint. To fix this, you can add an empty `references` property to your tsconfig.json file:

```json
{
  "extends": "@workleap/typescript-configs/monorepo-root",
  "exclude": ["packages", "node_modules"],
  "references": []
}
```

## Migrating from existing projects

Migrating a codebase to a new config can be a big task. To help with this, feel free to override any configuration that you need to change. It's alright to iterate on your configuration over time.

The configurations exported via this package are designed to be used by ESM projects. If you are migrating an existing project and you don’t want to migrate your project to ESM, you will need to do the following changes to your TypeScript configuration:

```json
{
  "extends": "@workleap/typescript-configs/web-application", // or any other configurations from this package
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "bundler"
  }
}
```

## Advanced Usage

If the default configuration doesn’t fit your needs, you can view the advanced usage documentation [here](./ADVANCED_USAGE.md).

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
