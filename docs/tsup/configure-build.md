---
order: 90
label: Configure for build
meta:
    title: Configure for build - tsup
---

# Configure for build

To configure [tsup](https://tsup.egoist.dev/) for a build environment, execute the following steps.

## 1. Install the packages

Open a terminal at the root of the project and install the following packages:

+++ pnpm
```bash
pnpm add -D @workleap/tsup-configs tsup typescript
```
+++ yarn
```bash
yarn add -D @workleap/tsup-configs tsup typescript
```
+++ npm
```bash
npm install -D @workleap/tsup-configs tsup typescript
```
+++

## 2. Configure tsup

First, create a configuration file named `tsup.build.ts` at the root of the project:

``` !#5
web-project
├── src
├──── ...
├── package.json
├── tsup.build.ts
```

Then, open the newly created file and export the [tsup](https://tsup.egoist.dev/) configuration by using the `defineBuildConfig(options)` function:

```ts tsup.build.ts
import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig();
```

## 3. Set predefined options

The `defineBuildConfig(options)` function can be used as shown in the previous example, however, if you wish to customize the default configuration, the function also accepts any [tsup options](https://tsup.egoist.dev/#usage), **no locked in** :heart::v::

```ts !#4 tsup.build.ts
import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    dts: false
});
```

## 4. Transform configuration

!!!warning
We do not guarantee that your configuration transformers won't break after an update. It's your responsibility to keep them up to date with new releases.
!!!

Since the [predefined options](#3-set-predefined-options) for tsup already covers all the availables [options](https://tsup.egoist.dev/#usage), configuration transformer functions aren't as useful for a tsup configuration as for other tools like [SWC](../swc/configure-build.md#4-transform-configuration) or [webpack](../webpack/configure-build.md#4-transform-configuration). Nonetheless, they are still valuable, especially for library authors aiming to **distribute** a **default option set** that facilitates the configuration of tsup for specific functionalities of their library.

To view the default build configuration of `@workleap/tsup-configs`, have a look at the [build.ts configuration file](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/tsup-configs/src/build.ts) on GitHub.

### `transformers`

- **Type**: `((config: TsupConfig, context: TsupConfigTransformerContext) => TsupConfig)[]`
- **Default**: `[]`

```ts myCustomTransformer.ts
import { TsupConfigTransformer, TsupConfig } from "@workleap/tsup-configs";

export const myCustomTsupTransformer: TsupConfigTransformer = (config: TsupConfig) => {
    config.dts = false;
    config.entry = ["./src/my-library"],
    config.outDir = ["./dist/my-library"],

    return config;
};
```

```ts !#5 tsup.build.ts
import { defineBuildConfig } from "@workleap/tsup-configs";
import { myCustomTsupTransformer } from "@my-library/myCustomTsupTransformer";

export default defineBuildConfig({
    transformers: [myCustomTsupTransformer]
})
```

### Execution context

Generic transformers can use the `context` parameter to gather additional information about their execution context, like the `environment` they are operating in:

```ts !#4 myCustomTransformer.ts
import { TsupConfigTransformer, TsupConfigTransformerContext, TsupConfig } from "@workleap/tsup-configs";

export const myCustomTsupTransformer: TsupConfigTransformer = (config: TsupConfig, context: TsupConfigTransformerContext) => {
    if (context.environment === "build") {
        config.clean = false;
    }

    config.dts = false;
    config.entry = ["./src/my-library"],
    config.outDir = ["./dist/my-library"],

    return config;
};
```

- `environment`: `"dev" | "build"`

## 5. Add a CLI script

To build the bundle files for production, add the following script to your project `package.json` file:

```json package.json
{
    "build": "tsup --config ./tsup.build.ts"
}
```

## 6. Try it :rocket:

To test your new [tsup](https://tsup.egoist.dev/) configuration, open a terminal at the root of the project and execute the [CLI script added previously](#5-add-a-cli-script). The build process should complete without outputting any error in the terminal and the bundle files should be available in the `/dist` folder (or any other `outputDir` you configured).