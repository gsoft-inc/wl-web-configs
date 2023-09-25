# Advanced Usage

If the default configuration doesn’t fit your needs, and you want to create your own configuration, you can start by extending the available configuration parts and then adding or removing rules as needed.

The `@workleap/eslint-plugin` package exposes the following configuration parts:

- **`core`**: Basic rules shared by every configuration
- **`typescript`**: TypeScript specific rules, using @typescript-eslint/parser
- **`react`**: React specific rules
- **`jsx-a11y`**: Accessibility specific rules
- **`jest`**: Jest specific rules
- **`testing-library`**: Testing library specific rules
- **`storybook`**: Storybook specific rules
- **`mdx`**: MDX specific rules

Each configuration block can be extended individually, or in combination with others, to compose your custom ESLint configuration.

Here's an example of how to use the TypeScript configuration block in your .eslintrc.json file:

```json
{
  "extends": ["plugin:@workleap/typescript"],
  "rules": {
    // your custom rules
  }
}
```
Similarly, here's an example of how to use the react configuration block:

```json
{
  "extends": ["plugin:@workleap/react"],
  "rules": {
    // your custom rules
  }
}
```
And here's an example of how to use both TypeScript and react configuration blocks together:

```json
{
  "extends": ["plugin:@workleap/typescript", "plugin:@workleap/react"],
  "rules": {
    // your custom rules
  }
}
```

Alternatively, if you want to lint files other than `.ts/.tsx/.js/.jsx`, you will need create different overwrite blocks

```json
{
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "extends": ["plugin:@workleap/typescript", "plugin:@workleap/react"],
            "rules": {
                // your custom rules
            }
        },
        {
            "files": ["*.mdx"],
            "extends": ["plugin:@workleap/mdx"],
            "rules": {
                // your custom rules
            }
        }
    ]
}
```
