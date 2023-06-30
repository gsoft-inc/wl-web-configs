// @ts-check

// import postcssPresetEnv from "postcss-preset-env";

const postcssPresetEnv = require("postcss-preset-env");

console.log("*************** Hello from postcss.config.js **************");

// export default {
//     // @ts-ignore
//     plugins: [postcssPresetEnv({
//         browsers: "last 100 versions"
//     })]
// };

module.exports = {
    // @ts-ignore
    plugins: [postcssPresetEnv({
        browsers: "last 100 versions"
    })]
};
