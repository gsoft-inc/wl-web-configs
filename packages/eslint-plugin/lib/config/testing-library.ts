import type { Linter } from "eslint";
import { concat } from "eslint-flat-config-utils";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import { reactTestFiles, testFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] = await concat(
    {
        name: "workleap/testing-library",
        files: reactTestFiles,
        plugins: {
            "testing-library": testingLibraryPlugin
        },
        rules: testingLibraryPlugin.configs.react.rules
    },
    {
        name: "workleap/testing-library",
        files: testFiles,
        plugins: {
            "testing-library": testingLibraryPlugin
        },
        rules: testingLibraryPlugin.configs.dom.rules
    }
);

export default config;
