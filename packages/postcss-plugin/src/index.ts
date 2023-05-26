import type { PluginCreator } from "postcss";
import postcssPresetEnv, { type pluginOptions as postcssPresetEnvOptions } from "postcss-preset-env";

const PresetEnvOptions: postcssPresetEnvOptions = {
    autoprefixer: {
        flexbox: "no-2009"
    },
    stage: 3
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

// Using TypeScript "export" keyword until PostCSS support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = plugin;
