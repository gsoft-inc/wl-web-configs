import jestPlugin from 'eslint-plugin-jest';
import { reactTestFiles, testFiles } from "../utils/patterns";

import type { Linter } from "eslint";

const config: Linter.FlatConfig = {
    files: [...testFiles, ...reactTestFiles],
    ...jestPlugin.configs['flat/recommended'],
    rules: {
        // Prefer spies to allow for automatic restoration
        "jest/prefer-spy-on": "error",
        // Gives better failure messages for array checks
        "jest/prefer-to-contain": "error"
    }
}

export default config;
