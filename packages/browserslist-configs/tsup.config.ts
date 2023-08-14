import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    format: ["cjs", "esm"],
    platform: "node"
});
