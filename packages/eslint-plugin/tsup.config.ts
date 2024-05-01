import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: [
        "./lib/config/core.ts",
        "./lib/config/mdx.ts",
        "./lib/config/jsx-a11y.ts",
        "./lib/config/storybook.ts",
        "./lib/config/jest.ts",
        "./lib/config/react.ts",
        "./lib/config/yaml.ts",
        "./lib/config/testing-library.ts"
    ],
    format: "esm",
    platform: "node"
});
