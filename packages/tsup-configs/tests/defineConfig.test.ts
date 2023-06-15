import type { Options } from "tsup";
import { defineConfig } from "../src/defineConfig.ts";

test("when no options are provided, return the default options", () => {
    const baseOptions: Options = {
        dts: true
    };

    const result = defineConfig(baseOptions);

    expect(result).toEqual(baseOptions);
});

describe("single object of options", () => {
    test("when options are provided, options are merged with the default options", () => {
        const baseOptions: Options = {
            dts: true
        };

        const result = defineConfig(baseOptions, {
            clean: true
        });

        expect(result).toMatchSnapshot();
    });

    test("when a provided option match a default option, override the default option", () => {
        const baseOptions: Options = {
            dts: true,
            entry: ["./src"]
        };

        const result = defineConfig(baseOptions, {
            dts: false,
            entry: ["./toto"]
        });

        expect(result).toMatchSnapshot();
    });

    test("when a format option is provided, do not merge the provided array with the default format array", () => {
        const baseOptions: Options = {
            format: ["esm"]
        };

        const result = defineConfig(baseOptions, {
            format: ["cjs"]
        });

        expect(result).toMatchSnapshot();
    });
});

describe("array of options objects", () => {
    test("when an empty array is provided, returns the default options", () => {
        const baseOptions: Options = {
            dts: true
        };

        const result = defineConfig(baseOptions);

        expect(result).toEqual(baseOptions);
    });

    test("when options are provided, every object included in the array are merged with the default options", () => {
        const baseOptions: Options = {
            dts: true
        };

        const result = defineConfig(baseOptions, [
            { clean: true },
            { clean: false }
        ]);

        expect(result).toMatchSnapshot();
    });

    test("when a provided option match a default option, override the default option", () => {
        const baseOptions: Options = {
            dts: true,
            entry: ["./src"]
        };

        const result = defineConfig(baseOptions, [
            { dts: false, entry: ["./toto"] },
            { clean: false, entry: ["./toto"] }
        ]);

        expect(result).toMatchSnapshot();
    });

    test("when a format option is provided, do not merge the provided array with the default format array", () => {
        const baseOptions: Options = {
            format: ["esm"]
        };

        const result = defineConfig(baseOptions, [
            { format: ["cjs"] }
        ]);

        expect(result).toMatchSnapshot();
    });
});

describe("function", () => {
    test("when a function is provided, merge the options returned by the function with the default options", () => {
        const baseOptions: Options = {
            dts: true
        };

        const result = defineConfig(baseOptions, () => ({
            clean: true
        })) as () => unknown;

        expect(result()).toMatchSnapshot();
    });

    test("when a provided option match a default option, override the default option", () => {
        const baseOptions: Options = {
            dts: true,
            entry: ["./src"]
        };

        const result = defineConfig(baseOptions, () => ({
            dts: false,
            entry: ["./toto"]
        })) as () => unknown;

        expect(result()).toMatchSnapshot();
    });

    test("when a format option is provided, do not merge the provided array with the default format array", () => {
        const baseOptions: Options = {
            format: ["esm"]
        };

        const result = defineConfig(baseOptions, () => ({
            format: ["cjs"]
        })) as () => unknown;

        expect(result()).toMatchSnapshot();
    });
});
