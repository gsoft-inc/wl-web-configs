import type { Configuration as WebpackConfig } from "webpack";

export interface WebpackConfigTransformerContext {
    environment: "dev" | "build";
    verbose: boolean;
}

export type WebpackConfigTransformer = (config: WebpackConfig, context: WebpackConfigTransformerContext) => WebpackConfig;

export function applyTransformers(config: WebpackConfig, transformers: WebpackConfigTransformer[], context: WebpackConfigTransformerContext) {
    let count = 0;

    const transformedConfig = transformers.reduce((acc, transformer) => {
        transformer(acc, context);

        count += 1;

        return acc;
    }, config);

    if (context.verbose) {
        if (count > 0) {
            console.log(`[webpack-configs] Applied ${count} configuration transformers.`);
        }
    }

    return transformedConfig;
}
