import type { Config } from "@swc/core";
import { DefaultDevConfig, defineDevConfig } from "../src/dev.ts";
import type { ConfigOverride } from "../src/resolveOverrides.ts";

test("when no options are provided, return the default config", () => {
    const result = defineDevConfig();

    expect(result).toEqual(DefaultDevConfig);
});

test("when \"fastRefresh\" is true, the fast refresh configuration is included", () => {
    const result = defineDevConfig({
        fastRefresh: true
    });

    expect(result).toMatchSnapshot();
});

test("when \"parser\" is \"ecmascript\", the configuration parser is ecmascript", () => {
    const result = defineDevConfig({
        parser: "ecmascript"
    });

    expect(result).toMatchSnapshot();
});

test("when a config override function is provided, the function argument is the config with the non-config override options applied", () => {
    const expectedArgument = defineDevConfig({
        fastRefresh: true
    });

    const fct = jest.fn<Config, [Config]>(() => ({
        jsc: {
            parser: {
                syntax: "ecmascript"
            }
        }
    }));

    defineDevConfig({
        configOverride: fct as ConfigOverride
    });

    expect(fct).toHaveBeenCalledWith(expectedArgument);
});

test("providing options doesn't alter the default config object", () => {
    expect(DefaultDevConfig.jsc.parser.syntax).toBe("typescript");

    defineDevConfig({
        parser: "ecmascript"
    });

    expect(DefaultDevConfig.jsc.parser.syntax).toBe("typescript");
});

