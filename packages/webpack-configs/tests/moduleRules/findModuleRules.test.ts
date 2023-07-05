import type { Configuration, RuleSetRule, RuleSetUseItem } from "webpack";
import { findModuleRules, matchAssetModuleType, matchLoaderName } from "../../src/transformers/moduleRules.ts";

test("when the webpack configuration doesn't have a module section, return undefined", () => {
    const result = findModuleRules({}, matchAssetModuleType("asset/resource"));

    expect(result).toBeUndefined();
});

test("when the webpack configuration doesn't have a rule section, return undefined", () => {
    const config: Configuration = {
        module: {}
    };

    const result = findModuleRules(config, matchAssetModuleType("asset/resource"));

    expect(result).toBeUndefined();
});

test("when multiple matching rules are found in the rules array, return the module rules", () => {
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
                },
                {
                    test: /\.svg/i,
                    type: "asset/resource"
                }
            ]
        }
    };

    const result = findModuleRules(config, matchAssetModuleType("asset/resource"));

    expect(result?.length).toBe(2);
    expect((result![0].moduleRule as RuleSetRule).test?.toString()).toBe(/\.(png|jpe?g|gif)/i.toString());
    expect((result![1].moduleRule as RuleSetRule).test?.toString()).toBe(/\.svg/i.toString());
});

test("when multiple matching rules are found in a \"oneOf\" prop, return the module rules", () => {
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
                    oneOf: [
                        {
                            test: /\.(png|jpe?g|gif)/i,
                            type: "asset/resource"
                        },
                        {
                            test: /\.svg/i,
                            type: "asset/resource"
                        }
                    ]
                }
            ]
        }
    };

    const result = findModuleRules(config, matchAssetModuleType("asset/resource"));

    expect(result?.length).toBe(2);
    expect((result![0].moduleRule as RuleSetRule).test?.toString()).toBe(/\.(png|jpe?g|gif)/i.toString());
    expect((result![1].moduleRule as RuleSetRule).test?.toString()).toBe(/\.svg/i.toString());
});

test("when multiple matching rules are found in a \"use\" prop, return the module rules", () => {
    const config: Configuration = {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)/i,
                    use: [
                        { loader: "swc-loader" }
                    ]
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
                },
                {
                    test: /\.(js|jsx)/i,
                    use: [
                        { loader: "swc-loader" }
                    ]
                }
            ]
        }
    };

    const result = findModuleRules(config, matchLoaderName("swc-loader"));

    expect(result?.length).toBe(2);
    // Type inference is broken because RuleSetUseItem can be a string.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect((result![0].moduleRule as RuleSetUseItem).loader).toBe("swc-loader");
    // Type inference is broken because RuleSetUseItem can be a string.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect((result![1].moduleRule as RuleSetUseItem).loader).toBe("swc-loader");
});

test("when multiple matching rules are found in the rules array and a \"oneOf\" prop, return the module rules", () => {
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
                    oneOf: [
                        {
                            test: /\.(png|jpe?g|gif)/i,
                            type: "asset/resource"
                        }
                    ]
                },
                {
                    test: /\.svg/i,
                    type: "asset/resource"
                }
            ]
        }
    };

    const result = findModuleRules(config, matchAssetModuleType("asset/resource"));

    expect(result?.length).toBe(2);
    expect((result![0].moduleRule as RuleSetRule).test?.toString()).toBe(/\.(png|jpe?g|gif)/i.toString());
    expect((result![1].moduleRule as RuleSetRule).test?.toString()).toBe(/\.svg/i.toString());
});

test("when multiple matching rules are found in the rules array and a \"use\" prop, return the module rules", () => {
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
                    test: /\.(js|jsx)/i,
                    use: [
                        { loader: "swc-loader" }
                    ]
                },
                {
                    test: /\.svg/i,
                    type: "asset/resource"
                }
            ]
        }
    };

    const result = findModuleRules(config, matchLoaderName("swc-loader"));

    expect(result?.length).toBe(2);
    // Type inference is broken because RuleSetUseItem can be a string.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect((result![0].moduleRule as RuleSetUseItem).loader).toBe("swc-loader");
    // Type inference is broken because RuleSetUseItem can be a string.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect((result![1].moduleRule as RuleSetUseItem).loader).toBe("swc-loader");
});

test("when there are no matching rule, return an empty array", () => {
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

    const result = findModuleRules(config, matchAssetModuleType("asset/inline"));

    expect(result).toBeDefined();
    expect(result?.length).toBe(0);
});

test("when a module rule is undefined, do not throw", () => {
    const config: Configuration = {
        module: {
            rules: [
                // Since Webpack configs are usually untyped, it's preferable to test this.
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

    expect(() => findModuleRules(config, matchAssetModuleType("asset/inline"))).not.toThrow();
});

test("when an undefined module rule is nested in a \"oneOf\" prop, do not throw", () => {
    const config: Configuration = {
        module: {
            rules: [
                {
                    oneOf: [
                        // Since Webpack configs are usually untyped, it's preferable to test this.
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

    expect(() => findModuleRules(config, matchAssetModuleType("asset/inline"))).not.toThrow();
});
