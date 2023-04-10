//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { RuleTester, Linter } from "eslint";
import rule from "../../../lib/rules/strict-css-modules-names";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester();

const parserOptions: Linter.ParserOptions = {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
        jsx: true
    }
};

ruleTester.run("strict-css-modules-names", rule, {
    valid: [
        {
            filename: "C:/Dev/MyProject/settings/entrust/entrust-section.jsx",
            code: `
            import styles from "./entrust-section.module.css";
          `,
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/entrust/policy/bubble.jsx",
            code: `
            import styles from "./bubble.module.css";
          `,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "C:/Dev/MyProject/settings/entrust/entrust-section.jsx",
            code: `
            import styles from "./entrust/entrust-section.module.css";
            `,
            errors: [
                {
                    message:
                        "CSS Modules should be associated to one component and located in the same folder ./entrust-section.module.css. If the module is already used by another component, create a new one."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/entrust/entrust-section.jsx",
            code: `
            import styles from "@features/group-management/entrust-section.module.css";
            `,
            errors: [
                {
                    message:
                        "CSS Modules should be associated to one component and located in the same folder ./entrust-section.module.css. If the module is already used by another component, create a new one."
                }
            ],
            parserOptions
        },
        {
            filename: "C:/Dev/MyProject/settings/entrust/entrust-section.jsx",
            code: `
            import styles from "./entrust.module.css";
            `,
            errors: [
                {
                    message: "CSS Modules should be associated to one component and should be named ./entrust-section.module.css. If the module is already used by another component, create a new one."
                }
            ],
            parserOptions
        }
    ]
});
