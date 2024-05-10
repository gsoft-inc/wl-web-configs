import workleapPlugin from "@workleap/eslint-plugin";

const config = [
    {
        ignores: ["lib/plugins.d.ts"]
    },
    ...workleapPlugin.configs.typescriptLibrary
];

export default config;
