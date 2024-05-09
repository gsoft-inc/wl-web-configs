# Contributing

This entire repository uses this ESLint config to lint itself. It uses the live version in the `dist` directory, not the published version. You must build this package in order to lint the project.

## Inspecting configs

The easiest way to debug these configs is to use the config inspector provided by ESLint.

Run `pnpm dlx @eslint/config-inspector`. This will open the browser to a dashboard that will allow you to search by file or rule, and see exactly why a rule is applying to a specific file.

