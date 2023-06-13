import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { swcConfig } from "./swc.jest.ts";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    },
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: "<rootDir>"
        })
    }
};

export default config;
