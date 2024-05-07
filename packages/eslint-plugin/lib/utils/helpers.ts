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

export function withLimitedScope(configs: Linter.FlatConfig[], limitedPath: string, ignores?: string[]): Linter.FlatConfig[] {
    return configs.map(conf => {
        const newConf = {
            ...conf
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

        return newConf
    });
}

export function withIgnores(configs: Linter.FlatConfig[], ignores: string[]): Linter.FlatConfig[] {
    return configs.map(conf => ({
        ...conf,
        ignores: (conf.ignores ?? []).concat(ignores)
    }));
}


export default {
    withGlobals,
    withLimitedScope,
    withIgnores
};
