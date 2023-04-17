# Advanced Usage

If the default configuration doesn’t fit your needs, and you want to create your own configuration, you can start by extending the base configuration and then adding or removing rules as needed.

## Extending the base configuration for a react project

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@workleap/typescript-configs/core/react",
    "compilerOptions": {
        "baseUrl": ".",
    },
    "include": ["src"],
    "exclude": ["node_modules"]
}
```

## Extending the base configuration for a TS project

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@workleap/typescript-configs/core/base",
    "compilerOptions": {
        "baseUrl": ".",
    },
    "include": ["src"],
    "exclude": ["node_modules"]
}
```
