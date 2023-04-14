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
    extends: "@workleap/stylelint-config"
};
```

## Prettier

Since Stylelint v15.0.0, Stylelint deprecated the Stylistic rules from their plugin. They now suggest using Prettier to format your CSS files.

With that in mind, the `@workleap/stylelint-config` includes the stylelint-prettier plugin. Using this plugin, prettier changes are exposed as stylelint rule violations.

You should therefore add either a `.editorconfig` or `.prettierrc` file at the root of your project. These rule will be run against your CSS files and will be autofixed when you run stylelint --fix **/*.css.

You need to make sure that you create a `.prettierignore` file to ignore your everything but your CSS files at the root of your project. This file should contain the following content:

```
*
!**/*.css
```

Otherwise, Prettier will format your js/ts files and you will end up with a conflict between Prettier and ESlint.

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
