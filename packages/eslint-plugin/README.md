# `@workleap/eslint-plugin`
Workleap’s ESLint configs.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/eslint-plugin)](https://www.npmjs.com/package/@workleap/eslint-plugin)

## Installation

Install the package.

**With pnpm**
```shell
pnpm add -D @workleap/eslint-plugin
```

**With npm**
```shell
npm i --save-dev @workleap/eslint-plugin
```

**With yarn**
```shell
yarn add --dev @workleap/eslint-plugin
```

## Usage
This package provides ESLint configurations by project type. By providing configurations by project type, the burden of composing ESLint configurations is shifted from the consumer to the package maintainers. This approach allows for more accurate defaults and assumptions about the target environment. Additionally, it simplifies the process for consumers who only need to configure a single ESLint plugin.

The following configurations are available:

### web-application
The `web-application` configuration is suitable for a web application developed in React with TypeScript and tested using the Testing Library and Storybook.

To use this configuration, add the following to your `.eslintrc.json` file:

```json
{
    "extends": "plugin:@workleap/web-application"
}
```

### react-library
The `react-library` configuration is suitable for a React component library developed with TypeScript and tested using the Testing Library and Storybook.

To use this configuration, add the following to your `.eslintrc.json` file:

```json
{
    "extends": "plugin:@workleap/react-library"
}
```

### typescript-library
The `typescript-library` configuration is suitable for a TypeScript library developed without React and tested using Jest.

To use this configuration, add the following to your `.eslintrc.json` file:

```json
{
    "extends": "plugin:@workleap/typescript-library"
}
```


## Advanced Usage

If the default configuration doesn’t fit your needs, you can view the advanced usage documentation [here](./ADVANCED_USAGE.md).

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
