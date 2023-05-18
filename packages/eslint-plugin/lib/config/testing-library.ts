import type { Linter } from "eslint";
import { testFiles, reactTestFiles } from "../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: reactTestFiles,
            plugins: ["testing-library"],
            extends: ["plugin:testing-library/react"]
        },
        {
            files: testFiles,
            extends: ["plugin:testing-library/dom"]
        }
    ]
};

export = config;
