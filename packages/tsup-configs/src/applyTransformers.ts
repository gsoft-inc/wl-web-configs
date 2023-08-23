import type { Options as TsupConfig } from "tsup";

export interface TsupConfigTransformerContext {
    environment: "dev" | "build";
}

export type TsupConfigTransformer = (config: TsupConfig, context: TsupConfigTransformerContext) => TsupConfig;

export function applyTransformers(config: TsupConfig, transformers: TsupConfigTransformer[], context: TsupConfigTransformerContext) {
    return transformers.reduce((acc, transformer) => transformer(acc, context), config);
}
