import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    splitting: false,
    treeshake: true,
    entry: ["./lib"],
    outDir: "./dist",
    format: ["cjs"],
    target: "esnext",
    platform: "node"
});
