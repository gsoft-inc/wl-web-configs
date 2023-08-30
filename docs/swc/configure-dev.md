---
order: 100
label: Configure for dev
meta:
    title: Configure for dev - SWC
---

# Configure for dev

To configure [SWC](https://swc.rs/) for a development environment, execute the following steps.

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

First, create a configuration file named `swc.dev.js` at the root of the project:

``` !#5
web-project
├── src
├──── ...
├── package.json
├── swc.dev.js
```

Then, open the newly created file and export the [SWC](https://swc.rs/) configuration by using the `defineDevConfig(options)` function:

```js !#5-7 swc.dev.js
// @ts-check

import { browserslistToSwc, defineDevConfig } from "@workleap/swc-configs";

export default defineDevConfig({
    targets: browserslistToSwc()
});
```

### `targets`

In the previous code sample, the `defineDevConfig(options)` function receives a list of **minimal browser versions to support** through the mandatory `targets` option.

The expected behavior for the supported browsers would be for [SWC](https://swc.rs/) to automatically load the minimal browser versions from the closest `.browserslistrc` [configuration file](https://github.com/browserslist/browserslist#browserslistrc). However, there is currently an [issue](https://github.com/swc-project/swc/issues/3365) preventing SWC from doing so when the configuration file include a query referencing an external [Browserslist](https://browsersl.ist/) configuration:

```.browserslistrc
extends @workleap/browserslist-config
```

Therefore, `@workleap/swc-configs` has chosen to **delegate** the loading of the Browserslist configuration **to the consumer** by making the `targets` option required.

### `browserslistToSwc`

To help consumers provide SWC [targets](https://swc.rs/docs/configuration/supported-browsers#targets) from a [Browserslist](https://browsersl.ist/) configuration, `@workleap/swc-configs` offers the `browserslistToSwc(options)` utility function.

This function can either transform an array of Browserslist [queries](https://github.com/browserslist/browserslist#queries) to SWC targets:

```js !#6 swc.dev.js
// @ts-check

import { browserslistToSwc, defineDevConfig } from "@workleap/swc-configs";

export default defineDevConfig({
    targets: browserslistToSwc({ queries: ["extends @workleap/browserslist-config"] })
});
```

Or load the closest `.browserslistrc` configuration file and convert the queries into SWC targets:

```.browserslistrc
extends @workleap/browserslist-config
```

```js !#6 swc.dev.js
// @ts-check

import { browserslistToSwc, defineDevConfig } from "@workleap/swc-configs";

export default defineDevConfig({
    targets: browserslistToSwc()
});
```

The `browserslistToSwc(options)` utility function accepts any option supported by Browserslist [JS API](https://github.com/browserslist/browserslist#js-api) in addition to a `queries` option:

- `queries`: `string | string[]`

## 3. Set predefined options

The `defineDevConfig(options)` function can be used as shown in the previous example, however, if you wish to customize the default configuration, the function also accept a few predefined options to help with that 👇

### `fastRefresh`

- **Type**: `boolean`
- **Default**: `false`

Whether or not to enable [Fast Refresh](https://www.npmjs.com/package/react-refresh).

```js !#6 swc.dev.js
// @ts-check

import { browserslistToSwc, defineDevConfig } from "@workleap/swc-configs";

export default defineDevConfig({
    fastRefresh: true,
    targets: browserslistToSwc()
});
```

### `parser`

- **Type**: `"ecmascript" | "typescript"`
- **Default**: `"typescript"`

Whether SWC should expect to parse JavaScript or [TypeScript](https://www.typescriptlang.org/) code.

```js !#6 swc.dev.js
// @ts-check

import { browserslistToSwc, defineDevConfig } from "@workleap/swc-configs";

export default defineDevConfig({
    parser: "ecmascript",
    targets: browserslistToSwc()
});
```

## 4. Transform configuration

!!!warning
We do not guarantee that your configuration transformers won't break after an update. It's your responsibility to keep them up to date with new releases.
!!!

The [predefined options](#3-set-predefined-options) are useful to quickly customize the [default development configuration](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/swc-configs/src/dev.ts) of `@workleap/swc-configs`, but only covers a subset of an [SWC configuration](https://swc.rs/docs/configuration/swcrc). If you need full control over the configuration, you can provide configuration transformer functions. Remember, **no locked in** :heart::v:.

To view the default development configuration of `@workleap/swc-configs`, have a look at the [dev.ts configuration file](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/swc-configs/src/dev.ts) on GitHub.

### `transformers`

- **Type**: `((config: SwcConfig, context: SwcConfigTransformerContext) => SwcConfig)[]`
- **Default**: `[]`

```ts
transformer(config: SwcConfig, context: SwcConfigTransformerContext) => SwcConfig
```

```js !#12 swc.dev.js
// @ts-check

import { browserslistToSwc, defineDevConfig } from "@workleap/swc-configs";

function disableReactBuiltins(config) {
    config.jsc.transform.react.useBuiltins = false;

    return config;
}

export default defineDevConfig({
    transformers: [disableReactBuiltins],
    targets: browserslistToSwc()
});
```

### Execution context

Generic transformers can use the `context` parameter to gather additional information about their execution context, like the `environment` they are operating in:

```ts !#4 transformer.ts
import { SwcConfigTransformer, SwcConfigTransformerContext, SwcConfig } from "@workleap/swc-configs";

export const transformer: SwcConfigTransformer = (config: SwcConfig, context: SwcConfigTransformerContext) => {
    if (context.environment === "dev") {
        config.jsc.transform.react.useBuiltins = false;
    }

    return config;
};
```

- `environment`: `"dev" | "build" | "jest"`

## 5. Configure webpack

To integrate with [webpack](https://webpack.js.org/), update your configuration file to include an [swc-loader](https://swc.rs/docs/usage/swc-loader):

```js !#10 webpack.config.js
// @ts-check

import { swcConfig } from "./swc.dev.js";

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

If you integrated SWC with webpack, make sure to import the previously created file in one of your webpack [entry points](https://webpack.js.org/concepts/entry-points/), then start the webpack development server. The development server should start without outputting any error to the console.

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

The generated `say.js` file should include the following transpiled code:

```js say.js
export function say(value) {
    console.log(value);
}
```