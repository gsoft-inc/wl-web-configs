import type { EsParserConfig, Config as SwcConfig, TsParserConfig } from "@swc/core";
import type { SwcConfigTransformer } from "../src/applyTransformers.ts";
import { defineJestConfig } from "../src/jest.ts";

describe("typescript parser", () => {
    test("when react is true, the react transform configuration is included", () => {
        const result = defineJestConfig({
            parser: "typescript",
            react: true
        });

        expect(result.jsc?.transform?.react).toBeDefined();
    });

    test("when react is true, tsx parsing is enabled", () => {
        const result = defineJestConfig({
            parser: "typescript",
            react: true
        });

        expect((result.jsc?.parser as TsParserConfig).tsx).toBeTruthy();
    });

    test("when react is false, the react transform configuration is not included", () => {
        const result = defineJestConfig({
            parser: "typescript",
            react: false
        });

        expect(result.jsc?.transform?.react).toBeUndefined();
    });

    test("when react is false, tsx parsing is disabled", () => {
        const result = defineJestConfig({
            parser: "typescript",
            react: false
        });

        expect((result.jsc?.parser as TsParserConfig).tsx).toBeFalsy();
    });
});

describe("ecmascript parser", () => {
    test("when react is true, the react transform configuration is included", () => {
        const result = defineJestConfig({
            parser: "ecmascript",
            react: true
        });

        expect(result.jsc?.transform?.react).toBeDefined();
    });

    test("when react is true, jsx parsing is enabled", () => {
        const result = defineJestConfig({
            parser: "ecmascript",
            react: true
        });

        expect((result.jsc?.parser as EsParserConfig).jsx).toBeTruthy();
    });

    test("when react is false, the react transform configuration is not included", () => {
        const result = defineJestConfig({
            parser: "ecmascript",
            react: false
        });

        expect(result.jsc?.transform?.react).toBeUndefined();
    });

    test("when react is false, jsx parsing is disabled", () => {
        const result = defineJestConfig({
            parser: "ecmascript",
            react: false
        });

        expect((result.jsc?.parser as EsParserConfig).jsx).toBeFalsy();
    });
});

test("when a transformer is provided, the transformer is applied on the swc config", () => {
    const minifyTransformer: SwcConfigTransformer = (config: SwcConfig) => {
        config.minify = true;

        return config;
    };

    const result = defineJestConfig({
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

    const result = defineJestConfig({
        transformers: [minifyTransformer, sourceMapsTransformer]
    });

    expect(result.minify).toBeTruthy();
    expect(result.sourceMaps).toBeTruthy();
});

test("transformers context environment is \"dev\"", () => {
    const mockTransformer = jest.fn();

    defineJestConfig({
        transformers: [mockTransformer]
    });

    expect(mockTransformer).toHaveBeenCalledWith(expect.anything(), { environment: "jest" });
});
