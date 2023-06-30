// import type { Configuration, RuleSetRule } from "webpack";
// import { findModuleRule, matchLoaderName } from "../src/transformers/moduleRules.ts";

// test("when the webpack configuration doesn't have a module section, return undefined", () => {
//     const result = findModuleRule({}, matchLoaderName("swc-loader"));

//     expect(result).toBeUndefined();
// });

// test("when the webpack configuration doesn't have a rule section, return undefined", () => {
//     const config: Configuration = {
//         module: {}
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeUndefined();
// });

// test("when the matching rule is the first rule of the rules array, return the matching rule", () => {
//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     test: /\.(ts|tsx)/i,
//                     loader: "swc-loader"
//                 },
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeDefined();
//     expect(result?.index).toBe(0);
//     expect(result?.parent).toBeUndefined();

//     const match = result?.moduleRule as RuleSetRule;

//     expect(match).toBeDefined();
//     expect(match.loader).toBe("swc-loader");
// });

// test("when the matching rule is the last rule of the rules array, return the matching rule", () => {
//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 },
//                 {
//                     test: /\.(ts|tsx)/i,
//                     loader: "swc-loader"
//                 }
//             ]
//         }
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeDefined();
//     expect(result?.index).toBe(2);
//     expect(result?.parent).toBeUndefined();

//     const match = result?.moduleRule as RuleSetRule;

//     expect(match).toBeDefined();
//     expect(match.loader).toBe("swc-loader");
// });

// test("when the matching rule is nested in a \"use\" prop and is the first rule of the array, return the matching rule", () => {
//     const tsModuleRule = {
//         test: /\.(ts|tsx)/i,
//         use: [
//             { loader: "swc-loader" },
//             { loader: "babel-loader" },
//             { loader: "esbuild-loader" }
//         ]
//     };

//     const config: Configuration = {
//         module: {
//             rules: [
//                 tsModuleRule,
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeDefined();
//     expect(result?.index).toBe(0);
//     expect(result?.parent).toBe(tsModuleRule);

//     const match = result?.moduleRule as RuleSetRule;

//     expect(match).toBeDefined();
//     expect(match.loader).toBe("swc-loader");
// });

// test("when the matching rule is nested in a \"use\" prop and is the last rule of the array, return the matching rule", () => {
//     const tsModuleRule = {
//         test: /\.(ts|tsx)/i,
//         use: [
//             { loader: "babel-loader" },
//             { loader: "esbuild-loader" },
//             { loader: "swc-loader" }
//         ]
//     };

//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 },
//                 tsModuleRule
//             ]
//         }
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeDefined();
//     expect(result?.index).toBe(2);
//     expect(result?.parent).toBe(tsModuleRule);

//     const match = result?.moduleRule as RuleSetRule;

//     expect(match).toBeDefined();
//     expect(match.loader).toBe("swc-loader");
// });

// test("when the matching rule is nested in a \"oneOf\" prop and is the first rule of the array, return the matching rule", () => {
//     const oneOfRule = {
//         oneOf: [
//             {
//                 test: /\.(ts|tsx)/i,
//                 loader: "swc-loader"
//             },
//             {
//                 test: /\.(ts|tsx)/i,
//                 loader: "babel-loader"
//             }
//         ]
//     };

//     const config: Configuration = {
//         module: {
//             rules: [
//                 oneOfRule,
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeDefined();
//     expect(result?.index).toBe(0);
//     expect(result?.parent).toBe(oneOfRule);

//     const match = result?.moduleRule as RuleSetRule;

//     expect(match).toBeDefined();
//     expect(match.loader).toBe("swc-loader");
// });

// test("when the matching rule is nested in a \"oneOf\" prop and is the last rule of the array, return the matching rule", () => {
//     const oneOfRule = {
//         oneOf: [
//             {
//                 test: /\.(ts|tsx)/i,
//                 loader: "babel-loader"
//             },
//             {
//                 test: /\.(ts|tsx)/i,
//                 loader: "swc-loader"
//             }
//         ]
//     };

//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 },
//                 oneOfRule
//             ]
//         }
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeDefined();
//     expect(result?.index).toBe(1);
//     expect(result?.parent).toBe(oneOfRule);

//     const match = result?.moduleRule as RuleSetRule;

//     expect(match).toBeDefined();
//     expect(match.loader).toBe("swc-loader");
// });

// test("when the matching rule is nested in a \"oneOf\" prop then in a \"use\" prop, return the matching rule", () => {
//     const tsRule = {
//         test: /\.(ts|tsx)/i,
//         use: [
//             { loader: "swc-loader" }
//         ]
//     };

//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     oneOf: [
//                         tsRule,
//                         {
//                             test: /\.(ts|tsx)/i,
//                             loader: "babel-loader"
//                         }
//                     ]
//                 },
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeDefined();
//     expect(result?.index).toBe(0);
//     expect(result?.parent).toBe(tsRule);

//     const match = result?.moduleRule as RuleSetRule;

//     expect(match).toBeDefined();
//     expect(match.loader).toBe("swc-loader");
// });

// test("when there are no matching rule, return undefined", () => {
//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     test: /\.(js|jsx)/i,
//                     loader: "babel-loader"
//                 },
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     const result = findModuleRule(config, matchLoaderName("swc-loader"));

//     expect(result).toBeUndefined();
// });

// test("throw an error when multiple module rules are found", () => {
//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     test: /\.(js|jsx)/i,
//                     loader: "swc-loader"
//                 },
//                 {
//                     test: /\.(ts|tsx)/i,
//                     loader: "swc-loader"
//                 },
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     expect(() => findModuleRule(config, matchLoaderName("swc-loader"))).toThrow();
// });

// test("when a module rule is undefined, do not throw", () => {
//     const config: Configuration = {
//         module: {
//             rules: [
//                 // Since Webpack configs are usually untyped, it's better to test this use case.
//                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                 // @ts-ignore
//                 undefined,
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     expect(() => findModuleRule(config, matchLoaderName("swc-loader"))).not.toThrow();
// });

// test("when an undefined module rule is nested in a \"use\" prop, do not throw", () => {
//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     test: /\.(js|jsx)/i,
//                     use: [
//                         // Since Webpack configs are usually untyped, it's better to test this use case.
//                         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                         // @ts-ignore
//                         undefined
//                     ]
//                 },
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     expect(() => findModuleRule(config, matchLoaderName("swc-loader"))).not.toThrow();
// });

// test("when an undefined module rule is nested in a \"oneOf\" prop, do not throw", () => {
//     const config: Configuration = {
//         module: {
//             rules: [
//                 {
//                     oneOf: [
//                         // Since Webpack configs are usually untyped, it's better to test this use case.
//                         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                         // @ts-ignore
//                         undefined
//                     ]
//                 },
//                 {
//                     test: /\.js/i,
//                     include: /node_modules/,
//                     resolve: {
//                         fullySpecified: false
//                     }
//                 },
//                 {
//                     test: /\.(png|jpe?g|gif)/i,
//                     type: "asset/resource"
//                 }
//             ]
//         }
//     };

//     expect(() => findModuleRule(config, matchLoaderName("swc-loader"))).not.toThrow();
// });

