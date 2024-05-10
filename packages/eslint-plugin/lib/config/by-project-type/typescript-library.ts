import type { Linter } from "eslint";
import { concat } from "eslint-flat-config-utils";
import core from "../core.ts";
import jest from "../jest.ts";
import mdx from "../mdx.ts";
import packageJson from "../package-json.ts";
import testingLibrary from "../testing-library.ts";
import typescript from "../typescript.ts";

const config: Linter.FlatConfig[] = await concat(
    {
        ignores: ["dist/"]
    },
    core,
    typescript,
    jest,
    testingLibrary,
    mdx,
    packageJson
);

export default config;
