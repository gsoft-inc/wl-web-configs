import { type DefineConfigOptions, defineConfigBase } from "./defineConfigBase.ts";

export function defineBuildConfig(config?: DefineConfigOptions) {
    return defineConfigBase(config, {
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

