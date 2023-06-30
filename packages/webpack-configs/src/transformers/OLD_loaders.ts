// import type { Configuration, RuleSetRule, RuleSetUseItem } from "webpack";

// export type LoaderMatcher = (moduleRule: RuleSetRule | RuleSetUseItem, index: number, array: RuleSetRule[] | RuleSetUseItem[]) => boolean;

// export function matchLoaderName(name: string): LoaderMatcher {
//     const matcher = (moduleRule: RuleSetRule | RuleSetUseItem) => {
//         if (typeof moduleRule === "string") {
//             return moduleRule.includes(name);
//         } else {
//             if ("loader" in moduleRule) {
//                 if (typeof moduleRule.loader === "string") {
//                     return moduleRule.loader.includes(name);
//                 }
//             }
//         }

//         return false;
//     };

//     // Add contextual information about the matcher for debugging.
//     matcher.info = {
//         type: matchLoaderName.name,
//         value: name
//     };

//     return matcher;
// }


// export interface LoaderMatch {
//     loader: string;
//     index: number;
//     parent: RuleSetRule | RuleSetUseItem[];
// }

// export interface LoaderMatch2 {
//     useItem?: RuleSetUseItem;
//     moduleRule?: RuleSetRule;
//     index: number;
//     parent: RuleSetRule[] | RuleSetUseItem[];
// }

// function toMatch(moduleRule: RuleSetRule | RuleSetUseItem, index: number, parent: RuleSetRule) {
//     return {
//         moduleRule,
//         index,
//         parent
//     };
// }

// function isRuleSetRule(value: RuleSetRule | RuleSetUseItem): value is RuleSetRule {
//     return (value as RuleSetRule).use !== undefined || (value as RuleSetRule).oneOf !== undefined;
// }

// function findModuleRulesRecursively(moduleRules: RuleSetRule[] | RuleSetUseItem[], matcher: ModuleRuleMatcher, matches: ModuleRuleMatch[], parent?: RuleSetRule) {
//     moduleRules.forEach((x, index, array) => {
//         if (x) {
//             if (matcher(x, index, array)) {
//                 matches.push(toMatch(x, index, parent));
//             } else {
//                 if (isRuleSetRule(x)) {
//                     if (x.use) {
//                         findModuleRulesRecursively(x.use as RuleSetUseItem[], matcher, matches, x.use);
//                     } else if (x.oneOf) {
//                         findModuleRulesRecursively(x.oneOf, matcher, matches, x);
//                     }
//                 }
//             }
//         }
//     });

//     return matches;
// }

// export function findModuleRule(config: Configuration, matcher: ModuleRuleMatcher) {
//     const moduleRules = config.module?.rules;

//     if (!moduleRules) {
//         return;
//     }

//     const matches: ModuleRuleMatch[] = [];

//     findModuleRulesRecursively(moduleRules as RuleSetRule[], matcher, matches);

//     if (matches.length > 1) {
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         const matcherInfo = matcher.info;

//         throw new Error(`[webpack-configs] Found more than 1 matching module rule. Matcher: "${JSON.stringify(matcherInfo)}"`);
//     }

//     return matches[0];
// }
