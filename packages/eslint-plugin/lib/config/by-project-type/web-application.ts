import type { Linter } from "eslint";
import { concat } from "eslint-flat-config-utils";
import core from "../core.ts";
import jest from "../jest.ts";
import jsxA11y from "../jsx-a11y.ts";
import mdx from "../mdx.ts";
import packageJson from "../package-json.ts";
import react from "../react.ts";
import storybook from "../storybook.ts";
import testingLibrary from "../testing-library.ts";
import typescript from "../typescript.ts";
import workleap from "../workleap.ts";

const config: Linter.FlatConfig[] = await concat(
    {
        ignores: ["dist/"]
    },
    workleap,
    core,
    typescript,
    react,
    jsxA11y,
    jest,
    testingLibrary,
    storybook,
    mdx,
    packageJson
);

export default config;
