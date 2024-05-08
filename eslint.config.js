import workleapPlugin from "@workleap/eslint-plugin";
import { concat, extend } from "eslint-flat-config-utils";

const config = concat(
    {
        ignores: [
            "**/dist/",
            "pnpm-lock.yaml",
            "*.md",
            "*.snap",
            "**/node_modules/",
            ".github/"
        ]
    },
    workleapPlugin.configs.monorepoWorkspace,
    extend(workleapPlugin.configs.typescriptLibrary, "packages/browserslist-config/"),
    extend(workleapPlugin.configs.typescriptLibrary, {
        ignores: ["lib/plugins.d.ts"]
    }, "packages/eslint-plugin/"),
    extend(workleapPlugin.configs.typescriptLibrary, "packages/postcss-configs/"),
    extend(workleapPlugin.configs.typescriptLibrary, "packages/stylelint-configs/"),
    extend(workleapPlugin.configs.typescriptLibrary, "packages/swc-configs/"),
    extend(workleapPlugin.configs.typescriptLibrary, "packages/tsup-configs/"),
    extend(workleapPlugin.configs.typescriptLibrary, "packages/webpack-configs/"),
    extend(workleapPlugin.configs.webApplication, "sample/app/"),
    extend(workleapPlugin.configs.reactLibrary, "sample/components/"),
    extend(workleapPlugin.configs.typescriptLibrary, "sample/utils/")
);

export default config;
