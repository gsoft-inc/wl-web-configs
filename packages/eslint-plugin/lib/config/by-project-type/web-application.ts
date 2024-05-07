import type { Linter } from "eslint";
import { appendDebugName, withGlobals } from "../../utils/helpers.ts";
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
import yml from "../yaml.ts";

const config: Linter.FlatConfig[] = appendDebugName([
    {
        ignores: ["dist/"]
    },
    workleap,
    ...(withGlobals(core, ["node"])),
    ...(withGlobals(typescript, ["node"])),
    ...react,
    ...jsxA11y,
    ...jest,
    ...testingLibrary,
    ...storybook,
    ...mdx,
    ...packageJson,
    ...yml
], "WebApplication");

export default config;
