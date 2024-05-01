import type { Linter } from "eslint";
import mdxPlugin from "eslint-plugin-mdx";
import { mdxFiles } from "../utils/patterns";

const config: Linter.FlatConfig =
    {
        ...mdxPlugin.configs.flat,
        files: mdxFiles
    };


export default config;
