---
order: 50
label: Migrate to Flat Config
meta:
    title: Migrate to Flat Config
---

# Migrate to flat config

Flat config is the new default configuration format for ESLint. It is supported since version 8.23.0, and is the default starting in version 9. Detailed information regarding this format can be fount in 2 blog posts: [Background](https://eslint.org/blog/2022/08/new-config-system-part-1/) and [Introduction to flat config](https://eslint.org/blog/2022/08/new-config-system-part-2/), as well as the [official docs](https://eslint.org/docs/latest/use/configure/).

## High level differences

Previously, ESLint allowed you to use multiple formats to define your config files. Flat config can only use JavaScript. You can import plugins and pre-made configuration objects directly, and manipulate them as necessary.

The `extends` keyword has been removed. Now you simply add multiple _configuration objects_ to an array. Configuration objects will cascade, similar to the `overrides` block of the old config.

The `.eslintignore` file is no longer valid. If you need to exclude files from linting, add them to a configuration block under the `ignores` key.

Config files no longer rely on custom resolution implemented by ESLint. Since they import modules directly, they now rely on Node file resolution. Config files no longer merge down the file tree, either. Every config file acts as if it is the root config file. This means if you have nested configs as well as a true root config (like in a monorepo), you will want to set your top-level config to ignore directories that have their own config files.

## Basic migration steps

1. Create a file called `eslint.config.js`. `@workleap/eslint-config` is published in ESM, so if your project `type` in `package.json` is not `module`, then you should create an `eslint.config.mjs` file instead.

### Initial setup

Import the `@workleap/eslint-config` module. Create a config array and set it as the default export.
```javascript
import workleapPlugin from "@workleap/eslint-config";

const config = [

];

export default config;
```

### Ignoring files

ESLint will no longer use the `.eslintignore` file. If you have one of these files, create a new configuration object with an `ignores` key:

```javascript
import workleapPlugin from "@workleap/eslint-config";

const config = [
    {
        ignores: ["node_modules/", "dist/"]
    }
];

export default config;
```

## Recommended setup - By project type

`@workleap/eslint-config` exposes some pre-built configs based on common project types. Each of these configs are properly set up for **JavaScript**, **TypeScript**, **Jest**, **Testing Library**, **MDX**, **package.json**, and **YAML**. 

By convention, all configs are found at `workleapPlugin.configs`. A flat config can be a single object or an array, but for simplicity, all Workleap configs are exported as arrays. Therefore, each Workleap config must be spread (`...`) into the config array.

| Type | Config Key | Purpose | Additional Configs |
|---|---|---|---|
| Web Application | `configs.webApplication` | General purpose web application using React and TypeScript | React<br>JSX A11y<br>Storybook |
| TypeScript Library | `configs.typeScriptLibrary` | For building a TypeScript library to be consumed by another project |  |
| React Library | `configs.reactLibrary` | For building a React library to be consumed by another project | React<br>JSX A11y<br>Storybook |
| Monorepo Workspace | `configs.monorepoWorkspace` | For the top level of a monorepo |  |

For example, to configure ESLint for a React web application, add the project config to your config array:
```javascript
import workleapPlugin from "@workleap/eslint-config";

const config = [
    {
        ignores: ["node_modules/", "dist/"]
    },
    ...workleapPlugin.configs.webApplication
];

export default config;
```

You can override individual rules across all configs by adding another configuration object to the array:
```javascript
import workleapPlugin from "@workleap/eslint-config";

const config = [
    {
        ignores: ["node_modules/", "dist/"]
    },
    ...workleapPlugin.configs.webApplication,
    {
        rules: {
            'react/jsx-uses-vars': 'error',
        }
    }
];

export default config;
```

## Example monorepo setup

Monorepo setups can be more complex, because each package should have its own ESLint config file.

### Top level

Create a new `eslint.config.js` at the root of your project. Import the monorepo workspace config. Ignore the directory or directories that contain your monorepo packages (and any other files you don't want linted).
```javascript
import workleapPlugin from "@workleap/eslint-config";

const config = [
    {
        ignores: ["node_modules/", "packages/"]
    },
    ...workleapPlugin.configs.monorepoWorkspace
];

export default config;
```

### Monorepo packages

Inside each monorepo package, create another `eslint.config.js` file. Add the config module that matches the package type. For example, a web application would use the `webApplication` config, while a component libary would use the `reactLibrary` config:
```javascript
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.reactLibrary
];

export default config;
```

You must run ESLint from each monorepo package. It will use which ever `eslint.config.js` is the first to be found by traversing up from the directory in which the `eslint` command was run. pnpm can be used to automate this process.

You can now delete your previous `.eslintrc` config file, as well as your `.eslintignore` file, if you have one. Please refer to the [official migration guide](https://eslint.org/docs/latest/use/configure/migration-guide) for more details.

### Running ESLint in the monorepo

Ensure these 3 scripts are present in your top-level `package.json`:
```json
"scripts": {
    "lint": "pnpm run \"/^lint:.*/\"",
    "lint:eslint": "eslint . --max-warnings=0 --cache --cache-location node_modules/.cache/eslint",
    "lint:eslint-packages": "pnpm -r --parallel --if-present --aggregate-output lint:eslint",
}
```
- The `lint` script will run all scripts that start with "lint:" inside this `package.json`.
- `lint:eslint` will run ESLint at the top level of the project. You can set up your ESLint flags however you like.
- `lint:eslint-packages` will simulataneously run the `lint:eslint` script within each package's `package.json` if it has been defined.


Add this script to the `package.json` of each monorepo package:
```json
"scripts": {
    "lint:eslint": "eslint . --max-warnings=0 --cache --cache-location .cache/eslint"
}
```
Now, whenever you run `pnpm lint` at the root level, each monorepo package will also execute their `lint:eslint` commands. We recommend using ESLint's cache feature, as shown in the example. Make sure you add the cache location to the `.gitignore` file.

## Advanced Configuration

We recommend using one of the "by project type" configurations for simplicity and consistency. But if you need to customize further, you can choose to combine [any individual configs](wl-web-configs/eslint/advanced-composition/). Here, we'll compose a config for a project that uses React and TypeScript. 

```javascript
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.core,
    ...workleapPlugin.configs.typescript,
    ...workleadPlugin.configs.react
];

export default config;
```

Some rules may need to be overridden within each nested config object. Since flat configs are entirely JavaScript, we can manipulate the underlying configuration objects directly. For example, to change the file type used by a config object: 
```javascript
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.core,
    ...workleapPlugin.configs.typescript,
    ...workleadPlugin.configs.react.map(conf => (
        {
            ...conf,
            files: ["*.js"]
        }
    ))
];

export default config;
```
