import type { Configuration as WebpackConfig } from "webpack";

export interface WebpackConfigTransformerContext {
    environment: "dev" | "build";
}

export type WebpackConfigTransformer = (config: WebpackConfig, context: WebpackConfigTransformerContext) => WebpackConfig;

export function applyTransformers(config: WebpackConfig, transformers: WebpackConfigTransformer[], context: WebpackConfigTransformerContext) {
    return transformers.reduce((acc, transformer) => transformer(acc, context), config);
}
