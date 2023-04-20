import type { Linter } from "eslint";

const config: Linter.Config = {
    extends: [
        "plugin:@workleap/typescript-library"
    ]
};

export = config;
