import type { Config } from "jest";
import { swcConfig } from "./swc.jest.ts";

const config: Config = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    }
};

export default config;
