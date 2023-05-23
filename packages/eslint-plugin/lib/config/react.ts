import type { Linter } from "eslint";
import { sourceFiles } from "../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: sourceFiles,
            plugins: ["jsx-a11y", "react", "react-hooks"],
            extends: [
                "plugin:react/recommended",
                "plugin:react-hooks/recommended"
            ],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            env: {
                browser: true
            },
            settings: {
                react: {
                    version: "detect"
                }
            },
            rules: {
                // https://eslint.org/docs/rules
                "jsx-quotes": ["warn", "prefer-double"],

                // react/recommended overrides
                "react/jsx-no-duplicate-props": ["warn", { ignoreCase: true }],
                "react/jsx-no-undef": ["warn", { allowGlobals: true }],

                // react/recommended disables
                "react/react-in-jsx-scope": "off",
                "react/display-name": "off",
                "react/no-unescaped-entities": "off",
                "react/prop-types": "off",
                "react/jsx-key": "off",

                // extra react rules
                "react/forbid-foreign-prop-types": ["warn", { allowInPropTypes: true }],
                "react/jsx-pascal-case": [
                    "warn",
                    {
                        allowAllCaps: true,
                        ignore: []
                    }
                ],
                "react/no-typos": "error",
                "react/style-prop-object": "warn",
                "react/button-has-type": "warn",
                "react/destructuring-assignment": [
                    "warn",
                    "always",
                    { ignoreClassFields: true }
                ],
                "react/jsx-boolean-value": ["warn", "never"],
                "react/default-props-match-prop-types": "warn",
                "react/no-unused-state": "warn",
                "react/no-array-index-key": "warn",
                "react/no-access-state-in-setstate": "warn",
                "react/jsx-filename-extension": ["warn", { "extensions": [".jsx", ".tsx"] }],
                "react/jsx-curly-brace-presence": "warn",
                "react/no-unused-prop-types": [
                    "warn",
                    { customValidators: [], skipShapeProps: true }
                ],

                "react/jsx-closing-bracket-location": [1, "line-aligned"],
                "react/jsx-tag-spacing": ["warn", { beforeSelfClosing: "always" }],
                "react/jsx-max-props-per-line": [
                    "warn",
                    { maximum: 1, when: "multiline" }
                ],
                "react/jsx-curly-spacing": ["warn", { children: true, when: "never" }],

                // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
                "jsx-a11y/accessible-emoji": "warn",
                "jsx-a11y/alt-text": "warn",
                "jsx-a11y/anchor-has-content": "warn",
                "jsx-a11y/anchor-is-valid": [
                    "warn",
                    {
                        aspects: ["noHref", "invalidHref"]
                    }
                ],
                "jsx-a11y/aria-activedescendant-has-tabindex": "warn",
                "jsx-a11y/aria-props": "warn",
                "jsx-a11y/aria-proptypes": "warn",
                "jsx-a11y/aria-role": "warn",
                "jsx-a11y/aria-unsupported-elements": "warn",
                "jsx-a11y/heading-has-content": "warn",
                "jsx-a11y/iframe-has-title": "warn",
                "jsx-a11y/img-redundant-alt": "warn",
                "jsx-a11y/no-access-key": "warn",
                "jsx-a11y/no-distracting-elements": "warn",
                "jsx-a11y/no-redundant-roles": "warn",
                "jsx-a11y/role-has-required-aria-props": "warn",
                "jsx-a11y/role-supports-aria-props": "warn",
                "jsx-a11y/scope": "warn"
            }
        }
    ]
};

export = config;
