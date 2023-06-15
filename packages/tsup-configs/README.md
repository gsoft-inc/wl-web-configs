# @workleap/tsup-configs

Workleap's recommended [tsup](https://tsup.egoist.dev/) configs.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/tsup-configs)](https://www.npmjs.com/package/@workleap/tsup-configs)

## Installation

Install the following packages:

**With pnpm**

```shell
pnpm add -D @workleap/tsup-configs tsup
```

**With yarn**

```shell
yarn add -D @workleap/tsup-configs tsup
```

**With npm**

```shell
npm install -D @workleap/tsup-configs tsup
```

## Usage

To build your React or TypeScript library project, follow these steps:

1. Create two files at the top of your project: `tsup.dev.ts` and `tsup.build.ts`.

2. Open the `tsup.dev.ts` file and add the following code:

```ts
// tsup.dev.ts
import { defineDevConfig } from "@workleap/tsup-configs";

export default defineDevConfig();
```

You can override any existing options:

```ts
// tsup.dev.ts
import { defineDevConfig } from "@workleap/tsup-configs";

export default defineDevConfig({
    clean: true
});
```

The provided options will be merged with the default options. Given that a provided option match a default option, it will override the default option. If you prefer to extend the default option, you can import the `DefaultDevOptions` object and handle the merging code in your configuration file:

```ts
// tsup.dev.ts
import { defineDevConfig, DefaultDevOptions } from "@workleap/tsup-configs";

export default defineDevConfig({
    format: ["cjs", ...DefaultDevOptions.format]
});
```

3. Open the `tsup.build.ts` file and add the following code:

```ts
// tsup.build.ts
import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig();
```

You can override any existing options:

```ts
// tsup.build.ts
import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    clean: true
});
```

The provided options will be merged with the default options. Given that a provided option match a default option, it will override the default option. If you prefer to extend the default option, you can import the `DefaultBuildOptions` object and handle the merging code in your configuration file:

```ts
// tsup.build.ts
import { defineBuildConfig, DefaultBuildOptions } from "@workleap/tsup-configs";

export default defineBuildConfig({
    format: ["cjs", ...DefaultBuildOptions.format]
});
```

4. In your package.json file, add the following scripts:

```json
"dev": "tsup --config ./tsup.dev.ts",
"build": "tsup --config ./tsup.build.ts"
```

Now you can use the `dev` script to run tsup in watch mode and the `build` script to build your library.

## Customization

If you want to use additional tsup options or override the default ones, you can pass a custom tsup config to the functions exported by this packages:

```ts
// tsup.config.ts
import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["lib/index.ts"],
    format: ["cjs"]
});
```

[Check out all available options here](https://paka.dev/npm/tsup#module-index-export-Options) or the documentation website at https://tsup.egoist.dev/

## Maintainers notes

### CJS support

To support CJS projects, the package is build for ESM and CJS formats. For CJS projects to use the package we cannot add `type: "module"` to the `package.json` file.

Once all our projects use ESM, CJS support can be removed.

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
