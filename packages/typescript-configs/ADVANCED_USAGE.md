# Advanced Usage

If the default configuration doesn’t fit your needs, and you want to create your own configuration, you can start by extending the base configuration and then adding or removing rules as needed.

## Extending the base configuration for a react project

```json
{
  "extends": "@workleap/typescript-configs/react",
    "compilerOptions": {
        "baseUrl": ".",
    },
    "include": ["src"],
    "exclude": ["node_modules"]
}
```

## Extending the core configuration for a TS project

```json
{
  "extends": "@workleap/typescript-configs/core",
    "compilerOptions": {
        "baseUrl": ".",
    },
    "include": ["src"],
    "exclude": ["node_modules"]
}
```
