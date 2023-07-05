import type { Configuration } from "webpack";
import { addBeforePlugin, matchConstructorName } from "../../src/transformers/plugins.ts";

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

test("when a matching plugin is found in the plugins array, add before the plugin", () => {
    const newPlugin = new Plugin3();

    const config: Configuration = {
        plugins: [
            new Plugin1(),
            new Plugin2()
        ]
    };

    addBeforePlugin(config, matchConstructorName(Plugin2.name), [newPlugin]);

    expect(config.plugins?.length).toBe(3);
    expect(config.plugins![1]).toBe(newPlugin);
});

test("when no matching plugin is found, do nothing", () => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());

    const newPlugin = new Plugin3();

    const config: Configuration = {
        plugins: [
            new Plugin1(),
            new Plugin2()
        ]
    };

    addBeforePlugin(config, matchConstructorName("anything"), [newPlugin]);

    expect(config.plugins?.length).toBe(2);

    jest.spyOn(console, "log").mockRestore();
});
