import type { WebpackConfig } from "../types.ts";

export interface WebpackConfigTransformerContext {
    environment: "dev" | "build";
    verbose: boolean;
}

export type WebpackConfigTransformer = (config: WebpackConfig, context: WebpackConfigTransformerContext) => WebpackConfig;

export function applyTransformers(config: WebpackConfig, transformers: WebpackConfigTransformer[], context: WebpackConfigTransformerContext) {
    let count = 0;

    const transformedConfig = transformers.reduce((acc, transformer) => {
        const newConfig = transformer(acc, context);

        count += 1;

        return newConfig;
    }, config);

    if (context.verbose) {
        if (count > 0) {
            console.log(`[webpack-configs] Applied ${count} configuration transformers.`);
        }
    }

    return transformedConfig;
}
