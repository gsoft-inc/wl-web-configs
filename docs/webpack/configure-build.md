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
pnpm add -D @workleap/webpack-configs webpack webpack-cli @swc/core @swc/helpers browserslist postcss
```
+++ yarn
```bash
yarn add -D @workleap/webpack-configs webpack webpack-cli @swc/core @swc/helpers browserslist postcss
```
+++ npm
```bash
npm install -D @workleap/webpack-configs webpack webpack-cli @swc/core @swc/helpers browserslist postcss
```
+++

## 2. Configure webpack

First, create a `public` folder with an `index.html` file at the root of the project:

``` !#2-3
web-project
├── public
├──── index.html
├── src
├──── ...
├── package.json
├── webpack.build.js
```

Then, open the newly created `index.html` file and copy/paste the following content:

```html public/index.html
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

The content of the `public/index.html` file is the default template that will be used by [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/).

Next, create a configuration file named `webpack.build.js` at the root of the project:

``` !#5
web-project
├── src
├──── ...
├── package.json
├── webpack.build.js
```

Then, open the newly created file and `export` the webpack configuration by using the `defineBuildConfig(swcConfig, options)` function:

```js !#6 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig(swcConfig);
```

### `swcConfig`

In the previous code sample, the `defineBuildConfig(swcConfig, options)` function receive an SWC [configuration object](https://swc.rs/docs/configuration/swcrc) through the `swcConfig` parameter. 

Although the [swc-loader](https://swc.rs/docs/usage/swc-loader) defaults to loading the closest `.swcrc` [configuration file](https://swc.rs/docs/configuration/swcrc) when no configuration object is provided, it lacks support for distinct configuration files by environment like webpack does.

Therefore, `@workleap/webpack-configs` choosed to **delegate** the loading of the SWC configuration **to the consumer** by making the `swcConfig` option **required**. 

## 3. Set predefined options

The `defineBuildConfig(swcConfig, options)` function can be used as shown in the previous example, however, if you wish to customize the default configuration, the function also accept a few predefined options to help with that 👇

### `entry`

- **Type**: `string`
- **Default**: `./src/index.tsx`

Set webpack [entry option](https://webpack.js.org/configuration/entry-context/#entry).

```js !#7 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig(swcConfig, {
    entry: "./src/another-entry.tsx"
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

export default defineBuildConfig(swcConfig, {
    outputPath: path.resolve("./a-custom-folder")
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

export default defineBuildConfig(swcConfig, {
    // The ending "/" is very important.
    publicPath: "https://my-app.netlify.app/"
});
```

### `cache`

- **Type**: `boolean`
- **Default**: `true`

Whether or not webpack [filesystem cache](https://webpack.js.org/configuration/cache/) is enabled.

```js !#7 webpack.build.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig(swcConfig, {
    cache: false
});
```

### `cacheDirectory`

- **Type**: `string`
- **Default**: `node_modules/.cache/webpack`

```js !#8 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";
import path from "path";

export default defineBuildConfig(swcConfig, {
    cacheDirectory: path.resolve("./custom-webpack-cache")
});
```

Set webpack [cacheDirectory option](https://webpack.js.org/configuration/cache/#cachecachedirectory) when `cache` is enabled.

### `moduleRules`

- **Type**: An array of webpack [moduleRule](https://webpack.js.org/configuration/module/#modulerules) objects
- **Default**: `[]`

Append the provided webpack module rules to the configuration.

```js !#7-12 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig(swcConfig, {
    moduleRules: [
        {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"]
        }
    ]
});
```

### `plugins`

- **Type**: An array of webpack [plugin instances](https://webpack.js.org/configuration/plugins/)
- **Default**: `[]`

Append the provided webpack plugins to the configuration.

```js !#8-13 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";
import CircularDependencyPlugin from "circular-dependency-plugin";

export default defineBuildConfig(swcConfig, {
    plugins: [
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/
        });
    ]
});
```

### `htmlWebpackPlugin`

- **Type**: `boolean` or an object literal accepting any `html-webpack-plugin` [option](https://github.com/jantimon/html-webpack-plugin#options)
- **Default**: `{ template: "./public/index.html" }`

To remove the default instance of [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/), set the property to `false`.

```js !#7 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineBuildConfig(swcConfig, {
    htmlWebpackPlugin: false
});
```

To extend/replace the default `html-webpack-plugin` configuration, use the `defineBuildHtmlWebpackPluginConfig(options)` function.

```js !#8-11 webpack.build.js
// @ts-check

import { defineBuildConfig, defineBuildHtmlWebpackPluginConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";
import path from "path";

export default defineBuildConfig(swcConfig, {
    htmlWebpackPlugin: defineBuildHtmlWebpackPluginConfig({
        template: path.resolve("./my-custom-index.html"),
        minify: true
    })
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

export default defineBuildConfig(swcConfig, {
    htmlWebpackPluginOptions: defineMiniCssExtractPluginConfig({
        ignoreOrder: true
    })
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

export default defineBuildConfig(swcConfig, {
    minify: false
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

export default defineBuildConfig(swcConfig, {
    cssModules: true
});
```

### `verbose`

- **Type**: `boolean`
- **Default**: `false`

Start the webpack process with verbose logging turned on.

```js !#7 webpack.dev.js
// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig(swcConfig, {
    verbose: true
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

```js !#6-10,13 webpack.build.js
// @ts-check

import { defineBuildConfig, WebpackConfigTransformer, WebpackConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

const useContentHashOutputFilename: WebpackConfigTransformer = (config: WebpackConfig) => {
    config.output.filename = "[name].[contenthash].bundle.js";

    return config;
}:

export default defineBuildConfig(swcConfig, {
    transformers: [useContentHashOutputFilename]
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
- `verbose`: `boolean`

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

To deal with environment variables, the webpack documentation suggests using the [--env option](https://webpack.js.org/guides/environment-variables/) from its CLI. While that would work, by using webpack `--env` CLI option, the environment variables would only be made available to the webpack configuration files (.e.g. `webpack.build.js`) rather than any Node.js files. Therefore we **do not recommend** using webpack `--env` CLI option.

### cross-env

We recommend instead to define environment variables using [cross-env](https://github.com/kentcdodds/cross-env). With `cross-env`, the environment variables will be made available to any Node.js files that are executed by the script process (`dev` in the example below :point_down:):

```json package.json
{
    "build": "cross-env DEBUG=true webpack --config webpack.build.js"
}
```

```js !#6 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

if (process.env.DEBUG) {
    console.log("Configuring webpack in debug mode!");
}

export default defineBuildConfig(swcConfig);
```

However, there's a catch. When using `cross-env`, the variables will not be available in the application files because `cross-env` only makes them available to files that are executed by the process at **build time** while the application files are executed at **runtime** by a browser.

To make them accessible to the application files, webpack must be aware of those environment variables and **render** them into the **compiled application files**. This is the purpose of the `environmentVariables` option.

### `environmentVariables`

- **Type**: `Record<string, unknown>`
- **Default**: `{}`

First, define the variables with `environmentVariables`:

```js !#7-9 webpack.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig(swcConfig, {
    environmentVariables: {
        "DEBUG": process.env.DEBUG === "true"
    }
});
```

Then, use the variables in any application files:

```tsx !#2 src/app.tsx
export function App() {
    if (process.env.DEBUG) {
        console.log("The application has been bootstrapped in debug!");
    }

    return null;
}
```

!!!
The `=== "true"` part of `"DEBUG": process.env.DEBUG === "true"` is very important, otherwise the environment variable value would be `"true"` instead of `true`.
!!!

## 7. Try it :rocket:

To test your new webpack configuration, open a terminal at the root of the project and execute the [CLI script added earlier](#5-add-a-cli-script). The build process should complete without outputting any error in the terminal and the bundle files should be available in the `/dist` folder (or any other `outputPath` you configured).
