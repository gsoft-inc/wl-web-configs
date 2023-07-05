import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type { Config as SwcConfig } from "@swc/core";
import { defineDevConfig as defineSwcConfig } from "@workleap/swc-configs";
import type { Configuration, FileCacheOptions, RuleSetRule } from "webpack";
import { defineDevConfig, defineDevHtmlWebpackPluginConfig, defineFastRefreshPluginConfig } from "../src/dev.ts";
import type { WebpackConfigTransformer } from "../src/transformers/applyTransformers.ts";
import { findModuleRule, matchLoaderName } from "../src/transformers/moduleRules.ts";

const Browsers = ["last 2 versions"];

test("when an entry prop is provided, use the provided entry value", () => {
    const result = defineDevConfig({
        entry: "./a-new-entry.ts",
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.entry).toBe("./a-new-entry.ts");
});

test("when https is enabled, the dev server is configured for https", () => {
    const result = defineDevConfig({
        https: true,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.devServer?.https).toBe(true);
});

test("when https is disabled, the dev server is not configured for https", () => {
    const result = defineDevConfig({
        https: false,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.devServer?.https).toBe(false);
});

test("when https is enabled, the public path starts with https", () => {
    const result = defineDevConfig({
        https: true,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.output?.publicPath).toMatch(/^https:/);
});

test("when https is disabled, the public path starts with http", () => {
    const result = defineDevConfig({
        https: false,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.output?.publicPath).toMatch(/^http:/);
});

test("when an host is provided, the dev server host is the provided host value", () => {
    const result = defineDevConfig({
        host: "a-custom-host",
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.devServer?.host).toBe("a-custom-host");
});

test("when an host is provided, the public path include the provided host value", () => {
    const result = defineDevConfig({
        host: "a-custom-host",
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.output?.publicPath).toMatch(/a-custom-host/);
});

test("when a port is provided, the dev server port is the provided port value", () => {
    const result = defineDevConfig({
        port: 1234,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.devServer?.port).toBe(1234);
});

test("when a port is provided, the public path include the provided port", () => {
    const result = defineDevConfig({
        port: 1234,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.output?.publicPath).toMatch(/1234/);
});

test("when cache is enabled, the cache configuration is included", () => {
    const result = defineDevConfig({
        cache: true,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.cache).toBeDefined();
});

test("when cache is disabled, the cache prop is false", () => {
    const result = defineDevConfig({
        cache: false,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.cache).toBeFalsy();
});

test("when a cache directory is provided and cache is enabled, use the provided cache directory value", () => {
    const result = defineDevConfig({
        cache: true,
        cacheDirectory: "a-custom-path",
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect((result.cache as FileCacheOptions).cacheDirectory).toBe("a-custom-path");
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

    const result = defineDevConfig({
        moduleRules: [
            newModuleRule1,
            newModuleRule2
        ],
        swcConfig: defineSwcConfig({ browsers: Browsers })
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

    const result = defineDevConfig({
        plugins: [
            newPlugin1,
            newPlugin2
        ],
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    const pluginsCount = result.plugins!.length;

    expect(result.plugins![pluginsCount - 2]).toBe(newPlugin1);
    expect(result.plugins![pluginsCount - 1]).toBe(newPlugin2);
});

test("when fast refresh is enabled, dev server hot module reload is disabled", () => {
    const result = defineDevConfig({
        fastRefresh: true,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.devServer?.hot).toBeFalsy();
});

test("when fast refresh is disabled, dev server hot module reload is enabled", () => {
    const result = defineDevConfig({
        fastRefresh: false,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.devServer?.hot).toBeTruthy();
});

test("when fast refresh is enabled, add the fast refresh plugin", () => {
    const result = defineDevConfig({
        fastRefresh: true,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.plugins?.some(x => x.constructor.name === ReactRefreshWebpackPlugin.name)).toBeTruthy();
});

test("when fast refresh is disabled, do not add the fast refresh plugin", () => {
    const result = defineDevConfig({
        fastRefresh: false,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    expect(result.plugins?.some(x => x.constructor.name === ReactRefreshWebpackPlugin.name)).toBeFalsy();
});

test("when fast refresh is enabled, enable swc fast refresh", () => {
    const result = defineDevConfig({
        fastRefresh: true,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    const swcLoader = findModuleRule(result, matchLoaderName("swc-loader"));

    expect(((swcLoader?.moduleRule as RuleSetRule).options as SwcConfig).jsc?.transform?.react?.refresh).toBeTruthy();
});

test("when css modules is enabled, include css modules configuration", () => {
    const result = defineDevConfig({
        cssModules: true,
        swcConfig: defineSwcConfig({ browsers: Browsers })
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
    const result = defineDevConfig({
        cssModules: false,
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    const cssLoader = findModuleRule(result, matchLoaderName("css-loader"));

    expect((cssLoader?.moduleRule as RuleSetRule).options).toBeUndefined();
});

test("when a postcss config file path is provided, use the provided file path", () => {
    const result = defineDevConfig({
        postcssConfigFilePath: "a-custom-file-path",
        swcConfig: defineSwcConfig({ browsers: Browsers })
    });

    const postcssLoader = findModuleRule(result, matchLoaderName("postcss-loader"));

    // postcss-loader doesn't provide typings.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(((postcssLoader?.moduleRule as RuleSetRule).options as any).postcssOptions.config).toBe("a-custom-file-path");
});

test("the provided swc config object is set as the swc-loader options", () => {
    const swcConfig = defineSwcConfig({ browsers: Browsers });

    const result = defineDevConfig({
        postcssConfigFilePath: "a-custom-file-path",
        swcConfig
    });

    const swcLoader = findModuleRule(result, matchLoaderName("swc-loader"));

    expect((swcLoader?.moduleRule as RuleSetRule).options).toBe(swcConfig);
});

test("when a transformer is provided, the transformer is applied on the webpack config", () => {
    const entryTransformer: WebpackConfigTransformer = (config: Configuration) => {
        config.entry = "a-custom-value-in-a-transformer";

        return config;
    };

    const result = defineDevConfig({
        swcConfig: defineSwcConfig({ browsers: Browsers }),
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

    const result = defineDevConfig({
        swcConfig: defineSwcConfig({ browsers: Browsers }),
        transformers: [entryTransformer, devToolTransformer]
    });

    expect(result.entry).toBe("a-custom-value-in-a-transformer");
    expect(result.devtool).toBe("custom-module-source-map-in-a-tranformer");
});

test("transformers context environment is \"dev\"", () => {
    const mockTransformer = jest.fn();

    defineDevConfig({
        swcConfig: defineSwcConfig({ browsers: Browsers }),
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { env: "dev" });
});

describe("defineDevHtmlWebpackPluginConfig", () => {
    test("merge the default options with the provided values", () => {
        const result = defineDevHtmlWebpackPluginConfig({
            filename: "a-custom-filename"
        });

        expect(result.filename).toBe("a-custom-filename");
        expect(result.template).toMatch(/index.html/);
    });

    test("when a template value is provided, override the default template option", () => {
        const result = defineDevHtmlWebpackPluginConfig({
            template: "a-custom-template-file-path"
        });

        expect(result.template).toBe("a-custom-template-file-path");
    });
});

describe("defineFastRefreshPluginConfig", () => {
    test("merge the default options with the provided values", () => {
        const result = defineFastRefreshPluginConfig({
            exclude: "a-custom-exclude"
        });

        expect(result.exclude).toBe("a-custom-exclude");
    });
});

