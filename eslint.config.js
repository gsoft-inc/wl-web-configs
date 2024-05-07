import workleapPlugin from "@workleap/eslint-plugin";

const { withLimitedScope, withIgnores } = workleapPlugin.helpers;

const config = [
    ...withIgnores(workleapPlugin.configs.monorepoWorkspace, [
        "**/dist/",
        "pnpm-lock.yaml",
        "*.md",
        "*.snap",
        "**/node_modules/",
        ".github/"
    ]),
    ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "packages/browserslist-config/"),
    ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "packages/eslint-plugin/", ["lib/plugins.d.ts"]),
    ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "packages/postcss-configs/"),
    ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "packages/stylelint-configs/"),
    ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "packages/swc-configs/"),
    ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "packages/tsup-configs/"),
    ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "packages/webpack-configs/"),
    ...withLimitedScope(workleapPlugin.configs.webApplication, "sample/app/"),
    ...withLimitedScope(workleapPlugin.configs.reactLibrary, "sample/components/"),
    ...withLimitedScope(workleapPlugin.configs.reactLibrary, "sample/components/"),
    ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "sample/utils/"),
];

export default config;
