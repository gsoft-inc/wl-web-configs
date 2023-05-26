import type { Config } from "jest";

const config: Config = {
    projects: [
        "<rootDir>/packages/*"
    ],
    testRegex: "/tests/*/.*\\.test\\.(ts|tsx)$",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    cacheDirectory: "./node_modules/.cache/jest",
    clearMocks: true,
    verbose: true
};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = config;
