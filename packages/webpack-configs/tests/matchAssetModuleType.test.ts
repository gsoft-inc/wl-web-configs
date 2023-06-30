import type { RuleSetRule } from "webpack";
import { matchAssetModuleType } from "../src/transformers/moduleRules.ts";

test("when the module rule asset module type match type, return true", () => {
    const moduleRule: RuleSetRule = {
        type: "asset/resource"
    };

    const matcher = matchAssetModuleType("asset/resource");

    expect(matcher(moduleRule, 0, [])).toBeTruthy();
});

test("when the module rule asset module type doesn't match the type, return false", () => {
    const moduleRule: RuleSetRule = {
        type: "asset/resource"
    };

    const matcher = matchAssetModuleType("asset/inline");

    expect(matcher(moduleRule, 0, [])).toBeFalsy();
});
