# webpack-configs

## Gotchas to remember

### Add the @swc/helpers packages to all monorepo imported projects having JSX code

To work properly, all projects having React/JSX code that are referenced by the host project must also install `@swc/helpers` as a `devDependency`.
