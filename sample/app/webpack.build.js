// @ts-check

import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { enrichWithBrowserslistConfig } from "./enrichWithBrowserslistConfig.js";
import { swcConfig } from "./swc.build.js";

/** @type {import("webpack").Configuration} */
export default {
    mode: "production",
    target: "web",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve("dist"),
        // The trailing / is very important, otherwise paths will not be resolved correctly.
        publicPath: "http://localhost:8080/",
        clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            // Allow us to use SWC for package optimization, which is way faster than the default minimizer
            new TerserPlugin({
                minify: TerserPlugin.swcMinify,
                // `terserOptions` options will be passed to `swc` (`@swc/core`)
                // Link to options - https://swc.rs/docs/config-js-minify
                terserOptions: {
                    compress: true,
                    mangle: true
                }
            })
        ]
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
                use: ["style-loader", "css-loader"]
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
        extensions: [".js", ".ts", ".tsx", ".css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
