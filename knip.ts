import type { KnipConfig } from "knip";

type KnipWorkspaceConfig = NonNullable<KnipConfig["workspaces"]>[string];

type KnipTransformer = (config: KnipWorkspaceConfig) => KnipWorkspaceConfig;

function defineWorkspace({ ignore, ...config }: KnipWorkspaceConfig, transformers?: KnipTransformer[]): KnipWorkspaceConfig {
    let transformedConfig: KnipWorkspaceConfig = {
        ...config,
        ignore: [
            ...(ignore as string[] ?? []),
            "node_modules/**",
            "dist/**"
        ]
    };

    if (transformers) {
        transformedConfig = transformers.reduce((acc, transformer) => transformer(acc), transformedConfig);
    }

    return transformedConfig;
}

const ignoreBrowserslist: KnipTransformer = ({ ignoreDependencies, ...config }) => {
    return {
        ...config,
        ignoreDependencies: [
            ...(ignoreDependencies as string[] ?? []),
            // Browserlist isn't supported by plugins.
            "@workleap/browserslist-config"
        ]
    };
};

const ignoreEslint: KnipTransformer = ({ ignoreDependencies, ...config }) => {
    return {
        ...config,
        ignoreDependencies: [
            ...(ignoreDependencies as string[] ?? []),
            // Browserlist isn't supported by plugins.
            "@workleap/eslint-plugin",
            // Ignoring until the TS config files using ESM features known issue is fixed: https://knip.dev/reference/known-issues.
            "eslint"
        ]
    };
};

const configurePostcss: KnipTransformer = config => {
    return {
        ...config,
        postcss: {
            config: ["postcss.config.ts"]
        }
    };
};

const configureMsw: KnipTransformer = ({ entry, ignore, ...config }) => {
    return {
        ...config,
        entry: [
            ...(entry as string[] ?? []),
            "src/mocks/browser.ts",
            "src/mocks/handlers.ts"
        ],
        ignore: [
            ...(ignore as string[] ?? []),
            // MSW isn't supported by plugins.
            "public/mockServiceWorker.js"
        ]
    };
};

const configureWebpack: KnipTransformer = ({ ignoreDependencies, ...config }) => {
    return {
        ...config,
        webpack: {
            config: ["webpack.*.js"]
        },
        ignoreDependencies: [
            ...(ignoreDependencies as string[] ?? []),
            "@svgr/webpack",
            "swc-loader",
            "css-loader",
            "postcss-loader",
            "style-loader",
            "mini-css-extract-plugin"
        ].filter(Boolean) as string[]
    };
};

const configureTsup: KnipTransformer = config => {
    return {
        ...config,
        tsup: {
            config: ["tsup.*.ts"]
        }
    };
};

const configurePackage: KnipTransformer = config => {
    return {
        ...config
    };
};

const configureSample: KnipTransformer = ({ entry, ...config }) => {
    return {
        ...config,
        entry: [
            ...(entry as string[] ?? []),
            "src/index.ts",
            "src/index.tsx"
        ],
        // eslint: true,
        stylelint: true
    };
};

const rootConfig = defineWorkspace({
    ignoreDependencies: [
        // Required for Stylelint (seems like a Knip bug)
        "prettier",
        // Installed once for all the workspace's projects
        "ts-node"
    ]
}, [
    ignoreEslint
]);

const packagesConfig: KnipWorkspaceConfig = defineWorkspace({}, [
    configurePackage,
    configureTsup,
    ignoreEslint
]);

const swcConfig: KnipWorkspaceConfig = defineWorkspace({
    ignoreDependencies: [
        // Omitting the optional peer dependencies from the peerDependencies emits
        // runtime errors like "[ERROR] Could not resolve "browserslist"".
        "@swc/jest",
        "browserslist"
    ]
}, [
    configurePackage,
    configureTsup,
    ignoreEslint
]);

const webpackConfig: KnipWorkspaceConfig = defineWorkspace({
    ignoreDependencies: [
        // Emits an referenced optionap peerDependencies warning but according to PNPM
        // documentation, to specify a version constraint, the optional dependency must be define.
        // See: https://pnpm.io/package_json#peerdependenciesmetaoptional.
        "webpack-dev-server"
    ]
}, [
    configurePackage,
    configureTsup,
    ignoreEslint
]);

const typescriptConfig: KnipWorkspaceConfig = defineWorkspace({}, [
    configurePackage
]);

const sampleAppConfig = defineWorkspace({}, [
    configureSample,
    ignoreBrowserslist,
    configurePostcss,
    configureWebpack,
    configureMsw,
    ignoreEslint
]);

const sampleComponentsConfig = defineWorkspace({}, [
    configureSample,
    configureTsup
]);

const sampleUtilsConfig = defineWorkspace({}, [
    configureSample,
    configureTsup,
    ignoreEslint
]);

const config: KnipConfig = {
    workspaces: {
        ".": rootConfig,
        "packages/*": packagesConfig,
        "packages/swc-configs": swcConfig,
        "packages/webpack-configs": webpackConfig,
        "packages/typescript-configs": typescriptConfig,
        "sample/app": sampleAppConfig,
        "sample/components": sampleComponentsConfig,
        "sample/utils": sampleUtilsConfig
    },
    ignoreWorkspaces: [
        // Until it supports ESM.
        "packages/stylelint-configs",
        // Ignoring until the TS config files using ESM features known issue is fixed: https://knip.dev/reference/known-issues.
        "packages/eslint-plugin"
    ],
    exclude: [
        // It cause issues with config like Jest "projects".
        "unresolved"
    ],
    ignoreExportsUsedInFile: true
};

export default config;
