import workleapPlugin from "./dist/index.js";

const config = [
    {
        ignores: ["dist/"]
    },
    ...workleapPlugin.configs.typescriptLibrary
];

export default config;
