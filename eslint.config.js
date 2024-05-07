import workleapPlugin from "@workleap/eslint-plugin";

const {withLimitedScope, withIgnores} = workleapPlugin.helpers;

const config = [
        ...withIgnores(workleapPlugin.configs.monorepoWorkspace,
        [
            "**/dist/",
            "pnpm-lock.yaml",
            "*.md",
            "*.snap",
            "**/node_modules/",
            ".github/",
            "packages/",
            "sample/"
        ]),
        ...withLimitedScope(workleapPlugin.configs.typescriptLibrary, "packages/eslint-plugin/", ["lib/plugins.d.ts"]),

];

export default config;
