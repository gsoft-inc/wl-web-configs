import type { EsParserConfig, Config as SwcConfig, TsParserConfig } from "@swc/core";
import type { SwcConfigTransformer } from "../src/applyTransformers.ts";
import { defineBuildConfig } from "../src/build.ts";

const Targets = {
    chrome: "116"
};

test("provided browsers are set as \"env.targets\"", () => {
    const result = defineBuildConfig(Targets);

    expect(result.env?.targets).toBe(Targets);
});

test("when parser is \"ecmascript\", the configuration parser is ecmascript", () => {
    const result = defineBuildConfig(Targets, {
        parser: "ecmascript"
    });

    expect(result.jsc?.parser?.syntax).toBe("ecmascript");
});

test("when parser is \"ecmascript\", jsx parsing is enabled", () => {
    const result = defineBuildConfig(Targets, {
        parser: "ecmascript"
    });

    expect((result.jsc?.parser as EsParserConfig).jsx).toBeTruthy();
});

test("when parser is \"typescript\", the configuration parser is typescript", () => {
    const result = defineBuildConfig(Targets, {
        parser: "typescript"
    });

    expect(result.jsc?.parser?.syntax).toBe("typescript");
});

test("when parser is \"typescript\", tsx parsing is enabled", () => {
    const result = defineBuildConfig(Targets, {
        parser: "typescript"
    });

    expect((result.jsc?.parser as TsParserConfig).tsx).toBeTruthy();
});

test("when a transformer is provided, the transformer is applied on the swc config", () => {
    const minifyTransformer: SwcConfigTransformer = (config: SwcConfig) => {
        config.minify = true;

        return config;
    };

    const result = defineBuildConfig(Targets, {
        transformers: [minifyTransformer]
    });

    expect(result.minify).toBeTruthy();
});

test("when multiple transformers are provided, all the transformers are applied on the swc config", () => {
    const minifyTransformer: SwcConfigTransformer = (config: SwcConfig) => {
        config.minify = true;

        return config;
    };

    const sourceMapsTransformer: SwcConfigTransformer = (config: SwcConfig) => {
        config.sourceMaps = true;

        return config;
    };

    const result = defineBuildConfig(Targets, {
        transformers: [minifyTransformer, sourceMapsTransformer]
    });

    expect(result.minify).toBeTruthy();
    expect(result.sourceMaps).toBeTruthy();
});

test("transformers context environment is \"build\"", () => {
    const mockTransformer = jest.fn();

    defineBuildConfig(Targets, {
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "build" });
});

test("when a baseUrl is provided, the baseUrl value is added to the configuration", () => {
    const result = defineBuildConfig(Targets, {
        baseUrl: "./src"
    });

    expect(result.jsc?.baseUrl).toBe("./src");
});

test("when a paths is provided, the paths value is added to the configuration", () => {
    const paths = {
        "@/*": ["*"]
    };

    const result = defineBuildConfig(Targets, {
        paths
    });

    expect(result.jsc?.paths).toBe(paths);
});
