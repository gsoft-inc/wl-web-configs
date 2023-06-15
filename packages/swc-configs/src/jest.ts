import type { Config } from "@swc/core";
import { resolveOverrides, type ConfigOverride } from "./resolveOverrides.ts";

export const DefaultJestConfig = {
    jsc: {
        parser: {
            syntax: "typescript"
        },
        // The output environment that the code will be compiled for.
        target: "es2022",
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

export interface DefineJestConfigOptions {
    react?: boolean;
    parser?: "ecmascript";
    configOverride?: ConfigOverride;
}

export function defineJestConfig({ react, parser, configOverride }: DefineJestConfigOptions = {}) {
    const config = { ...DefaultJestConfig } as Config;

    if (react) {
        config.jsc!.transform = {
            react: {
                // Use "react/jsx-runtime".
                runtime: "automatic",
                // Use the native "Object.assign()" instead of "_extends".
                useBuiltins: true
            }
        };
    }

    if (parser === "ecmascript") {
        config.jsc!.parser = {
            syntax: "ecmascript",
            jsx: react ? true : undefined
        };
    } else if (react) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.jsc!.parser!.tsx = true;
    }

    return resolveOverrides(config, configOverride);
}
