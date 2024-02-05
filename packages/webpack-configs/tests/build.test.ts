import { defineBuildConfig as defineSwcConfig } from "@workleap/swc-configs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration, FileCacheOptions, RuleSetRule } from "webpack";
import { defineBuildConfig, defineBuildHtmlWebpackPluginConfig, defineMiniCssExtractPluginConfig } from "../src/build.ts";
import type { WebpackConfigTransformer } from "../src/transformers/applyTransformers.ts";
import { findModuleRule, matchAssetModuleType, matchLoaderName } from "../src/transformers/moduleRules.ts";
import { findPlugin, matchConstructorName } from "../src/transformers/plugins.ts";

const SwcConfig = defineSwcConfig({
    chrome: "116"
});

test("when an entry prop is provided, use the provided entry value", () => {
    const result = defineBuildConfig(SwcConfig, {
        entry: "./a-new-entry.ts"
    });

    expect(result.entry).toBe("./a-new-entry.ts");
});

test("when an output path is provided, use the provided ouput path value", () => {
    const result = defineBuildConfig(SwcConfig, {
        outputPath: "./a-new-output-path"
    });

    expect(result.output?.path).toBe("./a-new-output-path");
});

test("when a public path is set to \"auto\", should not throw an error", () => {
    expect(() => defineBuildConfig(SwcConfig, { publicPath: "auto" })).not.toThrow();
});

test("when a valid public path is provided, use the provided public path value", () => {
    const result = defineBuildConfig(SwcConfig, {
        publicPath: "a-valid-public-path-ending-with-a-trailing-slash/"
    });

    expect(result.output?.publicPath).toBe("a-valid-public-path-ending-with-a-trailing-slash/");
});

test("when additional module rules are provided, append the provided rules at the end of the module rules array", () => {
    const newModuleRule1 = {
        test: /\.svg/i,
        type: "asset/inline"
    };

    const newModuleRule2 = {
        test: /\.json/i,
        type: "asset/inline"
    };

    const result = defineBuildConfig(SwcConfig, {
        moduleRules: [
            newModuleRule1,
            newModuleRule2
        ]
    });

    const rulesCount = result.module!.rules!.length;

    expect(result.module?.rules![rulesCount - 2]).toBe(newModuleRule1);
    expect(result.module?.rules![rulesCount - 1]).toBe(newModuleRule2);
});

test("when additional plugins are provided, append the provided plugins at the end of the plugins array", () => {
    class Plugin1 {
        apply() {
            console.log("I am plugin 1!");
        }
    }

    class Plugin2 {
        apply() {
            console.log("I am plugin 2!");
        }
    }

    const newPlugin1 = new Plugin1();
    const newPlugin2 = new Plugin2();

    const result = defineBuildConfig(SwcConfig, {
        plugins: [
            newPlugin1,
            newPlugin2
        ]
    });

    const pluginsCount = result.plugins!.length;

    expect(result.plugins![pluginsCount - 2]).toBe(newPlugin1);
    expect(result.plugins![pluginsCount - 1]).toBe(newPlugin2);
});

test("when optimize is true, minimize is set to true", () => {
    const result = defineBuildConfig(SwcConfig, {
        optimize: true
    });

    expect(result.optimization?.minimize).toBeTruthy();
});

test("when optimize is false, minimize is set to false", () => {
    const result = defineBuildConfig(SwcConfig, {
        optimize: false
    });

    expect(result.optimization?.minimize).toBeFalsy();
});

test("when optimize is false, chunkIds is set to \"named\"", () => {
    const result = defineBuildConfig(SwcConfig, {
        optimize: false
    });

    expect(result.optimization?.chunkIds).toBe("named");
});

test("when optimize is false, moduleIds is set to \"named\"", () => {
    const result = defineBuildConfig(SwcConfig, {
        optimize: false
    });

    expect(result.optimization?.chunkIds).toBe("named");
});

test("when optimize is true, include minify configuration", () => {
    const result = defineBuildConfig(SwcConfig, {
        optimize: true
    });

    expect(result.optimization?.minimizer).toBeDefined();
});

test("when optimize is false, do not include minify configuration", () => {
    const result = defineBuildConfig(SwcConfig, {
        optimize: false
    });

    expect(result.optimization?.minimizer).toBeUndefined();
});

test("when cache is enabled, the cache configuration is included", () => {
    const result = defineBuildConfig(SwcConfig, {
        cache: true
    });

    expect(result.cache).toBeDefined();
});

test("when cache is disabled, the cache prop is false", () => {
    const result = defineBuildConfig(SwcConfig, {
        cache: false
    });

    expect(result.cache).toBeFalsy();
});

test("when a cache directory is provided and cache is enabled, use the provided cache directory value", () => {
    const result = defineBuildConfig(SwcConfig, {
        cache: true,
        cacheDirectory: "a-custom-path"
    });

    expect((result.cache as FileCacheOptions).cacheDirectory).toBe("a-custom-path");
});

test("when htmlWebpackPlugin is \"false\", no html-webpack-plugin instance is added to the plugin array", () => {
    const config = defineBuildConfig(SwcConfig, {
        htmlWebpackPlugin: false
    });

    const result = findPlugin(config, matchConstructorName(HtmlWebpackPlugin.name));

    expect(result).toBeUndefined();
});

