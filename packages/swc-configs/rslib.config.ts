import { defineConfig } from "@rslib/core";
import path from "node:path";

export default defineConfig({
    lib: [
        {
            format: "esm",
            syntax: "esnext",
            bundle: false,
            dts: true
        },
        {
            format: "cjs",
            syntax: "esnext",
            bundle: false,
            dts: true
        }
    ],
    source: {
        entry: {
            index: "./src/**"
        },
        tsconfigPath: path.resolve("./tsconfig.build.json")
    },
    output: {
        target: "node",
        distPath: {
            root: "./dist"
        },
        cleanDistPath: true,
        minify: false,
        sourceMap: {
            js: "source-map"
        }
    }
});
