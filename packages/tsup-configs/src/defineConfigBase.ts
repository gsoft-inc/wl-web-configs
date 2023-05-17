import { defineConfig, type Options } from "tsup";

export type DefineConfigOptions = Parameters<typeof defineConfig>[0];

export function defineConfigBase(config: DefineConfigOptions | undefined, baseConfig: Options): ReturnType<typeof defineConfig> {
    if (config === undefined || (Array.isArray(config) && config.length === 0)) {
        return defineConfig(baseConfig);
    }

    if (typeof config === "function") {
        return defineConfig(cliFlags => {
            return {
                ...baseConfig,
                ...config(cliFlags)
            };
        });
    } else if (Array.isArray(config)) {
        return defineConfig(
            config.map(configItem => {
                return {
                    ...baseConfig,
                    ...configItem
                };
            })
        );
    } else {
        return defineConfig({
            ...baseConfig,
            ...config
        });
    }
}
