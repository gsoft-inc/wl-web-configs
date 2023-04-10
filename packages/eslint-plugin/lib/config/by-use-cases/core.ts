import type { Linter } from "eslint";

const config: Linter.Config = {
    plugins: ["import"],
    extends: [
        "eslint:recommended"
        // TODO, should we import those rules ? https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
    },
    env: {
        es6: true
    },
    rules: {
        // eslint:recommended warn instead of error
        "no-const-assign": "warn",
        "no-control-regex": "warn",
        "no-debugger": "warn",
        "no-delete-var": "warn",
        "no-dupe-args": "warn",
        "no-dupe-class-members": "warn",
        "no-dupe-keys": "warn",
        "no-duplicate-case": "warn",
        "no-empty-character-class": "warn",
        "no-empty-pattern": "warn",
        "no-ex-assign": "warn",
        "no-fallthrough": "warn",
        "no-func-assign": "warn",
        "no-invalid-regexp": "warn",
        "no-new-symbol": "warn",
        "no-obj-calls": "warn",
        "no-octal": "warn",
        "no-regex-spaces": "warn",
        "no-self-assign": "warn",
        "no-shadow-restricted-names": "warn",
        "no-sparse-arrays": "warn",
        "no-this-before-super": "warn",
        "no-undef": "error",
        "no-unexpected-multiline": "warn",
        "no-unreachable": "warn",
        "no-unused-labels": "warn",
        "no-useless-escape": "warn",
        "no-with": "warn",
        "require-yield": "warn",
        "use-isnan": "warn",
        "valid-typeof": "warn",
        "getter-return": "warn",
        "no-unused-vars": "warn",

        "constructor-super": "warn",
        "for-direction": "warn",
        "no-async-promise-executor": "warn",
        "no-case-declarations": "warn",
        "no-class-assign": "warn",
        "no-compare-neg-zero": "warn",
        "no-constant-condition": "warn",
        "no-dupe-else-if": "warn",
        "no-empty": "warn",
        "no-extra-boolean-cast": "warn",
        "no-extra-semi": "warn",
        "no-global-assign": "warn",
        "no-import-assign": "warn",
        "no-inner-declarations": "warn",
        "no-irregular-whitespace": "warn",
        "no-loss-of-precision": "warn",
        "no-misleading-character-class": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "no-nonoctal-decimal-escape": "warn",
        "no-redeclare": "warn",
        "no-setter-return": "warn",
        "no-unsafe-finally": "warn",
        "no-unsafe-negation": "warn",
        "no-unsafe-optional-chaining": "warn",
        "no-useless-backreference": "warn",
        "no-useless-catch": "warn",

        // eslint:recommended overwrite some rules
        "no-cond-assign": ["warn", "except-parens"],
        "no-labels": ["warn", { allowLoop: true, allowSwitch: false }],
        "no-prototype-builtins": "off",

        // https://eslint.org/docs/rules
        // Extra eslint rules
        "no-array-constructor": "warn",
        "no-caller": "warn",
        "no-eval": "warn",
        "new-parens": "warn",
        "array-callback-return": "warn",
        "no-extend-native": "warn",
        "no-extra-bind": "warn",
        "no-extra-label": "warn",
        "no-implied-eval": "warn",
        "no-iterator": "warn",
        "no-label-var": "warn",
        "no-lone-blocks": "warn",
        "no-loop-func": "warn",
        "no-multi-str": "warn",
        "no-native-reassign": "warn",
        "no-negated-in-lhs": "warn",
        "no-new-func": "warn",
        "no-new-object": "warn",
        "no-new-wrappers": "warn",
        "no-octal-escape": "warn",
        "no-useless-computed-key": "warn",
        "no-useless-concat": "warn",
        "no-useless-constructor": "warn",
        "no-whitespace-before-property": "warn",
        "no-script-url": "warn",
        "no-self-compare": "warn",
        "no-sequences": "warn",
        "no-template-curly-in-string": "warn",
        "no-throw-literal": "warn",
        "prefer-const": "warn",
        "no-var": "warn",
        "no-multi-spaces": "warn",
        "curly": "warn",
        "no-shadow": "warn",
        "no-restricted-properties": "warn",
        "no-unneeded-ternary": "warn",
        "no-param-reassign": "warn",
        "no-multiple-empty-lines": "warn",
        "space-infix-ops": "warn",

        // TODO: Those rules are disable, but not part of the eslint:recommended... should we remove them?
        "linebreak-style": "off",
        "quote-props": "off",
        "no-console": "off",
        "no-duplicate-imports": "off",
        "default-case": "off",

        "max-len": ["warn", { tabWidth: 4, code: 300 }],
        "indent": [
            "warn",
            4,
            {
                SwitchCase: 1,
                CallExpression: { arguments: "first" }
            }
        ],
        "semi": ["warn", "always"],
        "quotes": ["warn", "double"],
        "comma-dangle": ["warn", "never"],
        "object-curly-spacing": ["warn", "always"],
        "dot-location": ["warn", "property"],
        "eqeqeq": ["warn", "smart"],
        "arrow-parens": ["warn", "as-needed"],
        "no-mixed-operators": [
            "warn",
            {
                groups: [
                    ["&", "|", "^", "~", "<<", ">>", ">>>"],
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                    ["&&", "||"],
                    ["in", "instanceof"]
                ],
                allowSamePrecedence: false
            }
        ],
        "no-restricted-syntax": ["warn", "WithStatement"],
        "no-restricted-globals": ["error"],
        "no-unused-expressions": [
            "error",
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true
            }
        ],
        "no-use-before-define": [
            "warn",
            {
                functions: false,
                classes: false,
                variables: false
            }
        ],
        "no-useless-rename": [
            "warn",
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false
            }
        ],
        "rest-spread-spacing": ["warn", "never"],
        "strict": ["warn", "never"],
        "unicode-bom": ["warn", "never"],
        "padding-line-between-statements": [
            "warn",
            { blankLine: "always", prev: "*", next: "return" }
        ],
        "comma-spacing": ["warn", { "before": false, "after": true }],
        "keyword-spacing": ["warn", { before: true, after: true }],
        "arrow-spacing": ["warn", { before: true, after: true }],
        "space-before-blocks": ["warn", "always"],
        "space-in-parens": ["warn", "never"],
        "padded-blocks": ["warn", "never"],
        "brace-style":["warn", "1tbs", { "allowSingleLine": true }],

        // https://github.com/import-js/eslint-plugin-import/tree/main/docs/rules
        "import/no-amd": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/no-self-import": "error",
        "import/newline-after-import" : "warn",
        "import/no-duplicates": "warn"
    }
};

export = config;