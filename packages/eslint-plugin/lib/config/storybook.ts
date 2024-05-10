// https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts

import type { Linter } from "eslint";
import { concat } from "eslint-flat-config-utils";
import * as storybookPlugin from "eslint-plugin-storybook";
import { mainStorybookFiles, storybookFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] = await concat(
    {
        name: "workleap/storybook",
        files: storybookFiles,
        plugins: { "storybook": storybookPlugin },
        rules: {
            ...storybookPlugin.configs.recommended.overrides[0].rules,
            ...storybookPlugin.configs.csf.overrides[0].rules,
            ...storybookPlugin.configs["csf-strict"].rules
        }
    },
    {
        name: "workleap/storybook",
        files: mainStorybookFiles,
        plugins: { "storybook": storybookPlugin },
        rules: {
            "storybook/no-uninstalled-addons": "warn"
        }
    }
);

export default config;
