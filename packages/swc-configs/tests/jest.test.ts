import { defineJestConfig } from "../src/jest.ts";

describe("typescript parser", () => {
    test("when \"react\" is true, the react transform configuration is included", () => {
        const result = defineJestConfig({
            parser: "typescript",
            react: true
        });

        expect(result).toMatchSnapshot();
    });

    test("when \"react\" is false, the react transform configuration is not included", () => {
        const result = defineJestConfig({
            parser: "typescript",
            react: false
        });

        expect(result).toMatchSnapshot();
    });

    test("when \"react\" is not set, the react transform configuration is not included", () => {
        const result = defineJestConfig({
            parser: "typescript"
        });

        expect(result).toMatchSnapshot();
    });
});

describe("ecmascript parser", () => {
    test("when \"react\" is true, the react transform configuration is included", () => {
        const result = defineJestConfig({
            parser: "ecmascript",
            react: true
        });

        expect(result).toMatchSnapshot();
    });

    test("when \"react\" is false, the react transform configuration is not included", () => {
        const result = defineJestConfig({
            parser: "ecmascript",
            react: false
        });

        expect(result).toMatchSnapshot();
    });

    test("when \"react\" is not set, the react transform configuration is not included", () => {
        const result = defineJestConfig({
            parser: "ecmascript"
        });

        expect(result).toMatchSnapshot();
    });
});

test("when \"parser\" is not set, the configuration parser is typescript", () => {
    const result = defineJestConfig();

    expect(result).toMatchSnapshot();
});

