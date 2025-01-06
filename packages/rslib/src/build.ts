import { defineConfig, type EcmaScriptVersion } from "@rslib/core";

export interface DefineBuildConfigOptions {
    format: "esm" | "cjs";
    syntax: EcmaScriptVersion;
    bundle: boolean;
    dts: boolean;
}

export function defineBuildConfig(options: DefineBuildConfigOptions = {}) {
    return defineConfig({
        lib: [{
            format: "esm",
            syntax: "esnext",
            bundle: false,
            dts: true
        }],
        source: {
            entry: {
                index: "./src/**"
            },
            tsconfigPath: "./tsconfig.build.json"
        },
        output: {
            target: "web",
            distPath: {
                root: "./dist"
            },
            cleanDistPath: true,
            minify: false
        }
        // plugins: [pluginReact()]
    });
}

/*

- React
- SVGR
- CSS / CSS Modules
- Source maps?
- optimize

*/
