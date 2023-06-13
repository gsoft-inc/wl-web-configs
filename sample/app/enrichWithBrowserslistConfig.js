import browserslist from "browserslist";
import merge from "deepmerge";

/**
 * If no browserslist file path is specified, it will search for a local ".browserslistrc" file.
 * @param {import("@swc/core").Config} swcConfig
 * @returns {import("@swc/core").Config}
 */
export function enrichWithBrowserslistConfig(swcConfig) {
    const browsers = browserslist();

    return merge.all([
        swcConfig,
        {
            env: {
                targets: browsers
            }
        }
    ]);
}
