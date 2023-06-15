# @workleap/swc-configs

## Maintainers notes

### CJS support

To support CJS projects, the package is build for ESM and CJS formats. For CJS projects to use the package we cannot add `type: "module"` to the `package.json` file.

Once all our projects use ESM, CJS support can be removed.
