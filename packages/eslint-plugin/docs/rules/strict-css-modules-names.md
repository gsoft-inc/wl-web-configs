# CSS modules should have the same file name (minus the file extension) as the scoped component and be located in the same folder. (strict-css-modules-name)

CSS modules should have the same name as the component they are used in.

## Rule Details

This rules prevents the import of a CSS modules that isn't for this component.

To re-use CSS, consider using global styles instead.

Examples of **incorrect** code for this rule:

```js
// in file owner-row.jsx
import styles from "./owner-main-page.module.css";

// in file owner-row.jsx
import styles from "./owner-row/owner-row.module.css";
```

Examples of **correct** code for this rule:

```js
// in file owner-row.jsx
import styles from "./owner-row.module.css";

// importing global css file is fine
import styles from "./components/data-list.css";
```

## When Not To Use It

If you do not wish to enforce strict CSS modules names, you can safely disable this rule.
