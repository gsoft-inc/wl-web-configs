import type { RuleSetRule, RuleSetUseItem } from "webpack";
import { matchLoaderName } from "../../src/transformers/moduleRules.ts";

test("when module rule loader exactly match name, return true", () => {
    const moduleRule: RuleSetRule = {
        loader: "swc-loader"
    };

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when module rule loader includes name, return true", () => {
    const moduleRule: RuleSetRule = {
        loader: "node_modules/@swc/swc-loader"
    };

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when module rule loader doesn't match name, return false", () => {
    const moduleRule: RuleSetRule = {
        loader: "css-loader"
    };

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeFalsy();
});

test("when module rule use item loader exactly match name, return true", () => {
    const moduleRule: RuleSetUseItem = {
        loader: "swc-loader"
    };

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when module rule use item loader includes name, return true", () => {
    const moduleRule: RuleSetUseItem = {
        loader: "node_modules/@swc/swc-loader"
    };

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when module rule use item loader doesn't match name, return false", () => {
    const moduleRule: RuleSetUseItem = {
        loader: "css-loader"
    };

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeFalsy();
});

test("when module rule use item is a string and exactly match name, return true", () => {
    const moduleRule: RuleSetUseItem = "swc-loader";

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when module rule use item is a string and includes name, return true", () => {
    const moduleRule: RuleSetUseItem = "node_modules/@swc/swc-loader";

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when module rule use item is a string and doesn't match name, return false", () => {
    const moduleRule: RuleSetUseItem = "css-loader";

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeFalsy();
});


