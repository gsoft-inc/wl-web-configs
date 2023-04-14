import type { Linter } from "eslint";
import { testFiles, reactTestFiles } from "../../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: [...testFiles, ...reactTestFiles],
            plugins: ["jest"],
            env: {
                jest: true,
                browser: true,
                node: true
            },
            extends: ["plugin:jest/recommended"],
            rules: {
                // Prefer spies to allow for automatic restoration
                "jest/prefer-spy-on": "warn",
                // Gives better failure messages for array checks
                "jest/prefer-to-contain": "warn",

                // like jest/recommended, but set severity to warning
                "jest/expect-expect": "warn",
                "jest/no-alias-methods": "warn",
                "jest/no-commented-out-tests": "warn",
                "jest/no-conditional-expect": "warn",
                "jest/no-deprecated-functions": "warn",
                "jest/no-disabled-tests": "warn",
                "jest/no-done-callback": "warn",
                "jest/no-export": "warn",
                "jest/no-focused-tests": "warn",
                "jest/no-identical-title": "warn",
                "jest/no-interpolation-in-snapshots": "warn",
                "jest/no-jasmine-globals": "warn",
                "jest/no-mocks-import": "warn",
                "jest/no-standalone-expect": "warn",
                "jest/no-test-prefixes": "warn",
                "jest/valid-describe-callback": "warn",
                "jest/valid-expect": "warn",
                "jest/valid-expect-in-promise": "warn",
                "jest/valid-title": "warn"
            }
        }
    ]
};

export = config;
