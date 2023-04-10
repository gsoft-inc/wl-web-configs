import { ESLint } from "eslint";

const plugin: ESLint.Plugin = {
    rules: {
        "strict-css-modules-names": require("./rules/strict-css-modules-names")
    },
    configs: {
        // by use cases
        core: require("./config/by-use-cases/core"),
        jest: require("./config/by-use-cases/jest"),
        react: require("./config/by-use-cases/react"),
        storybook: require("./config/by-use-cases/storybook"),
        "testing-library": require("./config/by-use-cases/testing-library"),
        typescript: require("./config/by-use-cases/typescript"),

        // by project type
        "react-library": require("./config/by-project-type/react-library"),
        "typescript-library": require("./config/by-project-type/typescript-library"),
        "web-application": require("./config/by-project-type/web-application")
    }
};

export = plugin;