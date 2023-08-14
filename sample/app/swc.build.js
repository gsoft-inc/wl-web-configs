// @ts-check

import browsers from "@workleap/browserslist-configs";
import { defineBuildConfig } from "@workleap/swc-configs";

export const swcConfig = defineBuildConfig({
    browsers
});
