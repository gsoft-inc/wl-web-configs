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

Here's an example of how to use the TypeScript configuration block in your eslint.config.js file:

```javascript
import workleapPlugin from "@workleap/eslint-plugin";

const config = [
    workleapPlugin.configs.typescript,
    {
        rules: {
          // your custom rules
        }
    }
];

export default config;
```

Some premade configurations are already combinations of configs. Here's an example of how to use the react configuration block:

```javascript
import workleapPlugin from "@workleap/eslint-plugin";

const config = [
    ...workleapPlugin.configs.react,
    {
        rules: {
          // your custom rules
        }
    }
];

export default config;
```

And here's an example of how to use both TypeScript and react configuration blocks together:

```json
import workleapPlugin from "@workleap/eslint-plugin";

const config = [
    workleapPlugin.configs.typescript,
    ...workleapPlugin.configs.react,
    {
        rules: {
          // your custom rules
        }
    }
];

export default config;
```

Alternatively, if you want to change any of the underlying configuration, you will have to create new configuration blocks to modify existing configuration blocks.

```javascript
import workleapPlugin from "@workleap/eslint-plugin";

const config = [
    {
       ...workleapPlugin.configs.typescript, 
       files: ["*.ts"]
    },
    ...workleapPlugin.configs.react.map(config => (
        {
            ...config,
            files: ["*.jsx?"],
        }
    )),
    {
        ...workleapPlugin.configs.mdx,
        files: ["*.mdx"],
        rules: {
            ...workleapPlugin.configs.mdx.rules,
              // your custom rules
        }
    }
];

export default config;
```
