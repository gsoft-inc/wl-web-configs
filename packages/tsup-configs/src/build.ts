import type { defineConfig } from "tsup";
import { defineConfigBase } from "./defineConfigBase.ts";


export function defineBuildConfig(config?: Parameters<typeof defineConfig>[0]) {
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

