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
pnpm add -D @workleap/webpack-configs webpack webpack-dev-server @swc/core @swc/helpers browserslist postcss @svgr/webpack
```
+++ yarn
```bash
yarn add -D @workleap/webpack-configs webpack webpack-dev-server @swc/core @swc/helpers browserslist postcss @svgr/webpack
```
+++ npm
```bash
npm install -D @workleap/webpack-configs webpack webpack-dev-server @swc/core @swc/helpers browserslist postcss @svgr/webpack
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

### swcConfig

In the previous code sample, the `defineDevConfig(options)` function receive an [SWC](https://swc.rs) configuration object through the required `swcConfig` option. 

While the [swc-loader](https://swc.rs/docs/usage/swc-loader) will load by default the closest [.swcrc](https://swc.rs/docs/configuration/swcrc) configuration file if no configuration object is provided, it doesn't support having distinct configuration file by environment like webpack does.

Therefore, this library opted to **delegate** the loading of the SWC configuration **to the consumer** by making the `swcConfig` option **required**. 

### Predefined options

- List all options

### Environment variables

### Transformers

- A quick examples of how transformer works and a link to the transformer utility pages

## 3. Try it :rocket:
