import type { RuleSetRule, RuleSetUseItem } from "webpack";
import { matchLoaderName } from "../../src/transformers/moduleRules.ts";

test("when module rule loader exactly match name, return true", () => {
    const moduleRule: RuleSetRule = {
        loader: "swc-loader"
    };

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when module rule loader is a path, return true if the name match an exact path segment", () => {
    const moduleRule: RuleSetRule = {
        loader: "\\node_modules\\.pnpm\\postcss-loader@7.3.3_postcss@8.4.24_webpack@5.86.0\\node_modules\\postcss-loader\\dist\\cjs.js"
    };

    const matcher1 = matchLoaderName("css-loader");
    const matcher2 = matchLoaderName("postcss-loader");

    expect(matcher1(moduleRule, 0, [])).toBeFalsy();
    expect(matcher2(moduleRule, 0, [])).toBeTruthy();
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

test("when module rule use item loader is a path, return true if the name match an exact path segment", () => {
    const moduleRule: RuleSetUseItem = {
        loader: "\\node_modules\\.pnpm\\postcss-loader@7.3.3_postcss@8.4.24_webpack@5.86.0\\node_modules\\postcss-loader\\dist\\cjs.js"
    };

    const matcher1 = matchLoaderName("css-loader");
    const matcher2 = matchLoaderName("postcss-loader");

    expect(matcher1(moduleRule, 0, [])).toBeFalsy();
    expect(matcher2(moduleRule, 0, [])).toBeTruthy();
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

test("when module rule use item is a string and a path, return true if the name match an exact path segment", () => {
    const moduleRule: RuleSetUseItem = "\\node_modules\\.pnpm\\postcss-loader@7.3.3_postcss@8.4.24_webpack@5.86.0\\node_modules\\postcss-loader\\dist\\cjs.js";

    const matcher1 = matchLoaderName("css-loader");
    const matcher2 = matchLoaderName("postcss-loader");

    expect(matcher1(moduleRule, 0, [])).toBeFalsy();
    expect(matcher2(moduleRule, 0, [])).toBeTruthy();
});

test("when module rule use item is a string and doesn't match name, return false", () => {
    const moduleRule: RuleSetUseItem = "css-loader";

    const matcher = matchLoaderName("swc-loader");

    expect(matcher(moduleRule, 0, [])).toBeFalsy();
});


