import type { Linter } from "eslint";
import { concat } from "eslint-flat-config-utils";
import packageJsonPluginRecommended from "eslint-plugin-package-json/configs/recommended";

const config: Linter.FlatConfig[] = await concat(
    {
        ...(packageJsonPluginRecommended as Linter.FlatConfig),
        name: "Workleap/Package.json",
        files: ["package.json"],
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
    }
);

export default config;
