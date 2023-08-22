import type { Options as TsupConfig } from "tsup";
import { applyTransformers, type TsupConfigTransformer } from "./applyTransformers";

export interface DefineDevConfigOptions extends TsupConfig {
    transformers?: TsupConfigTransformer[];
}

export function defineDevConfig(options: DefineDevConfigOptions = {}) {
    const {
        transformers = [],
        ...rest
    } = options;

    const config: TsupConfig = {
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
        environment: "dev"
    });

    return transformedConfig;
}
