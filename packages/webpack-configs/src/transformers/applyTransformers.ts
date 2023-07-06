import type { Configuration } from "webpack";

export interface WebpackConfigTransformerContext {
    environment: "dev" | "build";
}

export type WebpackConfigTransformer = (config: Configuration, context: WebpackConfigTransformerContext) => Configuration;

export function applyTransformers(config: Configuration, transformers: WebpackConfigTransformer[], context: WebpackConfigTransformerContext) {
    return transformers.reduce((acc, transformer) => transformer(acc, context), config);
}
