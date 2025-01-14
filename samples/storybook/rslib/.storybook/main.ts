import type { StorybookConfig } from "storybook-react-rsbuild";

const storybookConfig: StorybookConfig = {
    framework: "storybook-react-rsbuild",
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
        "storybook-addon-rslib"
    ],
    stories: [
        "../../../rsbuild/components/src/**/*.stories.(tsx|mdx)"
    ],
    docs: {
        autodocs: false
    }
};

export default storybookConfig;
