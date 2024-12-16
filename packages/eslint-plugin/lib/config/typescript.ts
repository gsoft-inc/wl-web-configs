import type { Linter } from "eslint";
import { typescriptFiles } from "../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: typescriptFiles,
            parser: "@typescript-eslint/parser",
            plugins: [
                "@typescript-eslint",
                "@stylistic/ts"
            ],
            extends: [
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            rules: {
                // @typescript-eslint/recommended disables
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends", allowObjectTypes: "never" }],

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
                "@stylistic/ts/quotes": ["warn", "double"],
                "@typescript-eslint/no-import-type-side-effects": "warn",
                "@typescript-eslint/consistent-type-imports": [
                    "warn",
                    {
                        "prefer": "type-imports",
                        "disallowTypeAnnotations": true,
                        "fixStyle": "inline-type-imports"
                    }
                ],

                "@stylistic/ts/member-delimiter-style": "warn",
                "@stylistic/ts/comma-dangle": ["warn", "never"],
                "indent":"off",
                "@stylistic/ts/indent": [
                    "warn",
                    4,
                    {
                        SwitchCase: 1,
                        CallExpression: { arguments: "first" }
                    }
                ],
                "@stylistic/ts/object-curly-spacing": ["warn", "always"],
                "semi":"off",
                "@stylistic/ts/semi": ["warn", "always"]
            }
        }
    ]
};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = config;
