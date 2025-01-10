import type { RslibConfig } from "@rslib/core";

export interface RslibConfigTransformerContext {
    environment: "dev" | "build";
}

export type RslibConfigTransformer = (config: RslibConfig, context: RslibConfigTransformerContext) => RslibConfig;

export function applyTransformers(config: RslibConfig, transformers: RslibConfigTransformer[], context: RslibConfigTransformerContext) {
    return transformers.reduce((acc, transformer) => transformer(acc, context), config);
}
