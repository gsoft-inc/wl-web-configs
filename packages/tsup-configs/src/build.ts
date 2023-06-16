import type { Options } from "tsup";
import { defineConfig, type DefineConfigOptions } from "./defineConfig.ts";

export const DefaultBuildOptions = {
    clean: true,
    dts: true,
    treeshake: true,
    entry: ["./src"],
    outDir: "./dist",
    format: "esm",
    target: "esnext",
    platform: "browser"
} satisfies Options;

export function defineBuildConfig(options?: DefineConfigOptions) {
    return defineConfig(DefaultBuildOptions, options);
}

