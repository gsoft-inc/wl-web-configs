import type { ESLint } from "eslint";

const plugin: ESLint.Plugin = {
    rules: {
        "strict-css-modules-names": require("./rules/strict-css-modules-names")
    },
    configs: {
        // by use cases
        core: require("./config/core"),
        jest: require("./config/jest"),
        react: require("./config/react"),
        storybook: require("./config/storybook"),
        "testing-library": require("./config/testing-library"),
        typescript: require("./config/typescript"),

        // by project type
        "react-library": require("./config/by-project-type/react-library"),
        "typescript-library": require("./config/by-project-type/typescript-library"),
        "web-application": require("./config/by-project-type/web-application"),
        "monorepo-root": require("./config/by-project-type/monorepo-root")
    }
};

export = plugin;
