import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["./lib", "!./lib/plugins.d.ts"],
    format: "esm",
    target: "esnext",
    platform: "node"
});
