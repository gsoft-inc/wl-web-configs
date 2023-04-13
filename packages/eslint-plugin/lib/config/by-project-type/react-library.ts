import type { Linter } from "eslint";

const config: Linter.Config = {
    reportUnusedDisableDirectives: true,
    extends: [
        "plugin:@workleap/core",
        "plugin:@workleap/typescript",
        "plugin:@workleap/react",
        "plugin:@workleap/jest",
        "plugin:@workleap/testing-library",
        "plugin:@workleap/storybook"
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        es6: true
    }
};

export = config;
