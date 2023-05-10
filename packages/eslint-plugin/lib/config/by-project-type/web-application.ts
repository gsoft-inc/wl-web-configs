import type { Linter } from "eslint";

const config: Linter.Config = {
    extends: [
        "plugin:@workleap/core",
        "plugin:@workleap/typescript",
        "plugin:@workleap/react",
        "plugin:@workleap/jest",
        "plugin:@workleap/testing-library",
        "plugin:@workleap/storybook"
    ],
    env: {
        browser: true,
        es6: true
    },
    rules: {
        // Custom WorkLeap rules
        // "@workleap/strict-css-modules-names": "warn" // disabled since this causes an issue(https://github.com/workleap/wl-web-configs/issues/31). Will reenable once a fix has been done
    }
};

export = config;
