import type { Config } from "@swc/core";
import { DefaultJestConfig, defineJestConfig } from "../src/jest.ts";

test("when no options are provided, return the default config", () => {
    const result = defineJestConfig();

    expect(result).toEqual(DefaultJestConfig);
});

test("when \"react\" is true, the react configuration is included", () => {
    const result = defineJestConfig({
        react: true
    });

    expect(result).toMatchSnapshot();
});

test("when \"parser\" is \"ecmascript\", the configuration parser is ecmascript", () => {
    const result = defineJestConfig({
        parser: "ecmascript"
    });

    expect(result).toMatchSnapshot();
});

test("when a config override function is provided, the function argument is the config with the non-config override options applied", () => {
    const expectedArgument = defineJestConfig({
        react: true
    });

    const fct = jest.fn<Config, [Config]>(() => ({
        jsc: {
            parser: {
                syntax: "ecmascript"
            }
        }
    }));

    defineJestConfig({
        react: true,
        configOverride: fct
    });

    expect(fct).toHaveBeenCalledWith(expectedArgument);
});

test("providing options doesn't alter the default config object", () => {
    expect(DefaultJestConfig.jsc.parser.syntax).toBe("typescript");

    defineJestConfig({
        parser: "ecmascript"
    });

    expect(DefaultJestConfig.jsc.parser.syntax).toBe("typescript");
});

