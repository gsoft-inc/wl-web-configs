import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src"],
    outDir: "./dist",
    clean: true,
    format: ["esm"],
    treeshake: true,
    minify: true,
    dts: true,
    target: "esnext"
});
