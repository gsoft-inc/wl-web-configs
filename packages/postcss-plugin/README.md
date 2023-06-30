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
// postcss.config.js

/** @type {import("postcss").Postcss} */
export default {
    plugins: ["@workleap/postcss-plugin"]
};
```

You can override any existing options:

```js
// postcss.config.js

import postcssWorkleapPlugin from "@workleap/postcss-plugin";

/** @type {import("postcss").Postcss} */
export default {
    plugins: [
        postcssWorkleapPlugin({
            presetEnvOptions: {
                stage: 4
            }
        })
    ]
};
```

The provided options will be merged with the default options. Given that a provided option match a default option, it will override the default option. If you prefer to extend the default option, you can import the `DefaultPresetEnvOptions` object and handle the merging code in your configuration file:

```js
// postcss.config.js

import postcssWorkleapPlugin, { DefaultPresetEnvOptions } from "@workleap/postcss-plugin";

/** @type {import("postcss").Postcss} */
export default {
    plugins: [
        postcssWorkleapPlugin({
            presetEnvOptions: {
                ...DefaultPresetEnvOptions,
                stage: 4
            }
        })
    ]
};
```

### defineConfig

Alternativelty, the postcss config can be created from a `defineConfig` function:

```js
// postcss.config.js

import { defineConfig, DefaultPresetEnvOptions } from from "@workleap/postcss-plugin";

export default defineConfig({
    presetEnvOptions: {
        ...DefaultPresetEnvOptions,
        stage: 4
    }
});
```

Or with custom options:

```js
// postcss.config.js

import { defineConfig } from from "@workleap/postcss-plugin";

export default defineConfig();
```

### Webpack integration

To integrate with Webpack, add the [postcss-loader](https://webpack.js.org/loaders/postcss-loader/) to the development and build configuration file:

```js
// webpack.config.js

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
