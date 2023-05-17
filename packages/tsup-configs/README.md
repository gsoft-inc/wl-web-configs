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

[Check out all available options.](https://paka.dev/npm/tsup#module-index-export-Options)

### Build a React or TypeScript Library Project

**Default**
`defineBuildConfig` comes with a default configuration that will build a React or TypeScript ESM library.

```ts
// tsup.config.ts
import { defineBuildConfig } from "tsup";

export default defineBuildConfig();
```

**Using custom tsup config:**
If you want to use additional tsup options or override the default ones, you can pass a custom tsup config to `defineBuildConfig`:

```ts
// tsup.config.ts
import { defineBuildConfig } from "tsup";

export default defineBuildConfig({
    entry: ["lib/index.ts"],
    format: ["cjs"]
});
```

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
