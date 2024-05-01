import type { Linter } from "eslint";
import ymlPlugin from 'eslint-plugin-yml';
import { yamlFiles } from "../utils/patterns";

const config: Linter.FlatConfig = {
    ...ymlPlugin.configs['flat/recommended'],
    files: yamlFiles,
}

export default config;
