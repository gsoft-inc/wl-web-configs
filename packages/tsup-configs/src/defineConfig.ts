import { defineConfig as _defineConfig, type Options } from "tsup";

export type DefineConfigOptions = Parameters<typeof _defineConfig>[0];

export function defineConfig(baseOptions: Options, userOptions?: DefineConfigOptions): ReturnType<typeof _defineConfig> {
    if (!userOptions || (Array.isArray(userOptions) && userOptions.length === 0)) {
        return _defineConfig(baseOptions);
    }

    if (typeof userOptions === "function") {
        return _defineConfig((...args) => ({
            ...baseOptions,
            ...userOptions(...args)
        }));
    }

    if (Array.isArray(userOptions)) {
        return _defineConfig(
            userOptions.map(configItem => {
                return {
                    ...baseOptions,
                    ...configItem
                };
            })
        );
    }

    return _defineConfig({
        ...baseOptions,
        ...userOptions
    });
}
