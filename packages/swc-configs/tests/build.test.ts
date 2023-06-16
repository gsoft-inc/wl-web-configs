import type { Config } from "@swc/core";
import { DefaultBuildConfig, defineBuildConfig } from "../src/build.ts";

test("when no options are provided, return the default config", () => {
    const result = defineBuildConfig();

    expect(result).toEqual(DefaultBuildConfig);
});

test("when \"parser\" is \"ecmascript\", the configuration parser is ecmascript", () => {
    const result = defineBuildConfig({
        parser: "ecmascript"
    });

    expect(result).toMatchSnapshot();
});

test("when a config override function is provided, the function argument is the config with the non-config override options applied", () => {
    const expectedArgument = defineBuildConfig({
        parser: "ecmascript"
    });

    const fct = jest.fn<Config, [Config]>(() => ({
        jsc: {
            parser: {
                syntax: "ecmascript"
            }
        }
    }));

    defineBuildConfig({
        parser: "ecmascript",
        configOverride: fct
    });

    expect(fct).toHaveBeenCalledWith(expectedArgument);
});

test("providing options doesn't alter the default config object", () => {
    expect(DefaultBuildConfig.jsc.parser.syntax).toBe("typescript");

    defineBuildConfig({
        parser: "ecmascript"
    });

    expect(DefaultBuildConfig.jsc.parser.syntax).toBe("typescript");
});
