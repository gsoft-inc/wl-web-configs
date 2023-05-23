import type { Linter } from "eslint";
import { testFiles, reactTestFiles } from "../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: [...testFiles, ...reactTestFiles],
            plugins: ["jest"],
            env: {
                jest: true,
                browser: true,
                node: true
            },
            extends: ["plugin:jest/recommended"],
            rules: {
                // Prefer spies to allow for automatic restoration
                "jest/prefer-spy-on": "error",
                // Gives better failure messages for array checks
                "jest/prefer-to-contain": "error"
            }
        }
    ]
};

export = config;
