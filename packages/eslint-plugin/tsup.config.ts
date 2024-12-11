// Importing directly from the package to prevent circular dependencies.
import { defineBuildConfig } from "../tsup-configs/src/index.ts";

export default defineBuildConfig({
    entry: ["./lib"],
    format: "cjs",
    platform: "node"
});
