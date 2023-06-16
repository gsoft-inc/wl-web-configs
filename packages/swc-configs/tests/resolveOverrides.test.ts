import type { Config } from "@swc/core";
import { resolveOverrides } from "../src/resolveOverrides.ts";

test("when there are no config override, return the original config", () => {
    const config: Config = {
        jsc: {
            parser: {
                syntax: "typescript",
                tsx: true
            }
        }
    };

    const result = resolveOverrides(config);

    expect(result).toEqual(config);
});

describe("object", () => {
    test("when overrides are provided, merge the provided overrides with the config", () => {
        const config: Config = {
            jsc: {
                parser: {
                    syntax: "typescript",
                    tsx: true
                }
            }
        };

        const result = resolveOverrides(config, {
            module: {
                type: "es6"
            }
        });

        expect(result).toMatchSnapshot();
    });

    test("when an override match a config option, override the config option", () => {
        const config: Config = {
            jsc: {
                parser: {
                    syntax: "typescript",
                    tsx: true
                }
            }
        };

        const result = resolveOverrides(config, {
            jsc: {
                parser: {
                    syntax: "ecmascript"
                }
            }
        });

        expect(result).toMatchSnapshot();
    });
});

describe("function", () => {
    test("when overrides are provided, merge the provided overrides with the config", () => {
        const config: Config = {
            jsc: {
                parser: {
                    syntax: "typescript",
                    tsx: true
                }
            }
        };

        const result = resolveOverrides(config, () => ({
            module: {
                type: "es6"
            }
        }));

        expect(result).toMatchSnapshot();
    });

    test("when an override match a config option, override the config option", () => {
        const config: Config = {
            jsc: {
                parser: {
                    syntax: "typescript",
                    tsx: true
                }
            }
        };

        const result = resolveOverrides(config, () => ({
            jsc: {
                parser: {
                    syntax: "ecmascript"
                }
            }
        }));

        expect(result).toMatchSnapshot();
    });
});
