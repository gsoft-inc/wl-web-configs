import type { Linter } from "eslint";
import { typescriptFiles } from "../../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: typescriptFiles,
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
            extends: [
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            rules: {
                // @typescript-eslint/recommended but warn instead of errors
                "@typescript-eslint/ban-ts-comment": "warn",
                "@typescript-eslint/ban-types": "warn",
                "@typescript-eslint/no-array-constructor": "warn",
                "@typescript-eslint/no-empty-function": "warn",
                "@typescript-eslint/no-empty-interface": "warn",
                "@typescript-eslint/no-extra-non-null-assertion": "warn",
                "@typescript-eslint/no-extra-semi": "warn",
                "@typescript-eslint/no-inferrable-types": "warn",
                "@typescript-eslint/no-misused-new": "warn",
                "@typescript-eslint/no-namespace": "warn",
                "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
                "@typescript-eslint/no-this-alias": "warn",
                "@typescript-eslint/no-var-requires": "warn",
                "@typescript-eslint/prefer-as-const": "warn",
                "@typescript-eslint/prefer-namespace-keyword": "warn",
                "@typescript-eslint/triple-slash-reference": "warn",
                "@typescript-eslint/adjacent-overload-signatures": "warn",
                "@typescript-eslint/no-loss-of-precision": "warn",
                "@typescript-eslint/no-unnecessary-type-constraint": "warn",

                // @typescript-eslint/recommended disables
                "@typescript-eslint/no-non-null-assertion": "off",

                // additional rules we want
                "@typescript-eslint/member-delimiter-style": "warn",
                "@typescript-eslint/consistent-type-definitions": "warn",
                "@typescript-eslint/no-implicit-any-catch": "warn",
                "@typescript-eslint/explicit-member-accessibility": ["warn", { accessibility: "no-public" }],
                "@typescript-eslint/method-signature-style": "warn",
                "comma-dangle":"off",
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
                "no-dupe-class-members":"off",
                "@typescript-eslint/no-dupe-class-members":"warn",
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
                "@typescript-eslint/object-curly-spacing": ["warn", "always"],
                "quotes":"off",
                "@typescript-eslint/quotes": ["warn", "double"],
                "semi":"off",
                "@typescript-eslint/semi": ["warn", "always"]
            }
        }
    ]
};

export = config;
