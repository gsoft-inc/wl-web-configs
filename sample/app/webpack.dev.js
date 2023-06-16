// @ts-check

// Added for tsc, otherwise the "devServer" section is unknown.
import "webpack-dev-server";

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
import { enrichWithBrowserslistConfig } from "./enrichWithBrowserslistConfig.js";
import { swcConfig } from "./swc.dev.js";

/** @type {import("webpack").Configuration} */
export default {
    mode: "development",
    target: "web",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    entry: "./src/index.tsx",
    output: {
        // The trailing / is very important, otherwise paths will ne be resolved correctly.
        publicPath: "http://localhost:8080/"
    },
    cache: {
        type: "filesystem",
        allowCollectingMemory: true,
        buildDependencies: {
            config: [fileURLToPath(import.meta.url)]
        },
        cacheDirectory: path.resolve("node_modules/.cache/webpack")
    },
    optimization: {
        // For optimization reasons see: https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)/i,
                exclude: /node_modules/,
                use: {
                    loader: "swc-loader",
                    options: enrichWithBrowserslistConfig(swcConfig)
                }
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
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif)/i,
                type: "asset/resource"
            },
            {
                test: /\.svg/i,
                use: ["@svgr/webpack"]
            }
        ]
    },
    resolve: {
        // Must add ".js" for files imported from node_modules.
        extensions: [".js", ".ts", ".tsx", "css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ReactRefreshWebpackPlugin()
    ]
};
