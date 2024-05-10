---
order: 80
meta:
    title: Custom configuration - ESLint
---

# Custom configuration

If you are in the process of **migrating an existing project** to use `@workleap/eslint-plugin` or encountering a challenging situation that is not currently handled by this library, you might want to customize the default shared configurations.

!!!
For a list of the rules included with the default shared configurations, refer to the configuration files in the following [folder](https://github.com/gsoft-inc/wl-web-configs/tree/main/packages/eslint-plugin/lib/config) on GitHub.
!!!

## Disable a default rule

You can disable a default rule by defining the rule locally with the `"off"` value:

```javascript !#5-9 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.webApplication,
    {
        rules: {
            "no-var": "off"
        }
    }
];

export default config;
```

## Change a default rule severity

You can update the severity of a rule by defining the rule locally with either the `"warn"` or `"error"` severity:

```javascript !#5-9 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.webApplication,
    {
        rules: {
            "jsx-a11y/alt-text": "error"
        }
    }
];

export default config;
```

## Change a default rule value

You can update a default rule value by defining the rule locally with its new value:

```javascript !#5-9 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";

const config = [
    ...workleapPlugin.configs.webApplication,
    {
        rules: {
            "quotes": ["warn", "single"]
        }
    }
];

export default config;
```

!!!light
Please, don't update your project configuration to use single quotes :sweat_smile::pray:
!!!

## Add a plugin

You can add configure additional rules from a third party [ESLint plugin](https://eslint.org/docs/latest/use/configure/plugins):

```javascript !#2,6-13 eslint.config.js
import workleapPlugin from "@workleap/eslint-config";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const config = [
    ...workleapPlugin.configs.webApplication,
    {
        plugins: {
			unicorn: eslintPluginUnicorn,
		},
        rules: {
            "unicorn/better-regex": "error"
        }
    }
];

export default config;
```

## `concat` helper

If you are combining many configuration objects, it can be helpful to use the `concat` helper from [eslint-flat-config-utils](https://github.com/antfu/eslint-flat-config-utils) to avoid having to spread arrays.

```javascript !#1,5,15 eslint.config.js
import { concat } from "eslint-flat-config-utils";
import workleapPlugin from "@workleap/eslint-config";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const config = concat(
    workleapPlugin.configs.webApplication,
    {
        plugins: {
			unicorn: eslintPluginUnicorn,
		},
        rules: {
            "unicorn/better-regex": "error"
        }
    }
);

export default config;
```

## Start from scratch

If your situation is so challenging that you must start a new configuration from scratch, refer to the [advanced composition](advanced-composition.md) page.
