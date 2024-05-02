import type { Linter } from "eslint";
import tseslint from "typescript-eslint";
import { typeScriptFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig =
    {
        files: typeScriptFiles,
        plugins: {
            // @ts-ignore
            "@typescript-eslint": tseslint.plugin
        },
        languageOptions: {
            // @ts-ignore
            parser: tseslint.parser,
            parserOptions: {
                project: true
            }
        },
        rules: {
            // @typescript-eslint/recommended disables
            "@typescript-eslint/no-non-null-assertion": "off",

            // additional rules we want
            "@typescript-eslint/consistent-type-definitions": "warn",
            "@typescript-eslint/explicit-member-accessibility": ["warn", { accessibility: "no-public" }],
            "@typescript-eslint/method-signature-style": "warn",
            "comma-dangle":"off",
            "no-dupe-class-members":"off",
            "@typescript-eslint/no-dupe-class-members":"error",
            "no-loop-func":"off",
            "@typescript-eslint/no-loop-func":"warn",
            "no-shadow":"off",
            "@typescript-eslint/no-shadow":"warn",
            "no-unused-expressions":"off",
            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                    allowTaggedTemplates: true
                }
            ],
            "no-use-before-define":"off",
            "no-useless-constructor":"off",
            "@typescript-eslint/no-useless-constructor":"warn",
            "object-curly-spacing":"off",
            "quotes":"off",
            "@typescript-eslint/quotes": ["warn", "double"],
            "@typescript-eslint/no-import-type-side-effects": "warn",
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                {
                    "prefer": "type-imports",
                    "disallowTypeAnnotations": true,
                    "fixStyle": "inline-type-imports"
                }
            ],

            "@typescript-eslint/member-delimiter-style": "warn",
            "@typescript-eslint/comma-dangle": ["warn", "never"],
            "indent":"off",
            "@typescript-eslint/indent": [
                "warn",
                4,
                {
                    SwitchCase: 1,
                    CallExpression: { arguments: "first" }
                }
            ],
            "@typescript-eslint/object-curly-spacing": ["warn", "always"],
            "semi":"off",
            "@typescript-eslint/semi": ["warn", "always"]
        }
    };

export default config;
