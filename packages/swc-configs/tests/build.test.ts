import { DefaultBuildConfig, defineBuildConfig } from "../src/build.ts";
import type { ConfigOverride } from "../src/resolveOverrides.ts";

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

test("when a config override function is provided, the function argument is the config with the non config override options applied", () => {
    const expectedArgument = defineBuildConfig({
        parser: "ecmascript"
    });

    const fct = jest.fn(() => ({
        parser: "ecmascript"
    }));

    defineBuildConfig({
        configOverride: fct as ConfigOverride
    });

    expect(fct).toHaveBeenCalledWith(expectedArgument);
});
