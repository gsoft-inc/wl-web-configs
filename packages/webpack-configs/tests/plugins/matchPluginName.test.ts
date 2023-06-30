import { matchConstructorName } from "../../src/transformers/plugins.ts";

class Plugin1 {
    apply() {
        console.log("I am plugin 1!");
    }
}

test("return true when the plugin name match", () => {
    const matcher = matchConstructorName(Plugin1.name);

    expect(matcher(new Plugin1(), 0, [])).toBeTruthy();
});

test("return false when the plugin name doesn't match", () => {
    const matcher = matchConstructorName("Anything");

    expect(matcher(new Plugin1(), 0, [])).toBeFalsy();
});
