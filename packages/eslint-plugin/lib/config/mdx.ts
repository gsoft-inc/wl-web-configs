import type { Linter } from "eslint";
import * as mdxPlugin from "eslint-plugin-mdx";
import { mdxFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] = [
    {
        name: "Workleap/MDX",
        ...mdxPlugin.flat,
        files: mdxFiles
    },
    {
        name: "Workleap/MDX",
        ...mdxPlugin.flatCodeBlocks,
        files: mdxFiles
    }
];

export default config;
