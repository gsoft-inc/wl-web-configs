---
order: 70
label: Transformer utilities
meta:
    title: Transformer utilities - webpack
---

# Transformer utilities

To help you write configuration transformers, this library provide a suite of utility functions. 

## Module rules

Utility functions for webpack [module rules](https://webpack.js.org/configuration/module/#modulerules).

### matchLoaderName

Returns a **matcher function** that can be utilized alongside other module rules utility functions. The returned matcher function will return `true` when it encounters a module rule with a loader **matching** the provided **name** value.

#### Reference

```ts
const matcher = matchLoaderName(name: string)
```

#### Parameters

- `name`: A module rule loader `name` value.

#### Returns

A matcher function.

#### Usage

```js !#6 webpack.config.js
export default {
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)/i,
                loader: "swc-loader"
            }
        ]
    }
}
```

```ts transformer.ts
import { matchLoaderName } from "@workleap/webpack-configs";

const matcher = matchLoaderName("swc-loader");
```

### matchAssetModuleType

Returns a **matcher function** that can be utilized alongside other module rules utility functions. The returned matcher function will return `true` when it encounters a module rule with a loader **matching** the provided **asset type** value.

#### Reference

```ts transformer.ts
const matcher = matchAssetModuleType(type: AssetModuleType)
```

#### Parameters

- `type`: A module rule loader [asset type](https://webpack.js.org/guides/asset-modules/#root) value.

#### Returns

A matcher function.

#### Usage

```js !#6 webpack.config.js
export default {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)/i,
                type: "asset/resource"
            }
        ]
    }
}
```

```ts transformer.ts
import { matchAssetModuleType } from "@workleap/webpack-configs";

const matcher = matchAssetModuleType("asset/resource");
```

### matchTest

Returns a **matcher function** that can be utilized alongside other module rules utility functions. The returned matcher function will return `true` when it encounters a module rule with a loader **matching** the provided **test** value.

#### Reference

```ts
const matcher = matchTest(test: string | RegExp)
```

#### Parameters

- `test`: A module rule loader `test` value.

#### Returns

A matcher function.

#### Usage

```js !#5 webpack.config.js
export default {
    module: {
        rules: [
            {
                test: /\.css/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}
```

```ts transformer.ts
import { matchTest } from "@workleap/webpack-configs";

const matcher = matchTest(/\.css/i);
```

### findModuleRule

### findModuleRules

### addBeforeModuleRule

### addAfterModuleRule

### replaceModuleRule

### removeModuleRules

## Plugins

Utility functions for webpack [plugins](https://webpack.js.org/configuration/plugins/).

### matchConstructorName

### findPlugin

### replacePlugin

### addBeforePlugin

### addAfterPlugin

### removePlugin
