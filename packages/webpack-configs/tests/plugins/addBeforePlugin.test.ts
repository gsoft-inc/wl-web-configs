import type { Configuration } from "webpack";
import { addBeforePlugin, matchConstructorName } from "../../src/transformers/plugins.ts";

class Plugin1 {
    name = "plugin-1";

    apply() {
        console.log("I am plugin 1!");
    }
}

class Plugin2 {
    name = "plugin-2";

    apply() {
        console.log("I am plugin 2!");
    }
}

class Plugin3 {
    name = "plugin-3";

    apply() {
        console.log("I am plugin 3!");
    }
}

test("works", () => {
    const config: Configuration = {
        plugins: [
            new Plugin1(),
            new Plugin2()
        ]
    };

    addBeforePlugin(config, matchConstructorName(Plugin2.name), [new Plugin3()]);

    expect(config.plugins![1].name).toBe("plugin-3");
});

test("when matching plugin is the first plugin, add at the beginning of the array", () => {
    const config: Configuration = {
        plugins: [
            new Plugin1(),
            new Plugin2()
        ]
    };

    addBeforePlugin(config, matchConstructorName(Plugin1.name), [new Plugin3()]);

    expect(config.plugins![0].name).toBe("plugin-3");
});
