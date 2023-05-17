import type { defineConfig } from "tsup";
import { defineConfigBase } from "./defineConfigBase.ts";


export function defineDevConfig(config?: Parameters<typeof defineConfig>[0]) {
    return defineConfigBase(config, {
        watch: true,
        dts: {
            compilerOptions: {
                noUnusedLocals: false
            }
        },
        entry: ["./src"],
        outDir: "./dist",
        format: ["esm"],
        target: "esnext",
        platform: "browser"
    });
}
