import type { ESLint } from "eslint";
import monorepoWorkspace from "./config/by-project-type/monorepo-workspace.ts";
import reactLibrary from "./config/by-project-type/react-library.ts";
import typescriptLibrary from "./config/by-project-type/typescript-library.ts";
import webApplication from "./config/by-project-type/web-application.ts";
import core from "./config/core.ts";
import jest from "./config/jest.ts";
import jsxA11y from "./config/jsx-a11y.ts";
import mdx from "./config/mdx.ts";
import packageJson from "./config/package-json.ts";
import react from "./config/react.ts";
import storybook from "./config/storybook.ts";
import testingLibrary from "./config/testing-library.ts";
import typescript from "./config/typescript.ts";
import workleap from "./config/workleap.ts";

const plugin: ESLint.Plugin = {
    rules: {
        ...workleap.plugins!["@workleap"].rules
    },
    configs: {
        // Parts
        workleap,
        core,
        jest,
        mdx,
        react,
        storybook,
        typescript,
        jsxA11y,
        testingLibrary,
        packageJson,

        // By project type
        reactLibrary,
        typescriptLibrary,
        webApplication,
        monorepoWorkspace
    }
};

export default plugin;
