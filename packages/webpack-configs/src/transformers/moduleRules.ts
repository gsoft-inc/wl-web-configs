import type { Configuration, RuleSetRule } from "webpack";

export type ModuleRuleMatcher = (moduleRule: RuleSetRule, index: number, array: RuleSetRule[]) => boolean;

export type AssetModuleType =
  | "javascript/auto"
  | "javascript/dynamic"
  | "javascript/esm"
  | "json"
  | "webassembly/sync"
  | "webassembly/async"
  | "asset"
  | "asset/source"
  | "asset/resource"
  | "asset/inline";

export function matchAssetModuleType(type: AssetModuleType): ModuleRuleMatcher {
    const matcher = (moduleRule: RuleSetRule) => {
        if (typeof moduleRule !== "string" && "type" in moduleRule) {
            return moduleRule.type === type;
        }

        return false;
    };

    // Add contextual information about the matcher when an error occurs.
    matcher.info = {
        type: matchAssetModuleType.name,
        value: type
    };

    return matcher;
}

export function matchTest(test: string | RegExp): ModuleRuleMatcher {
    const matcher = (moduleRule: RuleSetRule) => {
        if (typeof moduleRule !== "string" && "test" in moduleRule) {
            if (typeof moduleRule.test === "object" && typeof test === "object") {
                // Assuming it's regular expressions
                return moduleRule.test.toString() === test.toString();
            }

            return moduleRule.test === test;
        }

        return false;
    };

    // Add contextual information about the matcher when an error occurs.
    matcher.info = {
        type: matchTest.name,
        value: test.toString()
    };

    return matcher;
}

export interface ModuleRuleMatch {
    moduleRule: RuleSetRule;
    index: number;
    parent: RuleSetRule[];
}

function toMatch(moduleRule: RuleSetRule, index: number, parent: RuleSetRule[]) {
    return {
        moduleRule,
        index,
        parent
    };
}

function findModuleRulesRecursively(moduleRules: RuleSetRule[], matcher: ModuleRuleMatcher, parent: RuleSetRule[], matches: ModuleRuleMatch[]) {
    moduleRules.forEach((x, index, array) => {
        if (x) {
            if (matcher(x, index, array)) {
                matches.push(toMatch(x, index, parent));
            } else if (x.oneOf) {
                findModuleRulesRecursively(x.oneOf, matcher, x.oneOf, matches);
            }
        }
    });
}

export function findModuleRule(config: Configuration, matcher: ModuleRuleMatcher) {
    const moduleRules = config.module?.rules;

    if (!moduleRules) {
        return;
    }

    const matches: ModuleRuleMatch[] = [];

    findModuleRulesRecursively(moduleRules as RuleSetRule[], matcher, moduleRules as RuleSetRule[], matches);

    if (matches.length > 1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        throw new Error(`[webpack-configs] Found more than 1 matching module rule. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }

    return matches[0];
}

export function addBeforeModuleRule(config: Configuration, matcher: ModuleRuleMatcher, newModuleRules: RuleSetRule[]) {
    const match = findModuleRule(config, matcher);

    if (match) {
        match.parent.splice(match.index, 0, ...newModuleRules);
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        console.log(`[web-configs] Couldn't add the new module rules because no match has been found. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }
}

export function addAfterModuleRule(config: Configuration, matcher: ModuleRuleMatcher, newModuleRules: RuleSetRule[]) {
    const match = findModuleRule(config, matcher);

    if (match) {
        match.parent.splice(match.index + 1, 0, ...newModuleRules);
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        console.log(`[web-configs] Couldn't add the new module rules because no match has been found. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }
}

export function replaceModuleRule(config: Configuration, matcher: ModuleRuleMatcher, newModuleRule: RuleSetRule) {
    const match = findModuleRule(config, matcher);

    if (match) {
        match.parent[match.index] = newModuleRule;
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        console.log(`[web-configs] Couldn't replace the module rule because no match has been found. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }
}

export function removeModuleRules(config: Configuration, matcher: ModuleRuleMatcher) {


    // const countBefore = config.plugins?.length ?? 0;

    // config.plugins = config.plugins?.filter((...args) => !matcher(...args));

    // const countAfter = config.plugins?.length ?? 0;

    // if (countBefore === countAfter) {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     const matcherInfo = matcher.info;

    //     console.log(`[web-configs] Didn't remove any plugins because no match has been found. Matcher: "${matcherInfo}"`);
    // }
}
