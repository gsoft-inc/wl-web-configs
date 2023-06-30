import type { Configuration, RuleSetRule } from "webpack";
import { findModuleRule, matchAssetModuleType } from "../src/transformers/moduleRules.ts";

test("when the webpack configuration doesn't have a module section, return undefined", () => {
    const result = findModuleRule({}, matchAssetModuleType("asset/resource"));

    expect(result).toBeUndefined();
});

test("when the webpack configuration doesn't have a rule section, return undefined", () => {
    const config: Configuration = {
        module: {}
    };

    const result = findModuleRule(config, matchAssetModuleType("asset/resource"));

    expect(result).toBeUndefined();
});

test("when the matching rule is the first rule of the rules array, return the matching rule", () => {
    const config: Configuration = {
        module: {
            rules: [
                {
                    test: /\.svg/i,
                    type: "asset/inline"
                },
                {
                    test: /\.(ts|tsx)/i,
                    loader: "swc-loader"
                },
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                }
            ]
        }
    };

    const result = findModuleRule(config, matchAssetModuleType("asset/inline"));

    expect(result).toBeDefined();
    expect(result?.index).toBe(0);
    expect(result?.parent).toBe(config.module?.rules);

    const match = result?.moduleRule as RuleSetRule;

    expect(match).toBeDefined();
    expect(match.type).toBe("asset/inline");
});

test("when the matching rule is the last rule of the rules array, return the matching rule", () => {
    const config: Configuration = {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)/i,
                    loader: "swc-loader"
                },
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                },
                {
                    test: /\.svg/i,
                    type: "asset/inline"
                }
            ]
        }
    };

    const result = findModuleRule(config, matchAssetModuleType("asset/inline"));

    expect(result).toBeDefined();
    expect(result?.index).toBe(2);
    expect(result?.parent).toBe(config.module?.rules);

    const match = result?.moduleRule as RuleSetRule;

    expect(match).toBeDefined();
    expect(match.type).toBe("asset/inline");
});

test("when the matching rule is nested in a \"oneOf\" prop and is the first rule of the array, return the matching rule", () => {
    const oneOfRule: RuleSetRule = {
        oneOf: [
            {
                test: /\.svg/i,
                type: "asset/inline"
            },
            {
                test: /\.(png|jpe?g|gif)/i,
                type: "asset/resource"
            }
        ]
    };

    const config: Configuration = {
        module: {
            rules: [
                oneOfRule,
                {
                    test: /\.js/i,
                    include: /node_modules/,
                    resolve: {
                        fullySpecified: false
                    }
                }
            ]
        }
    };

    const result = findModuleRule(config, matchAssetModuleType("asset/inline"));

    expect(result).toBeDefined();
    expect(result?.index).toBe(0);
    expect(result?.parent).toBe(oneOfRule.oneOf);

    const match = result?.moduleRule as RuleSetRule;

    expect(match).toBeDefined();
    expect(match.type).toBe("asset/inline");
});

test("when the matching rule is nested in a \"oneOf\" prop and is the last rule of the array, return the matching rule", () => {
    const oneOfRule: RuleSetRule = {
        oneOf: [
            {
                test: /\.(png|jpe?g|gif)/i,
                type: "asset/resource"
            },
            {
                test: /\.svg/i,
                type: "asset/inline"
            }
        ]
    };

    const config: Configuration = {
        module: {
            rules: [
                oneOfRule,
                {
                    test: /\.js/i,
                    include: /node_modules/,
                    resolve: {
                        fullySpecified: false
                    }
                }
            ]
        }
    };

    const result = findModuleRule(config, matchAssetModuleType("asset/inline"));

    expect(result).toBeDefined();
    expect(result?.index).toBe(1);
    expect(result?.parent).toBe(oneOfRule.oneOf);

    const match = result?.moduleRule as RuleSetRule;

    expect(match).toBeDefined();
    expect(match.type).toBe("asset/inline");
});

test("when there are no matching rule, return undefined", () => {
    const config: Configuration = {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)/i,
                    loader: "swc-loader"
                },
                {
                    test: /\.js/i,
                    include: /node_modules/,
                    resolve: {
                        fullySpecified: false
                    }
                },
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                }
            ]
        }
    };

    const result = findModuleRule(config, matchAssetModuleType("asset/inline"));

    expect(result).toBeUndefined();
});

test("throw an error when multiple module rules are found", () => {
    const config: Configuration = {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)/i,
                    loader: "swc-loader"
                },
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                },
                {
                    test: /\.svg/i,
                    type: "asset/inline"
                },
                {
                    test: /\.json/i,
                    type: "asset/inline"
                }
            ]
        }
    };

    expect(() => findModuleRule(config, matchAssetModuleType("asset/inline"))).toThrow();
});

test("when a module rule is undefined, do not throw", () => {
    const config: Configuration = {
        module: {
            rules: [
                // Since Webpack configs are usually untyped, it's better to test this use case.
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                undefined,
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                },
                {
                    test: /\.svg/i,
                    type: "asset/inline"
                }
            ]
        }
    };

    expect(() => findModuleRule(config, matchAssetModuleType("asset/inline"))).not.toThrow();
});

test("when an undefined module rule is nested in a \"oneOf\" prop, do not throw", () => {
    const config: Configuration = {
        module: {
            rules: [
                {
                    oneOf: [
                        // Since Webpack configs are usually untyped, it's better to test this use case.
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        undefined
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                },
                {
                    test: /\.svg/i,
                    type: "asset/inline"
                }
            ]
        }
    };

    expect(() => findModuleRule(config, matchAssetModuleType("asset/inline"))).not.toThrow();
});

