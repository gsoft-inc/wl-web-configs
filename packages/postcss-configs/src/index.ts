import type { Config, ConfigPlugin } from "postcss-load-config";
import postcssPresetEnv, { type pluginOptions as PostcssPresetEnvOptions } from "postcss-preset-env";

export type PostcssConfigTransformer = (config: Config) => Config;

function applyTransformers(config: Config, transformers: PostcssConfigTransformer[]) {
    return transformers.reduce((acc, transformer) => transformer(acc), config);
}

export const DefaultPresetEnvOptions = {
    autoprefixer: {
        flexbox: "no-2009"
    },
    stage: 3
} satisfies PostcssPresetEnvOptions;

export interface DefineConfigOptions {
    plugins?: ConfigPlugin[];
    browsers?: Required<PostcssPresetEnvOptions["browsers"]>;
    presetEnvOptions?: Omit<PostcssPresetEnvOptions, "browsers">;
    transformers?: PostcssConfigTransformer[];
}

export function defineConfig(options: DefineConfigOptions = {}) {
    const {
        plugins = [],
        browsers,
        presetEnvOptions = DefaultPresetEnvOptions,
        transformers = []
    } = options;

    let _options: PostcssPresetEnvOptions = presetEnvOptions;

    if (browsers) {
        _options = {
            ...presetEnvOptions,
            browsers
        };
    }

    const config: Config = {
        plugins: [
            // Typings are wrong, it's callable.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            postcssPresetEnv(_options),
            ...plugins
        ]
    };

    const transformedConfig = applyTransformers(config, transformers);

    return transformedConfig;
}
