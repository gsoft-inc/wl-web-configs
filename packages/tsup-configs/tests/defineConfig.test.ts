import type { Options } from "tsup";
import { defineConfig } from "../src/defineConfig.ts";

test("when no options are provided, return the default options", () => {
    const baseOptions: Options = {
        dts: true
    };

    const config = defineConfig(baseOptions);

    expect(config).toMatchSnapshot();
});

describe("single object of options", () => {
    test("merge provided options with the default options", () => {
        const baseOptions: Options = {
            dts: true
        };

        const config = defineConfig(baseOptions, {
            clean: true
        });

        expect(config).toMatchSnapshot();
    });

    test("when a provided option match a default option, override the default option", () => {
        const baseOptions: Options = {
            dts: true,
            entry: ["./src"]
        };

        const config = defineConfig(baseOptions, {
            dts: false,
            entry: ["./toto"]
        });

        expect(config).toMatchSnapshot();
    });

    test("when a format array is provided, do not merge the provided array with the default format array", () => {
        const baseOptions: Options = {
            format: ["esm"]
        };

        const config = defineConfig(baseOptions, {
            format: ["cjs"]
        });

        expect(config).toMatchSnapshot();
    });
});

describe("array of options objects", () => {
    test("when an empty array is provided, returns the default options", () => {
        const baseOptions: Options = {
            dts: true
        };

        const config = defineConfig(baseOptions);

        expect(config).toMatchSnapshot();
    });

    test("merge every options object included in the array with the default options", () => {
        const baseOptions: Options = {
            dts: true
        };

        const config = defineConfig(baseOptions, [
            { clean: true },
            { clean: false }
        ]);

        expect(config).toMatchSnapshot();
    });

    test("when a provided option match a default option, override the default option", () => {
        const baseOptions: Options = {
            dts: true,
            entry: ["./src"]
        };

        const config = defineConfig(baseOptions, [
            { dts: false, entry: ["./toto"] },
            { clean: false, entry: ["./toto"] }
        ]);

        expect(config).toMatchSnapshot();
    });

    test("when a format array is provided, do not merge the provided array with the default format array", () => {
        const baseOptions: Options = {
            format: ["esm"]
        };

        const config = defineConfig(baseOptions, [
            { format: ["cjs"] }
        ]);

        expect(config).toMatchSnapshot();
    });
});

describe("function", () => {
    test("merge the options returned by the function with the default options", () => {
        const baseOptions: Options = {
            dts: true
        };

        const config = defineConfig(baseOptions, () => ({
            clean: true
        })) as () => unknown;

        expect(config()).toMatchSnapshot();
    });

    test("when a provided option match a default option, override the default option", () => {
        const baseOptions: Options = {
            dts: true,
            entry: ["./src"]
        };

        const config = defineConfig(baseOptions, () => ({
            dts: false,
            entry: ["./toto"]
        })) as () => unknown;

        expect(config()).toMatchSnapshot();
    });

    test("when a format array is provided, do not merge the provided array with the default format array", () => {
        const baseOptions: Options = {
            format: ["esm"]
        };

        const config = defineConfig(baseOptions, () => ({
            format: ["cjs"]
        })) as () => unknown;

        expect(config()).toMatchSnapshot();
    });
});
