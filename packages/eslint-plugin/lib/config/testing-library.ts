import type { Linter } from "eslint";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import { reactTestFiles, testFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] = [
    {
        files: reactTestFiles,
        plugins: {
            "testing-library": testingLibraryPlugin
        },
        rules: testingLibraryPlugin.configs.react.rules
    },
    {
        files: testFiles,
        plugins: {
            "testing-library": testingLibraryPlugin
        },
        rules: testingLibraryPlugin.configs.dom.rules
    }
];

export default config;
