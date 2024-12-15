import type { RsbuildConfig, RsbuildPlugin, SourceMap } from "@rsbuild/core";
import type { RsbuildConfigTransformer } from "../src/applyTransformers.ts";
import { defineBuildConfig, getOptimizationConfig } from "../src/build.ts";

test("when an entry prop is provided, the source.entry option is the provided value", () => {
    const result = defineBuildConfig({
        entry: {
            index: "./a-new-entry.ts"
        }
    });

    expect(result!.source!.entry!.index).toBe("./a-new-entry.ts");
});

test("when a dist path is provided, the output.distpath option is the provided value", () => {
    const result = defineBuildConfig({
        distPath: {
            root: "./a-new-output-path"
        }
    });

    expect(result.output!.distPath!.root).toBe("./a-new-output-path");
});

test("when an asset prefix is provided, the output.assetPrefix option is the provided value", () => {
    const result = defineBuildConfig({
        assetPrefix: "a-valid-public-path-ending-with-a-trailing-slash/"
    });

    expect(result.output!.assetPrefix).toBe("a-valid-public-path-ending-with-a-trailing-slash/");
});

test("when additional plugins are provided, append the provided plugins at the end of the plugins array", () => {
    const plugin1: RsbuildPlugin = {
        name: "plugin-1",
        setup: () => {}
    };

    const plugin2: RsbuildPlugin = {
        name: "plugin-2",
        setup: () => {}
    };

    const result = defineBuildConfig({
        plugins: [
            plugin1,
            plugin2
        ]
    });

    const pluginsCount = result.plugins!.length;

    expect(result.plugins![pluginsCount - 2]).toBe(plugin1);
    expect(result.plugins![pluginsCount - 1]).toBe(plugin2);
});

test("when html is false, the html option is undefined", () => {
    const result = defineBuildConfig({
        html: false
    });

    expect(result.html).toBeUndefined();
});

test("when html is a function, the html option match the function return value", () => {
    const html = {
        title: "foo"
    };

    const result = defineBuildConfig({
        html: () => {
            return html;
        }
    });

    expect(result.html).toBe(html);
});

test("when sourceMap is false, the output.sourceMap option is false", () => {
    const result = defineBuildConfig({
        sourceMap: false
    });

    expect(result.output?.sourceMap).toBeFalsy();
});

test("when sourceMap is an object, the output.sourceMap option is the object", () => {
    const sourceMap: SourceMap = {
        js: false,
        css: false
    };

    const result = defineBuildConfig({
        sourceMap
    });

    expect(result.output?.sourceMap).toBe(sourceMap);
});

test("when react is false, the react plugin is not included", () => {
    const result = defineBuildConfig({
        react: false
    });

    const plugin = result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:react");

    expect(plugin).toBeUndefined();
});

test("when react is a function, the function is executed", () => {
    const fct = jest.fn();

    defineBuildConfig({
        react: fct
    });

    expect(fct).toHaveBeenCalledTimes(1);
});

test("when svgr is false, the svgr plugin is not included", () => {
    const result = defineBuildConfig({
        svgr: false
    });

    const plugin = result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:svgr");

    expect(plugin).toBeUndefined();
});

test("when svgr is a function, the function is executed", () => {
    const fct = jest.fn();

    defineBuildConfig({
        svgr: fct
    });

    expect(fct).toHaveBeenCalledTimes(1);
});

test("when compressImage is false, the image compress plugin is not included", () => {
    const result = defineBuildConfig({
        compressImage: false
    });

    const plugin = result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:image-compress");

    expect(plugin).toBeUndefined();
});

test("when compressImage is a function, the function is executed", () => {
    const fct = jest.fn();

    defineBuildConfig({
        compressImage: fct
    });

    expect(fct).toHaveBeenCalledTimes(1);
});

test("when a transformer is provided, and the transformer update the existing configuration object, the transformer is applied on the Rsbuild config", () => {
    const entryTransformer: RsbuildConfigTransformer = (config: RsbuildConfig) => {
        config.source = config.source ?? {};
        config.source.entry = {
            index: "a-custom-value-in-a-transformer"
        };

        return config;
    };

    const result = defineBuildConfig({
        transformers: [entryTransformer]
    });

    expect(result.source!.entry!.index).toBe("a-custom-value-in-a-transformer");
});

test("when a transformer is provided, and the transformer returns a new configuration object, the transformer is applied on the Rsbuild config", () => {
    const entryTransformer: RsbuildConfigTransformer = () => {
        return {
            source: {
                entry: {
                    index: "a-custom-value-in-a-transformer"
                }
            }
        };
    };

    const result = defineBuildConfig({
        transformers: [entryTransformer]
    });

    expect(result.source!.entry!.index).toBe("a-custom-value-in-a-transformer");
});

test("when multiple transformers are provided, all the transformers are applied on the webpack config", () => {
    const entryTransformer: RsbuildConfigTransformer = (config: RsbuildConfig) => {
        config.source = config.source ?? {};
        config.source.entry = {
            index: "a-custom-value-in-a-transformer"
        };

        return config;
    };

    const distPathTransformer: RsbuildConfigTransformer = (config: RsbuildConfig) => {
        config.output = config.output ?? {};
        config.output.distPath = config.output.distPath ?? {};
        config.output.distPath.js = "a-custom-dist-path-in-a-tranformer";

        return config;
    };

    const result = defineBuildConfig({
        transformers: [entryTransformer, distPathTransformer]
    });

    expect(result.source!.entry!.index).toBe("a-custom-value-in-a-transformer");
    expect(result.output!.distPath!.js).toBe("a-custom-dist-path-in-a-tranformer");
});

test("transformers context environment is \"dev\"", () => {
    const mockTransformer = jest.fn();

    defineBuildConfig({
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "build", verbose: false });
});

test("when the verbose option is true, the transformers context verbose value is \"true\"", () => {
    const mockTransformer = jest.fn();

    defineBuildConfig({
        verbose: true,
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "build", verbose: true });
});

describe("getOptimizationConfig", () => {
    test("when optimize is true, minimize is set to true", () => {
        const result = getOptimizationConfig(true);

        expect(result.minimize).toBeTruthy();
    });

    test("when optimize is false, minimize is set to false", () => {
        const result = getOptimizationConfig(false);

        expect(result.minimize).toBeFalsy();
    });

    test("when optimize is \"readable\", minimize is set to true", () => {
        const result = getOptimizationConfig("readable");

        expect(result.minimize).toBeTruthy();
    });

    test("when optimize is false, chunkIds is set to \"named\"", () => {
        const result = getOptimizationConfig(false);

        expect(result.chunkIds).toBe("named");
    });

    test("when optimize is false, moduleIds is set to \"named\"", () => {
        const result = getOptimizationConfig(false);

        expect(result.chunkIds).toBe("named");
    });

    test("when optimize is \"readable\", chunkIds is set to \"named\"", () => {
        const result = getOptimizationConfig("readable");

        expect(result.chunkIds).toBe("named");
    });

    test("when optimize is \"readable\", moduleIds is set to \"named\"", () => {
        const result = getOptimizationConfig("readable");

        expect(result.chunkIds).toBe("named");
    });

    test("when optimize is false, do not include minimizer configuration", () => {
        const result = getOptimizationConfig(false);

        expect(result.minimizer).toBeUndefined();
    });

    test("when optimize is \"readable\", include minify configuration", () => {
        const result = getOptimizationConfig("readable");

        expect(result.minimizer).toBeDefined();
    });
});


