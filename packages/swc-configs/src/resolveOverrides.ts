import type { Config } from "@swc/core";

export type ConfigOverrideFunction = (config: Config) => Config;

export type ConfigOverride = Config | ConfigOverrideFunction;

export function resolveOverrides(config: Config, configOverride?: ConfigOverride) {
    if (typeof configOverride === "function") {
        return {
            ...config,
            ...configOverride(config)
        };
    }

    if (configOverride) {
        return {
            ...config,
            ...configOverride
        };
    }

    return config;
}
