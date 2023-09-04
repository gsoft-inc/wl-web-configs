import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { Config as SwcConfig } from "@swc/core";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import type { Configuration as WebpackConfig } from "webpack";
import webpack from "webpack";
import { applyTransformers, type WebpackConfigTransformer } from "./transformers/applyTransformers.ts";

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
    htmlWebpackPluginOptions?: HtmlWebpackPlugin.Options;
    miniCssExtractPluginOptions?: MiniCssExtractPluginOptions;
    minify?: boolean;
    cssModules?: boolean;
    // Only accepting string values because there are lot of issues with the DefinePlugin related to typing errors.
    // See https://github.com/webpack/webpack/issues/8641
    environmentVariables?: Record<string, string | undefined>;
    transformers?: WebpackConfigTransformer[];
    profile?: boolean;
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
        htmlWebpackPluginOptions = defineBuildHtmlWebpackPluginConfig(),
        miniCssExtractPluginOptions = defineMiniCssExtractPluginConfig(),
        minify = true,
        cssModules = false,
        environmentVariables,
        transformers = [],
        profile = false
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
            extensions: [".js", ".jsx", ".ts", ".tsx", ".css"]
        },
        plugins: [
            new HtmlWebpackPlugin(htmlWebpackPluginOptions),
            new MiniCssExtractPlugin(miniCssExtractPluginOptions),
            new DefinePlugin({
                // Since we pass an object, webpack will automatically do JSON.stringify
                "process.env": environmentVariables
            }),
            ...plugins
        ].filter(Boolean) as WebpackConfig["plugins"],
        snapshot: {
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
        },
        infrastructureLogging: profile ? {
            appendOnly: true,
            level: "verbose",
            debug: /PackFileCache/
        } : undefined
    };

    const transformedConfig = applyTransformers(config, transformers, {
        environment: "build"
    });

    return transformedConfig;
}
