import core from "./dist/core.mjs";
import jest from "./dist/jest.mjs";
import jsxA11y from "./dist/jsx-a11y.mjs";
import mdx from "./dist/mdx.mjs";
import react from "./dist/react.mjs";
import storybook from "./dist/storybook.mjs";
import testingLibrary from "./dist/testing-library.mjs";
import yml from "./dist/yaml.mjs";

const config = [
    ...core,
    jsxA11y,
    mdx,
    jest,
    ...storybook,
    ...react,
    yml,
    ...testingLibrary
];

// console.log(config);

export default config;
