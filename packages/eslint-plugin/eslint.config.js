import workleapPlugin from "@workleap/eslint-plugin";

const config = [
    ...workleapPlugin.configs.typescriptLibrary.map(conf => ({
        ...conf,
        ignores: ["lib/plugins.d.ts"]
    }))
];

export default config;
