import type { Config as SwcConfig } from "@swc/core";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { createRequire } from "node:module";
import path from "path";
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
    moduleRules?: NonNullable<WebpackConfig["module"]>["rules"];
    plugins?: WebpackConfig["plugins"];
    htmlWebpackPluginOptions?: HtmlWebpackPlugin.Options;
    miniCssExtractPluginOptions?: MiniCssExtractPluginOptions;
    minify?: boolean;
    cssModules?: boolean;
    swcConfig: SwcConfig;
    // Only accepting string values because there are lot of issues with the DefinePlugin related to typing errors.
    // See https://github.com/webpack/webpack/issues/8641
    environmentVariables?: Record<string, string | undefined>;
    transformers?: WebpackConfigTransformer[];
}

export function defineBuildConfig(options: DefineBuildConfigOptions) {
    const {
        entry = path.resolve("./src/index.tsx"),
        outputPath = path.resolve("dist"),
        // The trailing / is very important, otherwise paths will not be resolved correctly.
        publicPath = "http://localhost:8080/",
        moduleRules = [],
        plugins = [],
        htmlWebpackPluginOptions = defineBuildHtmlWebpackPluginConfig(),
        miniCssExtractPluginOptions = defineMiniCssExtractPluginConfig(),
        minify = true,
        cssModules = false,
        swcConfig,
        environmentVariables,
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
                // Parenthesis around the stringified object are mandatory otherwise it breaks
                // at build time.
                "process.env": `(${JSON.stringify(environmentVariables)})`
            }),
            ...plugins
        ].filter(Boolean) as WebpackConfig["plugins"]
    };

    const transformedConfig = applyTransformers(config, transformers, {
        environment: "build"
    });

    return transformedConfig;
}
