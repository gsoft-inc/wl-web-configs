import type { Linter } from "eslint";
import StrictCSSModuleNames from "../rules/strict-css-modules-names.ts";

const config: Linter.FlatConfig =
{
    plugins: {
        "@workleap": {
            rules: {
                "strict-css-modules-names": StrictCSSModuleNames
            }
        }
    },
    rules: {
        // Custom WorkLeap rules
        "@workleap/strict-css-modules-names": "warn"
    }
};

export default config;
