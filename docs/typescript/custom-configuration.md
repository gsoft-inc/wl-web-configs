---
order: 80
label: Custom configuration
meta:
    title: Custom configuration - TypeScript
---

# Custom configuration

If you are in the process of **migrating an existing project** to use this library or encountering a challenging situation that is not currently handled by this library, you might want to customize the default shared configurations.

!!!
For a list of the rules included with the default shared configurations, refer to the configuration files in the following [folder](https://github.com/gsoft-inc/wl-web-configs/tree/main/packages/typescript-configs) on Github.
!!!

## Change a default rule value

You can update a default rule value by defining the rule locally with its new value:

```json !#3-5 tsconfig.json
{
    "extends": ["@workleap/typescript-configs/web-application"],
    "compilerOptions": {
        "strict": false
    }
}
```

## Start from scratch

If your situation is so challenging that you must start a new configuration from scratch, refer to the [advanced composition](advanced-composition.md) page.
