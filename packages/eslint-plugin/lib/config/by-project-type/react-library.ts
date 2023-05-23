import type { Linter } from "eslint";
import { sourceFiles, mdxFiles } from "../../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: sourceFiles,
            plugins: ["@workleap"],
            extends: [
                "plugin:@workleap/core",
                "plugin:@workleap/typescript",
                "plugin:@workleap/react",
                "plugin:@workleap/jest",
                "plugin:@workleap/testing-library",
                "plugin:@workleap/storybook"
            ],
            rules: {
                // Custom WorkLeap rules
                "@workleap/strict-css-modules-names": "warn"
            }
        },
        {
            files: mdxFiles,
            plugins: ["@workleap"],
            extends: ["plugin:@workleap/mdx"]
        }
    ]
};

export = config;
