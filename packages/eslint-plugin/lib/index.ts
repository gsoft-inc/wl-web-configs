import { ESLint } from "eslint";

const plugin: ESLint.Plugin = {
    rules: {
        "strict-css-modules-names": require("./rules/strict-css-modules-names")
    },
    configs: {
        // by use cases
        core: require("./config/parts/core"),
        jest: require("./config/parts/jest"),
        react: require("./config/parts/react"),
        storybook: require("./config/parts/storybook"),
        "testing-library": require("./config/parts/testing-library"),
        typescript: require("./config/parts/typescript"),

        // by project type
        "react-library": require("./config/by-project-type/react-library"),
        "typescript-library": require("./config/by-project-type/typescript-library"),
        "web-application": require("./config/by-project-type/web-application"),
        "monorepo-root": require("./config/by-project-type/monorepo-root")
    }
};

export = plugin;
