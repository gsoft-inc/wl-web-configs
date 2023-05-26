import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    splitting: false,
    treeshake: true,
    entry: ["./src"],
    outDir: "./dist",
    format: ["cjs"],
    target: "esnext",
    platform: "node"
});
