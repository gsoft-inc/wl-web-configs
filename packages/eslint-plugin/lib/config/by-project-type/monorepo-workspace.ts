import type { Linter } from "eslint";
import core from "../core.ts";
import jest from "../jest.ts";
import mdx from "../mdx.ts";
import packageJson from "../package-json.ts";
import testingLibrary from "../testing-library.ts";
import typescript from "../typescript.ts";
import yml from "../yaml.ts";

const config: Linter.FlatConfig[] = [
    core,
    typescript,
    jest,
    ...testingLibrary,
    mdx,
    {
        ...packageJson,
        rules: {
            ...packageJson.rules,
            "package-json/valid-version": "off"
        }
    },
    ...yml
];

export default config;
