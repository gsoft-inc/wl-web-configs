import type { Linter } from "eslint";
import { mdxFiles, sourceFiles } from "../../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: sourceFiles,
            plugins: ["@workleap"],
            extends: [
                "plugin:@workleap/core",
                "plugin:@workleap/typescript",
                "plugin:@workleap/jest",
                "plugin:@workleap/testing-library"
            ]
        },
        {
            files: mdxFiles,
            plugins: ["@workleap"],
            extends: ["plugin:@workleap/mdx"]
        }
    ]
};

export = config;
