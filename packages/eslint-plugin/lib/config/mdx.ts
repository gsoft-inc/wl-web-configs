import type { Linter } from "eslint";
import { concat } from "eslint-flat-config-utils";
import * as mdxPlugin from "eslint-plugin-mdx";
import { mdxFiles } from "../utils/patterns.ts";

const config: Linter.FlatConfig[] = await concat(
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
);

export default config;
