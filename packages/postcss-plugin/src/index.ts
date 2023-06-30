import type { Config } from "postcss-load-config";
import postcssPresetEnv, { type pluginOptions as PostcssPresetEnvOptions } from "postcss-preset-env";

export const DefaultPresetEnvOptions = {
    autoprefixer: {
        flexbox: "no-2009"
    },
    stage: 3
} satisfies PostcssPresetEnvOptions;

export interface DefineConfigOptions {
    browsers?: Required<PostcssPresetEnvOptions["browsers"]>;
    presetEnvOptions?: Omit<PostcssPresetEnvOptions, "browsers">;
}

export function defineConfig(options: DefineConfigOptions = {}) {
    const {
        browsers,
        presetEnvOptions = DefaultPresetEnvOptions
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
            postcssPresetEnv(_options)
        ]
    };

    return config;
}
