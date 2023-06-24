Ideas:

-> Maybe could do a preflight (is it the right word) check to validate that a browserlist file, and swc config are available
    -> Would emit warnings, not stop the execution
    -> When in dev, would check for "swc.config.dev" at the root (could provide an alternative file path from the define function)
    -> When in build, would check for "swc.config.build' at the root (could provide an alternative file path from the define function)
    -> Would check for a .browserlistrc file at the root (could provide an alternative file path from the define function)

-> What's up with all the config transformer thing?
    -> Should define a TS interface
    -> The define function should accept an array of transformers


Webpack

dependencies:
    - swc-loader
    - html-webpack-plugin
    - terser-webpack-plugin

peerDependencies:
    - @swc/core,
    - @swc/helpers,
    - browserslist
    - webpack
    - webpack-dev-server

optionalPeerDependencies:
    - style-loader
    - css-loader
    - postcss-loader
    - @pmmmwh/react-refresh-webpack-plugin
    - @svgr/webpack

options:
    - any webpack options

    - fastRefresh: bool
    - cache: bool
    - css: bool  <---- should be included by default
    - images: bool <------ should be included by default

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
