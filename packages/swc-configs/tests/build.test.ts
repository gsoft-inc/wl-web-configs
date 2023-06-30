import { defineBuildConfig } from "../src/build.ts";

const Browsers = [
    "last 2 versions",
    "> 0.2%",
    "Firefox ESR",
    "not dead"
];

test("specified \"browsers\" are set as \"env.targets\"", () => {
    const result = defineBuildConfig({
        browsers: Browsers
    });

    expect(result).toMatchSnapshot();
});

test("when \"parser\" is \"ecmascript\", the configuration parser is ecmascript", () => {
    const result = defineBuildConfig({
        browsers: Browsers,
        parser: "ecmascript"
    });

    expect(result).toMatchSnapshot();
});

test("when \"parser\" is \"typescript\", the configuration parser is typescript", () => {
    const result = defineBuildConfig({
        browsers: Browsers,
        parser: "typescript"
    });

    expect(result).toMatchSnapshot();
});

test("when \"parser\" is not set, the configuration parser is typescript", () => {
    const result = defineBuildConfig({
        browsers: Browsers
    });

    expect(result).toMatchSnapshot();
});
