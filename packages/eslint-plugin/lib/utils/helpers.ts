import type { Linter } from "eslint";
import Globals from "globals";
import path from "node:path";

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

function limitScope(scopePath: string, originalPath: string): string {
    return path.normalize(path.join(scopePath, originalPath)).split(path.sep).join("/");
}

/**
 * Limits the scope of a config object array to a specific path.
 *
 * @param configs Array of config objects
 * @param limitedPath Limit this config to the provided path
 * @param ignores Add scoped ignores to this config
 * @param rules Add rule overrides to this scoped config
 * @returns Array of config objects
 */
export function withLimitedScope(configs: Linter.FlatConfig[], limitedPath: string, ignores?: string[], rules?: Linter.RulesRecord): Linter.FlatConfig[] {
    return configs.map(conf => {
        const newConf = {
            ...conf,
            name: (conf.name + "/" + limitedPath).split("/").filter(Boolean).join("/")
        };

        // Process Files
        if (conf.files) {
            let limitedFiles: string[] = [];
            if (Array.isArray(conf.files)) {
                limitedFiles = conf.files.map(p => limitScope(limitedPath, p as string))
            } else if (typeof conf.files === 'string' ) {
                limitedFiles = [conf.files];
            }
            if (limitedFiles.length) {
                newConf.files = limitedFiles;
            }

        }

        // Process Ignores
        if (conf.ignores) {
            let limitedIgnores: string[] = [];
            if (Array.isArray(conf.ignores)) {
                limitedIgnores = (conf.ignores).map(p => limitScope(limitedPath, p))
            }
            if (limitedIgnores.length) {
                newConf.ignores = limitedIgnores;
            }
        }

        if (ignores) {
            newConf.ignores = (newConf.ignores ?? []).concat(ignores.map(p => limitScope(limitedPath, p)))
        }

        // Process Rules
        if (rules) {
            newConf.rules = {
                ...(newConf.rules ?? {}),
                ...rules
            };
        }

        return newConf
    });
}

export function withIgnores(configs: Linter.FlatConfig[], ignores: string[]): Linter.FlatConfig[] {
    return configs.map(conf => ({
        ...conf,
        ignores: (conf.ignores ?? []).concat(ignores)
    }));
}

export function appendDebugName(configs: Linter.FlatConfig[], name: string): Linter.FlatConfig[] {
    return configs.map(conf => ({
        ...conf,
        name: conf.name + '/'+ name
    }));
}

export default {
    withGlobals,
    withLimitedScope,
    withIgnores,
    appendDebugName
};
