import type { Configuration as WebpackConfig } from "webpack";

export * from "./build.ts";
export * from "./dev.ts";
export type { WebpackConfigTransformer, WebpackConfigTransformerContext } from "./transformers/applyTransformers.ts";
export * from "./transformers/moduleRules.ts";
export * from "./transformers/plugins.ts";
export type { WebpackConfig };

