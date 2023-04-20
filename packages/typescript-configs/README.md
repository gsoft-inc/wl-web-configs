# `@workleap/typescript-configs`
Workleap's reusable TypeScript configuration files

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/typescript-configs)](https://www.npmjs.com/package/@workleap/typescript-configs)

## Installation

Install the package.

**With pnpm**
```shell
pnpm add -D @workleap/typescript-configs
```

## Usage

This package provides TypeScript configurations by project type. By providing configurations by project type, the burden of composing TypeScript configurations is shifted from the consumer to the package maintainers. This approach allows for more accurate defaults and assumptions about the target environment. Additionally, it simplifies the process for consumers who only need to configure a single TypeScript config plugin.

The following configurations are available:

### Web App Project

**tsconfig.json used for linting**

To start, create a tsconfig.json in the root of your project.

A typical setup where the application sit in [project root]/src folder is as follow:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@workleap/typescript-configs/web-application/lint.json",
  "compilerOptions": {
    "baseUrl": ".",
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### React or TypeScript Library Project

**tsconfig.json used for linting**

Before you can build your TypeScript code, you need to make sure that there are no compilation errors. This process involves running the TypeScript compiler in a "linting" mode that only checks for errors, without actually compiling the code. By creating a separate tsconfig.json file for checking compilation errors, you can optimize the compilation process for speed and accuracy, without worrying about any other build settings.

Here is an example of a tsconfig.json file extending the Workleap TypeScript configuration for linting:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@workleap/typescript-configs/library/lint.json",
  "compilerOptions": {
    "baseUrl": ".",
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

**tsconfig.json used for building**

Building your TypeScript code involves compiling it down to JavaScript that can be run in a browser or server environment. This process may require different settings than checking compilation errors, such as a different target version or module format. By creating a separate tsconfig.json file for building, you can ensure that your code is compiled optimally for the target environment.

Here is an example of a tsconfig.json file extending the Workleap TypeScript configuration for building:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@workleap/typescript-configs/library/build.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "dist",
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

**tsconfig.json used for building in dev mode**

When you're developing your TypeScript code, you may want to compile it in a way that prioritizes speed over optimization. For example, you might want to use a watch mode that compiles your code quickly and automatically whenever you make changes. By creating a separate tsconfig.json file for building in dev mode, you can optimize the compilation process for speed and convenience, without sacrificing the quality of the resulting code.

Here is an example of a tsconfig.json file extending the Workleap TypeScript configuration for building in dev mode:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@workleap/typescript-configs/library/build-dev.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "dist",
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

## Migrating from existing projects

The configurations exported via this package are designed to be used by ESM projects. If you are migrating an existing project and you don’t want to migrate your project to ESM, you will need to do the following changes to your TypeScript configuration:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@workleap/typescript-configs/web-application/lint.json", // or any other configurations from this package
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
  }
}
```

## Advanced Usage

If the default configuration doesn’t fit your needs, you can view the advanced usage documentation [here](./ADVANCED_USAGE.md).

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
