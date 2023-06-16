# @workleap/swc-configs

## Installation

Install the following packages:

**With pnpm**

```shell
pnpm add -D @workleap/swc-configs @swc/core @swc/helpers
```

**With yarn**

```shell
yarn add -D @workleap/swc-configs @swc/core @swc/helpers
```

**With npm**

```shell
npm install -D @workleap/swc-configs @swc/core @swc/helpers
```

## Usage

### Dev

Create a `swc.dev.js` file at the root of your project:

```
root
|---/src
|---swc.dev.js
|---webpack.dev.js
```

Then, in the newly created file, import and execute the `defineDevConfig` function to export a valid SWC configuration object:

```ts
// swc.dev.js

import { defineDevConfig } from "@workleap/swc-configs";

export const swcConfig = defineDevConfig();
```

Finally, install the Webpack [swc-loader](https://swc.rs/docs/usage/swc-loader) package and add the following `rule` to your Webpack configuration:

```js
// webpack.dev.js

// @ts-check

import { swcConfig } from "./swc.dev.js";

{
    test: /\.(ts|tsx)/i,
    exclude: /node_modules/,
    use: {
        loader: "swc-loader",
        options: swcConfig
    }
}
```

> The rule declaration may vary depending of your project configuration. For example, you might want to change the `test` property to target ECMAScript files instead: `test: /\.(js|jsx)/i`.

#### Customizing the configuration

If you wish to customize the default development configuration, there are a few possibilities.

##### Use predefined options

The `defineDevConfig` function accepts predefined options to customize the default SWC configuration without having to learn any [SWC specific configuration syntax](https://swc.rs/docs/configuration/swcrc) or mangling with complicated configuration properties.

To enable [React fast refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin), use the `fastRefresh` option:

```ts
// swc.dev.js

import { defineDevConfig } from "@workleap/swc-configs";

return defineDevConfig({
    fastRefresh: true
});
```

> Don't forget to install [ReactRefreshWebpackPlugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) and update your Webpack configuration accordingly.

The development configuration expect to parse TypeScript code. If your project is coded with regular JavaScript (ECMAScript), use the `parser` option to configure SWC to parse regular JavaScript code rather than TypeScript code:

```ts
// swc.dev.js

import { defineDevConfig } from "@workleap/swc-configs";

return defineDevConfig({
    parser: "ecmascript"
});
```

##### Manually overriding SWC configuration

Refer to the [configuration override](#configuration-override) section.

### Build

Create a `swc.build.js` file at the root of your project:

```
root
|---/src
|---swc.build.js
|---webpack.build.js
```

Then, in the newly created file, import and execute the `defineBuildConfig` function to export a valid SWC configuration object:

```ts
// swc.build.js

import { defineBuildConfig } from "@workleap/swc-configs";

export const swcConfig = defineBuildConfig();
```

Finally, install the Webpack [swc-loader](https://swc.rs/docs/usage/swc-loader) package and add the following `rule` to your Webpack configuration:

```js
// webpack.build.js

// @ts-check

import { swcConfig } from "./swc.build.js";

{
    test: /\.(ts|tsx)/i,
    exclude: /node_modules/,
    use: {
        loader: "swc-loader",
        options: swcConfig
    }
}
```

#### Customizing the configuration

If you wish to customize the default build configuration, there are a few possibilities.

##### Use predefined options

The `defineBuildConfig` function accepts predefined options to customize the default SWC configuration without having to learn any [SWC specific configuration syntax](https://swc.rs/docs/configuration/swcrc) or mangling with complicated configuration properties.

The build configuration expect to parse TypeScript code. If your project is coded with regular JavaScript (ECMAScript), use the `parser` option to configure SWC to parse regular JavaScript code rather than TypeScript code:

```ts
// swc.build.js

import { defineBuildConfig } from "@workleap/swc-configs";

return defineBuildConfig({
    parser: "ecmascript"
});
```

##### Manually overriding SWC configuration

Refer to the [configuration override](#configuration-override) section.

### Jest

#### Installation

First install the following package:

**With pnpm**

```shell
pnpm add -D @swc/jest
```

**With yarn**

```shell
yarn add -D @swc/jest
```

**With npm**

```shell
yarn add -D @swc/jest
```

#### Usage

Create a `swc.jest.ts` file at the root of your project:

```
root
|---/src
|---swc.jest.ts
|---jest.config.ts
```

Then, in the newly created file, import and execute the `defineJestConfig` function to export a valid SWC configuration object:

```ts
// swc.jest.ts

import { defineJestConfig } from "@workleap/swc-configs";

export const swcConfig = defineJestConfig();
```

Finally, add the following Jest [code transform](https://jestjs.io/docs/code-transformation) to your `jest.config.ts` file:

```js
// jest.config.ts

import { swcCnfig } from "./swc.jest.ts";

const config = {
    transform: {
        "^.+\\.(ts|tsx)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    }
};
```

> The transform declaration may vary depending of your project configuration. For example, you might want to change the file extensions to target ECMAScript files instead: `^.+\\.(js|jsx)$`.

#### Customizing the configuration

If you wish to customize the default Jest configuration, there are a few possibilities.

##### Use predefined options

The `defineJestConfig` function accepts predefined options to customize the default SWC configuration without having to learn any [SWC specific configuration syntax](https://swc.rs/docs/configuration/swcrc) or mangling with complicated configuration properties.

The default Jest configuration doesn't include React. To include React, use the `react` option:

```ts
// swc.jest.ts

import { defineJestConfig } from "@workleap/swc-configs";

return defineJestConfig({
    react: true
});
```

The Jest configuration expect to parse TypeScript code. If your project is coded with regular JavaScript (ECMAScript), use the `parser` option to configure SWC to parse regular JavaScript code rather than TypeScript code:

```ts
// swc.jest.ts

import { defineJestConfig } from "@workleap/swc-configs";

return defineJestConfig({
    parser: "ecmascript"
});
```

##### Manually overriding SWC configuration

Refer to the [configuration override](#configuration-override) section.

### Configuration override

> This documentation section will use the [Dev configuration](#dev) `defineDevConfig` function and `DefaultDevConfig` object to showcase examples but keep in mind that it also available for the [Build](#build) and [Jest](#jest) configurations.

All "define" functions accepts a `configOverride` property. This property allow the consumer to override any property of the default SWC configuration. The `configOverride` supports 2 syntaxes, a [custom object](#custom-object) and a [function](#function).

It's important to note that with both syntaxes, the provided configuration **will not** be merged with the default configuration, it will override any matching properties of the default configuration.

#### Custom object

The easiest way to override manually the SWC config is with the object syntax:

```ts
// swc.dev.ts

import { defineDevConfig } from "@workleap/swc-configs";

return defineDevConfig({
    configOverride: {
        jsc: {
            parser: {
                dynamicImport: true
            }
        }
    }
});
```

In the previous example, the whole `jsx` section of the default configuration would be overrided for:

```js
jsc: {
    parser: {
        dynamicImport: true
    }
}
```

While in some cases it's fine, often a consumer would prefer to extend the default configuration rather than overriding it's properties. To extend the configuration, use the `DefaultDevConfig` object to merge new properties with the default configuration properties:

```ts
// swc.dev.ts

import { defineDevConfig, DefaultDevConfig } from "@workleap/swc-configs";
import merge from "deepmerge";

return defineDevConfig({
    configOverride: merge.all(DefaultDevConfig, {
        jsc: {
            parser: {
                dynamicImport: true
            }
        }
    })
});
```

##### Function

The `configOverride` property also accept a function. While there are a wide range of additional use cases that can be solved with a function, the main purpose of using a function here is to allow mixing **predefined options** with a **custom configuration object**.

Take the following example:

```ts
// swc.dev.ts

import { defineDevConfig, DefaultDevConfig } from "@workleap/swc-configs";
import merge from "deepmerge";

return defineDevConfig({
    fastRefresh: true,
    configOverride: merge.all(DefaultDevConfig, {
        jsc: {
            parser: {
                dynamicImport: true
            }
        }
    })
});
```

In this example, the consumer wish to enable [React fast refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin) and ESM dynamic imports. That's a good idea to use the `fastRefresh` predefined options to enable fast refresh. However, since there are no predefined option to enable ESM dynamic imports, a custom configuration object must be provided to extend the `jsc.parser` section with the `dynamicImport` property.

Given that the consumer extends the configuration rather than overriding it, one could expect that the React fast refresh configuration will be included in the final configuration.

Wrong, the React fast refresh configuration won't be included because it's not part of the `DefaultDevConfig` object that the consumer is extending.

To extend the default development configuration and also use predefined options, you must provide a function rather than an object:

```ts
// swc.dev.ts

import { defineDevConfig, DefaultDevConfig } from "@workleap/swc-configs";
import merge from "deepmerge";

return defineDevConfig({
    fastRefresh: true,
    configOverride: (config) => {
        // The "config" argument is the DefaultDevConfig object including the fast refresh configuration.
        return merge.all(config, {
            jsc: {
                parser: {
                    dynamicImport: true
                }
            }
        });
    }
});
```

Using a function allow the consumer to receive as argument a configuration object derived from the `DefaultDevConfig` object, including any additional properties added with predefined options.

## Maintainers notes

### CJS support

To support CJS projects, the package is build for ESM and CJS formats. To support CJS, `type: "module"` has been temporary removed from the `package.json` file.

Once all our projects use ESM, CJS support can be removed.

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
