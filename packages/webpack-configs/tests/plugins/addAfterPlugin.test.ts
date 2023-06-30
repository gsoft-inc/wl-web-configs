import type { Configuration } from "webpack";
import { addAfterPlugin, matchConstructorName } from "../../src/transformers/plugins.ts";

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

    addAfterPlugin(config, matchConstructorName(Plugin1.name), [new Plugin3()]);

    expect(config.plugins![1].name).toBe("plugin-3");
});
