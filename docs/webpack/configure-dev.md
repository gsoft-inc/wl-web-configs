---
order: 100
label: Configure for dev
meta:
    title: Configure for dev - webpack
---

# Configure for dev

To configure [webpack](https://webpack.js.org/) for a development environment, execute the following steps.

## 1. Install the packages

Open a terminal at the root of the project and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/webpack-configs webpack webpack-cli webpack-dev-server @swc/core @swc/helpers browserslist postcss @svgr/webpack
```
+++ yarn
```bash
yarn add -D @workleap/webpack-configs webpack webpack-cli webpack-dev-server @swc/core @swc/helpers browserslist postcss @svgr/webpack
```
+++ npm
```bash
npm install -D @workleap/webpack-configs webpack webpack-cli webpack-dev-server @swc/core @swc/helpers browserslist postcss @svgr/webpack
```
+++

### React Fast Refresh

Because [Module Federation](https://webpack.js.org/concepts/module-federation/) does not support [React Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin), the default configuration doesn't enable it by default and it's defined as an optional `peerDependency` of this library package.

If you expect to enable React Fast Refresh, also install the following package at the root of the project:

+++ pnpm
```bash
pnpm add -D @pmmmwh/react-refresh-webpack-plugin
```
+++ yarn
```bash
yarn add -D @pmmmwh/react-refresh-webpack-plugin
```
+++ npm
```bash
npm install -D @pmmmwh/react-refresh-webpack-plugin
```
+++

### Monorepo support

For monorepo solutions, **all the projects** containing React code which are referenced by the web application (the one with the webpack configuration) must also install the `@swc/helpers` package as a `devDependency`:

+++ pnpm
```bash
pnpm add -D @swc/helpers
```
+++ yarn
```bash
yarn add -D @swc/helpers
```
+++ npm
```bash
npm install -D @swc/helpers
```
+++

## 2. Configure webpack

First, create a configuration file named `webpack.dev.js` at the root of the project:

``` !#5
web-project
├── src
├──── ...
├── package.json
├── webpack.dev.js
```

Then, open the newly created file and `export` the webpack configuration by using the `defineDevConfig(options)` function provided by this library:

```js webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    swcConfig
});
```

### `swcConfig`

In the previous code sample, the `defineDevConfig(options)` function receive an [SWC](https://swc.rs) configuration object through the mandatory `swcConfig` option. 

Although the [swc-loader](https://swc.rs/docs/usage/swc-loader) defaults to loading the closest `.swcrc` [configuration file](https://swc.rs/docs/configuration/swcrc) when no configuration object is provided, it lacks support for distinct configuration files by environment like webpack does.

Therefore, this library choosed to **delegate** the loading of the SWC configuration **to the consumer** by making the `swcConfig` option **required**. 

## 3. Predefined options

The `defineDevConfig(options)` function can be used as shown in the previous example, however, if you wish to customize the default configuration, the function also accept a few predefined options to help with that 👇

### `entry`

- **Type**: `string`
- **Default**: `./src/index.tsx`

Set webpack [entry option](https://webpack.js.org/configuration/entry-context/#entry).

```js !#7 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    entry: "./src/another-entry.tsx",
    swcConfig
});
```

### `https`

- **Type**: `boolean`
- **Default**: `false`

Set webpack DevServer [https option](https://webpack.js.org/configuration/dev-server/#devserverhttps) and format webpack [publicPath option](https://webpack.js.org/configuration/output/#outputpublicpath) accordingly.

```js !#7 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    https: true,
    swcConfig
});
```

### `host`

- **Type**: `string`
- **Default**: `localhost`

Set webpack DevServer [host option](https://webpack.js.org/configuration/dev-server/#devserverhost) and format webpack [publicPath option](https://webpack.js.org/configuration/output/#outputpublicpath) accordingly.

```js !#7 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    host: "my-custom-host",
    swcConfig
});
```

### `port`

- **Type**: `number`
- **Default**: `8080`

Set webpack DevServer [port option](https://webpack.js.org/configuration/dev-server/#devserverport) and format webpack [publicPath option](https://webpack.js.org/configuration/output/#outputpublicpath) accordingly.

```js !#7 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    port: 1234,
    swcConfig
});
```

### `cache`

- **Type**: `boolean`
- **Default**: `true`

Whether or not webpack [filesystem cache](https://webpack.js.org/configuration/cache/) is enabled.

```js !#7 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    cache: false,
    swcConfig
});
```

### `cacheDirectory`

- **Type**: `string`
- **Default**: `node_modules/.cache/webpack`

```js !#8 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";
import path from "path";

export default defineDevConfig({
    cacheDirectory: path.resolve("./custom-webpack-cache"),
    swcConfig
});
```

Set webpack [cacheDirectory option](https://webpack.js.org/configuration/cache/#cachecachedirectory) when `cache` is enabled.

### `moduleRules`

- **Type**: An array of webpack [moduleRule](https://webpack.js.org/configuration/module/#modulerules) object
- **Default**: `[]`

Append the provided webpack module rules to the configuration.

```js !#7-12 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    moduleRules: [
        {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"]
        }
    ],
    swcConfig
});
```

### `plugins`

- **Type**: An array of webpack [plugin](https://webpack.js.org/configuration/plugins/) object
- **Default**: `[]`

Append the provided webpack plugins to the configuration.

```js !#8-13 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";
import CircularDependencyPlugin from "circular-dependency-plugin";

