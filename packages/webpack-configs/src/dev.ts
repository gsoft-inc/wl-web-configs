import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
import type { Configuration } from "webpack";

// import type Server from "webpack-dev-server";

export const DefaultDevConfig = {
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
                use: [
                    { loader: "swc-loader" }
                    // options: addBrowserslistTargets(swcConfig)
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
                test: /\.css/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" }
                ]
            },
            {
                test: /\.svg/i,
                use: [
                    { loader: "@svgr/webpack" }
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
        extensions: [".js", ".ts", ".tsx", "css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
} satisfies Configuration & { devServer: unknown };

/*
- entry?: string
- https?: boolean (defaults to false)
- hostname?: string (defaults to "localhost")
- port?: number (defaults to 8080)
- plugins?: [] (additional plugins - mention this in the docs)
- moduleRules?: [] (additional rules - mention this in the docs)
- htmlTemplateFilePath?: string (default to ./public/index.html)


- fastRefresh?: bool (default to false)
- cache?: bool (default to true)
- cacheDirectory?: string (default to ./node_modules/.cache/webpack)
- cssModules?: bool (default to false)
- transformTypeScriptFiles?: bool (defaults to true)
- transformEcmaScriptFiles?: bool (defaults to false) -> always adds ".js" to resolve/extensions thought

- swcConfig?: obj
- browserslistConfig?: obj
- postCssConfig?: obj


- transformers?: [] (WebpackConfigTransformer interface)

export default defineDevConfig({
    swcConfig: defineSwcConfig({
        fastRefresh: true
    }),
    browserslistConfig,
    postCssConfig: definePostCssConfig({
        presetEnvOptions: {
            blabla
        }
    })
})

-> While swcConfig, browserslistConfig and postCssConfig could be emitted and the loader will simply load by convention the nearest configuration file, we do recommend
to provide them and use the "define*" functions provided by our shared web configs

-> The transformers API could also offer helpers to transform configs
    -> Similar to CRACO (https://craco.js.org/docs/plugin-api/utility-functions/webpack-loaders/)
    -> Module Rules:
        -> findModuleRules
        -> addBeforeModuleRule
        -> addAfterModuleRule
        -> Supports loaders and assets type
        -> Matchers are:
            -> byLoaderName(name)
            -> byRuleTest(test) <- MEH
            -> byAssetModuleType(type)
    -> Plugins
        -> findPlugin
        -> appendPlugins
        -> preprendPlugins
        -> addPluginsAfter    <- Useful?
        -> addPluginsBefore   <- Useful?
        -> Matchers are:
            -> byPluginName(name)

Info:
- postcssPresetEnv({ browsers: 'last 2 versions' })

*/


export function defineDevConfig() {
    console.log("Implement me!");
}
