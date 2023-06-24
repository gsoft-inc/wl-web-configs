import type { Config } from "@swc/core";
import browserslist from "browserslist";

export interface AddBrowserslistTargetsOptions {
    browserslistFilePath?: string;
}

export function addBrowserslistTargets(swcConfig: Config, { browserslistFilePath }: AddBrowserslistTargetsOptions = {}) {
    if (swcConfig) {
        const browsers = browserslist(undefined, {
            path: browserslistFilePath
        });

        if (!swcConfig.env) {
            swcConfig.env = {};
        }

        swcConfig.env.targets = browsers;
    }

    return swcConfig;
}
