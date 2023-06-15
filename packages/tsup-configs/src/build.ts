import type { Options } from "tsup";
import { defineConfig, type DefineConfigOptions } from "./defineConfig.ts";

export const DefaultBuildOptions = {
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
};

export function defineBuildConfig(options?: DefineConfigOptions) {
    return defineConfig(DefaultBuildOptions as Options, options);
}

