import type { Linter } from "eslint";

const config: Linter.Config = {
    extends: [
        "plugin:@workleap/core",
        "plugin:@workleap/typescript",
        "plugin:@workleap/jest",
        "plugin:@workleap/testing-library"
    ],
    env: {
        es6: true
    }
};

export = config;
