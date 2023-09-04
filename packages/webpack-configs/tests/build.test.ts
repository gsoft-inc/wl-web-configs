import { defineBuildConfig as defineSwcConfig } from "@workleap/swc-configs";
import type { Configuration, FileCacheOptions, RuleSetRule } from "webpack";
import { defineBuildConfig, defineBuildHtmlWebpackPluginConfig, defineMiniCssExtractPluginConfig } from "../src/build.ts";
import type { WebpackConfigTransformer } from "../src/transformers/applyTransformers.ts";
import { findModuleRule, matchLoaderName } from "../src/transformers/moduleRules.ts";

const Targets = {
    chrome: "116"
};

test("when an entry prop is provided, use the provided entry value", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        entry: "./a-new-entry.ts"
    });

    expect(result.entry).toBe("./a-new-entry.ts");
});

test("when an output path is provided, use the provided ouput path value", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        outputPath: "./a-new-output-path"
    });

    expect(result.output?.path).toBe("./a-new-output-path");
});

test("when a public path is provided, use the provided public path value", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        publicPath: "./a-new-public-path"
    });

    expect(result.output?.publicPath).toBe("./a-new-public-path");
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

    const result = defineBuildConfig(defineSwcConfig(Targets), {
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

    const result = defineBuildConfig(defineSwcConfig(Targets), {
        plugins: [
            newPlugin1,
            newPlugin2
        ]
    });

    const pluginsCount = result.plugins!.length;

    expect(result.plugins![pluginsCount - 2]).toBe(newPlugin1);
    expect(result.plugins![pluginsCount - 1]).toBe(newPlugin2);
});

test("when minify is true, minimize is set to true", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        minify: true
    });

    expect(result.optimization?.minimize).toBeTruthy();
});

test("when minify is false, minimize is set to false", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        minify: false
    });

    expect(result.optimization?.minimize).toBeFalsy();
});

test("when minify is true, include minify configuration", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        minify: true
    });

    expect(result.optimization?.minimizer).toBeDefined();
});

test("when minify is false, do not include minify configuration", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        minify: false
    });

    expect(result.optimization?.minimizer).toBeUndefined();
});

test("when cache is enabled, the cache configuration is included", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        cache: true
    });

    expect(result.cache).toBeDefined();
});

test("when cache is disabled, the cache prop is false", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        cache: false
    });

    expect(result.cache).toBeFalsy();
});

test("when a cache directory is provided and cache is enabled, use the provided cache directory value", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        cache: true,
        cacheDirectory: "a-custom-path"
    });

    expect((result.cache as FileCacheOptions).cacheDirectory).toBe("a-custom-path");
});

test("when css modules is enabled, include css modules configuration", () => {
    const result = defineBuildConfig(defineSwcConfig(Targets), {
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
    const result = defineBuildConfig(defineSwcConfig(Targets), {
        cssModules: false
    });

    const cssLoader = findModuleRule(result, matchLoaderName("css-loader"));

    expect((cssLoader?.moduleRule as RuleSetRule).options).toBeUndefined();
});

test("the provided swc config object is set as the swc-loader options", () => {
    const swcConfig = defineSwcConfig(Targets);

    const result = defineBuildConfig(swcConfig);

    const swcLoader = findModuleRule(result, matchLoaderName("swc-loader"));

    expect((swcLoader?.moduleRule as RuleSetRule).options).toBe(swcConfig);
});

test("when a transformer is provided, the transformer is applied on the webpack config", () => {
    const entryTransformer: WebpackConfigTransformer = (config: Configuration) => {
        config.entry = "a-custom-value-in-a-transformer";

        return config;
    };

    const result = defineBuildConfig(defineSwcConfig(Targets), {
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

    const result = defineBuildConfig(defineSwcConfig(Targets), {
        transformers: [entryTransformer, devToolTransformer]
    });

    expect(result.entry).toBe("a-custom-value-in-a-transformer");
    expect(result.devtool).toBe("custom-module-source-map-in-a-tranformer");
});

test("transformers context environment is \"build\"", () => {
    const mockTransformer = jest.fn();

    defineBuildConfig(defineSwcConfig(Targets), {
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "build", profile: false });
});

test("when the profile option is true, the transformers context profile value is \"true\"", () => {
    const mockTransformer = jest.fn();

    defineBuildConfig(defineSwcConfig(Targets), {
        profile: true,
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "build", profile: true });
});

describe("defineBuildHtmlWebpackPluginConfig", () => {
    test("merge the default options with the provided values", () => {
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
    test("merge the default options with the provided values", () => {
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

