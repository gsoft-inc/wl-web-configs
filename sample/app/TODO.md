
SWC:

peerDependencies:
    - @swc/core,
    - @swc/helpers

options:
    - any swc options


-> KEEP IN MIND, that the swc config will also be used by Jest, hopefully, that config can also be a .js, will
-> The swc project will probably exports:
    - defineDevConfig
            options:
                - react: bool
                - fastRefresh: bool
    - defineBuildConfig
                - react: bool
    - defineJestConfig
            options:
                - react: bool

-> Add a lot of snapshot tests to try different config override



Webpack

dependencies:
    - browserslist
    - deepmerge
    - html-webpack-plugin
    - swc-loader
    - terser-webpack-plugin

peerDependencies:
    - @swc/core,
    - @swc/helpers,
    - webpack
    - webpack-dev-server

optionalPeerDependencies:
    - style-loader
    - css-loader
    - @pmmmwh/react-refresh-webpack-plugin
    - @svgr/webpack

options:
    - any webpack options

    - fastRefresh: bool
    - cache: bool
    - css: bool
    - images: bool

-> The webpack project will probably exports:
    - defineDevConfig
    - defineBuildConfig

-> Should also accepts transformer functions
-> Maybe even export à WebpackConfigTransformer interface?!
-> enrichWithBrowserslistConfig.js should be in the webpack config project

-> Add a lot of snapshot tests to try different config override




Jest

options:
    - any jest options

peerDependencies:
    - @swc/core
    - @swc/jest
    - jest
