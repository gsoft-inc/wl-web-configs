import { applyTransformers, type SwcConfigTransformer } from "./applyTransformers";
import type { SwcConfig } from "./types";

export interface DefineJestConfigOptions {
    react?: boolean;
    parser?: "ecmascript" | "typescript";
    transformers?: SwcConfigTransformer[];
}

export function defineJestConfig(options: DefineJestConfigOptions = {}) {
    const {
        react = false,
        parser = "typescript",
        transformers = []
    } = options;

    const config: SwcConfig = {
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
                : undefined
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

    const transformedConfig = applyTransformers(config, transformers, {
        environment: "jest"
    });

    return transformedConfig;
}
