# @workleap/postcss-plugin

All of Workleap’s default PostCSS plugins wrapped up in a single, easy-to-use plugin.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/postcss-plugin)](https://www.npmjs.com/package/@workleap/postcss-plugin)

## Installation

Install the following packages:

**With pnpm**

```shell
pnpm add -D @workleap/postcss-plugin postcss
```

**With yarn**

```shell
yarn add -D @workleap/postcss-plugin postcss
```

**With npm**

```shell
npm install -D @workleap/postcss-plugin postcss
```

## Features

This plugin wraps around the following PostCSS transformations:

- [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env)

## Usage

### Configuration

Create a `postcss.config.js` file at the root of your project with the following content:
```js
/** @type {import("postcss").Postcss} */
module.exports = {
    plugins: ["@workleap/postcss-plugin"]
};
```

### Webpack integration

To integrate with Webpack, add the [postcss-loader](https://webpack.js.org/loaders/postcss-loader/) to the development and build configuration file:

```js
{
    module: {
        rules: [
            {
                test: /\.css/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    }
}
```

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
