import typeScriptLibrary from "./dist/config/by-project-type/typescript-library.js";

const config = [
    {
        ignores: ["**/dist/**"]
    },
    ...typeScriptLibrary
];

export default config;
