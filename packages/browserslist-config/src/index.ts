const config: string[] = [
    "last 2 versions",
    "> 0.2%",
    "Firefox ESR",
    "not dead"
];

// Using TypeScript "export" keyword until browserlist support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = config;
