// https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts

import type { Linter } from "eslint";

const config: Linter.Config = {
    extends: ["plugin:mdx/recommended"]
};

export = config;
