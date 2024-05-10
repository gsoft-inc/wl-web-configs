import workleapPlugin from "@workleap/eslint-plugin";
import { concat, extend } from "eslint-flat-config-utils";
import packageBrowserslistConfig from "./packages/browserslist-config/eslint.config.mjs";
import packageEslintPlugin from "./packages/eslint-plugin/eslint.config.js";
import packagePostcssConfigs from "./packages/postcss-configs/eslint.config.js";
import packageStylelintConfigs from "./packages/stylelint-configs/eslint.config.mjs";
import packageSwcConfigs from "./packages/swc-configs/eslint.config.mjs";
import packageTsupConfigs from "./packages/tsup-configs/eslint.config.mjs";
import packageWebpackConfigs from "./packages/webpack-configs/eslint.config.js";
import sampleApp from "./sample/app/eslint.config.js";
import sampleComponents from "./sample/components/eslint.config.js";
import sampleUtils from "./sample/utils/eslint.config.js";

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
    extend(packageBrowserslistConfig, "packages/browserslist-config/"),
    extend(packageEslintPlugin, "packages/eslint-plugin/"),
    extend(packagePostcssConfigs, "packages/postcss-configs/"),
    extend(packageStylelintConfigs, "packages/stylelint-configs/"),
    extend(packageSwcConfigs, "packages/swc-configs/"),
    extend(packageTsupConfigs, "packages/tsup-configs/"),
    extend(packageWebpackConfigs, "packages/webpack-configs/"),
    extend(sampleApp, "sample/app/"),
    extend(sampleComponents, "sample/components/"),
    extend(sampleUtils, "sample/utils/")
);

export default config;
