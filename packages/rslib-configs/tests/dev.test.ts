import { defineDevConfig } from "../src/dev.ts";

/*
-

- when a syntax prop is provided, the lib.syntax option is the provided value

- when bundle is false and the tsconfigPath option is not provided, throw an error
- when bundle is false, the default source.entry option is \"./src/**\"
- when bundle is true, the lib.bundle option is true
- when bundle is true and the tsconfigPath option is not provided, do not throw an error
- when bundle is true, the default source.entry option is [\"./src/index.ts\", \"./src/index.js\"]

- when dts is true, the lib.dts option is true

- when a target is provided, the output.target option is the provided value

- when a dist path is provided, the output.distPath option is the provided value

- when additional plugins are provided, append the provided plugins at the end of the plugins array

- when sourceMap is false, the output.sourceMap option is false
- when sourceMap is an object, the output.sourceMap option is the object

- when react is false, the react plugin is not included
- when svgr is false, the svgr plugin is not included

- when a transformer is provided, and the transformer update the existing configuration object, the transformer is applied on the Rslib config
- when a transformer is provided, and the transformer returns a new configuration object, the transformer is applied on the Rslib config
- when multiple transformers are provided, all the transformers are applied on the webpack config
- transformers context environment is \"dev\"

*/

test("when an entry prop is provided, the source.entry option is the provided value", () => {
    const result = defineDevConfig({
        entry: {
            index: "./a-new-entry.ts"
        }
    });

    expect(result.source?.entry!.index).toBe("./a-new-entry.ts");
});

// test("when format is \"cjs\", the lib.format option is \"cjs\"", () => {
//     const result = defineDevConfig({
//         format: "cjs"
//     });

//     expect(result.lib[0]?.format).toBe("cjs");
// });
