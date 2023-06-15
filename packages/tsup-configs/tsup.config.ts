import { defineBuildConfig } from "./src/build.ts";

export default defineBuildConfig({
    format: ["esm", "cjs"],
    platform: "node"
});
