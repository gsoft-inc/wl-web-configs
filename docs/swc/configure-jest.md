---
order: 80
label: Configure for Jest
meta:
    title: Configure for Jest - SWC
---

# Configure for Jest

To configure [SWC](https://swc.rs/) for a [Jest](https://jestjs.io/) environment, execute the following steps.

## 1. Install the packages

Open a terminal at the root of the project and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/swc-configs @swc/jest @swc/core @swc/helpers
```
+++ yarn
```bash
yarn add -D @workleap/swc-configs @swc/jest @swc/core @swc/helpers
```
+++ npm
```bash
npm install -D @workleap/swc-configs @swc/jest @swc/core @swc/helpers
```
+++

## 2. Configure SWC

!!!info
To use [TypeScript](https://www.typescriptlang.org/) files, make sure that you configure properly [ts-jest](https://kulshekhar.github.io/ts-jest/) in your solution.
!!!

First, create a configuration file named `swc.jest.ts` at the root of the project:

``` !#5
web-project
├── src
├──── ...
├── package.json
├── swc.jest.ts
├── jest.config.ts
```

Then, open the newly created file and export the SWC configuration by using the `defineJestConfig(options)` function provided by this library:

```js !#6-8 swc.jest.ts
import { defineJestConfig } from "@workleap/swc-configs";

export default defineJestConfig();
```

## 3. Set predefined options

The `defineJestConfig(options)` function can be used as shown in the previous example, however, if you wish to customize the default configuration, the function also accept a few predefined options to help with that 👇

### `react`

- **Type**: `boolean`
- **Default**: `false`

Whether or not to transform [React](https://react.dev/) code.

```js !#4 swc.jest.ts
import { defineJestConfig } from "@workleap/swc-configs";

export default defineJestConfig({
    react: true
});
```

### `parser`

- **Type**: `"ecmascript" | "typescript"`
- **Default**: `"typescript"`

Whether SWC should expect to parse JavaScript or [TypeScript](https://www.typescriptlang.org/) code.

```js !#4 swc.jest.ts
import { defineJestConfig } from "@workleap/swc-configs";

export default defineJestConfig({
    parser: "ecmascript"
});
```

## 4. Transform configuration

!!!warning
We do not guarantee that your configuration transformers won't break after an update. It's your responsability to keep them up to date with new releases.
!!!

The [predefined options](#3-set-predefined-options) are useful to quickly customize the [default development configuration](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/swc-configs/src/jest.ts) of this library, but only covers a subset of an [SWC configuration](https://swc.rs/docs/configuration/swcrc). If you need full control over the configuration, you can provide configuration transformer functions, **no locked in** :heart::v:.

A configuration transformer function receive an SWC configuration object and returns a transformed (or not) SWC configuration object:

```ts
transformer(config: SwcConfig, context: SwcConfigTransformerContext) => SwcConfig
```

To view the default development configuration, have a look at the [configuration file](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/swc-configs/src/jest.ts) on Github.

### `transformers`

- **Type**: `((config: SwcConfig, context: SwcConfigTransformerContext) => SwcConfig)[]`
- **Default**: `[]`

```js !#10 swc.jest.ts
import { defineJestConfig, SwcConfigTransformer, SwcConfig } from "@workleap/swc-configs";

const useCommonJsModules: SwcConfigTransformer = (config: SwcConfig) => {
    config.module.type = "commonjs";

    return config;
};

export default defineJestConfig({
    transformers: [useCommonJsModules]
});
```

## 5. Configure Jest

To configure [Jest](https://jestjs.io/), open the project `jest.config.ts` file and add the following code:

```ts
import { swcConfig } from "./swc.jest.ts";

const config = {
    transform: {
        "^.+\\.(ts|tsx)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    }
};
```

## 6. Try it :rocket:

To test your new SWC configuration, create a Jest test in Typescript:

```ts append-world.test.ts
export function appendWorld(string: value) {
    console.log(`${string} world!`);
}

test("should append \"world\"", () => {
    expect(appendWorld("Hello")).toBe("Hello world!");
}
```

Open a terminal and run Jest directly from the CLI:

+++ pnpm
```bash
pnpm jest
```
+++ yarn
```bash
yarn jest
```
+++ npm
```bash
npm run jest
```
+++

The test should succeed without any error outputted to the console.
