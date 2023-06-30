import type { Config as SwcConfig } from "@swc/core";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { createRequire } from "node:module";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import type { Configuration as WebpackConfig } from "webpack";
import { applyTransformers, type WebpackConfigTransformer } from "./transformers/applyTransformers.ts";

// Using node:module.createRequire until
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve
// is available
const require = createRequire(import.meta.url);

type MiniCssExtractPluginOptions = NonNullable<ConstructorParameters<typeof MiniCssExtractPlugin>[0]>;

export function defineBuildHtmlWebpackPluginConfig(options: HtmlWebpackPlugin.Options = {}) {
    const {
        template = "./public/index.html",
        ...rest
    } = options;

    return {
        ...rest,
        template
    } as HtmlWebpackPlugin.Options;
}

export function defineMiniCssExtractPluginConfig(options: MiniCssExtractPluginOptions = {}) {
    const {
        filename = "[name].[fullhash].css",
        ...rest
    } = options;

    return {
        ...rest,
        filename
    } as MiniCssExtractPluginOptions;
}

export interface DefineBuildConfigOptions {
    entry?: string;
    outputPath?: string;
    publicPath?: string;
    moduleRules?: NonNullable<WebpackConfig["module"]>["rules"];
    plugins?: WebpackConfig["plugins"];
    htmlWebpackPlugin?: HtmlWebpackPlugin.Options;
    miniCssExtractPlugin?: MiniCssExtractPluginOptions;
    minify?: boolean;
    cssModules?: boolean;
    postcssConfigFilePath?: string;
    swcConfig?: SwcConfig;
    transformers?: WebpackConfigTransformer[];
}

export async function defineBuildConfig(options: DefineBuildConfigOptions = {}) {
    const {
        entry = "./src/index.tsx",
        outputPath = path.resolve("dist"),
        // The trailing / is very important, otherwise paths will not be resolved correctly.
        publicPath = "http://localhost:8080/",
        moduleRules = [],
        plugins = [],
        htmlWebpackPlugin = defineBuildHtmlWebpackPluginConfig(),
        miniCssExtractPlugin = defineMiniCssExtractPluginConfig(),
        minify = true,
        cssModules = false,
        postcssConfigFilePath,
        swcConfig,
        transformers = []
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
                        {
                            loader: require.resolve("postcss-loader"),
                            options: postcssConfigFilePath
                                ? {
                                    postcssOptions: {
                                        config: postcssConfigFilePath
                                    }
                                }
                                : undefined
                        }
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
            new HtmlWebpackPlugin(htmlWebpackPlugin),
            new MiniCssExtractPlugin(miniCssExtractPlugin),
            ...plugins
        ]
    };

    const transformedConfig = applyTransformers(config, transformers, {
        env: "build"
    });

    return transformedConfig;
}
