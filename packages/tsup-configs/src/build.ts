import { type DefineConfigOptions, mergeConfigs } from "./mergeConfigs.ts";

export function defineBuildConfig(config?: DefineConfigOptions) {
    return mergeConfigs(config, {
        clean: true,
        dts: true,
        minify: true,
        splitting: false,
        treeshake: true,
        entry: ["./src"],
        outDir: "./dist",
        format: ["esm"],
        target: "esnext",
        platform: "browser"
    });
}

