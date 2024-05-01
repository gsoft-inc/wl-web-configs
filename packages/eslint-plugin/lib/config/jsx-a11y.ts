import type { Linter } from "eslint";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import { sourceFiles } from "../utils/patterns";

const config: Linter.FlatConfig =
{
    plugins: { "jsx-a11y": jsxA11yPlugin },
    languageOptions: {
        parserOptions: jsxA11yPlugin.configs.recommended.parserOptions
    },
    files: sourceFiles,
    rules: {
        ...jsxA11yPlugin.configs.recommended.rules,
        // There is a really good article that describes the issues with autoFocus and why it should be avoided:
        // https://brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/
        // However, this issue is with screen readers and not with keyboard navigation.
        // In Workleap, we use autoFocus in a lot of places to improve the user experience.
        // Therefore, we are disabling this rule.
        "jsx-a11y/no-autofocus": "off",

        // This rule ensures that all labels have an associated control that they are labeling.
        // However, this rule causes a lot of false positive, since our current implementation of our company's design system
        // does not use the "for" attribute in the label element and automatically add it inside Fields.
        // Therefore, we are disabling this rule.
        "jsx-a11y/label-has-associated-control:": "off",

        // This rule ensures that all media elements have a <track> for captions.
        // Since we don't use captions, we are disabling this rule.
        "jsx-a11y/media-has-caption": "off"
    }
};

export default config;
