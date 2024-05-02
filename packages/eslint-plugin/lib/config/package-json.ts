import type { Linter } from "eslint";
import packageJsonPluginRecommended from "eslint-plugin-package-json/configs/recommended";

//@ts-ignore
const config: Linter.FlatConfig = {
    ...packageJsonPluginRecommended,
    files: ["**/package.json"],
    rules: {
        ...packageJsonPluginRecommended.rules,
        "package-json/prefer-repository-shorthand": "off",
        "package-json/sort-collections": [
            "error",
            [
                // Do not sort "scripts".
                "devDependencies",
                "dependencies",
                "peerDependencies",
                "config"
            ]
        ],
        // Doesn't support "workspace:*" at the moment.
        "package-json/valid-package-def": "off",
        // I am not sure why, this rule is triggering errors for valid paths.
        "package-json/valid-repository-directory": "off"
    }
};

export default config;
