// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig(swcConfig, {
    fastRefresh: true,
    environmentVariables: {
        "USE_MSW": process.env.USE_MSW
    }
});
