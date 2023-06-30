import { defineDevConfig } from "../src/dev.ts";

const Browsers = [
    "last 2 versions",
    "> 0.2%",
    "Firefox ESR",
    "not dead"
];

test("specified \"browsers\" are set as \"env.targets\"", () => {
    const result = defineDevConfig({
        browsers: Browsers
    });

    expect(result).toMatchSnapshot();
});

test("when \"fastRefresh\" is true, fast refresh is enabled", () => {
    const result = defineDevConfig({
        browsers: Browsers,
        fastRefresh: true
    });

    expect(result).toMatchSnapshot();
});

test("when \"fastRefresh\" is false, fast refresh is disabled", () => {
    const result = defineDevConfig({
        browsers: Browsers,
        fastRefresh: false
    });

    expect(result).toMatchSnapshot();
});

test("when \"fastRefresh\" is not set, fast refresh is disabled", () => {
    const result = defineDevConfig({
        browsers: Browsers
    });

    expect(result).toMatchSnapshot();
});

test("when \"parser\" is \"ecmascript\", the configuration parser is ecmascript", () => {
    const result = defineDevConfig({
        browsers: Browsers,
        parser: "ecmascript"
    });

    expect(result).toMatchSnapshot();
});

test("when \"parser\" is \"typescript\", the configuration parser is typescript", () => {
    const result = defineDevConfig({
        browsers: Browsers,
        parser: "typescript"
    });

    expect(result).toMatchSnapshot();
});

test("when \"parser\" is not set, the configuration parser is typescript", () => {
    const result = defineDevConfig({
        browsers: Browsers
    });

    expect(result).toMatchSnapshot();
});
