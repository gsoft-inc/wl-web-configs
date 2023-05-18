import { type DefineConfigOptions, mergeConfigs } from "./mergeConfigs.ts";

export function defineBuildConfig(config?: DefineConfigOptions) {
    return mergeConfigs(config, {
        clean: true,
        treeshake: true,
        minify: true,
        dts: true,
        entry: ["./src"],
        outDir: "./dist",
        format: ["esm"],
        target: "esnext",
        platform: "browser"
    });
}

