// import { RuleSetUseItem } from "webpack";

// export type ModuleRuleMatcher = (moduleRule: RuleSetRule | RuleSetUseItem, index: number, array: RuleSetRule[] | RuleSetUseItem[]) => boolean;

// export function matchLoaderName(name: string): ModuleRuleMatcher {
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

//     // Add contextual information about the matcher when an error occurs.
//     matcher.info = {
//         type: matchLoaderName.name,
//         value: name
//     };

//     return matcher;
// }


// export interface ModuleRuleMatch {
//     moduleRule: RuleSetRule | RuleSetUseItem;
//     index: number;
//     parent: RuleSetRule;
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
//                         findModuleRulesRecursively(x.use as RuleSetUseItem[], matcher, matches, x);
//                     } else if (x.oneOf) {
//                         findModuleRulesRecursively(x.oneOf, matcher, matches, x);
//                     }
//                 }
//             }
//         }
//     });

//     return matches;
// }
