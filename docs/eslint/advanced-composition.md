---
order: 70
meta:
    title: Advanced composition - ESLint
---

# Advanced composition

If the default [by project type shared configurations](/eslint/#available-configurations) doesn't fits your needs, rather than writing your own configuration from scratch, you can **compose a new one** from the underlying configuration pieces of this library.

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

Each configuration piece can be extended individually, or in combination with other pieces, to compose your custom ESLint configuration.

### Individual piece

To extend the configuration with an individual piece:

```json #4
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/typescript"
}
```

### Multiple pieces

To extend the configuration with multiple pieces:

```json #4
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": ["plugin:@workleap/core", "plugin:@workleap/typescript"]
}
```

### Custom rules

To extend the configuration with pieces and define custom rules:

```json #5-7
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": ["plugin:@workleap/core", "plugin:@workleap/typescript"],
    "rules": {
        "quotes": ["error", "double"]
    }
}
```

For additional examples, refer to the [custom configuration](custom-configuration.md) page.

