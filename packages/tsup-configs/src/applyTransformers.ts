import type { Options } from "tsup";

export interface TsupConfigTransformerContext {
    env: "dev" | "build";
}

export type TsupConfigTransformer = (config: Options, context: TsupConfigTransformerContext) => Options;

export function applyTransformers(config: Options, transformers: TsupConfigTransformer[], context: TsupConfigTransformerContext) {
    return transformers.reduce((acc, transformer) => transformer(acc, context), config);
}
