import type { Options } from "tsup";
import { applyTransformers, type TsupConfigTransformer } from "./applyTransformers";

export interface DefineDevConfigOptions extends Options {
    transformers?: TsupConfigTransformer[];
}

export function defineDevConfig(options: DefineDevConfigOptions = {}) {
    const {
        transformers = [],
        ...rest
    } = options;

    const config: Options = {
        dts: true,
        watch: true,
        entry: ["./src"],
        outDir: "./dist",
        format: "esm",
        target: "esnext",
        platform: "browser",
        sourcemap: "inline",
        ...rest
    };

    const transformedConfig = applyTransformers(config, transformers, {
        env: "dev"
    });

    return transformedConfig;
}
