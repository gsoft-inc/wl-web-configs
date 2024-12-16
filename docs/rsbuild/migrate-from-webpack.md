---
order: 70
label: Migrate from Webpack
meta:
    title: Migrate from Webpack - Rsbuild
toc:
    depth: 2-3
---

# Migrate from Webpack

To migrate from [@squide/firefly-webpack-configs](https://www.npmjs.com/package/@squide/firefly-webpack-configs) to [@squide/firefly-rsbuild-configs](https://www.npmjs.com/package/@workleap/rsbuild-configs), execute the following steps :point_down:

## Update packages

Open a terminal at the root of the web application project and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/rsbuild-configs @rsbuild/core @rspack/core
```
+++ yarn
```bash
yarn add -D @workleap/rsbuild-configs @rsbuild/core @rspack/core
```
+++ npm
```bash
npm install -D @workleap/rsbuild-configs @rsbuild/core @rspack/core
```
+++

Then, in the same terminal, remove the following packages:

+++ pnpm
```bash
pnpm remove @workleap/webpack-configs @swc/core @swc/helpers @workleap/swc-configs webpack webpack-cli webpack-dev-server @workleap/postcss-configs postcss
```
+++ yarn
```bash
yarn remove @workleap/webpack-configs @swc/core @swc/helpers @workleap/swc-configs webpack webpack-cli webpack-dev-server @workleap/postcss-configs postcss
```
+++ npm
```bash
npm uninstall @workleap/webpack-configs @swc/core @swc/helpers @workleap/swc-configs webpack webpack-cli webpack-dev-server @workleap/postcss-configs postcss
```
+++

!!!warning
If your web application project uses SWC for tests, you may want to keep the `@swc/core` and `@workleap/swc-configs` packages.
!!!

## Update files

```
web-app
├── public
├──── index.html       -->  U
├── webpack.dev.js     -->  rsbuild.dev.ts
├── webpack.build.js   -->  rsbuild.build.ts
├── postcss.config.ts  -->  X
├── swc.build.js       -->  X
├── swc.dev.js         -->  X
├── package.json
```

### `webpack.build.js`

Rename the file from `webpack.build.js` to `rsbuild.build.ts`.

Then, open the `rsbuild.build.ts` file and apply the following changes:

- Replace `"@workleap/webpack-configs"` for `"@workleap/rsbuild-configs"`.
- Remove `import { swcConfig } from "./swc.build.js"`.
- Remove the first argument of the `defineBuildHostConfig` function.
- Remove `// @ts-check`.

Before:

```js webpack.build.js
// @ts-check

import { defineBuildHostConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildHostConfig(swcConfig);
```

After:

```ts rsbuild.build.ts
import { defineBuildHostConfig } from "@workleap/rsbuild-configs";

export default defineBuildHostConfig();
```

### `webpack.dev.js`

Rename the file from `webpack.dev.js` to `rsbuild.dev.ts`.

Then, open the `rsbuild.build.ts` file and and apply the following changes:

- Replace `"@workleap/webpack-configs"` for `"@workleap/rsbuild-configs"`.
- Remove `import { swcConfig } from "./swc.build.js"`.
- Remove the first argument of the `defineDevHostConfig` function.
- Remove `// @ts-check`.

Before:

```js webpack.dev.js
// @ts-check

import { defineDevHostConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevHostConfig(swcConfig);
```

After:

```ts rsbuild.dev.ts
import { defineDevHostConfig } from "@workleap/rsbuild-configs";

export default defineDevHostConfig(8080);
```

### `postcss.config.ts`

Delete the `postcss.config.ts` file.

### `swc.build.js`

Delete the `swc.build.js` file.

### `swc.dev.js`

Delete the `swc.dev.js` file.

### `index.html`

Replace `<%=webpackConfig.output.publicPath%>` by `<%=assetPrefix%>/` (the `/` is important).

Before:

```html public/index.html
<!DOCTYPE html>
<html>
  <head>
    <link href="<%=webpackConfig.output.publicPath%>favicon.png" rel="icon">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

After:

```html public/index.html
<!DOCTYPE html>
<html>
  <head>
    <link href="<%=assetPrefix%>/favicon.png" rel="icon">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## Update scripts

### `dev`

Update the `dev` script to run Rsbuild instead of webpack.

Before:

```json package.json
"scripts": {
    "dev": "webpack serve --config webpack.dev.js"
}
```

After:

```json package.json
"scripts": {
    "dev": "rsbuild dev --config rsbuild.dev.ts"
}
```

### `build`

Update the `build` script to run Rsbuild instead of webpack.

Before:

```json package.json
"scripts": {
    "build": "webpack --config webpack.build.js"
}
```

After:

```json package.json
"scripts": {
    "build": "rsbuild build --config rsbuild.build.ts"
}
```

## Typings

If you're encountering typing issues, consider adding type declarations for the following

- [SVGR](./configure-dev.md#typings)
- [CSS Module](./configure-dev.md#css-modules-typings)

## Try it :rocket:

Start the application in a development environment using the `dev` and `build` script. Everything should run smoothly without any warnings or errors outputted in the terminal.