test("when htmlWebpackPlugin is \"true\", an html-webpack-plugin instance is added to the plugin array", () => {
    const config = defineBuildConfig(SwcConfig, {
        htmlWebpackPlugin: true
    });

    const result = findPlugin(config, matchConstructorName(HtmlWebpackPlugin.name));

    expect(result).toBeDefined();
});

test("when css modules is enabled, include css modules configuration", () => {
    const result = defineBuildConfig(SwcConfig, {
        cssModules: true
    });

    const cssLoader = findModuleRule(result, matchLoaderName("css-loader"));

    // css-loader doesn't provide typings.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(((cssLoader?.moduleRule as RuleSetRule).options as any).modules).toBeTruthy();
    // css-loader doesn't provide typings.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(((cssLoader?.moduleRule as RuleSetRule).options as any).importLoaders).toBe(1);
});

test("when css modules is disabled, do not include css modules configuration", () => {
    const result = defineBuildConfig(SwcConfig, {
        cssModules: false
    });

    const cssLoader = findModuleRule(result, matchLoaderName("css-loader"));

    expect((cssLoader?.moduleRule as RuleSetRule).options).toBeUndefined();
});

test("the provided swc config object is set as the swc-loader options", () => {
    const swcConfig = SwcConfig;

    const result = defineBuildConfig(swcConfig);

    const swcLoader = findModuleRule(result, matchLoaderName("swc-loader"));

    expect((swcLoader?.moduleRule as RuleSetRule).options).toBe(swcConfig);
});

test("when a transformer is provided, the transformer is applied on the webpack config", () => {
    const entryTransformer: WebpackConfigTransformer = (config: Configuration) => {
        config.entry = "a-custom-value-in-a-transformer";

        return config;
    };

    const result = defineBuildConfig(SwcConfig, {
        transformers: [entryTransformer]
    });

    expect(result.entry).toBe("a-custom-value-in-a-transformer");
});

test("when multiple transformers are provided, all the transformers are applied on the webpack config", () => {
    const entryTransformer: WebpackConfigTransformer = (config: Configuration) => {
        config.entry = "a-custom-value-in-a-transformer";

        return config;
    };

    const devToolTransformer: WebpackConfigTransformer = (config: Configuration) => {
        config.devtool = "custom-module-source-map-in-a-tranformer";

        return config;
    };

    const result = defineBuildConfig(SwcConfig, {
        transformers: [entryTransformer, devToolTransformer]
    });

    expect(result.entry).toBe("a-custom-value-in-a-transformer");
    expect(result.devtool).toBe("custom-module-source-map-in-a-tranformer");
});

test("transformers context environment is \"build\"", () => {
    const mockTransformer = jest.fn();

    defineBuildConfig(SwcConfig, {
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "build", verbose: false });
});

test("when the verbose option is true, the transformers context verbose value is \"true\"", () => {
    const mockTransformer = jest.fn();

    defineBuildConfig(SwcConfig, {
        verbose: true,
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "build", verbose: true });
});

// TODO: The test do not pass on UNIX system becase of \\, fix this later,
// eslint-disable-next-line jest/no-commented-out-tests
// test("by default, an svgr rule is added and the assets loader do not handle .svg files", () => {
//     const result = defineBuildConfig(SwcConfig);

//     const svgrRule = findModuleRule(result, matchLoaderName("@svgr\\webpack"));
//     const assetsRule = findModuleRule(result, matchAssetModuleType("asset/resource"));

//     expect(svgrRule).toBeDefined();
//     expect((assetsRule?.moduleRule as RuleSetRule).test).toEqual(/\.(png|jpe?g|gif)$/i);
// });

test("when the svgr option is false, do not add the svgr rule", () => {
    const result = defineBuildConfig(SwcConfig, {
        svgr: false
    });

    const svgrRule = findModuleRule(result, matchLoaderName("@svgr\\webpack"));

    expect(svgrRule).toBeUndefined();
});

test("when the svgr option is false, add .svg to the default assets rule", () => {
    const result = defineBuildConfig(SwcConfig, {
        svgr: false
    });

    const assetsRule = findModuleRule(result, matchAssetModuleType("asset/resource"));

    expect((assetsRule?.moduleRule as RuleSetRule).test).toEqual(/\.(png|jpe?g|gif|svg)$/i);
});

describe("defineBuildHtmlWebpackPluginConfig", () => {
    test("merge the default options with the provided options", () => {
        const result = defineBuildHtmlWebpackPluginConfig({
            filename: "a-custom-filename"
        });

        expect(result.filename).toBe("a-custom-filename");
        expect(result.template).toMatch(/index.html/);
    });

    test("when a template value is provided, override the default template option", () => {
        const result = defineBuildHtmlWebpackPluginConfig({
            template: "a-custom-template-file-path"
        });

        expect(result.template).toBe("a-custom-template-file-path");
    });
});

describe("defineMiniCssExtractPluginConfig", () => {
    test("merge the default options with the provided options", () => {
        const result = defineMiniCssExtractPluginConfig({
            chunkFilename: "a-custom-chunk-filename"
        });

        expect(result.chunkFilename).toBe("a-custom-chunk-filename");
        expect(result.filename).toBe("[name].[fullhash].css");
    });


    test("when a filename value is provided, override the default filename option", () => {
        const result = defineMiniCssExtractPluginConfig({
            filename: "a-custom-filename"
        });

        expect(result.filename).toBe("a-custom-filename");
    });
});

