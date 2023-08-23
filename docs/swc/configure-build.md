---
order: 90
label: Configure for build
meta:
    title: Configure for build - SWC
---

# Configure for build

To configure [SWC](https://swc.rs/) for a production environment, execute the following steps.

## 1. Install the packages

Open a terminal at the root of the project and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/swc-configs @swc/core @swc/helpers
```
+++ yarn
```bash
yarn add -D @workleap/swc-configs @swc/core @swc/helpers
```
+++ npm
```bash
npm install -D @workleap/swc-configs @swc/core @swc/helpers
```
+++

## 2. Configure SWC

First, create a configuration file named `swc.build.js` at the root of the project:

``` !#5
web-project
├── src
├──── ...
├── package.json
├── swc.build.js
```

Then, open the newly created file and export the [SWC](https://swc.rs/) configuration by using the `defineBuildConfig(options)` function:

```js !#6-8 swc.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/swc-configs";
import browsers from "@workleap/browserslist-config";

export default defineBuildConfig({
    browsers
});
```

### `browsers`

In the previous code sample, the `defineBuildConfig(options)` function receives a [Browserslist](https://browsersl.ist/) configuration object through the mandatory `browsers` option.

The expected behavior would be for [SWC](https://swc.rs/) to load the browsers configuration from the closest `.browserslistrc` [configuration file](https://github.com/browserslist/browserslist#browserslistrc), but there is currently an [issue](https://github.com/swc-project/swc/issues/3365) preventing SWC from doing so when the `.browserslistrc` configuration is extended by a shared configuration from a package.

Therefore, `@workleap/swc-configs` choosed to **delegate** the loading of the Browserslist configuration **to the consumer** by making the `browsers` option required.

## 3. Set predefined options

### `parser`

- **Type**: `"ecmascript" | "typescript"`
- **Default**: `"typescript"`

Whether SWC should expect to parse JavaScript or [TypeScript](https://www.typescriptlang.org/) code.

```js !#7 swc.build.js
// @ts-check

import { defineBuildConfig } from "@workleap/swc-configs";
import browsers from "@workleap/browserslist-config";

export default defineBuildConfig({
    parser: "ecmascript",
    browsers
});
```

## 4. Transform configuration

!!!warning
We do not guarantee that your configuration transformers won't break after an update. It's your responsibility to keep them up to date with new releases.
!!!

The [predefined options](#3-set-predefined-options) are useful to quickly customize the [default build configuration](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/swc-configs/src/build.ts) of `@workleap/swc-configs`, but only covers a subset of an [SWC configuration](https://swc.rs/docs/configuration/swcrc). If you need full control over the configuration, you can provide configuration transformer functions. Remember, **no locked in** :heart::v:.

To view the default development configuration of `@workleap/swc-configs`, have a look at the [build.ts configuration file](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/swc-configs/src/build.ts) on Github.

### `transformers`

- **Type**: `((config: SwcConfig, context: SwcConfigTransformerContext) => SwcConfig)[]`
- **Default**: `[]`

```ts
transformer(config: SwcConfig, context: SwcConfigTransformerContext) => SwcConfig
```

```js !#13 swc.build.js
// @ts-check

import { defineBuildConfig, SwcConfigTransformer, SwcConfig } from "@workleap/swc-configs";
import browsers from "@workleap/browserslist-config";

const mangleMinifiedCode: SwcConfigTransformer = (config: SwcConfig) => {
    config.jsc.minify.mangle = true;

    return config;
};

export default defineBuildConfig({
    transformers: [mangleMinifiedCode],
    browsers
});
```

### Execution context

Generic transformers can use the `context` parameter to gather additional information about their execution context, like the `environment` they are operating in:

```ts !#4 transformer.ts
import { SwcConfigTransformer, SwcConfigTransformerContext, SwcConfig } from "@workleap/swc-configs";

export const transformer: SwcConfigTransformer = (config: SwcConfig, context: SwcConfigTransformerContext) => {
    if (context.environment === "build") {
        config.jsc.minify.mangle = true;
    }

    return config;
};
```

- `environment`: `"dev" | "build" | "jest"`

## 5. Configure webpack

To integrate with [webpack](https://webpack.js.org/), update your configuration file to include an [swc-loader](https://swc.rs/docs/usage/swc-loader):

```js !#10 webpack.config.js
// @ts-check

import { swcConfig } from "./swc.build.js";

export default {
    ...
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)/i,
                exclude: /node_modules/,
                use: {
                    loader: "swc-loader",
                    options: swcConfig
                }
            }
        ]
    }
}
```

## 6. Try it :rocket:

To test your new [SWC](https://swc.rs/) configuration, create a Typescript file with the following code:

```ts say.ts
export function say(string: value) {
    console.log(value);
}
```

If you integrated SWC with webpack, make sure to import the previously created file in one of your webpack [entry points](https://webpack.js.org/concepts/entry-points/), then execute your webpack build and find the transpiled code in the generated bundle files of your `dist` folder.

Otherwise, open a terminal at the root of your project and install [@swc/cli](https://swc.rs/docs/usage/cli):

+++ pnpm
```bash
pnpm add -D @swc/cli @swc/core
```
+++ yarn
```bash
yarn add -D @swc/cli @swc/core
```
+++ npm
```bash
npm install -D @swc/cli @swc/core
```
+++

Then, process the file with `@swc/cli` by executing the following command in the same terminal:

```bash
npx swc ./say.ts -o say.js --config-file swc.build.js
```

Whether you processed the file with webpack or `@swc/cli`, the transpiled code should be:

```js say.js
export function say(value) {
    console.log(value);
}
```
