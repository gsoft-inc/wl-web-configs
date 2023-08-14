// @ts-check

import browsers from "@workleap/browserslist-configs";
import { defineDevConfig } from "@workleap/swc-configs";

export const swcConfig = defineDevConfig({
    browsers
});
