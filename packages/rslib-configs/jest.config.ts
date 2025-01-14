import type { Config } from "jest";
import path from "node:path";
import { swcConfig } from "./swc.jest.ts";

const config: Config = {
    testRegex: "/tests/*/.*\\.test\\.ts$",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    transformIgnorePatterns: [
        // Must exclude @rslib/core from the transform ignore files
        // because it's an ESM only project which must be processed by SWC.
        // The pattern is optimized for PNPM, for more info view:
        // - https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
        // - https://jestjs.io/docs/ecmascript-modules
        `${path.join(
            __dirname,
            "../.."
        )}/node_modules/.pnpm/(?!(@rslib\\+core)@)`
    ],
    transform: {
        "^.+\\.(js|ts)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    },
    cacheDirectory: "./node_modules/.cache/jest",
    clearMocks: true,
    verbose: true
};

export default config;
