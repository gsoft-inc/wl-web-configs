# `@workleap/tsup-configs`
Workleap's recommended [tsup](https://tsup.egoist.dev/) configs.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@workleap/tsup-configs)](https://www.npmjs.com/package/@workleap/tsup-configs)

## Installation

Install the package.

**With pnpm**
```shell
pnpm add -D @workleap/tsup-configs
```

## Usage

### Build a React or TypeScript Library Project with a watch mode

If your project is using tsup in watch mode, you might want a separate tsup config for development. This config will be used by tsup when running in watch mode. Then you need a second config to build the library. In order to do this, create 2 files at the top of your project:

- `tsup.build.ts`
- `tsup.dev.ts`

Then, in your package.json file, add the following scripts:
```json
    "dev": "tsup --config ./tsup.dev.ts",
    "build": "tsup --config ./tsup.build.ts"
```

In your `tsup.dev.ts` file, add the following code:
```ts
// tsup.dev.ts
import { defineDevConfig } from "tsup";

export default defineDevConfig();
```
In your `tsup.build.ts` file, add the following code:
```ts
// tsup.build.ts
import { defineBuildConfig } from "tsup";

export default defineBuildConfig();
```

### Build a React or TypeScript Library Project without a watch mode

Simply create a `tsup.config.ts` file at the top of your project and add the following code:
```ts
// tsup.config.ts
import { defineBuildConfig } from "tsup";

export default defineBuildConfig();
```

## Customization
If you want to use additional tsup options or override the default ones, you can pass a custom tsup config to the functions exported by this packages:

```ts
// tsup.config.ts
import { defineBuildConfig } from "tsup";

export default defineBuildConfig({
    entry: ["lib/index.ts"],
    format: ["cjs"]
});
```

[Check out all available options here](https://paka.dev/npm/tsup#module-index-export-Options) or the documentation website at https://tsup.egoist.dev/

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
