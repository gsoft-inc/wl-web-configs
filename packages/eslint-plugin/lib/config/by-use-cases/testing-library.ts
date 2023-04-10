import type { Linter } from "eslint";
import { testFiles, reactTestFiles } from "../../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: reactTestFiles,
            plugins: ["testing-library"],
            extends: ["plugin:testing-library/react"],
            rules: {
                "testing-library/await-async-query": "warn",
                "testing-library/await-async-utils": "warn",
                "testing-library/no-await-sync-query": "warn",
                "testing-library/no-container": "warn",
                "testing-library/no-debugging-utils": "warn",
                "testing-library/no-dom-import": ["warn", "react"],
                "testing-library/no-node-access": "warn",
                "testing-library/no-promise-in-fire-event": "warn",
                "testing-library/no-render-in-setup": "warn",
                "testing-library/no-unnecessary-act": "warn",
                "testing-library/no-wait-for-empty-callback": "warn",
                "testing-library/no-wait-for-multiple-assertions": "warn",
                "testing-library/no-wait-for-side-effects": "warn",
                "testing-library/no-wait-for-snapshot": "warn",
                "testing-library/prefer-find-by": "warn",
                "testing-library/prefer-presence-queries": "warn",
                "testing-library/prefer-query-by-disappearance": "warn",
                "testing-library/prefer-screen-queries": "warn",
                "testing-library/render-result-naming-convention": "warn"
            }
        },
        {
            files: testFiles,
            extends: ["plugin:testing-library/dom"],
            rules: {
                "testing-library/await-async-query": "warn",
                "testing-library/await-async-utils": "warn",
                "testing-library/no-await-sync-query": "warn",
                "testing-library/no-promise-in-fire-event": "warn",
                "testing-library/no-wait-for-empty-callback": "warn",
                "testing-library/no-wait-for-multiple-assertions": "warn",
                "testing-library/no-wait-for-side-effects": "warn",
                "testing-library/no-wait-for-snapshot": "warn",
                "testing-library/prefer-find-by": "warn",
                "testing-library/prefer-presence-queries": "warn",
                "testing-library/prefer-query-by-disappearance": "warn",
                "testing-library/prefer-screen-queries": "warn"
            }
        }
    ]
};

export = config;