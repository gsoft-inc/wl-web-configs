import type { Configuration, RuleSetRule } from "webpack";
import { addAfterModuleRule, matchAssetModuleType } from "../src/transformers/moduleRules.ts";

test("when a matching module rule is found at the root, add after the module rule", () => {
    const newRule: RuleSetRule = {
        test: /\.(ts|tsx)/i,
        loader: "swc-loader"
    };

    const config: Configuration = {
        module: {
            rules: [
                {
                    test: /\.png/,
                    type: "asset/resource"
                },
                {
                    test: /\.svg/i,
                    type: "asset/inline"
                },
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                }
            ]
        }
    };

    addAfterModuleRule(config, matchAssetModuleType("asset/inline"), [newRule]);

    expect(config.module?.rules?.length).toBe(4);
    expect(config.module!.rules![2]).toBe(newRule);
});

test("when a matching module rule is found in a \"oneOf\" prop, add after the module rule", () => {
    const newRule: RuleSetRule = {
        test: /\.json/i,
        type: "json"
    };

    const config: Configuration = {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)/i,
                    loader: "swc-loader"
                },
                {
                    oneOf: [
                        {
                            test: /\.png/,
                            type: "asset/resource"
                        },
                        {
                            test: /\.svg/i,
                            type: "asset/inline"
                        },
                        {
                            test: /\.(jpe?g|gif)/i,
                            type: "asset/resource"
                        }
                    ]
                }
            ]
        }
    };

    addAfterModuleRule(config, matchAssetModuleType("asset/inline"), [newRule]);

    expect((config.module?.rules![1] as RuleSetRule).oneOf!.length).toBe(4);
    expect((config.module?.rules![1] as RuleSetRule).oneOf![2]).toBe(newRule);
});

test("when no matching module rule is found, do nothing", () => {
    const newRule: RuleSetRule = {
        test: /\.(ts|tsx)/i,
        loader: "swc-loader"
    };

    const config: Configuration = {
        module: {
            rules: [
                {
                    test: /\.png/,
                    type: "asset/resource"
                },
                {
                    test: /\.(png|jpe?g|gif)/i,
                    type: "asset/resource"
                }
            ]
        }
    };

    addAfterModuleRule(config, matchAssetModuleType("asset/inline"), [newRule]);

    expect(config.module?.rules?.length).toBe(2);
});
