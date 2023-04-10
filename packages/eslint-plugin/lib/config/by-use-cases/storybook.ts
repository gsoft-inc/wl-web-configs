// https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts

import { storybookFiles, mainStorybookFiles } from "../../utils/patterns";
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
            ],
            rules: {
                // recommended https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts
                "import/no-anonymous-default-export": "off",
                "storybook/await-interactions": "warn",
                "storybook/context-in-play-function": "warn",
                "storybook/default-exports": "warn",
                "storybook/hierarchy-separator": "warn",
                "storybook/no-redundant-story-name": "warn",
                "storybook/prefer-pascal-case": "warn",
                "storybook/story-exports": "warn",
                "storybook/use-storybook-expect": "warn",
                "storybook/use-storybook-testing-library": "warn",

                // csf https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/csf.ts
                "storybook/csf-component": "warn",

                // csf-strict https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/csf-strict.ts
                "storybook/no-stories-of": "warn",
                "storybook/no-title-property-in-meta": "warn"
            }
        },
        {
            files: mainStorybookFiles,
            rules: {
                "storybook/no-uninstalled-addons": "warn"
            }
        }
    ]
};

export = config;
