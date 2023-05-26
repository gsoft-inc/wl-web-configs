import { type DefineConfigOptions, mergeConfigs } from "./mergeConfigs.ts";

export function defineDevConfig(config?: DefineConfigOptions) {
    return mergeConfigs(config, {
        dts: true,
        splitting: false,
        watch: true,
        entry: ["./src"],
        outDir: "./dist",
        format: ["esm"],
        target: "esnext",
        platform: "browser",
        sourcemap: "inline"
    });
}
