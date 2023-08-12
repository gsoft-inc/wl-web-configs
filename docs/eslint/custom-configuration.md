---
order: 80
meta:
    title: Custom configuration - ESLint
---

# Custom configuration

If you are in the process of **migrating an existing project** to use this library or encountering a challenging situation that is not currently handled by this library, you might want to customize the default shared configurations.

!!!
For a list of the default rules, have a look at this library [config folder](https://github.com/gsoft-inc/wl-web-configs/tree/main/packages/eslint-plugin/lib/config) on Github.
!!!

## Disable a default rule

You can disable a default rule by setting its value to `"off"`:

```json #5-7 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/web-application",
    "rules": {
        "no-var": "off"
    }
}
```

## Change a default rule severity

You can change the severity of a rule by settings its value `"warn"` or `"error"`:

```json #5-7 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/web-application",
    "rules": {
        "jsx-a11y/alt-text": "error"
    }
}
```

## Update a default rule

You can update a default rule by locally setting its new value:

```json #5-7 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "extends": "plugin:@workleap/web-application",
    "rules": {
        "quotes": ["warn", "single"]
    }
}
```

!!!light
Please, don't update your project configuration to use single quotes :sweat_smile::pray:
!!!

## Add a plugin

You can add new rules from a third party [ESLint plugin](https://eslint.org/docs/latest/use/configure/plugins):

```json #4-6,8-10 .eslintrc.json
{
    "$schema": "https://json.schemastore.org/eslintrc",
    "root": true,
    "plugins": [
        "unicorn"
    ],
    "extends": "plugin:@workleap/web-application",
    "rules": {
        "unicorn/better-regex": "error"
    }
}
```

## Start from scratch

If your situation is so challenging that you must start a new configuration from scratch, refer to the [advanced composition](advanced-composition.md) page.