export default defineDevConfig({
    plugins: [
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/
        });
    ],
    swcConfig
});
```

### `htmlWebpackPluginOptions`

- **Type**: An object literal accepting any `html-webpack-plugin` [option](https://github.com/jantimon/html-webpack-plugin#options)
- **Default**: `{ template: "./public/index.html" }`

Forward the provided object literal to the [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/).

```js !#8-12 webpack.dev.js
// @ts-check

import { defineDevConfig, defineDevHtmlWebpackPluginConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";
import path from "path";

export default defineDevConfig({
    htmlWebpackPluginOptions: defineDevHtmlWebpackPluginConfig({
        template: path.resolve("./my-custom-index.html"),
        minify: true,
        hash: true
    }),
    swcConfig
});
```

### `fastRefresh`

- **Type**: `boolean`
- **Default**: `false`

Disable webpack [HMR](https://webpack.js.org/concepts/hot-module-replacement/) and enable [React Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin).

!!!info
If you enable React Fast Refresh, don't forget to install it's [package dependency](#react-fast-refresh).
!!!

```js !#7 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    fastRefresh: true,
    swcConfig
});
```

### `cssModules`

- **Type**: `boolean`
- **Default**: `false`

Enable `css-loader` [modules](https://webpack.js.org/loaders/css-loader/#modules) feature.

```js !#7 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    cssModules: true,
    swcConfig
});
```

### `postcssConfigFilePath`

- **Type**: `string`
- **Default**: When available, will load the configuration from the closest `postcss.config.ts` file

```js !#8 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";
import path from "path";

export default defineDevConfig({
    postcssConfigFilePath: path.resolve("./my-custom-postcss-config-path.ts"),
    swcConfig
});
```

## 4. Configuration transformers

!!!warning
We do not guarantee that your configuration transformers won't break after an update. It's your responsability to keep them up to date with new releases.
!!!

The [predefined options](#3-predefined-options) are useful to quickly customize the default configuration of this library, but only covers a subset of a [webpack configuration](https://webpack.js.org/configuration/). If you need full control over the configuration, you can provide configuration transformer functions.

```ts
transformer(config: WebpackConfig ) => WebpackConfig
```

A configuration transformer function receive a webpack configuration object and returns a transformed (or not) webpack configuration object.

### `transformers`

- **Type**: `((config: WebpackConfig ) => WebpackConfig)[]`
- **Default**: `[]`

```js !#16 webpack.dev.js
// @ts-check

import { defineDevConfig, WebpackConfigTransformer, WebpackConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

const enableInMemoryCache: WebpackConfigTransformer = (config: WebpackConfig) => {
    config.cache = {
        type: "memory"
    };

    return config;
};

export default defineConfig({
    cache: false,
    transformers: [enableInMemoryCache],
    swcConfig
});
```

Modifying a webpack configuration object can be an arduous task, to help with that, this library offer [utility functions](transformer-utilities.md) for [modules rules](https://webpack.js.org/configuration/module/#modulerules) and [plugins](https://webpack.js.org/configuration/plugins/).

[!ref Transformer utilities](transformer-utilities.md)

## 5. Add a CLI script

To easily start the development server, add the following script to your project `package.json` file:

```json package.json
{
    "dev": "webpack serve --config webpack.dev.js"
}
```

## 6. Environment variables

To deal with environment variables, webpack suggest using the [--env option](https://webpack.js.org/guides/environment-variables/) from it's CLI. While that would work, by using webpack CLI `--env` option, the environment variables would only be available to the webpack configuration file:

```js !#6 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default (env) => {
    if (env.DEBUG === "true") {
        console.log("Configuring webpack in debug mode!");
    }

    return defineDevConfig({
        swcConfig
    });
}
```

### cross-env

We recommend instead to define environment variables with [cross-env](https://github.com/kentcdodds/cross-env). That way, the environment variables will also be available to other [Node.js](https://nodejs.org/en) files:

```json package.json
{
    "dev": "cross-env DEBUG=true webpack serve --config webpack.dev.js"
}
```

```js !#6 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

if (process.env.DEBUG === "true") {
    console.log("Configuring webpack in debug mode!");
}

export default defineDevConfig({
    swcConfig
});
```

Still, having the environment variables available everywhere doesn't allow the bundled application files to access them. The reason is that those environment variables are only available at build time, not at runtime.

To make them accessible at runtime, they must be included at build time into the application bundle files. This is the purpose of the `environmentVariables` option.

### `environmentVariables`

- **Type**: `Record<string, string | undefined>`
- **Default**: `undefined`

```js !#8-10 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig({
    swcConfig,
    environmentVariables: {
        "DEBUG": process.env.DEBUG
    }
});
```

Then, the environment variables are available to any application files:

```tsx !#2 src/app.tsx
export function App() {
    if (process.env.DEBUG === "true") {
        console.log("The app has been bootstrapped in debug!");
    }

    return null;
}
```

## 7. Try it :rocket:

To test your new configuration, open a terminal at the root of the project and execute the [CLI script added earlier](#5-add-a-cli-script). A development server should start without outputting any error in the terminal.


