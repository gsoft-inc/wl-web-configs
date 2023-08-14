---
label: Configure a project
meta:
    title: Configure a project - PostCSS
---

# Configure a project

Execute the following steps to setup [PostCSS](https://postcss.org/) for a single projet.

## 1. Install the packages

Open a terminal at the root of the project and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/postcss-configs postcss
```
+++ yarn
```bash
yarn add -D @workleap/postcss-configs postcss
```
+++ npm
```bash
npm install -D @workleap/postcss-configs postcss
```
+++

## 2. Configure PostCSS

### Create a configuration file

First, create a configuration file named `postcss.config.ts` at the root of the project:

``` !#5
project
├── src
├──── ...
├── package.json
├── postcss.config.ts
```

### Define the configuration

Then, open the newly created file and `export` the PostCSS configuration by using the `defineConfig(options)` function provided by this library:

```ts !#3 postcss.config.ts
import { defineConfig } from "@workleap/postcss-configs";

export default defineConfig();
```

### Predefined options

The `defineConfig(options)` function can be used as-is as shown in the previous examples, however, if you wish to customize the default configuration, the function also accept a few predefined options to help with that :point_down:

#### `browsers`

- **Type**: `string | string[]`
- **Default**: When available, will read the supported browser versions from the closest `.browserslistrc` file

Set `postcss-preset-env` [browsers option](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#browsers).

```ts !#4 postcss.config.ts
import { defineConfig } from "@workleap/postcss-configs";

export default defineConfig({
    browsers: "> .5% and last 2 versions"
});
```

#### `presetEnvOptions`

- **Type**: An object literal accepting all `postcss-preset-env` [options](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options)
- **Default**: `{ autoprefixer: { flexbox: "no-2009" }, stage: 3 }`

Forward the provided object literal to the [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) plugin.

```ts !#4-6 postcss.config.ts
import { defineConfig } from "@workleap/postcss-configs";

export default defineConfig({
    presetEnvOptions: {
        stage: 1
    }
});
```

### Extends `presetEnvOptions` options

When provided, the `presetEnvOptions` option will override the default [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) plugin configuration. If you wish to **extend** the default configuration rather than overriding it, you can do so by importing the `DefaultPresetEnvOptions` object:

```ts !#5,7 postcss.config.ts
import { defineConfig, DefaultPresetEnvOptions } from "@workleap/postcss-configs";

export default defineConfig({
    presetEnvOptions: {
        ...DefaultPresetEnvOptions,
        autoprefixer: {
            ...DefaultPresetEnvOptions.autoprefixer,
            grid: true
        },
        debug: true
    }
});
```

### Transformers

The [predefined options](#predefined-options) are useful to quickly customize the default configuration of this library, but only covers a subset of a [PostCSS](https://postcss.org/) configuration. If you wish to get full control over the configuration, you can provide **configuration transformer** functions.

```ts
transformer(config: {}) => {}
```

A configuration transformer function accept a [PostCSS configuration object](https://github.com/postcss/postcss-load-config) and returns a transformed (or not) PostCSS configuration object:

```ts !#10 postcss.config.ts
import { defineConfig, type PostcssConfigTransformer, type PostCSSConfig } from "@workleap/postcss-configs";

const overrideBrowsers: PostcssConfigTransformer = (config: PostCSSConfig) => {
    config.browsers = "> .5% and last 2 versions";

    return config;
};

export default defineConfig({
    transformers: [overrideBrowsers]
});
```

#### Additional PostCSS plugins

Configuration transformer functions can be used to configure additional [PostCSS plugins](https://www.postcss.parts/):

```ts !#11 postcss.config.ts
import { defineConfig, type PostcssConfigTransformer, type PostCSSConfig } from "@workleap/postcss-configs";
import tailwindcss from "tailwindcss";

const configureTailwind: PostcssConfigTransformer = (config: PostCSSConfig) => {
    config.plugins.push(tailwindcss)

    return config;
};

export default defineConfig({
    transformers: [configureTailwind]
});
```

## 3. Configure Webpack

To integrate with [Webpack](https://webpack.js.org/), update your configuration file to include a [postcss-loader](https://www.npmjs.com/package/postcss-loader):

```js !#13 webpack.config.js
// @ts-check

export default {
    ...
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

## 4. Try it :rocket:

To test your PostCSS configuration, create and import a CSS file with the following code:

```css
.example {
    display: grid;
    transition: all .5s;
    user-select: none;
    background: linear-gradient(to bottom, white, black);
}
```

If you integrated with Webpack, execute your Webpack build and find the outputted `.example` CSS class in your `dist` folder. Otherwise, you can setup [PostCSS CLI](https://github.com/postcss/postcss-cli) to process the CSS file.

Most of the CSS properties in the `.example` CSS class should have been prefixed (it can vary based on your [Browserslist](https://browsersl.ist/) configuration):

```css
.example {
    display: -ms-grid;
    display: grid;
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    background: -webkit-gradient(linear, left top, left bottom, from(white), to(black));
    background: linear-gradient(to bottom, white, black);
}
```
