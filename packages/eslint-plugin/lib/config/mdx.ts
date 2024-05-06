import type { Linter } from "eslint";
import * as mdxPlugin from "eslint-plugin-mdx";
import { mdxFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] = [
    {
        ...mdxPlugin.flat,
        files: mdxFiles
    },
    {
        ...mdxPlugin.flatCodeBlocks,
        files: mdxFiles
    }
];

export default config;
