import type { Config } from "@swc/core";

export interface SwcConfigTransformerContext {
    environment: "dev" | "build" | "jest";
}

export type SwcConfigTransformer = (config: Config, context: SwcConfigTransformerContext) => Config;

export function applyTransformers(config: Config, transformers: SwcConfigTransformer[], context: SwcConfigTransformerContext) {
    return transformers.reduce((acc, transformer) => transformer(acc, context), config);
}
