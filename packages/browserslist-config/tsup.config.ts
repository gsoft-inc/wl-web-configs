import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    entry: ["./src"],
    outDir: "./dist",
    format: ["cjs"],
    target: "esnext",
    platform: "node",
    // View https://github.com/egoist/tsup/issues/572#issuecomment-1060599574.
    esbuildOptions: options => {
        options.footer = {
            js: "module.exports = module.exports.default;"
        };
    }
});
