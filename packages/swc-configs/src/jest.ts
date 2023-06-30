import type { Config } from "@swc/core";

export interface DefineJestConfigOptions {
    react?: boolean;
    parser?: "ecmascript" | "typescript";
}

export function defineJestConfig(options: DefineJestConfigOptions = {}) {
    const {
        react = false,
        parser = "typescript"
    } = options;

    const config: Config = {
        jsc: {
            parser: parser === "ecmascript"
                ? {
                    syntax: "ecmascript",
                    jsx: react
                }
                : {
                    syntax: "typescript",
                    tsx: react
                },
            // The output environment that the code will be compiled for.
            target: "es2022",
            transform: react
                ? {
                    react: {
                        // Use "react/jsx-runtime".
                        runtime: "automatic",
                        // Use the native "Object.assign()" instead of "_extends".
                        useBuiltins: true
                    }
                }
                : undefined,
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

    return config;
}
