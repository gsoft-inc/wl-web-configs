import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type { Config as SwcConfig } from "@swc/core";
import { defineDevConfig as defineSwcConfig } from "@workleap/swc-configs";
import type { Configuration, FileCacheOptions, RuleSetRule } from "webpack";
import { defineDevConfig, defineDevHtmlWebpackPluginConfig, defineFastRefreshPluginConfig } from "../src/dev.ts";
import type { WebpackConfigTransformer } from "../src/transformers/applyTransformers.ts";
import { findModuleRule, matchLoaderName } from "../src/transformers/moduleRules.ts";

const Targets = {
    chrome: "116"
};

test("when an entry prop is provided, use the provided entry value", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        entry: "./a-new-entry.ts"
    });

    expect(result.entry).toBe("./a-new-entry.ts");
});

test("when https is enabled, the dev server is configured for https", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        https: true
    });

    expect(result.devServer?.https).toBe(true);
});

test("when https is disabled, the dev server is not configured for https", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        https: false
    });

    expect(result.devServer?.https).toBe(false);
});

test("when https is enabled, the public path starts with https", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        https: true
    });

    expect(result.output?.publicPath).toMatch(/^https:/);
});

test("when https is disabled, the public path starts with http", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        https: false
    });

    expect(result.output?.publicPath).toMatch(/^http:/);
});

test("when an host is provided, the dev server host is the provided host value", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        host: "a-custom-host"
    });

    expect(result.devServer?.host).toBe("a-custom-host");
});

test("when an host is provided, the public path include the provided host value", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        host: "a-custom-host"
    });

    expect(result.output?.publicPath).toMatch(/a-custom-host/);
});

test("when a port is provided, the dev server port is the provided port value", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        port: 1234
    });

    expect(result.devServer?.port).toBe(1234);
});

test("when a port is provided, the public path include the provided port", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        port: 1234
    });

    expect(result.output?.publicPath).toMatch(/1234/);
});

test("when cache is enabled, the cache configuration is included", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        cache: true
    });

    expect(result.cache).toBeDefined();
});

test("when cache is disabled, the cache prop is false", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        cache: false
    });

    expect(result.cache).toBeFalsy();
});

test("when a cache directory is provided and cache is enabled, use the provided cache directory value", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        cache: true,
        cacheDirectory: "a-custom-path"
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

    const result = defineDevConfig(defineSwcConfig(Targets), {
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

    const result = defineDevConfig(defineSwcConfig(Targets), {
        plugins: [
            newPlugin1,
            newPlugin2
        ]
    });

    const pluginsCount = result.plugins!.length;

    expect(result.plugins![pluginsCount - 2]).toBe(newPlugin1);
    expect(result.plugins![pluginsCount - 1]).toBe(newPlugin2);
});

test("when fast refresh is disabled, dev server hot module reload is enabled", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        fastRefresh: false
    });

    expect(result.devServer?.hot).toBeTruthy();
});

test("when fast refresh is enabled, add the fast refresh plugin", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        fastRefresh: true
    });

    expect(result.plugins?.some(x => x!.constructor.name === ReactRefreshWebpackPlugin.name)).toBeTruthy();
});

test("when fast refresh is disabled, do not add the fast refresh plugin", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        fastRefresh: false
    });

    expect(result.plugins?.some(x => x!.constructor.name === ReactRefreshWebpackPlugin.name)).toBeFalsy();
});

test("when fast refresh is enabled, enable swc fast refresh", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        fastRefresh: true
    });

    const swcLoader = findModuleRule(result, matchLoaderName("swc-loader"));

    expect(((swcLoader?.moduleRule as RuleSetRule).options as SwcConfig).jsc?.transform?.react?.refresh).toBeTruthy();
});

test("when fast refresh is disabled, disable swc fast refresh", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
        fastRefresh: false
    });

    const swcLoader = findModuleRule(result, matchLoaderName("swc-loader"));

    expect(((swcLoader?.moduleRule as RuleSetRule).options as SwcConfig).jsc?.transform?.react?.refresh).toBeFalsy();
});

test("when css modules is enabled, include css modules configuration", () => {
    const result = defineDevConfig(defineSwcConfig(Targets), {
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
    const result = defineDevConfig(defineSwcConfig(Targets), {
        cssModules: false
    });

    const cssLoader = findModuleRule(result, matchLoaderName("css-loader"));

    expect((cssLoader?.moduleRule as RuleSetRule).options).toBeUndefined();
});

test("the provided swc config object is set as the swc-loader options", () => {
    const swcConfig = defineSwcConfig(Targets);

    const result = defineDevConfig(swcConfig);

    const swcLoader = findModuleRule(result, matchLoaderName("swc-loader"));

    expect((swcLoader?.moduleRule as RuleSetRule).options).toBe(swcConfig);
});

test("when a transformer is provided, the transformer is applied on the webpack config", () => {
    const entryTransformer: WebpackConfigTransformer = (config: Configuration) => {
        config.entry = "a-custom-value-in-a-transformer";

        return config;
    };

    const result = defineDevConfig(defineSwcConfig(Targets), {
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

    const result = defineDevConfig(defineSwcConfig(Targets), {
        transformers: [entryTransformer, devToolTransformer]
    });

    expect(result.entry).toBe("a-custom-value-in-a-transformer");
    expect(result.devtool).toBe("custom-module-source-map-in-a-tranformer");
});

test("transformers context environment is \"dev\"", () => {
    const mockTransformer = jest.fn();

    defineDevConfig(defineSwcConfig(Targets), {
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "dev" });
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

