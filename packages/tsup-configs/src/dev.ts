import { type DefineConfigOptions, defineConfigBase } from "./defineConfigBase.ts";


export function defineDevConfig(config?: DefineConfigOptions) {
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
