import type { RsbuildConfig, RsbuildPlugin, SourceMap } from "@rsbuild/core";
import type { RsbuildConfigTransformer } from "../src/applyTransformers.ts";
import { defineDevConfig } from "../src/dev.ts";

test("when an entry prop is provided, the source.entry option is the provided value", () => {
    const result = defineDevConfig({
        entry: {
            index: "./a-new-entry.ts"
        }
    });

    expect(result.source?.entry!.index).toBe("./a-new-entry.ts");
});

test("when https is true, the server option is configured with a self signed certificate", () => {
    const result = defineDevConfig({
        https: true
    });

    expect(result.server?.https).toBeUndefined();
    expect(result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:basic-ssl")).toBeDefined();
});

test("when https is true, the asset prefix option include \"https\"", () => {
    const result = defineDevConfig({
        https: true
    });

    expect(result.dev?.assetPrefix).toMatch(/(https)/i);
});

test("when https is a certificate, the server option is configured with the provided certificate", () => {
    const cert = {
        key: "foo",
        cert: "bar"
    };

    const result = defineDevConfig({
        https: cert
    });

    expect(result.server?.https).toBe(cert);
});

test("when https is a certificate, the dev.assetPrefix option include \"https\"", () => {
    const result = defineDevConfig({
        https: {
            key: "foo",
            cert: "bar"
        }
    });

    expect(result.dev?.assetPrefix).toMatch(/(https)/i);
});

test("when https is false, the dev.assetPrefix option doesn't include \"https\"", () => {
    const result = defineDevConfig({
        https: false
    });

    expect(result.dev?.assetPrefix).not.toMatch(/(https)/i);
});

test("when https is false, the basic-ssl plugin is not included", () => {
    const result = defineDevConfig({
        https: false
    });

    expect(result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:basic-ssl")).toBeUndefined();
});

test("when https is false, the server.https option is undefined", () => {
    const result = defineDevConfig({
        https: true
    });

    expect(result.server?.https).toBeUndefined();
});

test("when an host is provided, the server.host option is the provided host value", () => {
    const result = defineDevConfig({
        host: "a-custom-host"
    });

    expect(result.server!.host).toBe("a-custom-host");
});

test("when an host is provided, the dev.assetPrefix option include the provided host value", () => {
    const result = defineDevConfig({
        host: "a-custom-host"
    });

    expect(result.dev?.assetPrefix).toMatch(/a-custom-host/);
});

test("when a port is provided, the server.port option is the provided port value", () => {
    const result = defineDevConfig({
        port: 1234
    });

    expect(result.server?.port).toBe(1234);
});

test("when a port is provided, the dev.assetPrefix option include the provided port", () => {
    const result = defineDevConfig({
        port: 1234
    });

    expect(result.dev?.assetPrefix).toMatch(/1234/);
});

test("when an asset prefix is provided, the dev.assetPrefix option is the provided value", () => {
    const result = defineDevConfig({
        assetPrefix: "http://my-dev-host.com/"
    });

    expect(result.dev?.assetPrefix).toBe("http://my-dev-host.com/");
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

    const result = defineDevConfig({
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
    const result = defineDevConfig({
        html: false
    });

    expect(result.html).toBeUndefined();
});

test("when html is a function, the html option match the function return value", () => {
    const html = {
        title: "foo"
    };

    const result = defineDevConfig({
        html: () => {
            return html;
        }
    });

    expect(result.html).toBe(html);
});

test("when lazyCompilation is true, the dev.lazyCompilation option is true", () => {
    const result = defineDevConfig({
        lazyCompilation: true
    });

    expect(result.dev?.lazyCompilation).toBeTruthy();
});

test("when lazyCompilation is false, the dev.lazyCompilation option is false", () => {
    const result = defineDevConfig({
        lazyCompilation: false
    });

    expect(result.dev?.lazyCompilation).toBeFalsy();
});

test("when hmr is true, the dev.hmr option is true", () => {
    const result = defineDevConfig({
        hmr: true
    });

    expect(result.dev?.hmr).toBeTruthy();
});

test("when hmr amd fastRefresh are false, the dev.hmr option is false", () => {
    const result = defineDevConfig({
        hmr: false,
        fastRefresh: false
    });

    expect(result.dev?.hmr).toBeFalsy();
});

test("when hmr is false and fastRefresh is true, the dev.hmr option is true", () => {
    const result = defineDevConfig({
        hmr: false,
        fastRefresh: true
    });

    expect(result.dev?.hmr).toBeTruthy();
});

test("when fastRefresh is true, the react plugin enable fast refresh", () => {
    let isEnabled = false;

    const result = defineDevConfig({
        fastRefresh: true,
        react: defaultOptions => {
            isEnabled = defaultOptions.fastRefresh === true;

            return defaultOptions;
        }
    });

    const plugin = result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:react");

    expect(plugin).toBeDefined();
    expect(isEnabled).toBeTruthy();
});

test("when fastRefresh is true and the overlay is disable, disable the fast refresh overlay", () => {
    let isOverlayDisabled = false;

    const result = defineDevConfig({
        fastRefresh: true,
        overlay: false,
        react: defaultOptions => {
            isOverlayDisabled = defaultOptions.reactRefreshOptions?.overlay === false;

            return defaultOptions;
        }
    });

    const plugin = result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:react");

    expect(plugin).toBeDefined();
    expect(isOverlayDisabled).toBeTruthy();
});

test("when fastRefresh is true, disable the client overlay", () => {
    const result = defineDevConfig({
        fastRefresh: true
    });

    expect(result.dev?.client?.overlay).toBeFalsy();
});

test("when sourceMap is false, the output.sourceMap option is false", () => {
    const result = defineDevConfig({
        sourceMap: false
    });

    expect(result.output?.sourceMap).toBeFalsy();
});

test("when sourceMap is an object, the output.sourceMap option is the object", () => {
    const sourceMap: SourceMap = {
        js: false,
        css: false
    };

    const result = defineDevConfig({
        sourceMap
    });

    expect(result.output?.sourceMap).toBe(sourceMap);
});

test("when overlay is false, the dev.client.overlay option is false", () => {
    const result = defineDevConfig({
        overlay: false
    });

    expect(result.dev?.client?.overlay).toBeFalsy();
});

test("when overlay is false, react plugin fast refresh overlay is disabled", () => {
    let isOverlayDisabled = false;

    defineDevConfig({
        overlay: false,
        react: defaultOptions => {
            isOverlayDisabled = defaultOptions.reactRefreshOptions?.overlay === false;

            return defaultOptions;
        }
    });

    expect(isOverlayDisabled).toBeTruthy();
});

test("when react is false, the react plugin is not included", () => {
    const result = defineDevConfig({
        react: false
    });

    const plugin = result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:react");

    expect(plugin).toBeUndefined();
});

test("when react is a function, the function is executed", () => {
    const fct = jest.fn();

    defineDevConfig({
        react: fct
    });

    expect(fct).toHaveBeenCalledTimes(1);
});

test("when svgr is false, the svgr plugin is not included", () => {
    const result = defineDevConfig({
        svgr: false
    });

    const plugin = result.plugins?.find(x => (x as RsbuildPlugin).name === "rsbuild:svgr");

    expect(plugin).toBeUndefined();
});

test("when svgr is a function, the function is executed", () => {
    const fct = jest.fn();

    defineDevConfig({
        svgr: fct
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

    const result = defineDevConfig({
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

    const result = defineDevConfig({
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

    const result = defineDevConfig({
        transformers: [entryTransformer, distPathTransformer]
    });

    expect(result.source!.entry!.index).toBe("a-custom-value-in-a-transformer");
    expect(result.output!.distPath!.js).toBe("a-custom-dist-path-in-a-tranformer");
});

test("transformers context environment is \"dev\"", () => {
    const mockTransformer = jest.fn();

    defineDevConfig({
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "dev", verbose: false });
});

test("when the verbose option is true, the transformers context verbose value is \"true\"", () => {
    const mockTransformer = jest.fn();

    defineDevConfig({
        verbose: true,
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "dev", verbose: true });
});

