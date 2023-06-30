import type { Config } from "@swc/core";

export interface DefineDevConfigOptions {
    // Any is also used for SWC "targets" type.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    browsers: any;
    fastRefresh?: boolean;
    parser?: "ecmascript" | "typescript";
}

export function defineDevConfig(options: DefineDevConfigOptions) {
    const {
        browsers,
        fastRefresh = false,
        parser = "typescript"
    } = options;

    const config: Config = {
        jsc: {
            parser: parser === "ecmascript"
                ? {
                    syntax: "ecmascript",
                    jsx: true
                }
                : {
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
                    refresh: fastRefresh
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
        },
        env: {
            targets: browsers
        }
    };

    return config;
}
