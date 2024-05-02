import type { Linter } from "eslint";
import ymlPlugin from "eslint-plugin-yml";
import { yamlFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] =
    ymlPlugin.configs["flat/recommended"].map(conf => ({
        ...conf,
        files: yamlFiles
    }));

export default config;
