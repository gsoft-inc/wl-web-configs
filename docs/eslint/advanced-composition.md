---
order: 70
meta:
    title: Advanced composition - ESLint
---

# Advanced composition

If the default [by project type configurations](default.md/#available-configurations) doesn't fits your needs, rather than writing your own configuration from scratch, you can **compose a new one** from the underlying configuration pieces of `@workleap/eslint-plugin`.

## Available pieces

| Name | Description |
| ---  | --- |
| :icon-mark-github: [core](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/core.ts){ target="_blank" } | Basic rules shared by every configuration. |
| :icon-mark-github: [typescript](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/typescript.ts){ target="_blank" } | Rules for [TypeScript](https://www.typescriptlang.org/) files. |
| :icon-mark-github: [react](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/react.ts){ target="_blank" } | Rules for [React](https://react.dev/) files. |
| :icon-mark-github: [jest](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/jest.ts){ target="_blank" } | Rules for [Jest](https://jestjs.io/) files. |
| :icon-mark-github: [testing-library](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/testing-library.ts){ target="_blank" } | Rules for Jest files using [testing-library](https://testing-library.com/). |
| :icon-mark-github: [storybook](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/storybook.ts){ target="_blank" } | Rules for [Storybook](https://storybook.js.org/) story files. |
| :icon-mark-github: [mdx](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/eslint-plugin/lib/config/mdx.ts){ target="_blank" } | Rules for [MDX](https://mdxjs.com/) files (used for Storybook MDX stories). |

## Compose a configuration

Each configuration piece can be extended individually, or in combination with other pieces, to compose your own custom [ESLint](https://eslint.org/) configuration.

### Single piece

To extend the configuration with a single piece:

```json !#4 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/typescript"
}
```

### Multiple pieces

To extend the configuration with multiple pieces:

```json !#4 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": ["plugin:@workleap/core", "plugin:@workleap/typescript"]
}
```

## Lint additional files

The configuration pieces already targets which file extensions their linting rules will be applied to. If you wish to lint additional file extensions for a given piece you can add an ESLint [override block](https://eslint.org/docs/latest/use/configure/configuration-files#how-do-overrides-work):

```json !#5-10 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": ["plugin:@workleap/react"],
    "overrides": [
        {
            "files": ["*.js", "*.jsx"],
            "extends": "plugin:@workleap/react"
        }
    ]
}
```





