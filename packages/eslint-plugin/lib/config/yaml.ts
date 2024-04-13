import type { Linter } from "eslint";
import { yamlFiles } from "../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: yamlFiles,
            plugins: ["yml"],
            extends: ["plugin:yml/recommended"],
            parser: "yaml-eslint-parser"
        }
    ]
};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = config;
