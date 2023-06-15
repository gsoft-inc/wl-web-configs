import type { Config } from "@swc/core";
import { resolveOverrides, type ConfigOverride } from "./resolveOverrides.ts";

export const DefaultDevConfig = {
    jsc: {
        parser: {
            syntax: "typescript",
            tsx: true
        },
        // The output environment that the code will be compiled for.
        target: "es2022",
        transform: {
            react: {
                // Use "react/jsx-runtime".
                runtime: "automatic",
                // Use the native "Object.assign()" instead of "_extends".
                useBuiltins: true,
                // Enable React experimental "fast-refresh" feature.
                // Also need to install @pmmmwh/react-refresh-webpack-plugin.
                refresh: false
            }
        },
        // Import shims from an external module rather than inlining them in bundle files to greatly reduce the bundles size.
        // Requires to add "@swc/helpers" as a project dependency
        externalHelpers: true
    },
    module: {
        // The output module resolution system that the code will be compiled for.
        type: "es6",
        // Prevent SWC from exporting the `__esModule` property.
        strict: true,
        // Preserve dynamic imports.
        ignoreDynamic: true
    }
};

export interface DefineDevConfigOptions {
    fastRefresh?: boolean;
    parser?: "ecmascript";
    configOverride?: ConfigOverride;
}

export function defineDevConfig({ fastRefresh, parser, configOverride }: DefineDevConfigOptions = {}) {
    const config = { ...DefaultDevConfig } as Config;

    if (fastRefresh) {
        config.jsc!.transform!.react!.refresh = true;
    }

    if (parser === "ecmascript") {
        config.jsc!.parser = {
            syntax: "ecmascript",
            jsx: true
        };
    }

    return resolveOverrides(config, configOverride);
}
