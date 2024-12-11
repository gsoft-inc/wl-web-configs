// Importing directly from the package to prevent circular dependencies.
import { defineJestConfig } from "../swc-configs/src/index.ts";

export const swcConfig = defineJestConfig();
