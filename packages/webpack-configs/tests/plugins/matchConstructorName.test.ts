import { matchConstructorName } from "../../src/transformers/plugins.ts";

class Plugin1 {
    apply() {
        console.log("I am plugin 1!");
    }
}

test("when the plugin constructor name match name, return true", () => {
    const matcher = matchConstructorName(Plugin1.name);

    expect(matcher(new Plugin1(), 0, [])).toBeTruthy();
});

test("when the plugin constructor name doesn't match name, return false", () => {
    const matcher = matchConstructorName("anything");

    expect(matcher(new Plugin1(), 0, [])).toBeFalsy();
});
