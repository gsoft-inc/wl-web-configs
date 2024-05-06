import type { Linter } from "eslint";
import Globals from "globals";

export function withGlobals(configs: Linter.FlatConfig[], globals: Array<keyof typeof Globals>): Linter.FlatConfig[] {
    return configs.map(conf => ({
        ...conf,
        languageOptions: {
            ...(conf.languageOptions ?? {}),
            globals: {
                ...(conf.languageOptions?.globals ?? {}),
                ...(globals.reduce((acc, g) => {
                    return {
                        ...acc,
                        ...Globals[g]
                    };
                }, {}))
            }
        }
    }));
}
