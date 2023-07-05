import type { Config } from "jest";
import { config as swcConfig } from "./swc.jest.ts";

const config: Config = {
    testEnvironment: "node",
    transform: {
        "^.+\\.ts$": ["@swc/jest", swcConfig as Record<string, unknown>]
    }
};

export default config;
