// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

export default defineBuildConfig({
    swcConfig,
    environmentVariables: {
        "USE_MSW": "false"
    }
});
