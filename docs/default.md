---
order: 200
icon: rocket
label: Getting started
---

# Getting started

Welcome to `@workleap/web-configs`, a collection of **configuration libraries** for building web applications at [Workleap](https://workleap.com/). In this getting started page, you'll find an overview of the project and a list of supported tools.

!!!warning The prefered way for using these configuration libraries is by scaffolding your application with Workleap's [foundry-cli](https://github.com/gsoft-inc/wl-foundry-cli).
+++ pnpm
```bash
pnpm create @workleap/project@latest <output-directory>
```
+++ yarn
```bash
yarn create @workleap/project@latest <output-directory>
```
+++ npm
```bash
npm create @workleap/project@latest <output-directory>
```
+++
!!!

## Why

Let's be honest, starting a new web application is still a pain in the a**. There are so many tools to choose from, learn, install and configure.

For an organization like [Workleap](https://workleap.com/), with a large suit of products, it **doesn't make sense to start over everytime** we invest in new idea or add a new vertical to an existing product. Developers working on a new project shouldn't spend their first days figuring out which [ESLint](https://eslint.org/) rules to enable/disable, or how to transpile their [React](https://react.dev/) code, they should rather focus on **writing feature code**.

While a collection of common configurations get us closer to that goal, on their own, configuration libraries are not enough to achieve it. There is still a need to install and assemble those configurations correctly in the new application. To fill this gap, we also invested in a [CLI]((https://github.com/gsoft-inc/wl-foundry-cli)) to scaffold new web applications.

With the CLI, developers can generate fully configured web applications in a few minutes. However, contrary to configuration libraries, a CLI alone is only good at speeding up the creation of the initial application, it **doesn't help** with the **maintenance** or the **adoption of new features** offered by tools over time.

That's why we need both, there's a strong synergy between the configuration libraries and the CLI.

With configuration libraries distributed through NPM packages and installed with the CLI, when a new feature is available for a tool, the configuration libraries maintainers can spend time learning the new feature, making the necessary changes, and **distributing the changes with a new version** of the package. Then, at their convenience, **product teams can adopt the changes** by bumping the configuration library package version in their respective application.

We hope that having configuration libraries will speed up the creation of new frontend projects and facilite the maintenance overtime.

## Guiding principles

No locked in, everything is overridable




## Supported tools

Name - Website - Package






