import type { Options } from "tsup";
import { defineConfig, type DefineConfigOptions } from "./defineConfig.ts";

export const DefaultDevOptions = {
    dts: true,
    watch: true,
    entry: ["./src"],
    outDir: "./dist",
    format: "esm",
    target: "esnext",
    platform: "browser",
    sourcemap: "inline"
} satisfies Options;

export function defineDevConfig(options?: DefineConfigOptions) {
    return defineConfig(DefaultDevOptions, options);
}
