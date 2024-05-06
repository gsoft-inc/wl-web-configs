import workleapPlugin from "@workleap/eslint-plugin";

const config = [
    {
        ignores: [
            "dist/",
            "pnpm-lock.yaml",
            "*.md",
            "*.snap",
            "node_modules/",
            ".github/",
            "packages/",
            "sample/"
        ]
    },
    ...workleapPlugin.configs.monorepoWorkspace
];

export default config;
