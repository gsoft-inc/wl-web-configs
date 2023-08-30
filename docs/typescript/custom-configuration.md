---
order: 80
label: Custom configuration
meta:
    title: Custom configuration - TypeScript
---

# Custom configuration

If you are in the process of **migrating an existing project** to use `@workleap/typescript-configs` or encountering a challenging situation that is not currently handled by this library, you might want to customize the default shared configurations.

!!!
For a list of the rules included with the default shared configurations, refer to the configuration files in the following [folder](https://github.com/gsoft-inc/wl-web-configs/tree/main/packages/typescript-configs) on GitHub.
!!!

## Change a default field value

You can update a default field value by defining the field locally with its new value:

```json !#3-5 tsconfig.json
{
    "extends": ["@workleap/typescript-configs/web-application"],
    "compilerOptions": {
        "strict": false
    },
    "exclude": ["dist", "node_modules"]
}
```

## Non ESM projects

If you are **migrating** an existing project and prefer to wait before moving to ESM, add the following custom configurations to allow `import` statements without specifying a file extension:

```json !#3-6 tsconfig.json
{
    "extends": ["@workleap/typescript-configs/web-application"],
    "compilerOptions": {
        "moduleResolution": "Bundler",
        "module": "ESNext",
    }
}
```

## Monorepo support

If you are developing a monorepo solution and need to **reference projects within** the **workspace**, you'll need to define [paths](https://www.typescriptlang.org/tsconfig#compilerOptions) for every impacted project.

Given the following workspace:

``` !#3,8,13
workspace
├── packages
├──── app
├────── src
├──────── ...
├────── package.json
├────── tsconfig.json
├──── components (@sample/components)
├────── src
├──────── index.ts
├────── package.json
├────── tsconfig.json
├──── utils (@sample/utils)
├────── src
├──────── index.ts
├────── package.json
├────── tsconfig.json
├── package.json
├── tsconfig.json
```

If the `packages/components` project is referencing the `packages/utils` project, and the `packages/app` project is referencing the `packages/components` project, you'll need to add the following `compilerOptions.paths`:

```json !#4-7 packages/app/tsconfig.json
{
    "extends": "@workleap/typescript-configs/web-application.json",
    "compilerOptions": {
        "paths": {
            "@sample/components": ["../components/index.ts"],
            "@sample/utils": ["../utils/index.ts"]
        }
    },
    "exclude": ["dist", "node_modules"]
}
```

```json !#4-6 packages/components/tsconfig.json
{
    "extends": "@workleap/typescript-configs/library.json",
    "compilerOptions": {
        "paths": {
            "@sample/utils": ["../utils/index.ts"]
        }
    },
    "exclude": ["dist", "node_modules"]
}
```

## Start from scratch

If your situation is so challenging that you must start a new configuration from scratch, refer to the [advanced composition](advanced-composition.md) page.
