---
order: 90
label: Configure for build
meta:
    title: Configure for build - webpack
---

# Configure for build

To configure [webpack](https://webpack.js.org/) for a production environment, execute the following steps.

## 1. Install the packages

Open a terminal at the root of the project and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/webpack-configs webpack webpack-cli @swc/core @swc/helpers browserslist postcss @svgr/webpack
```
+++ yarn
```bash
yarn add -D @workleap/webpack-configs webpack webpack-cli @swc/core @swc/helpers browserslist postcss @svgr/webpack
```
+++ npm
```bash
npm install -D @workleap/webpack-configs webpack webpack-cli @swc/core @swc/helpers browserslist postcss @svgr/webpack
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

First, create a configuration file named `webpack.build.js` at the root of the project:

``` !#5
web-project
├── src
├──── ...
├── package.json
├── webpack.build.js
```

Then, open the newly created file and `export` the webpack configuration by using the `defineBuildConfig(options)` function:

```js !#6-8 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig({
    swcConfig
});
```

### `swcConfig`

In the previous code sample, the `defineBuildConfig(options)` function receive an [SWC](https://swc.rs) configuration object through the mandatory `swcConfig` option. 

Although the [swc-loader](https://swc.rs/docs/usage/swc-loader) defaults to loading the closest `.swcrc` [configuration file](https://swc.rs/docs/configuration/swcrc) when no configuration object is provided, it lacks support for distinct configuration files by environment like webpack does.

Therefore, `@workleap/webpack-configs` choosed to **delegate** the loading of the SWC configuration **to the consumer** by making the `swcConfig` option **required**. 

## 3. Set predefined options

The `defineBuildConfig(options)` function can be used as shown in the previous example, however, if you wish to customize the default configuration, the function also accept a few predefined options to help with that 👇

### `entry`

- **Type**: `string`
- **Default**: `./src/index.tsx`

Set webpack [entry option](https://webpack.js.org/configuration/entry-context/#entry).

```js !#7 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig({
    entry: "./src/another-entry.tsx",
    swcConfig
});
```

### `outputPath`

- **Type**: `string`
- **Default**: `dist`

Set webpack [output path](https://webpack.js.org/configuration/output/#outputpath).

```js !#8 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";
import path from "path";

export default defineBuildConfig({
    outputPath: path.resolve("./a-custom-folder"),
    swcConfig
});
```

### `publicPath`

- **Type**: `string`
- **Default**: `http://localhost:8080/`

Set webpack [public path](https://webpack.js.org/configuration/output/#outputpublicpath).

```js !#8 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig({
    // The ending "/" is very important.
    publicPath: "https://my-app.netlify.app/",
    swcConfig
});
```

### `moduleRules`

- **Type**: An array of webpack [moduleRule](https://webpack.js.org/configuration/module/#modulerules) objects
- **Default**: `[]`

Append the provided webpack module rules to the configuration.

```js !#7-12 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig({
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

- **Type**: An array of webpack [plugin](https://webpack.js.org/configuration/plugins/) instances
- **Default**: `[]`

Append the provided webpack plugins to the configuration.

```js !#8-13 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";
import CircularDependencyPlugin from "circular-dependency-plugin";

export default defineBuildConfig({
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

```js !#8-12 webpack.build.js
// @ts-check

import { defineBuildConfig, defineBuildHtmlWebpackPluginConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";
import path from "path";

export default defineBuildConfig({
    htmlWebpackPluginOptions: defineBuildHtmlWebpackPluginConfig({
        template: path.resolve("./my-custom-index.html"),
        minify: true,
        hash: true
    }),
    swcConfig
});
```

### `miniCssExtractPluginOptions`

- **Type**: An object literal accepting any `mini-css-extract-plugin` [option](https://github.com/webpack-contrib/mini-css-extract-plugin#plugin-options)
- **Default**: `{ filename: "[name].[fullhash].css" }`

Forward the provided object literal to the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).

```js !#8-10 webpack.build.js
// @ts-check

import { defineBuildConfig, defineMiniCssExtractPluginConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";
import path from "path";

export default defineBuildConfig({
    htmlWebpackPluginOptions: defineMiniCssExtractPluginConfig({
        ignoreOrder: true
    }),
    swcConfig
});
```

### `minify`

- **Type**: `boolean`
- **Default**: `true`

Whether or not to enable [code minification](https://webpack.js.org/configuration/optimization/#optimizationminimize).

```js !#7 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig({
    minify: false,
    swcConfig
});
```

### `cssModules`

- **Type**: `boolean`
- **Default**: `false`

Enable `css-loader` [modules](https://webpack.js.org/loaders/css-loader/#modules) feature.

```js !#7 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig({
    cssModules: true,
    swcConfig
});
```

## 4. Transform configuration

!!!warning
We do not guarantee that your configuration transformers won't break after an update. It's your responsibility to keep them up to date with new releases.
!!!

The [predefined options](#3-set-predefined-options) are useful to quickly customize the [default build configuration](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/webpack-configs/src/build.ts) of `@workleap/webpack-configs`, but only covers a subset of a [webpack configuration](https://webpack.js.org/configuration/). If you need full control over the configuration, you can provide configuration transformer functions. Remember, **no locked in** :heart::v:.

To view the default build configuration of `@workleap/webpack-configs`, have a look at the [build.ts configuration file](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/webpack-configs/src/build.ts) on GitHub.

### `transformers`

- **Type**: `((config: WebpackConfig, context: WebpackConfigTransformerContext) => WebpackConfig)[]`
- **Default**: `[]`

```ts
transformer(config: WebpackConfig, context: WebpackConfigTransformerContext) => WebpackConfig
```

```js !#13 webpack.build.js
// @ts-check

import { defineBuildConfig, WebpackConfigTransformer, WebpackConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

const useContentHashOutputFilename: WebpackConfigTransformer = (config: WebpackConfig) => {
    config.output.filename = "[name].[contenthash].bundle.js";

    return config;
}:

export default defineBuildConfig({
    transformers: [useContentHashOutputFilename],
    swcConfig
});
```

### Execution context

Generic transformers can use the `context` parameter to gather additional information about their execution context, like the `environment` they are operating in:

```ts !#4 transformer.ts
import { WebpackConfigTransformer, WebpackConfigTransformerContext, WebpackConfig } from "@workleap/webpack-configs";

export const transformer: WebpackConfigTransformer = (config: WebpackConfig, context: WebpackConfigTransformerContext) => {
    if (context.environment === "build") {
        config.output.filename = "[name].[contenthash].bundle.js";
    }

    return config;
};
```

- `environment`: `"dev" | "build"`

### Utilities

Modifying a webpack configuration object can be an arduous task, to help with that, `@workleap/webpack-configs` offer [utility functions](transformer-utilities.md) for [modules rules](https://webpack.js.org/configuration/module/#modulerules) and [plugins](https://webpack.js.org/configuration/plugins/).

[!ref Transformer utilities](transformer-utilities.md)

## 5. Add a CLI script

To create the bundle files for production, add the following script to your project `package.json` file:

```json package.json
{
    "build": "webpack --config webpack.build.js"
}
```

## 6. Set environment variables

To deal with environment variables, the [webpack](https://webpack.js.org/) documentation suggests using the [--env option](https://webpack.js.org/guides/environment-variables/) from its CLI. While that would work, by using webpack `--env` CLI option, the environment variables would only be made available to the webpack configuration files (.e.g. `webpack.config.js`) rather than any [Node.js](https://nodejs.org/en) files. Therefore we **do not recommend** using webpack `--env` CLI option.

### cross-env

We recommend instead to define environment variables using [cross-env](https://github.com/kentcdodds/cross-env). With `cross-env`, the environment variables will be made available to any [Node.js](https://nodejs.org/en) files that are executed by the script process (`build` in the example below :point_down:):

```json package.json
{
    "build": "cross-env DEBUG=true webpack --config webpack.build.js"
}
```

```js !#6 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

if (process.env.DEBUG === "true") {
    console.log("Configuring webpack in debug mode!");
}

export default defineBuildConfig({
    swcConfig
});
```

However, there's a catch. When using `cross-env`, the variables will not be available in the application files because `cross-env` only makes them available to files that are executed by the process at **build time** while the application files are executed at **runtime** by a browser.

To make them accessible to the application files, webpack must be aware of those environment variables and **render** them into the **compiled application files**. This is the purpose of the `environmentVariables` option.

### `environmentVariables`

- **Type**: `Record<string, string | undefined>`
- **Default**: `undefined`

First, define the variables with `environmentVariables`:

```js !#8-10 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig({
    swcConfig,
    environmentVariables: {
        "DEBUG": process.env.DEBUG
    }
});
```

Then, use the variables in any application files:

```tsx !#2 src/app.tsx
export function App() {
    if (process.env.DEBUG === "true") {
        console.log("The application has been bootstrapped in debug!");
    }

    return null;
}
```

## 7. Try it :rocket:

To test your new [webpack](https://webpack.js.org/) configuration, open a terminal at the root of the project and execute the [CLI script added earlier](#5-add-a-cli-script). The build process should complete without outputting any error in the terminal and the bundle files should be available in the `/dist` folder (or any other `outputPath` you configured).
