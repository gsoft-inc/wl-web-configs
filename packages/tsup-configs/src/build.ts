import type { Options } from "tsup";
import { applyTransformers, type TsupConfigTransformer } from "./applyTransformers";

export interface DefineBuildConfigOptions extends Options {
    transformers?: TsupConfigTransformer[];
}

export function defineBuildConfig(options: DefineBuildConfigOptions = {}) {
    const {
        transformers = [],
        ...rest
    } = options;

    const config: Options = {
        clean: true,
        dts: true,
        treeshake: true,
        entry: ["./src"],
        outDir: "./dist",
        format: "esm",
        target: "esnext",
        platform: "browser",
        ...rest
    };

    const transformedConfig = applyTransformers(config, transformers, {
        environment: "build"
    });

    return transformedConfig;
}

