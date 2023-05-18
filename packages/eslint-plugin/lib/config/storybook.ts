// https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts

import { storybookFiles, mainStorybookFiles, mdxFiles } from "../utils/patterns";
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
        },
        {
            files: mdxFiles,
            extends: ["plugin:mdx/recommended"]
        }
    ]
};

export = config;
