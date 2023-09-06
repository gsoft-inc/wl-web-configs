import type { Config as SwcConfig } from "@swc/core";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TerserPlugin from "terser-webpack-plugin";
import type { Configuration as WebpackConfig } from "webpack";
import webpack from "webpack";
import { applyTransformers, type WebpackConfigTransformer } from "./transformers/applyTransformers.ts";
import { isObject } from "./utils.ts";

// Aliases
const DefinePlugin = webpack.DefinePlugin;

// Using node:module.createRequire until
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve
// is available
const require = createRequire(import.meta.url);

type MiniCssExtractPluginOptions = NonNullable<ConstructorParameters<typeof MiniCssExtractPlugin>[number]>;

export function defineBuildHtmlWebpackPluginConfig(options: HtmlWebpackPlugin.Options = {}): HtmlWebpackPlugin.Options {
    const {
        template = path.resolve("./public/index.html"),
        ...rest
    } = options;

    return {
        ...rest,
        template
    };
}

export function defineMiniCssExtractPluginConfig(options: MiniCssExtractPluginOptions = {}): MiniCssExtractPluginOptions {
    const {
        filename = "[name].[fullhash].css",
        ...rest
    } = options;

    return {
        ...rest,
        filename
    };
}

export interface DefineBuildConfigOptions {
    entry?: string;
    outputPath?: string;
    publicPath?: string;
    cache?: boolean;
    cacheDirectory?: string;
    moduleRules?: NonNullable<WebpackConfig["module"]>["rules"];
    plugins?: WebpackConfig["plugins"];
    htmlWebpackPlugin?: boolean | HtmlWebpackPlugin.Options;
    miniCssExtractPluginOptions?: MiniCssExtractPluginOptions;
    minify?: boolean;
    cssModules?: boolean;
    environmentVariables?: Record<string, unknown>;
    transformers?: WebpackConfigTransformer[];
    verbose?: boolean;
}

export function defineBuildConfig(swcConfig: SwcConfig, options: DefineBuildConfigOptions = {}) {
    const {
        entry = path.resolve("./src/index.tsx"),
        outputPath = path.resolve("dist"),
        // The trailing / is very important, otherwise paths will not be resolved correctly.
        publicPath = "http://localhost:8080/",
        cache = true,
        cacheDirectory = path.resolve("node_modules/.cache/webpack"),
        moduleRules = [],
        plugins = [],
        htmlWebpackPlugin = defineBuildHtmlWebpackPluginConfig(),
        miniCssExtractPluginOptions = defineMiniCssExtractPluginConfig(),
        minify = true,
        cssModules = false,
        // Using an empty object literal as the default value to ensure
        // "process.env" is always available.
        environmentVariables = {},
        transformers = [],
        verbose = false
    } = options;

    const config: WebpackConfig = {
        mode: "production",
        target: "web",
        entry,
        output: {
            path: outputPath,
            filename: "[name].[fullhash].js",
            publicPath,
            clean: true
        },
        cache: cache && {
            type: "filesystem",
            allowCollectingMemory: false,
            buildDependencies: {
                config: [fileURLToPath(import.meta.url)]
            },
            cacheDirectory: cacheDirectory
        },
        // Fixes caching for environmental variables using the DefinePlugin by forcing
        // webpack caching to prioritize hashes over timestamps.
        snapshot: cache ? {
            buildDependencies: {
                hash: true,
                timestamp: true
            },
            module: {
                hash: true,
                timestamp: true
            },
            resolve: {
                hash: true,
                timestamp: true
            },
            resolveBuildDependencies: {
                hash: true,
                timestamp: true
            }
        } : undefined,
        optimization: minify
            ? {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        minify: TerserPlugin.swcMinify,
                        terserOptions: {
                            compress: true,
                            mangle: true
                        }
                    })
                ]
            }
            : undefined,
        infrastructureLogging: verbose ? {
            appendOnly: true,
            level: "verbose",
            debug: /PackFileCache/
        } : undefined,
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)/i,
                    exclude: /node_modules/,
                    loader: require.resolve("swc-loader"),
                    options: swcConfig
                },
                {
                    // https://stackoverflow.com/questions/69427025/programmatic-webpack-jest-esm-cant-resolve-module-without-js-file-exten
                    test: /\.js/i,
                    include: /node_modules/,
                    resolve: {
                        fullySpecified: false
                    }
                },
                {
                    test: /\.css/i,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        {
                            loader: require.resolve("css-loader"),
                            options: cssModules
                                ? {
                                    // Must match the number of loaders applied before this one.
                                    importLoaders: 1,
                                    modules: true
                                }
                                : undefined
                        },
                        { loader: require.resolve("postcss-loader") }
                    ]
                },
                {
                    test: /\.svg/i,
                    loader: require.resolve("@svgr/webpack")
                },
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                },
                ...moduleRules
            ]
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
            alias: {
                // Fixes Module not found: Error: Can't resolve '@swc/helpers/_/_class_private_field_init'.
                // View https://github.com/vercel/next.js/pull/38174 for more information and https://github.com/vercel/next.js/issues/48593.
                "@swc/helpers": path.dirname(require.resolve("@swc/helpers/package.json"))
            }
        },
        plugins: [
            htmlWebpackPlugin && new HtmlWebpackPlugin(isObject(htmlWebpackPlugin) ? htmlWebpackPlugin : defineBuildHtmlWebpackPluginConfig()),
            new MiniCssExtractPlugin(miniCssExtractPluginOptions),
            // Stringify the environment variables because the plugin does a direct text replacement. Otherwise, "production" would become production
            // after replacement and cause an undefined var error because the production var doesn't exist.
            // For more information, view: https://webpack.js.org/plugins/define-plugin.
            new DefinePlugin({
                "process.env": Object.keys(environmentVariables).reduce((acc, key) => {
                    acc[key] = JSON.stringify(environmentVariables[key]);

                    return acc;
                }, {} as Record<string, string>)
            }),
            ...plugins
        ].filter(Boolean) as WebpackConfig["plugins"]
    };

    const transformedConfig = applyTransformers(config, transformers, {
        environment: "build",
        verbose
    });

    return transformedConfig;
}
