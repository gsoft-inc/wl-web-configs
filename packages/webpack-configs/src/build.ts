import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import type { Configuration } from "webpack";

export const DefaultBuildConfig = {
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
                use: [
                    { loader: "swc-loader" }
                ]
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
                test: /\.svg/i,
                use: [
                    { loader: "@svgr/webpack" }
                ]
            },
            {
                test: /\.css/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)/i,
                type: "asset/resource"
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
} satisfies Configuration;

/*
- entry?: string
- outputPath?: string (defaults to "/dist")
- url: string
- plugins?: [] (additional plugins - mention this in the docs)
- moduleRules?: [] (additional rules - mention this in the docs)
- htmlTemplateFilePath?: string (default to "./public/index.html")


- minify?: bool (defaults to true)
- cssModules?: bool (default to false)
- transformTypeScriptFiles?: bool (defaults to true)
- transformEcmaScriptFiles?: bool (defaults to false) -> always adds ".js" to resolve/extensions thought


- swcConfig?: obj
- browserslistConfig?: obj
- postCssConfig?: obj


- transformers?: [] (WebpackConfigTransformer interface)
*/

export function defineBuildConfig() {
    console.log("Implement me!");
}
