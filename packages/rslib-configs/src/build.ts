import type { DistPathConfig, RsbuildPlugins, SourceMap } from "@rsbuild/core";
import { pluginReact, type PluginReactOptions } from "@rsbuild/plugin-react";
import { pluginSvgr, type PluginSvgrOptions } from "@rsbuild/plugin-svgr";
import { defineConfig, type Dts, type RsbuildConfigEntry, type RsbuildConfigOutputTarget, type Syntax } from "@rslib/core";
import { applyTransformers, RslibConfigTransformer } from "./applyTransformers.ts";

export type DefineBuildDefineReactPluginConfigFunction = (defaultOptions: PluginReactOptions) => PluginReactOptions;
export type DefineBuildSvgrPluginConfigFunction = (defaultOptions: PluginSvgrOptions) => PluginSvgrOptions;

export interface DefineBuildConfigOptions {
    entry?: RsbuildConfigEntry;
    format?: "esm" | "cjs";
    syntax?: Syntax;
    bundle?: boolean;
    tsconfigPath?: string;
    dts?: Dts;
    target?: RsbuildConfigOutputTarget;
    distPath?: DistPathConfig;
    plugins?: RsbuildPlugins;
    sourceMap?: boolean | SourceMap;
    react?: false | DefineBuildDefineReactPluginConfigFunction;
    svgr? : false | DefineBuildSvgrPluginConfigFunction;
    transformers?: RslibConfigTransformer[];
}

function defaultDefineReactPluginConfig(options: PluginReactOptions) {
    return options;
}

function defineSvgrPluginConfig(options: PluginSvgrOptions) {
    return options;
}

export function defineBuildConfig(options: DefineBuildConfigOptions = {}) {
    const {
        entry: entryValue,
        format = "esm",
        syntax = "esnext",
        bundle = false,
        tsconfigPath,
        dts = true,
        target = "web",
        distPath = {
            root: "./dist"
        },
        plugins = [],
        sourceMap = {
            js: "source-map",
            css: true
        },
        react = defaultDefineReactPluginConfig,
        svgr = defineSvgrPluginConfig,
        transformers = []
    } = options;

    if (!bundle && !tsconfigPath) {
        throw new Error("[rslib-configs] When the \"bundle\" option is \"false\", a \"tsconfigPath\" option must be provided.");
    }

    let entry = entryValue;

    if (!entry) {
        entry = {
            index: bundle ? ["./src/index.ts", "./src/index.js"] : "./src/**"
        };
    }

    const config = defineConfig({
        mode: "production",
        lib: [{
            format,
            syntax,
            bundle,
            dts
        }],
        source: {
            entry,
            tsconfigPath
        },
        output: {
            target,
            distPath,
            cleanDistPath: true,
            minify: false,
            sourceMap
        },
        plugins: [
            react && pluginReact(react({
                fastRefresh: false
            })),
            svgr && pluginSvgr(svgr({
                svgrOptions: {
                    exportType: "named"
                }
            })),
            ...plugins
        ].filter(Boolean),
    });

    const transformedConfig = applyTransformers(config, transformers, {
        environment: "build"
    });

    return defineConfig(transformedConfig);
}
