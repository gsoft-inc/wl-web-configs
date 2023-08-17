import type { RuleSetRule, RuleSetUseItem } from "webpack";
import { addAfterModuleRule, matchAssetModuleType, matchLoaderName } from "../../src/transformers/moduleRules.ts";
import type { WebpackConfig } from "../../src/types.ts";

test("when a matching module rule is found in the rules array, add after the module rule", () => {
    const newRule: RuleSetRule = {
        test: /\.(ts|tsx)/i,
        loader: "swc-loader"
    };

    const config: WebpackConfig = {
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
                    test: /\.(jpe?g|gif)/i,
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

    const config: WebpackConfig = {
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

test("when a matching module rule is found in a \"use\" prop, add after the module rule", () => {
    const newRule: RuleSetUseItem = {
        loader: "swc-loader"
    };

    const config: WebpackConfig = {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)/i,
                    use: [
                        { loader: "babel-loader" },
                        { loader: "esbuild-loader" }
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
                }
            ]
        }
    };

    addAfterModuleRule(config, matchLoaderName("esbuild-loader"), [newRule]);

    expect(((config.module?.rules![0] as RuleSetRule).use as RuleSetUseItem[])!.length).toBe(3);
    expect(((config.module?.rules![0] as RuleSetRule).use as RuleSetUseItem[])![2]).toBe(newRule);
});

test("when no matching module rule is found, do nothing", () => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());

    const newRule: RuleSetRule = {
        test: /\.(ts|tsx)/i,
        loader: "swc-loader"
    };

    const config: WebpackConfig = {
        module: {
            rules: [
                {
                    test: /\.png/,
                    type: "asset/resource"
                },
                {
                    test: /\.(jpe?g|gif)/i,
                    type: "asset/resource"
                }
            ]
        }
    };

    addAfterModuleRule(config, matchAssetModuleType("asset/inline"), [newRule]);

    expect(config.module?.rules?.length).toBe(2);

    jest.spyOn(console, "log").mockRestore();
});
