import workleapPlugin from "./dist/index.js";

const config = [
    {
        ignores: ["**/dist/**"]
    },
    ...workleapPlugin.configs.typeScriptLibrary
];

export default config;
