import type { Configuration } from "webpack";
import { matchConstructorName, removePlugin } from "../../src/transformers/plugins.ts";

class Plugin1 {
    apply() {
        console.log("I am plugin 1!");
    }
}

class Plugin2 {
    apply() {
        console.log("I am plugin 2!");
    }
}

class Plugin3 {
    apply() {
        console.log("I am plugin 3!");
    }
}

test("when a matching plugin is found in the plugins array, remove the plugin", () => {
    const config: Configuration = {
        plugins: [
            new Plugin1(),
            new Plugin2(),
            new Plugin3()
        ]
    };

    removePlugin(config, matchConstructorName(Plugin2.name));

    expect(config.plugins?.length).toBe(2);
    expect(config.plugins![1].constructor.name).toBe(Plugin3.name);
});

test("when no matching plugin is found, throw an error", () => {
    const config: Configuration = {
        plugins: [
            new Plugin1(),
            new Plugin2(),
            new Plugin3()
        ]
    };

    expect(() => removePlugin(config, matchConstructorName("anything"))).toThrow();
});
