# `@workleap/stylelint-config`
Shareable [stylelint](https://stylelint.io/) configuration for Workleap.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/stylelint-config)](https://www.npmjs.com/package/@workleap/stylelint-config)

## Installation

Install the package.

**With pnpm**
```shell
pnpm add -D @workleap/stylelint-config
```

**With npm**
```shell
npm i --save-dev @workleap/stylelint-config
```

**With yarn**
```shell
yarn add --dev @workleap/stylelint-config
```

## Usage

Create a `stylelint.config.js` file at the root of your project with the following content:
```js
/** @type {import('stylelint').Config} */
module.exports = {
    extends: "@workleap/stylelint-config",
    defaultSeverity: "warning",
};
```

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
