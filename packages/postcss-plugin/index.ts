import type { PluginCreator } from "postcss";
import postcssPresetEnv, { type pluginOptions as postcssPresetEnvOptions } from "postcss-preset-env";

const PresetEnvOptions: postcssPresetEnvOptions = {
    autoprefixer: {
        flexbox: "no-2009"
    },
    stage: 3,
};

const DefaultOptions = {
    presetEnvOptions: PresetEnvOptions
};

const plugin: PluginCreator<typeof DefaultOptions> = ({ presetEnvOptions } = DefaultOptions) => {
    return {
        postcssPlugin: "@workleap/postcss-plugin",
        plugins: [
            postcssPresetEnv(presetEnvOptions)
        ]
    };
};

plugin.postcss = true;

export default plugin;
