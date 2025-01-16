// https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts

import { mainStorybookFiles, storybookFiles } from "../utils/patterns";

import type { Linter } from "eslint";

const config: Linter.Config = {
    overrides: [
        {
            files: storybookFiles,
            plugins: ["storybook"],
            extends: [
                "plugin:storybook/recommended",
                "plugin:storybook/csf",
                "plugin:storybook/csf-strict"
            ]
        },
        {
            files: mainStorybookFiles,
            rules: {
                "storybook/no-uninstalled-addons": "warn"
            }
        }
    ]
};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = config;

