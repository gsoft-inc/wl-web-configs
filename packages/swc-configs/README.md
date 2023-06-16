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

Create a `swc.dev.ts` file at the root of your project:

```
root
|---/src
|---swc.dev.ts
```

Then, in the newly created file, import and execute the `defineDevConfig` function to return a valid SWC configuration object:

```ts
// swc.dev.ts

import { defineDevConfig } from "@workleap/swc-configs";

return defineDevConfig();
```

Finally, install the Webpack [swc-loader](https://swc.rs/docs/usage/swc-loader) package and add the following `rule` to your Webpack configuration:

```js
{
    test: /\.(ts|tsx)/i,
    exclude: /node_modules/,
    use: {
        loader: "swc-loader"
    }
}
```

> The rule declaration may vary depending of your project configuration. For example, you might change the `test` property to target ECMAScript files instead: `test: /\.(js|jsx)/i`.

#### Customize the configuration

If you wish to customize the default development configuration, there a few options.

##### Use predefined options

The `defineDevConfig` function accepts a few convivial options to customize the default SWC configuration without having to learn any [SWC specific configuration syntax](https://swc.rs/docs/configuration/swcrc) or mangling with complicated options.

To enable [React fast refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin), use the `fastRefresh` option:

```ts
// swc.dev.ts

import { defineDevConfig } from "@workleap/swc-configs";

return defineDevConfig({
    fastRefresh: true
});
```

> Don't forget to install [ReactRefreshWebpackPlugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) and update your Webpack configuration accordingly.

By default the development configuration expect to parse TypeScript code. If your project is coded with regular JavaScript (ECMAScript), use the `parser` option to tell SWC to expect regular JavaScript code rather than TypeScript code:

```ts
// swc.dev.ts

import { defineDevConfig } from "@workleap/swc-configs";

return defineDevConfig({
    parser: "ecmascript"
});
```

##### Provide a custom configuration object

The `defineDevConfig` function also accepts a `configOverride` property. This property allow you to override any options of the default development configuration. It's important to note that the provided configuration object **will not** merge with the default configuration, it will override any matching properties of the default configuration.

> Prefer using [predefined options](#use-predefined-options) whenever possible.

Given the following code:

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

The whole `jsx` section of the default configuration would be overrided for:

```js
jsc: {
    parser: {
        dynamicImport: true
    }
}
```

To extend the default configuration options rather than overriding them, use the `DefaultDevConfig` object to merge additional options with the default configuration:

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

##### Using a function to customize the final configuration object

The `configOverride` property also accept a function. While there are a wide range of additional use cases that can be solved by using a function rather than an object, the main purpose of supporting a function here is to allow mixing [predefined options](#use-predefined-options) with a custom configuration object.

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

The consumer wish to enable [React fast refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin) and ESM dynamic imports. That's a good idea to use the `fastRefresh` [predefined options](#use-predefined-options) to enable fast refresh. Since there are no predefined option to enable ESM dynamic imports, a custom configuration object must be provided to extend the `jsc.parser` section with the `dynamicImport` property.

Given that the consumer extends the configuration rather than overriding it, we could expect that the React fast refresh configuration will be included in the final configuration.

Wrong, the React fast refresh configuration won't be included because it's not part of the `DefaultDevConfig` object.

To extend the default development configuration and support predefined options, you must provide a function rather than an object:

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

Using a function allow the consumer to receive as argument a configuration object derived from the `DefaultDevConfig` including any additional configuration added with [predefined options](#use-predefined-options).

### Build

### Jest

### Configuration override

## Maintainers notes

### CJS support

To support CJS projects, the package is build for ESM and CJS formats. To support CJS, `type: "module"` has been temporary removed from the `package.json` file.

Once all our projects use ESM, CJS support can be removed.

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
