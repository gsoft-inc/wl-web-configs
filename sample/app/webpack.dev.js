// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

export default defineDevConfig(swcConfig, {
    profile: process.env.WL_PROFILE === "true",
    environmentVariables: {
        "USE_MSW": process.env.USE_MSW === "true",
        "STRING": "STRING_VALUE",
        "INT": 1
    }
});
