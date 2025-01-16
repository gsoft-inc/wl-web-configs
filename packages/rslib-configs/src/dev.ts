import type { DistPathConfig, RsbuildPlugins, SourceMap } from "@rsbuild/core";
import { pluginReact, type PluginReactOptions } from "@rsbuild/plugin-react";
import { pluginSvgr, type PluginSvgrOptions } from "@rsbuild/plugin-svgr";
import { defineConfig, type Dts, type RsbuildConfigEntry, type RsbuildConfigOutputTarget, type Syntax } from "@rslib/core";
import { applyTransformers, type RslibConfigTransformer } from "./applyTransformers.ts";

export type DefineDevDefineReactPluginConfigFunction = (defaultOptions: PluginReactOptions) => PluginReactOptions;
export type DefineDevSvgrPluginConfigFunction = (defaultOptions: PluginSvgrOptions) => PluginSvgrOptions;

export interface DefineDevConfigOptions {
    entry?: RsbuildConfigEntry;
    syntax?: Syntax;
    bundle?: boolean;
    tsconfigPath?: string;
    dts?: Dts;
    target?: RsbuildConfigOutputTarget;
    distPath?: DistPathConfig;
    plugins?: RsbuildPlugins;
    sourceMap?: boolean | SourceMap;
    react?: false | DefineDevDefineReactPluginConfigFunction;
    svgr? : false | DefineDevSvgrPluginConfigFunction;
    transformers?: RslibConfigTransformer[];
}

function defaultDefineReactPluginConfig(options: PluginReactOptions) {
    return options;
}

function defineSvgrPluginConfig(options: PluginSvgrOptions) {
    return options;
}

export function defineDevConfig(options: DefineDevConfigOptions = {}) {
    const {
        entry: entryValue,
        syntax = "esnext",
        bundle = false,
        tsconfigPath,
        dts = false,
        target = "web",
        distPath = {
            root: "./dist"
        },
        plugins = [],
        sourceMap = {
            js: "cheap-module-source-map",
            css: true
        },
        react = defaultDefineReactPluginConfig,
        svgr = defineSvgrPluginConfig,
        transformers = []
    } = options;

    if (!bundle && !tsconfigPath) {
        throw new Error("[rslib-configs] When the \"bundle\" option is \"false\", a \"tsconfigPath\" option must be provided. We recommend including a tsconfig.build.json file specifically for compiling the library project.");
    }

    let entry = entryValue;

    if (!entry) {
        entry = {
            index: bundle ? ["./src/index.ts", "./src/index.js"] : "./src/**"
        };
    }

    const config = defineConfig({
        mode: "development",
        lib: [{
            format: "esm",
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
            react && pluginReact(react({})),
            svgr && pluginSvgr(svgr({
                svgrOptions: {
                    exportType: "named"
                }
            })),
            ...plugins
        ]
    });

    const transformedConfig = applyTransformers(config, transformers, {
        environment: "dev"
    });

    return defineConfig(transformedConfig);
}
