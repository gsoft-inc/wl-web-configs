import type { Config, EsParserConfig, TsParserConfig } from "@swc/core";
import type { SwcConfigTransformer } from "../src/applyTransformers.ts";
import { defineBuildConfig } from "../src/build.ts";

const Browsers = ["last 2 versions"];

test("provided browsers are set as \"env.targets\"", () => {
    const result = defineBuildConfig({
        browsers: Browsers
    });

    expect(result.env?.targets).toBe(Browsers);
});

test("when parser is \"ecmascript\", the configuration parser is ecmascript", () => {
    const result = defineBuildConfig({
        browsers: Browsers,
        parser: "ecmascript"
    });

    expect(result.jsc?.parser?.syntax).toBe("ecmascript");
});

test("when parser is \"ecmascript\", jsx parsing is enabled", () => {
    const result = defineBuildConfig({
        browsers: Browsers,
        parser: "ecmascript"
    });

    expect((result.jsc?.parser as EsParserConfig).jsx).toBeTruthy();
});

test("when parser is \"typescript\", the configuration parser is typescript", () => {
    const result = defineBuildConfig({
        browsers: Browsers,
        parser: "typescript"
    });

    expect(result.jsc?.parser?.syntax).toBe("typescript");
});

test("when parser is \"typescript\", tsx parsing is enabled", () => {
    const result = defineBuildConfig({
        browsers: Browsers,
        parser: "typescript"
    });

    expect((result.jsc?.parser as TsParserConfig).tsx).toBeTruthy();
});

test("when a transformer is provided, the transformer is applied on the swc config", () => {
    const minifyTransformer: SwcConfigTransformer = (config: Config) => {
        config.minify = true;

        return config;
    };

    const result = defineBuildConfig({
        browsers: Browsers,
        transformers: [minifyTransformer]
    });

    expect(result.minify).toBeTruthy();
});

test("when multiple transformers are provided, all the transformers are applied on the swc config", () => {
    const minifyTransformer: SwcConfigTransformer = (config: Config) => {
        config.minify = true;

        return config;
    };

    const sourceMapsTransformer: SwcConfigTransformer = (config: Config) => {
        config.sourceMaps = true;

        return config;
    };

    const result = defineBuildConfig({
        browsers: Browsers,
        transformers: [minifyTransformer, sourceMapsTransformer]
    });

    expect(result.minify).toBeTruthy();
    expect(result.sourceMaps).toBeTruthy();
});

test("transformers context environment is \"build\"", () => {
    const mockTransformer = jest.fn();

    defineBuildConfig({
        browsers: Browsers,
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "build" });
});
