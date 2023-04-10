import type { PluginCreator } from "postcss";
import postcssPresetEnv, { pluginOptions as postcssPresetEnvOptions } from "postcss-preset-env";

const PRESET_ENV_OPTIONS: postcssPresetEnvOptions = {
    autoprefixer: {
        flexbox: "no-2009"
    },
    stage: 3,
    features: {
        "nesting-rules": true
    }
};

const DEFAULT_OPTIONS = {
    presetEnvOptions: PRESET_ENV_OPTIONS
};

const plugin: PluginCreator<typeof DEFAULT_OPTIONS> = ({ presetEnvOptions } = DEFAULT_OPTIONS) => {
    return {
        postcssPlugin: "@workleap/postcss-plugin",
        plugins: [
            postcssPresetEnv(presetEnvOptions)
        ]
    };
};

plugin.postcss = true;

export = plugin;