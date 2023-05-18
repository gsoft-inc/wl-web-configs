import { type DefineConfigOptions, mergeConfigs } from "./mergeConfigs.ts";

export function defineDevConfig(config?: DefineConfigOptions) {
    return mergeConfigs(config, {
        watch: true,
        dts: true,
        entry: ["./src"],
        outDir: "./dist",
        format: ["esm"],
        target: "esnext",
        platform: "browser",
        sourcemap: "inline"
    });
}
