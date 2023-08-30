---
order: 70
meta:
    title: Advanced composition - TypeScript
---

# Advanced composition

If the default [by project type configurations](default.md/#available-configurations) doesn't fits your needs, rather than writing your own configuration from scratch, you can **compose a new one** from the underlying configuration pieces of `@workleap/typescript-configs`.

## Available pieces

| Name | Description |
| ---  | --- |
| :icon-mark-github: [core](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/typescript-configs/core.json) | Basic rules shared by every configuration. |
| :icon-mark-github: [react](https://github.com/gsoft-inc/wl-web-configs/blob/main/packages/typescript-configs/react.json) | Rules for [React](https://react.dev/) applications and libraries. |

## Compose a new configuration

Each configuration piece can be extended individually, or in combination with other pieces, to compose your own custom [TypeScript](https://www.typescriptlang.org/) configuration.

### React configuration

To extend the base configuration for a [React](https://react.dev/) project:

```json tsconfig.json
{
    "extends": "@workleap/typescript-configs/react",
    "compilerOptions": {
        "baseUrl": ".",
    },
    "include": ["src"],
    "exclude": ["dist", "node_modules"]
}
```

### Non React configuration

To extend the core configuration for a regular TypeScript project:

```json tsconfig.json
{
    "extends": "@workleap/typescript-configs/core",
    "compilerOptions": {
        "baseUrl": ".",
    },
    "include": ["src"],
    "exclude": ["dist", "node_modules"]
}
```
