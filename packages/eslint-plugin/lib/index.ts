import type { ESLint } from "eslint";

const plugin: ESLint.Plugin = {
    rules: {
        "strict-css-modules-names": require("./rules/strict-css-modules-names")
    },
    configs: {
        // Parts
        core: require("./config/core"),
        jest: require("./config/jest"),
        mdx: require("./config/mdx"),
        react: require("./config/react"),
        storybook: require("./config/storybook"),
        "testing-library": require("./config/testing-library"),
        typescript: require("./config/typescript"),

        // By project type
        "react-library": require("./config/by-project-type/react-library"),
        "typescript-library": require("./config/by-project-type/typescript-library"),
        "web-application": require("./config/by-project-type/web-application"),
        "monorepo-workspace": require("./config/by-project-type/monorepo-workspace")
    }
};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = plugin;
