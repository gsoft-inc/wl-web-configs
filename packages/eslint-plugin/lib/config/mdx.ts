import type { Linter } from "eslint";
import * as mdxPlugin from "eslint-plugin-mdx";
import { mdxFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] = [
    {
        name: "workleap/mdx",
        ...mdxPlugin.flat,
        files: mdxFiles,
        processor: mdxPlugin.createRemarkProcessor({
            lintCodeBlocks: true
        })
    }
];

export default config;
