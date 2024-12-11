import type { Config } from "jest";
import { swcConfig } from "./swc.jest";

const config: Config = {
    testRegex: "/tests/*/.*\\.test\\.(ts|tsx)$",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    transform: {
        "^.+\\.(js|ts)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    },
    cacheDirectory: "./node_modules/.cache/jest",
    clearMocks: true,
    verbose: true
};

export default config;
