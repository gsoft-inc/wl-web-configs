import type { Configuration } from "webpack";

// TODO: Might want to add stuff like the environment variables?
export interface WebpackConfigTransformerContext {
    env: "dev" | "build";
}

export type WebpackConfigTransformer = (config: Configuration, context: WebpackConfigTransformerContext) => Configuration;

export function applyTransformers(config: Configuration, transformers: WebpackConfigTransformer[], context: WebpackConfigTransformerContext) {
    if (!transformers) {
        return config;
    }

    return transformers.reduce((acc, transformer) => transformer(acc, context), config);
}
