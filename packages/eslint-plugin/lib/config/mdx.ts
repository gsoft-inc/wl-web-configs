import type { Linter } from "eslint";
import mdxPlugin from "eslint-plugin-mdx";
import { mdxFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] = [
    {
        ...mdxPlugin.configs.flat,
        files: mdxFiles
    }
];

export default config;
