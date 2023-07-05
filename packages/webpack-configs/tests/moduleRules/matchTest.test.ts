import type { RuleSetRule } from "webpack";
import { matchTest } from "../../src/transformers/moduleRules.ts";

test("when the module rule test is a string and match the value, return true", () => {
    const moduleRule: RuleSetRule = {
        test: "register.js"
    };

    const matcher = matchTest("register.js");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when the module rule test is a string and doesn't match the value, return false", () => {
    const moduleRule: RuleSetRule = {
        test: "register.js"
    };

    const matcher = matchTest("index.js");

    expect(matcher(moduleRule, 0, [])).toBeFalsy();
});

test("when the module rule test is a regex and match the value, return true", () => {
    const moduleRule: RuleSetRule = {
        test: /\.(ts|tsx)/i
    };

    const matcher = matchTest(/\.(ts|tsx)/i);

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when the module rule test is a regex and doesn't match the value, return false", () => {
    const moduleRule: RuleSetRule = {
        test: /\.(ts|tsx)/i
    };

    const matcher = matchTest(/\.(js|jsx)/i);

    expect(matcher(moduleRule, 0, [])).toBeFalsy();
});
